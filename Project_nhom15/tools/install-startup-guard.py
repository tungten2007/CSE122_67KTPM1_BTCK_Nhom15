"""Rebuild the inline startup diagnostic after editing its source below."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
GUARD='''<!-- CS-STARTUP-GUARD -->
<script>
(function () {
  var missing = [];
  window.addEventListener('error', function (event) {
    var target = event.target;
    if (target && target !== window && /^(SCRIPT|LINK|IMG)$/.test(target.tagName)) {
      var path = target.getAttribute('src') || target.getAttribute('href');
      if (path && missing.indexOf(path) < 0) missing.push(path);
    }
  }, true);
  window.addEventListener('load', function () {
    if (!missing.length) return;
    var box = document.createElement('section');
    box.setAttribute('role', 'alert');
    box.setAttribute('data-startup-error', 'true');
    box.style.cssText = 'background:#fff4df;color:#5d4018;border:2px solid #dfb666;border-radius:12px;padding:24px;margin:20px;font:16px/1.6 Arial;position:relative;z-index:100;overflow-wrap:anywhere';
    var title = document.createElement('h2');
    title.textContent = 'Chưa tải đủ file của CreatorStudio';
    box.appendChild(title);
    var explanation = document.createElement('p');
    explanation.textContent = 'Hãy giải nén toàn bộ CreatorStudio-SV3-Website.zip và giữ các thư mục css, js, assets cạnh file HTML. Nếu gửi cho người khác, gửi nguyên ZIP; chỉ gửi HTML sẽ thiếu giao diện và chức năng. Sau đó mở index.html bằng Live Server.';
    box.appendChild(explanation);
    var list = document.createElement('ul');
    missing.forEach(function (path) {var item=document.createElement('li');item.textContent=path;list.appendChild(item);});
    box.appendChild(list);
    document.body.insertBefore(box, document.body.firstChild);
  });
})();
</script>
<!-- /CS-STARTUP-GUARD -->'''
for path in ROOT.glob('*.html'):
    if path.name=='BAT-DAU.html':continue
    html=path.read_text(encoding='utf-8')
    start='<!-- CS-STARTUP-GUARD -->';end='<!-- /CS-STARTUP-GUARD -->'
    if start in html:html=html[:html.index(start)]+html[html.index(end)+len(end):]
    html=html.replace('<head>','<head>\n'+GUARD,1)
    path.write_text(html,encoding='utf-8')
