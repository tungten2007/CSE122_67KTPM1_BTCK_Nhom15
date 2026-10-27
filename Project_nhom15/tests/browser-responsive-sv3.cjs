// QA Chromium thật. Cần Playwright; CHROMIUM_EXECUTABLE_PATH là tùy chọn.
// Chạy: node tests/browser-task15-16.cjs (máy chủ thử nghiệm tự mở và đóng).
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/04-qa/web/responsive');
const checks=[],errors=[];
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
async function run(){
 fs.mkdirSync(out,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--single-process','--no-zygote','--disable-gpu']});
 try{
 const context=await browser.newContext(),page=await context.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 await page.goto(base+'/html/sv3/lead-task-board.html');await page.evaluate(()=>Store.reset());
 const pages=[['html/sv3/lead-task-board.html','Lead','task15','#new-task'],['html/sv3/lead-internal-review.html','Lead','task16','#new-note'],['html/sv3/lead-feedback-summary.html','Lead','task17','#manual'],['html/sv3/admin-user-management.html','Admin','task19','#add-user'],['html/sv3/admin-project-settings.html','Admin','task20','#add-tag'],['html/sv3/404.html','Admin','task26',null]];
 const layout=async label=>{const result=await page.evaluate(()=>({w:innerWidth,sw:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1}).slice(0,10).map(e=>e.tagName+'.'+e.className)}));assert(result.sw<=result.w+1,label+' overflow '+JSON.stringify(result))};
 for(const width of [320,768,1024,1440]){
  await page.setViewportSize({width,height:1000});
  for(const [file,role,key,button]of pages){
   await page.evaluate(r=>Navigation.activate(r,Store.get().users),role);await page.goto(base+'/'+file);await page.waitForFunction(()=>window.App&&document.querySelector('#main h1'));
   await page.waitForFunction(()=>innerWidth>760||document.querySelector('.sidebar').getBoundingClientRect().right<=1);await layout(key+' '+width);
   if(button){await page.locator(button).click();assert(await page.locator('#dialog').evaluate(d=>d.open));await layout('dialog '+key+' '+width);const box=await page.locator('#dialog').boundingBox();assert(box.x>=0&&box.x+box.width<=width+1);await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('#dialog').contains(document.activeElement)));await page.keyboard.press('Escape');assert(!await page.locator('#dialog').evaluate(d=>d.open));}
   if(width===320){await page.getByRole('button',{name:'Mở menu',exact:true}).click();assert(await page.locator('.workspace').evaluate(n=>n.inert));await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('.sidebar').contains(document.activeElement)));await page.keyboard.press('Escape');assert(!await page.locator('.workspace').evaluate(n=>n.inert));await page.waitForFunction(()=>document.querySelector('.sidebar').getBoundingClientRect().right<=1);}
   if(width===768){await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0)});await page.screenshot({path:path.join(out,key+'-tablet.png'),fullPage:true});}
   checks.push(key+' '+width+'px layout'+(button?', dialog/Tab/Escape':'')+(width===320?', mobile menu/focus':''));console.log('PASS '+checks.at(-1));
  }
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({date:new Date().toISOString(),browser:browser.version(),status:'PASS',checks,errors,widths:[320,768,1024,1440]},null,2)+'\n');
 }finally{await browser.close();server.close()}
}
run().catch(e=>{console.error(e);server.close();process.exitCode=1});
