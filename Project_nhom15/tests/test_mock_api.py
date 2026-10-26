"""Real loopback HTTP tests; all writes use a temporary SQLite database."""
import functools
import json
import sys
import tempfile
import threading
import time
import unittest
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen
from http.server import ThreadingHTTPServer

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from mock_api import ProjectRepository
from server import Handler


class QuietHandler(Handler):
    def log_message(self, *args):
        pass


class MockAPITests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.database = Path(self.temp.name) / 'mock.sqlite3'
        self.seed = ROOT / 'assets/data/mock-projects.json'
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT)))
        self.server.project_repository = ProjectRepository(self.database, self.seed)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base = 'http://127.0.0.1:' + str(self.server.server_port)
        self.valid = dict(name='Dự án cà phê thử nghiệm', deadline='2026-12-20', description='Tiếng Việt đầy đủ', category='Branding', status='Active', progress=15)

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.temp.cleanup()

    def request(self, method='GET', path='/api/projects', data=None, headers=None, raw=None):
        body = raw if raw is not None else json.dumps(data, ensure_ascii=False).encode() if data is not None else None
        request = Request(self.base + path, data=body, method=method, headers={'Content-Type': 'application/json', **(headers or {})})
        try:
            response = urlopen(request, timeout=5)
        except HTTPError as error:
            response = error
        with response:
            content = response.read()
            parsed = json.loads(content) if content and 'application/json' in response.headers.get('Content-Type', '') else content
            return response.status, parsed, response.headers

    def create(self):
        status, project, headers = self.request('POST', data=self.valid)
        self.assertEqual(status, 201)
        self.assertEqual(headers['ETag'], '"1"')
        return project

    def test_crud_over_http(self):
        project = self.create()
        path = '/api/projects/' + project['id']
        self.assertEqual(self.request(path=path)[1]['description'], self.valid['description'])
        status, updated, _ = self.request('PATCH', path, {'name': 'Tên đã sửa'}, {'If-Match': '"1"'})
        self.assertEqual((status, updated['revision'], updated['name']), (200, 2, 'Tên đã sửa'))
        status, body, _ = self.request('DELETE', path, headers={'If-Match': '"2"'})
        self.assertEqual((status, body), (204, b''))
        self.assertEqual(self.request(path=path)[0], 404)

    def test_server_validation(self):
        for patch in [dict(name='  '), dict(deadline='2026-02-31'), dict(deadline='20261220'), dict(progress=101), dict(progress=True), dict(progress=4.5), dict(category='Unknown'), dict(status='fake'), dict(description='a' * 2001), dict(id='injected')]:
            with self.subTest(patch=patch):
                status, error, _ = self.request('POST', data={**self.valid, **patch})
                self.assertEqual(status, 422)
                self.assertIn('message', error['error'])

    def test_invalid_bodies(self):
        self.assertEqual(self.request('POST', data=[])[0], 422)
        self.assertEqual(self.request('POST', data={})[0], 422)
        self.assertEqual(self.request('POST', raw=b'{bad')[0], 400)
        self.assertEqual(self.request('POST', data=self.valid, headers={'Content-Type': 'text/plain'})[0], 415)
        self.assertEqual(self.request('POST', raw=b'a' * 65537)[0], 413)

    def test_revision_conflict_never_overwrites(self):
        project = self.create()
        path = '/api/projects/' + project['id']
        self.assertEqual(self.request('PATCH', path, {'name': 'Tab A'}, {'If-Match': '"1"'})[0], 200)
        self.assertEqual(self.request('PATCH', path, {'name': 'Tab B'}, {'If-Match': '"1"'})[0], 412)
        self.assertEqual(self.request('DELETE', path, headers={'If-Match': '"1"'})[0], 412)
        self.assertEqual(self.request(path=path)[1]['name'], 'Tab A')

    def test_mutations_require_revision(self):
        project = self.create()
        path = '/api/projects/' + project['id']
        self.assertEqual(self.request('PATCH', path, {'name': 'Thiếu revision'})[0], 428)
        self.assertEqual(self.request('DELETE', path)[0], 428)

    def test_persistent_storage(self):
        project = self.create()
        self.server.project_repository = ProjectRepository(self.database, self.seed)
        self.assertEqual(self.request(path='/api/projects/' + project['id'])[1]['name'], project['name'])

    def test_empty_database_is_not_reseeded(self):
        for project in self.request()[1]:
            self.assertEqual(self.request('DELETE', '/api/projects/' + project['id'], headers={'If-Match': '"1"'})[0], 204)
        self.server.project_repository = ProjectRepository(self.database, self.seed)
        self.assertEqual(self.request()[1], [])

    def test_failure_does_not_apply_mutation(self):
        before = self.request()[1]
        status, error, _ = self.request('POST', '/api/projects?fail=1', self.valid)
        self.assertEqual((status, error['error']['code']), (503, 'DEMO_FAILURE'))
        self.assertEqual(self.request()[1], before)

    def test_delay_and_retry(self):
        start = time.monotonic()
        self.assertEqual(self.request(path='/api/projects?delay=100')[0], 200)
        self.assertGreaterEqual(time.monotonic() - start, .09)
        self.assertEqual(self.request(path='/api/projects?delay=no')[0], 400)
        self.assertEqual(self.request()[0], 200)

    def test_same_origin_and_host(self):
        self.assertEqual(self.request('POST', data=self.valid, headers={'Origin': 'https://other.example'})[0], 403)
        self.assertEqual(self.request(headers={'Host': 'other.example'})[0], 403)
        self.assertEqual(self.request(headers={'Origin': self.base})[0], 200)

    def test_static_assets_and_private_data(self):
        self.assertEqual(self.request(path='/html/shared/api-demo.html')[0], 200)
        self.assertEqual(self.request(path='/js/shared/project-api.js')[0], 200)
        self.assertEqual(self.request(path='/.demo-data/mock-api.sqlite3')[0], 404)
        self.assertEqual(self.request('HEAD', '/.demo-data/mock-api.sqlite3')[0], 404)

    def test_routes_methods_and_response_metadata(self):
        status, health, headers = self.request(path='/api/health')
        self.assertTrue(health['mock'])
        self.assertEqual(status, 200)
        self.assertEqual(headers['Cache-Control'], 'no-store')
        self.assertTrue(headers['X-Request-Id'])
        self.assertEqual(self.request(path='/api/unknown')[0], 404)
        self.assertEqual(self.request('PUT', data={})[0], 405)
        self.assertEqual(self.request('DELETE')[0], 405)

    def test_completed_project_progress(self):
        status, project, _ = self.request('POST', data={**self.valid, 'status': 'Completed'})
        self.assertEqual((status, project['progress']), (201, 100))


if __name__ == '__main__':
    unittest.main(verbosity=2)
