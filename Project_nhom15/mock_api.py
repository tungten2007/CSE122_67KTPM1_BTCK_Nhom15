"""Local, unauthenticated REST mock for classroom demos; never deploy publicly."""
from contextlib import contextmanager
import json
import re
import sqlite3
import time
import uuid
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit

FIELDS = {'name', 'description', 'category', 'deadline', 'status', 'progress'}
STATUSES = ('Active', 'In Review', 'Completed', 'Archived')
CATEGORIES = ('Branding', 'UI/UX', 'Campaign')


class APIError(Exception):
    def __init__(self, status, code, message):
        self.status, self.code, self.message = status, code, message


def validate(data, partial=False):
    if not isinstance(data, dict) or set(data) - FIELDS:
        raise APIError(422, 'INVALID_FIELDS', 'Chỉ gửi các trường dự án được hỗ trợ.')
    if not partial and not {'name', 'deadline'} <= data.keys():
        raise APIError(422, 'REQUIRED_FIELDS', 'Tên và ngày bàn giao là bắt buộc.')
    clean = {}
    for key, value in data.items():
        if key == 'progress':
            if type(value) is not int or not 0 <= value <= 100:
                raise APIError(422, 'INVALID_PROGRESS', 'Tiến độ phải là số nguyên từ 0 đến 100.')
        elif not isinstance(value, str):
            raise APIError(422, 'INVALID_VALUE', 'Các trường văn bản phải là chuỗi.')
        else:
            value = value.strip()
            if key == 'name' and not 3 <= len(value) <= 100:
                raise APIError(422, 'INVALID_NAME', 'Tên dự án cần từ 3 đến 100 ký tự.')
            if key == 'description' and len(value) > 2000:
                raise APIError(422, 'INVALID_DESCRIPTION', 'Mô tả tối đa 2.000 ký tự.')
            if key == 'category' and value not in CATEGORIES:
                raise APIError(422, 'INVALID_CATEGORY', 'Loại dự án không hợp lệ.')
            if key == 'status' and value not in STATUSES:
                raise APIError(422, 'INVALID_STATUS', 'Trạng thái dự án không hợp lệ.')
            if key == 'deadline':
                try:
                    if date.fromisoformat(value).isoformat() != value:
                        raise ValueError()
                except ValueError:
                    raise APIError(422, 'INVALID_DEADLINE', 'Ngày bàn giao cần đúng dạng YYYY-MM-DD.')
        clean[key] = value
    return clean


class ProjectRepository:
    def __init__(self, database, seed_file):
        self.database = Path(database)
        self.database.parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as db:
            db.execute('CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, document TEXT NOT NULL)')
            db.execute('CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT)')
            if not db.execute("SELECT 1 FROM metadata WHERE key='seeded'").fetchone():
                for item in json.loads(Path(seed_file).read_text(encoding='utf-8')):
                    db.execute('INSERT INTO projects VALUES (?,?)', (item['id'], json.dumps(item, ensure_ascii=False)))
                db.execute("INSERT INTO metadata VALUES ('seeded','1')")

    @contextmanager
    def connect(self):
        db = sqlite3.connect(self.database, timeout=5)
        try:
            with db:
                yield db
        finally:
            db.close()

    @staticmethod
    def find(db, project_id):
        row = db.execute('SELECT document FROM projects WHERE id=?', (project_id,)).fetchone()
        if not row:
            raise APIError(404, 'NOT_FOUND', 'Không tìm thấy dự án trên API. Hãy tải lại danh sách.')
        return json.loads(row[0])

    def execute(self, method, project_id, data=None, match=None):
        with self.connect() as db:
            if method == 'GET':
                if project_id:
                    return 200, self.find(db, project_id)
                rows = db.execute('SELECT document FROM projects ORDER BY rowid DESC').fetchall()
                return 200, [json.loads(row[0]) for row in rows]
            db.execute('BEGIN IMMEDIATE')
            now = datetime.now(timezone.utc).isoformat()
            if method == 'POST' and not project_id:
                clean = validate(data)
                item = dict(description='', category='Branding', status='Active', progress=0)
                item.update(clean)
                item.update(id=uuid.uuid4().hex, revision=1, createdAt=now, updatedAt=now)
                if item['status'] == 'Completed':
                    item['progress'] = 100
                db.execute('INSERT INTO projects VALUES (?,?)', (item['id'], json.dumps(item, ensure_ascii=False)))
                return 201, item
            if method not in ('PATCH', 'DELETE') or not project_id:
                raise APIError(405, 'METHOD_NOT_ALLOWED', 'Phương thức không hỗ trợ tại đường dẫn này.')
            item = self.find(db, project_id)
            if match is None:
                raise APIError(428, 'PRECONDITION_REQUIRED', 'Cần gửi If-Match từ revision của dự án.')
            if match != '"' + str(item['revision']) + '"':
                raise APIError(412, 'REVISION_CONFLICT', 'Dữ liệu đã thay đổi ở tab khác. Đóng hộp thoại, tải lại danh sách rồi thử lại.')
            if method == 'DELETE':
                db.execute('DELETE FROM projects WHERE id=?', (project_id,))
                return 204, None
            item.update(validate(data, partial=True))
            if item['status'] == 'Completed':
                item['progress'] = 100
            item.update(revision=item['revision'] + 1, updatedAt=now)
            db.execute('UPDATE projects SET document=? WHERE id=?', (json.dumps(item, ensure_ascii=False), project_id))
            return 200, item


