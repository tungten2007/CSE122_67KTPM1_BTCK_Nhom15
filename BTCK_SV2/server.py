"""Máy chủ chạy thử CreatorStudio SV2: chỉ lắng nghe trên localhost, không cần cài thêm thư viện."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import sys
from urllib.parse import urlsplit

os.chdir(Path(__file__).resolve().parent)

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        route = urlsplit(self.path).path
        if route == '/' or route == '':
            self.send_response(302)
            self.send_header('Location', '/index.html')
            self.end_headers()
            return

        translated = self.translate_path(route)
        if not Path(translated).exists():
            self.send_response(302)
            self.send_header('Location', '/404.html')
            self.end_headers()
            return
        return super().do_GET()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'CreatorStudio SV2 dang chay tai: http://localhost:{port}/index.html (Ctrl+C de dung)', flush=True)
    ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
