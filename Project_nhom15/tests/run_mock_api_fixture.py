"""HTTP fixture with disposable data for browser tests; never uses .demo-data."""
import functools
import signal
import sys
import tempfile
from http.server import ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from server import Handler
from mock_api import ProjectRepository


class QuietHandler(Handler):
    def log_message(self, *args):
        pass


if __name__ == '__main__':
    signal.signal(signal.SIGTERM, lambda *args: sys.exit(0))
    with tempfile.TemporaryDirectory() as directory:
        server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT)))
        server.project_repository = ProjectRepository(Path(directory) / 'mock.sqlite3', ROOT / 'assets/data/mock-projects.json')
        print('http://127.0.0.1:' + str(server.server_port), flush=True)
        try:
            server.serve_forever()
        finally:
            server.server_close()
