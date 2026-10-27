// Kiểm tra tương phản, cấu trúc A11y và tràn ngang trên trình duyệt thật.
// Chạy: CHROMIUM_EXECUTABLE_PATH=... node tests/audit-web.cjs
const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const out=process.env.QA_OUTPUT_DIR||path.join(require('node:os').tmpdir(),'creatorstudio-web-audit');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.ttf':'font/ttf','.png':'image/png','.jpg':'image/jpeg'};
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
const screens=[
  {name:'landing',file:'html/sv1/index.html',role:''},
  {name:'login',file:'html/sv1/login.html',role:''},
  {name:'register',file:'html/sv1/register.html',role:''},
  {name:'error-404',file:'html/sv3/404.html',role:'Client'},
  {name:'profile',file:'html/sv2/profile.html',role:'Client'},
  {name:'notifications',file:'html/sv2/notifications.html',role:'Client'},
  {name:'client-project-overview',file:'html/sv1/client-project-overview.html',role:'Client'},
  {name:'client-creative-brief',file:'html/sv1/client-creative-brief.html?project=p-moc',role:'Client'},
  {name:'client-review-versions',file:'html/sv1/client-review-versions.html?project=p-moc',role:'Client'},
  {name:'designer-dashboard',file:'html/sv2/designer-dashboard.html',role:'Designer'},
  {name:'designer-moodboard',file:'html/sv2/designer-moodboard.html?project=p-moc',role:'Designer'},
  {name:'designer-version-management',file:'html/sv2/designer-version-management.html?project=p-moc',role:'Designer'},
  {name:'lead-task-board',file:'html/sv3/lead-task-board.html',role:'Lead'},
  {name:'lead-internal-review',file:'html/sv3/lead-internal-review.html?project=p-moc',role:'Lead'},
  {name:'lead-feedback-summary',file:'html/sv3/lead-feedback-summary.html?project=p-moc',role:'Lead'},
  {name:'admin-brief-template-management',file:'html/sv2/admin-brief-template-management.html',role:'Admin'},
  {name:'admin-user-management',file:'html/sv3/admin-user-management.html',role:'Admin'},
  {name:'admin-project-settings',file:'html/sv3/admin-project-settings.html',role:'Admin'}
];
screens.push({name:'error-403',file:'html/sv3/404.html?code=403',role:'Client'});
const widths=[320,375,390,720,768,1024,1280,1440];

