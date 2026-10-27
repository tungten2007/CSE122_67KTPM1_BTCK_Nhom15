import fs from 'node:fs/promises';
const esc = s => String(s ?? '').replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const num = x => Math.round((Number(x)||0)*100)/100;
const solid = c => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent';
export async function renderSvg(data, name) {
  const defs=[], out=[];let uid=0;
  const at = e => `x="${num(e.x)}" y="${num(e.y)}" width="${num(e.width)}" height="${num(e.height)}"`;
  for(const e of data.items) {
    let shape='';
    const n=`layer-${++uid}`;
    if(e.type==='box') {
      let fill=solid(e.background)?e.background:'none';
      const colours=e.gradient?.match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}\b/gi);
      if(colours?.length>1) { const id='gradient-'+uid;defs.push(`<linearGradient id="${id}" x2="1" y2="1">${colours.map((c,i)=>`<stop offset="${i/(colours.length-1)}" stop-color="${esc(c)}"/>`).join('')}</linearGradient>`);fill=`url(#${id})`; }
      const radius=e.radius?.includes('%')?Math.min(e.width,e.height)*parseFloat(e.radius)/100:parseFloat(e.radius)||0;
      const border=e.borders?.[0];
      shape=`<rect ${at(e)} rx="${num(radius)}" fill="${esc(fill)}"${border?.width?` stroke="${esc(border.color)}" stroke-width="${num(border.width)}"`:''}/>`;
      if(!border?.width) {
        const edges=[[e.x+e.width,e.y,e.x+e.width,e.y+e.height],[e.x,e.y+e.height,e.x+e.width,e.y+e.height],[e.x,e.y,e.x,e.y+e.height]];
        e.borders?.slice(1).forEach((b,i)=>{if(b.width)shape+=`<line x1="${num(edges[i][0])}" y1="${num(edges[i][1])}" x2="${num(edges[i][2])}" y2="${num(edges[i][3])}" stroke="${esc(b.color)}" stroke-width="${num(b.width)}"/>`;});
      }
    } else if(e.type==='svg') {
      shape=e.markup.replace(/<svg\b[^>]*>/,m=>m.replace(/\s(?:x|y|width|height|class|style)="[^"]*"/g,'').replace('>',` ${at(e)} color="${esc(e.color)}">`)).replaceAll('currentColor',e.color);
    } else if(e.type==='image' && e.src?.startsWith('assets/') && e.src.endsWith('.svg')) {
      const source=await fs.readFile('C:/BTCK_SV2/'+e.src,'utf8');
      shape=source.replace(/<\?xml[^>]*>|<!DOCTYPE[^>]*>/g,'').replace(/<svg\b[^>]*>/,m=>m.replace(/\s(?:x|y|width|height)="[^"]*"/g,'').replace('>',` ${at(e)} preserveAspectRatio="xMidYMid meet">`));
    } else if(e.type==='text'||e.type==='control') {
      const x=e.x+(e.type==='control'?(e.paddingX||8):0), y=e.type==='control'?e.y+(e.multiline?(e.paddingY||8)+e.size:e.height/2+e.size*.35):e.y+e.height*.8;
      const lines=e.multiline?e.text.split(/\n/):[e.text];
      const text=lines.slice(0,30).map((l,i)=>`<tspan x="${num(x)}" y="${num(y+i*e.size*1.55)}">${esc(l)}</tspan>`).join('');
      shape=`<text fill="${esc(e.color)}" font-family="Segoe UI, Arial, sans-serif" font-size="${num(e.size)}" font-weight="${esc(e.weight)}" font-style="${esc(e.fontStyle||'normal')}"${e.letterSpacing!=='normal'?` letter-spacing="${esc(e.letterSpacing)}"`:''}>${text}</text>`;
      if(e.select)shape+=`<path d="m ${num(e.x+e.width-16)} ${num(e.y+e.height/2-2)} 4 4 4 -4" fill="none" stroke="#68748a"/>`;
    } else if(e.type==='check') {
      shape=`<rect ${at(e)} rx="${e.radio?num(e.width/2):3}" fill="${e.checked?'#635bff':'#ffffff'}" stroke="#94a3b8"/>`;
      if(e.checked)shape+=`<path d="m ${num(e.x+3)} ${num(e.y+e.height/2)} 3 3 6 -6" fill="none" stroke="white" stroke-width="2"/>`;
    }
    if(!shape)continue;
    for(const clip of e.clips||[]) {const id='clip-'+(++uid);defs.push(`<clipPath id="${id}"><rect ${at(clip)}/></clipPath>`);shape=`<g clip-path="url(#${id})">${shape}</g>`;}
    out.push(`<g id="${n}" data-name="${esc(e.name)}" opacity="${num(e.opacity)}">${shape}</g>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${data.width}" height="${data.height}" viewBox="0 0 ${data.width} ${data.height}"><title>${esc(name)}</title><defs>${defs.join('')}</defs><rect width="${data.width}" height="${data.height}" fill="${esc(data.background)}"/>${out.join('\n')}</svg>`;
}
