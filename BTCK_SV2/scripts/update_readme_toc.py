"""Sinh mục lục README bằng thư viện chuẩn Python; chỉ sửa vùng TOC."""
from pathlib import Path
import argparse
import html
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / 'README.md'
if not README.exists():
    README = ROOT / 'docs' / 'sv2.md.md'
START = '<!-- AUTO-TOC:START -->'
END = '<!-- AUTO-TOC:END -->'


def make_toc(markdown):
    entries = []
    used = set()
    fence = None
    in_toc = False
    for line in markdown.splitlines():
        if line == START:
            in_toc = True
        if in_toc:
            if line == END:
                in_toc = False
            continue
        match = re.match(r'^ {0,3}(`{3,}|~{3,})', line)
        if match:
            delimiter = match[1]
            if fence is None:
                fence = delimiter
            elif delimiter[0] == fence[0] and len(delimiter) >= len(fence):
                fence = None
            continue
        if fence:
            continue
        heading = re.match(r'^ {0,3}(#{1,6})\s+(.+?)\s*$', line)
        if not heading:
            continue
        level = len(heading[1])
        title = re.sub(r'\s+#+$', '', heading[2])
        label = html.unescape(re.sub(r'<[^>]+>', '', title))
        label = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', label)
        label = re.sub(r'[`*~]', '', label)
        slug = re.sub(r'[^\w\- ]', '', label.lower()).replace(' ', '-')
        anchor = slug
        suffix = 0
        while anchor in used:
            suffix += 1
            anchor = f'{slug}-{suffix}'
        used.add(anchor)
        if level in (2, 3):
            safe_label = label.replace('[', r'\[').replace(']', r'\]')
            entries.append('  ' * (level - 2) + f'- [{safe_label}](#{anchor})')
    return '\n'.join(entries)


def update(markdown):
    if markdown.count(START) != 1 or markdown.count(END) != 1:
        raise ValueError('README cần đúng một cặp AUTO-TOC:START / AUTO-TOC:END.')
    before, rest = markdown.split(START)
    _, after = rest.split(END)
    return before + START + '\n\n' + make_toc(markdown) + '\n\n' + END + after


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Kiểm tra mục lục mà không sửa file.')
    args = parser.parse_args()
    source = README.read_text(encoding='utf-8')
    result = update(source)
    if args.check:
        if source != result:
            parser.exit(1, 'Mục lục cần cập nhật: python scripts/update_readme_toc.py\n')
        print('OK: mục lục khớp các tiêu đề README.')
    elif result != source:
        README.write_text(result, encoding='utf-8')
        print('Đã cập nhật mục lục README.')
    else:
        print('Mục lục đã được cập nhật.')
