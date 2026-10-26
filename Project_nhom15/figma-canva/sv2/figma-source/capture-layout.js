// Read-only DOM capture for editable SVG preparation. Run through the browser tool.
() => {
  const items = [];
  const px = v => +(String(v).match(/^-?[\d.]+/)?.[0] || 0);
  const width = innerWidth;
  const height = Math.max(document.documentElement.scrollHeight, innerHeight);
  const rectOf = r => ({ x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height });
  function visit(el, opacity, clips) {
    const tag = el.tagName?.toLowerCase();
    if (!tag || ['script','style','template','option','defs','title','meta','link'].includes(tag)) return;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    if (s.display === 'none' || s.visibility !== 'visible' || !r.width || !r.height || +s.opacity === 0) return;
    opacity *= +s.opacity;
    const box = rectOf(r);
    const common = { ...box, opacity, clips, name: el.id || el.className?.baseVal || el.className || tag };
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.backgroundImage !== 'none' || px(s.borderTopWidth)) {
      items.push({ type:'box', ...common, background:s.backgroundColor, gradient:s.backgroundImage,
        radius:s.borderTopLeftRadius, borders:['Top','Right','Bottom','Left'].map(side => ({width:px(s['border'+side+'Width']),color:s['border'+side+'Color']})) });
    }
    if (tag === 'svg') {
      items.push({type:'svg',...common,markup:el.outerHTML,color:s.color}); return;
    }
    if (tag === 'img') { items.push({type:'image',...common,src:el.getAttribute('src'),fit:s.objectFit}); return; }
    const textStyle = { color:s.color, size:px(s.fontSize), weight:s.fontWeight,
      font:s.fontFamily, letterSpacing:s.letterSpacing, fontStyle:s.fontStyle };
    if (['input','select','textarea'].includes(tag)) {
      const kind = el.getAttribute('type');
      if (kind === 'checkbox' || kind === 'radio') {
        items.push({type:'check',...common,checked:el.checked,radio:kind==='radio'});
      } else {
        let text = el.value || el.getAttribute('placeholder') || '';
        if (tag === 'select') text = Array.from(el.querySelectorAll('option')).find(o=>o.value===el.value)?.textContent.trim() || '';
        if (kind === 'password') text = text ? '••••••••' : '';
        items.push({type:'control',...common,...textStyle,text,paddingX:px(s.paddingLeft),paddingY:px(s.paddingTop),select:tag==='select',multiline:tag==='textarea'});
      }
      return;
    }
    let nextClips = clips;
    if (['hidden','auto','scroll'].includes(s.overflowX) || ['hidden','auto','scroll'].includes(s.overflowY)) nextClips = clips.concat([box]);
    for (const node of el.childNodes) {
      if (node.nodeType === 1) { visit(node, opacity, nextClips); continue; }
      if (node.nodeType !== 3 || !node.textContent.trim()) continue;
      const lines = [];
      for (const word of node.textContent.matchAll(/\S+/g)) {
        const range = document.createRange(); range.setStart(node,word.index); range.setEnd(node,word.index+word[0].length);
        const rr = Array.from(range.getClientRects()).find(x=>x.width>0&&x.height>0);
        if (!rr) continue;
        const last = lines[lines.length-1];
        if (last && Math.abs(last.y-(rr.y+scrollY))<1) last.text += ' '+word[0];
        else lines.push({x:rr.x+scrollX,y:rr.y+scrollY,height:rr.height,text:word[0]});
      }
      for (const line of lines) items.push({type:'text',name:line.text.slice(0,70),opacity,clips:nextClips,...textStyle,...line});
    }
  }
  visit(document.body,1,[]);
  return JSON.stringify({title:document.title,width,height,background:getComputedStyle(document.body).backgroundColor,items});
}