class MockAPIHandlerMixin:
    """Add /api routes to SimpleHTTPRequestHandler. Repository belongs to server."""
    def api_response(self, status, body=None, request_id=None):
        encoded = b'' if status == 204 else json.dumps(body, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(encoded)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Request-Id', request_id or uuid.uuid4().hex)
        if isinstance(body, dict) and 'revision' in body:
            self.send_header('ETag', '"' + str(body['revision']) + '"')
            if status == 201:
                self.send_header('Location', '/api/projects/' + body['id'])
        self.end_headers()
        self.wfile.write(encoded)

    def handle_api(self):
        request_id = uuid.uuid4().hex
        try:
            # Reject browser cross-origin writes; this is a localhost-only demo.
            origin, host = self.headers.get('Origin'), self.headers.get('Host')
            if not host or host.split(':')[0] not in ('localhost', '127.0.0.1'):
                raise APIError(403, 'HOST_NOT_ALLOWED', 'Mock API chỉ chạy tại localhost.')
            if origin and origin not in ('http://' + host, 'https://' + host):
                raise APIError(403, 'ORIGIN_NOT_ALLOWED', 'Không nhận yêu cầu từ website khác.')
            parsed = urlsplit(self.path)
            query = parse_qs(parsed.query)
            try:
                delay = min(1500, max(0, int(query.get('delay', ['0'])[0])))
            except ValueError:
                raise APIError(400, 'INVALID_DELAY', 'Độ trễ cần là số mili giây.')
            time.sleep(delay / 1000)
            if query.get('fail') == ['1']:
                raise APIError(503, 'DEMO_FAILURE', 'Lỗi 503 mô phỏng. Bỏ thử lỗi rồi tải lại hoặc lưu lại.')
            if parsed.path == '/api/health' and self.command == 'GET':
                self.api_response(200, {'service': 'CreatorStudio mock API', 'mock': True}, request_id)
                return
            match = re.fullmatch(r'/api/projects(?:/([A-Za-z0-9_-]+))?/?', unquote(parsed.path))
            if not match:
                raise APIError(404, 'ROUTE_NOT_FOUND', 'Đường dẫn API không tồn tại.')
            project_id = match.group(1)
            data = None
            if self.command in ('POST', 'PATCH'):
                if self.headers.get('Content-Type', '').split(';')[0].strip() != 'application/json':
                    raise APIError(415, 'JSON_REQUIRED', 'Gửi Content-Type: application/json.')
                try:
                    length = int(self.headers.get('Content-Length', '0'))
                    if not 0 < length <= 65536:
                        raise APIError(413, 'BODY_TOO_LARGE', 'Body JSON phải từ 1 đến 65.536 byte.')
                    data = json.loads(self.rfile.read(length))
                except (ValueError, UnicodeDecodeError):
                    raise APIError(400, 'INVALID_JSON', 'Body không phải JSON hợp lệ.')
            status, body = self.server.project_repository.execute(self.command, project_id, data, self.headers.get('If-Match'))
            self.api_response(status, body, request_id)
        except APIError as error:
            self.api_response(error.status, {'error': {'code': error.code, 'message': error.message}}, request_id)
        except sqlite3.Error:
            self.api_response(503, {'error': {'code': 'STORAGE_ERROR', 'message': 'Không truy cập được dữ liệu demo. Hãy thử lại.'}}, request_id)

    def do_POST(self):
        if urlsplit(self.path).path.startswith('/api/'):
            return self.handle_api()
        self.send_error(405)

    do_PATCH = do_POST
    do_DELETE = do_POST
    do_PUT = do_POST