async function auditPage(page){
  return page.evaluate(()=>{
    const parseColor=s=>{
      const m=String(s).match(/rgba?\(([^)]+)\)/);
      if(!m)return null;
      const p=m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};
    };
    const blend=(fg,bg)=>{
      const a=fg.a+(bg.a*(1-fg.a));
      if(!a)return {r:0,g:0,b:0,a:1};
      return {r:(fg.r*fg.a+bg.r*bg.a*(1-fg.a))/a,g:(fg.g*fg.a+bg.g*bg.a*(1-fg.a))/a,b:(fg.b*fg.a+bg.b*bg.a*(1-fg.a))/a,a};
    };
    const lum=c=>{
      const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};
      return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b);
    };
    const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
    const visible=el=>{
      const cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden'||cs.visibility==='collapse')return false;
      if(Number(cs.opacity)===0)return false;
      if(el.closest('[hidden],[aria-hidden="true"],dialog:not([open]),template,script,style,noscript'))return false;
      if(cs.clip==='rect(0px, 0px, 0px, 0px)'||cs.clipPath==='inset(50%)')return false;
      if(el.getBoundingClientRect().width<=0||el.getBoundingClientRect().height<=0)return false;
      return true;
    };
    const background=el=>{
      const layers=[];let unknown=false;
      for(let n=el;n;n=n.parentElement){
        const cs=getComputedStyle(n);
        const c=parseColor(cs.backgroundColor);
        if(cs.backgroundImage!=='none'){unknown=true;break;}
        if(c&&c.a>0){layers.push(c);if(c.a>=1)break;}
      }
      let bg={r:255,g:255,b:255,a:1};
      for(let i=layers.length-1;i>=0;i--)bg=blend(layers[i],bg);
      return {bg,unknown};
    };
    const selector=el=>{
      if(el.id)return '#'+el.id;
      const cls=[...el.classList].slice(0,2).join('.');
      return el.tagName.toLowerCase()+(cls?'.'+cls:'');
    };
    const violations=[],unknown=[];
    const seen=new Set();
    for(const el of document.body.querySelectorAll('*')){
      if(!visible(el))continue;
      if(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','OPTION','OPTGROUP'].includes(el.tagName))continue;
      if(el.matches(':disabled,[aria-disabled="true"]'))continue;
      const own=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).map(n=>n.textContent.trim()).join(' ').replace(/\s+/g,' ').trim();
      if(!own)continue;
      const cs=getComputedStyle(el);
      const fg0=parseColor(cs.color);if(!fg0||fg0.a===0)continue;
      const {bg,unknown:isUnknown}=background(el);
      if(isUnknown){unknown.push({selector:selector(el),text:own.slice(0,50)});continue;}
      const fg=blend(fg0,bg);
      const size=parseFloat(cs.fontSize),weight=Number(cs.fontWeight)||400;
      const large=size>=24||(size>=18.66&&weight>=700);
      const need=large?3:4.5;
      const value=ratio(fg,bg);
      if(value+0.01<need){
        const key=selector(el)+'|'+cs.color+'|'+cs.backgroundColor+'|'+Math.round(value*100);
        if(seen.has(key))continue;seen.add(key);
        violations.push({selector:selector(el),text:own.slice(0,60),ratio:Number(value.toFixed(2)),need,fontSize:size,weight,color:cs.color,bg:`rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`});
      }
    }
    const accessibleName=el=>{
      const aria=el.getAttribute('aria-label')||el.getAttribute('title');
      if(aria?.trim())return aria.trim();
      const labelled=el.getAttribute('aria-labelledby');
      if(labelled){const t=labelled.split(/\s+/).map(id=>document.getElementById(id)?.textContent||'').join(' ').trim();if(t)return t;}
      if(el.id){const label=document.querySelector('label[for="'+CSS.escape(el.id)+'"]');if(label?.textContent.trim())return label.textContent.trim();}
      const wrap=el.closest('label');if(wrap?.textContent.trim())return wrap.textContent.trim();
      if(el.tagName==='BUTTON'||el.tagName==='A'){const t=el.textContent.trim();if(t)return t;const img=el.querySelector('img[alt]');if(img?.alt.trim())return img.alt.trim();}
      return '';
    };
    const controls=[...document.querySelectorAll('input:not([type=hidden]),select,textarea')];
    const unnamed=controls.filter(el=>!accessibleName(el)).map(el=>({tag:el.tagName,type:el.type||'',id:el.id,class:el.className}));
    const images=[...document.images].filter(img=>!img.hasAttribute('alt')).map(img=>img.getAttribute('src'));
    const emptyButtons=[...document.querySelectorAll('button,a')].filter(el=>visible(el)&&!accessibleName(el)).map(el=>selector(el));
    const mains=document.querySelectorAll('main').length;
    const h1s=document.querySelectorAll('h1').length;
    const lang=document.documentElement.lang;
    const title=document.title;
    const dupIds=[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,arr)=>arr.indexOf(id)!==i);
    return {violations,unknownCount:unknown.length,unknown:unknown.slice(0,10),a11y:{mains,h1s,lang,title,unnamed,images,emptyButtons,dupIds:[...new Set(dupIds)]}};
  });
}

