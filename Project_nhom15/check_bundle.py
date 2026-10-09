"""Kiểm tra file phụ thuộc; chạy bằng Python 3, không cần cài thư viện."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import sys
ROOT=Path(__file__).resolve().parent

def check(root=ROOT):
    root=Path(root).resolve()
    errors=[]
    manifest=root/'bundle-manifest.json'
    if not manifest.is_file():return ['Thiếu bundle-manifest.json: hãy giải nén lại toàn bộ ZIP.']
    try:files=json.loads(manifest.read_text(encoding='utf-8'))['required']
    except (ValueError,KeyError,TypeError):return ['Danh sách file không hợp lệ. Hãy dùng lại ZIP đầy đủ.']
    for name in files:
        path=(root/name).resolve()
        if not path.is_relative_to(root) or not path.is_file():errors.append('Thiếu file: '+name)
    class Links(HTMLParser):
        def __init__(self,base):super().__init__();self.base=base
        def handle_starttag(self,tag,attrs):
            for key,value in attrs:
                if key not in ('href','src') or not value:continue
                url=urlsplit(value)
                if url.scheme or url.netloc or not url.path:continue
                target=(self.base/unquote(url.path)).resolve()
                if not target.is_relative_to(root) or not target.exists():errors.append('Đường dẫn thiếu: '+value)
    for html in root.glob('*.html'):Links(html.parent).feed(html.read_text(encoding='utf-8'))
    return sorted(set(errors))
if __name__=='__main__':
    issues=check()
    if issues:
        print('THIEU FILE — khong gui rieng HTML. Giai nen lai ca ZIP:')
        for issue in issues:print(' - '+issue)
        sys.exit(1)
    print('DU FILE: HTML, CSS, JavaScript va anh da co day du.')
    print('Kiem tra nay khong thay the chay giao dien tren trinh duyet.')
