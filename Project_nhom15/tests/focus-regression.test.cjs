// Regression dùng DOM giả lập, không thay thế trình duyệt thật.
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const root=require('node:path').join(__dirname,'..'); let nodes=[],focused=null;
const elem=(id='',attrs=[])=>({id,attributes:attrs,disabled:false,focus(){focused=this},getAttribute(k){return this.attributes.find(a=>a.name===k)?.value}});
const main={contains:n=>nodes.includes(n),querySelectorAll:()=>nodes,focus(){focused=main}};
const document={activeElement:null,querySelector:s=>s==='#main'?main:null,getElementById:id=>nodes.find(n=>n.id===id)};
const ctx={window:{},Navigation:{routes:{},roles:{}},document};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync(root+'/js/app.js','utf8'),ctx);
let a=elem('check-brand'),b=elem('check-brand');nodes=[a];document.activeElement=a;ctx.App.preserveFocus(()=>nodes=[b]);assert.equal(focused,b);
a=elem('',[{name:'data-comment',value:'C-02'}]);b=elem('',[{name:'data-comment',value:'C-02'}]);nodes=[a];document.activeElement=a;ctx.App.preserveFocus(()=>nodes=[b]);assert.equal(focused,b);
a=elem('gone');nodes=[a];document.activeElement=a;ctx.App.preserveFocus(()=>nodes=[]);assert.equal(focused,main);
a=elem('disabled');b=elem('disabled');b.disabled=true;nodes=[a];document.activeElement=a;ctx.App.preserveFocus(()=>nodes=[b]);assert.equal(focused,main);
a=elem('input');a.selectionStart=2;a.selectionEnd=4;b=elem('input');b.setSelectionRange=(x,y)=>b.range=[x,y];nodes=[a];document.activeElement=a;ctx.App.preserveFocus(()=>nodes=[b]);assert.deepEqual(b.range,[2,4]);
focused=null;document.activeElement=elem('outside');nodes=[];ctx.App.preserveFocus(()=>{});assert.equal(focused,null);
console.log('PASS focus helper 6 cases: id, data identity, removed, disabled, text selection, outside. Stub DOM only.');
