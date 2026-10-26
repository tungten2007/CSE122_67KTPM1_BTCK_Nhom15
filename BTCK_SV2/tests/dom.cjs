// DOM tối giản cho kiểm thử ngoại tuyến bằng Node.js; không thay thế trình duyệt.
const decode = s => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'");
class Element {
  constructor(tag, attrs = {}) { this.tagName = tag.toUpperCase(); this.attrs = { ...attrs }; this.children = []; this.parent = null; this.text = ''; this._value = undefined; this.disabled = 'disabled' in attrs; this.checked = 'checked' in attrs; this.files = []; }
  get className() { return this.attrs.class || ''; }
  set className(v) { this.attrs.class = v; }
  get classList() {
    const el = this;
    return { contains(v) { return el.className.split(/\s+/).includes(v); }, toggle(v, force) {
      const set = new Set(el.className.split(/\s+/).filter(Boolean));
      const show = force === undefined ? !set.has(v) : force;
      if (show) set.add(v); else set.delete(v);
      el.className = [...set].join(' ');
    }, add(v) { this.toggle(v, true); }, remove(v) { this.toggle(v, false); } };
  }
  get dataset() { return Object.fromEntries(Object.entries(this.attrs).filter(([k]) => k.startsWith('data-')).map(([k,v]) => [k.slice(5).replace(/-([a-z])/g, (_,c) => c.toUpperCase()), v])); }
  get hidden() { return 'hidden' in this.attrs; }
  set hidden(v) { if(v) this.attrs.hidden = ''; else delete this.attrs.hidden; }
  get textContent() { return this.text + this.children.map(c => c.textContent).join(''); }
  set textContent(v) { this.text = String(v); this.children = []; }
  get value() {
    if (this._value !== undefined) return this._value;
    if (this.tagName === 'TEXTAREA') return this.textContent;
    if (this.tagName === 'SELECT') return (this.children.find(c => 'selected' in c.attrs) || this.children[0])?.value || '';
    return this.attrs.value || '';
  }
  set value(v) { this._value = String(v); }
  get elements() { return Object.fromEntries(this.querySelectorAll('[name]').map(c => [c.attrs.name, c])); }
  get firstElementChild() { return this.children[0]; }
  get content() { return this; }
  get href() { return this.attrs.href; } set href(v) { this.attrs.href = v; }
  get src() { return this.attrs.src; } set src(v) { this.attrs.src = v; }
  getAttribute(k) { return this.attrs[k] ?? null; }
  setAttribute(k,v) { this.attrs[k] = String(v); }
  append(...nodes) { for (const node of nodes) { if (typeof node === 'string') { this.text += node; continue; } node.parent = this; this.children.push(node); } }
  add(node) { this.append(node); }
  replaceChildren(...nodes) { this.children = []; this.text = ''; this.append(...nodes); }
  cloneNode(deep) { const el = new Element(this.tagName, this.attrs); el.text = this.text; if (deep) this.children.forEach(c => el.append(c.cloneNode(true))); return el; }
  matches(selector) {
    const attr = [...selector.matchAll(/\[([^=\]]+)(?:="([^"]*)")?\]/g)];
    if (attr.some(m => !(m[1] in this.attrs) || m[2] !== undefined && this.attrs[m[1]] !== m[2])) return false;
    selector = selector.replace(/\[[^\]]+\]/g, '');
    const tag = selector.match(/^[a-z][\w-]*/i)?.[0];
    if (tag && this.tagName !== tag.toUpperCase()) return false;
    const id = selector.match(/#([\w-]+)/)?.[1];
    if (id && this.attrs.id !== id) return false;
    return [...selector.matchAll(/\.([\w-]+)/g)].every(m => this.classList.contains(m[1]));
  }
  querySelectorAll(selector) {
    const parts = selector.match(/(?:\[[^\]]+\]|[^\s])+/g);
    const result = [];
    const visit = node => {
      for (const child of node.children) {
        if (child.matches(parts[parts.length-1])) {
          let ancestor = child.parent; let index = parts.length - 2;
          while (index >= 0 && ancestor) { if (ancestor.matches(parts[index])) index--; ancestor = ancestor.parent; }
          if (index < 0) result.push(child);
        }
        if (child.tagName !== 'TEMPLATE') visit(child);
      }
    };
    visit(this); return result;
  }
  querySelector(s) { return this.querySelectorAll(s)[0] || null; }
  getElementById(id) { return this.querySelector('#' + id); }
  createElement(tag) { return new Element(tag); }
  addEventListener() {}
  focus() {}
  showModal() { this.open = true; }
  close() { this.open = false; }
  click() { return this.onclick?.({target: this, preventDefault(){}}); }
  reset() { for (const c of Object.values(this.elements)) { c._value = undefined; c.checked = 'checked' in c.attrs; } }
}
function parse(source) {
  const doc = new Element('document'); const stack = [doc];
  const voids = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  for (const match of source.matchAll(/<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^>]*>|[^<]+/g)) {
    const token = match[0];
    if (token.startsWith('<!')) continue;
    if (token.startsWith('</')) { stack.pop(); continue; }
    if (token.startsWith('<')) {
      const tag = token.match(/^<([\w-]+)/)[1].toLowerCase(); const attrs = {};
      const tail = token.slice(tag.length+1, -1);
      for (const m of tail.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) attrs[m[1]] = decode(m[2] ?? m[3] ?? m[4] ?? '');
      const el = new Element(tag, attrs); stack.at(-1).append(el);
      if (!voids.has(tag) && !token.endsWith('/>')) stack.push(el);
    } else stack.at(-1).text += decode(token);
  }
  doc.body = doc.querySelector('body');
  return doc;
}
module.exports = { parse, Element };