(async()=>{
  fs.mkdirSync(out,{recursive:true});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
  const report={scope:'Custom DOM, computed solid-color contrast and overflow checks; not axe, WCAG certification, W3C validation or Lighthouse. Fresh isolated context.',generatedAt:new Date().toISOString(),baseScreens:screens.length,widths,contrast:[],a11y:[],responsive:[],console:[]};
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},locale:'vi-VN'});
    page.setDefaultTimeout(10000);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
    await page.goto(base+'/html/sv1/login.html');
    await page.evaluate(()=>{Store.reset();Navigation.activate('Client',Store.get().users);sessionStorage.setItem('cs-project','p-moc');});
    for(const s of screens){
      await page.setViewportSize({width:1440,height:1000});
      if(s.role)await page.evaluate(r=>{Navigation.activate(r,Store.get().users);sessionStorage.setItem('cs-project','p-moc')},s.role);
      await page.goto(base+'/'+s.file);
      if(new URL(page.url()).pathname!==new URL(base+'/'+s.file).pathname)throw Error('Unexpected route for '+s.name+': '+page.url());
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(250);
      const result=await auditPage(page);
      if(process.env.QA_SCREENSHOTS==='1')await page.screenshot({path:path.join(out,s.name+'-1440.png'),fullPage:true});
      report.contrast.push({screen:s.name,viewport:1440,violations:result.violations,unknownCount:result.unknownCount});
      report.a11y.push({screen:s.name,...result.a11y});
      if(result.violations.length)console.log('CONTRAST',s.name,1440,result.violations.length,result.violations.slice(0,6));
      if(result.a11y.unnamed.length||result.a11y.images.length||result.a11y.emptyButtons.length||result.a11y.mains!==1||result.a11y.h1s!==1||!result.a11y.lang)console.log('A11Y',s.name,JSON.stringify(result.a11y));
      await page.setViewportSize({width:375,height:812});
      await page.waitForTimeout(120);
      const mobile=await auditPage(page);
      if(process.env.QA_SCREENSHOTS==='1')await page.screenshot({path:path.join(out,s.name+'-375.png'),fullPage:true});
      report.contrast.push({screen:s.name,viewport:375,violations:mobile.violations,unknownCount:mobile.unknownCount});
      if(mobile.violations.length)console.log('CONTRAST',s.name,375,mobile.violations.length,mobile.violations.slice(0,6));
      for(const width of widths){
        await page.setViewportSize({width,height:900});
        await page.waitForTimeout(60);
        const overflow=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth,offenders:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.right>innerWidth+2}).slice(0,8).map(e=>({tag:e.tagName,cls:String(e.className).slice(0,60),right:Math.round(e.getBoundingClientRect().right)}))}));
        if(process.env.QA_SCREENSHOTS==='1'&&s.name==='designer-moodboard'&&width===768)await page.screenshot({path:path.join(out,'designer-moodboard-768.png'),fullPage:true});
        if(overflow.scrollWidth>overflow.innerWidth+2)report.responsive.push({screen:s.name,width,...overflow});
      }
    }
    report.console=errors;
    report.browser=await browser.version();
    report.unknownBackgroundCount=report.contrast.reduce((n,x)=>n+x.unknownCount,0);
    const failures=report.contrast.reduce((n,x)=>n+x.violations.length,0)+report.responsive.length+errors.length+report.a11y.reduce((n,x)=>n+x.unnamed.length+x.images.length+x.emptyButtons.length+x.dupIds.length+(x.mains!==1)+(x.h1s!==1)+(!x.lang)+(!x.title),0);
    report.status=failures?'FAIL':'PASS_WITH_UNASSESSED_BACKGROUNDS';
    report.failureCount=failures;
    if(failures)process.exitCode=1;
    fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
    console.log('SCREENS',screens.length,'CONTRAST_VIOLATIONS',report.contrast.reduce((n,x)=>n+x.violations.length,0),'RESPONSIVE_ISSUES',report.responsive.length,'CONSOLE',errors.length);
    console.log('UNNAMED',report.a11y.reduce((n,x)=>n+x.unnamed.length,0),'IMAGES_NO_ALT',report.a11y.reduce((n,x)=>n+x.images.length,0),'EMPTY_LINKS_BUTTONS',report.a11y.reduce((n,x)=>n+x.emptyButtons.length,0));
  }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
