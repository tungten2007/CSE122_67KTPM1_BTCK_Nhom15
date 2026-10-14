"""Máy chủ chạy thử, chỉ trên máy cá nhân. Python 3.9+; không cần npm."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse
import os
import threading
import webbrowser
from check_bundle import check
ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        route=urlsplit(self.path).path
        if not Path(self.translate_path(route)).exists():
            # File CSS/JS/ảnh thiếu phải trả 404, không trả HTML trang lỗi.
            if (route.endswith('.html') or not Path(route).suffix) and route!='/404.html' and (ROOT/'404.html').is_file():
                self.send_response(302);self.send_header('Location','/404.html');self.end_headers()
            else:self.send_error(404,'File not found')
            return
        return super().do_GET()
if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('port',nargs='?',default=8000,type=int)
    parser.add_argument('--open',action='store_true',help='Mo trinh duyet sau khi cong da san sang')
    args=parser.parse_args()
    issues=check(ROOT)
    if issues:
        print('Bo website thieu file. Hay giai nen lai ca ZIP:')
        for issue in issues:print(' - '+issue)
        raise SystemExit(1)
    os.chdir(ROOT)
    try:server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    except OSError:
        print('Khong mo duoc cong. Thu: python server.py 8001 --open')
        raise SystemExit(1)
    url=f'http://127.0.0.1:{args.port}/index.html'
    print('Mo '+url+' — Ctrl+C de dung',flush=True)
    if args.open:threading.Thread(target=webbrowser.open,args=(url,),daemon=True).start()
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:server.server_close()
