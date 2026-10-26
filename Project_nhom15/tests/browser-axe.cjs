// Kiểm tra tương phản, cấu trúc A11y và tràn ngang trên trình duyệt thật.
// Chạy: CHROMIUM_EXECUTABLE_PATH=... node tests/audit-web.cjs
const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const out=process.env.QA_OUTPUT_DIR||path.join(require('node:os').tmpdir(),'creatorstudio-axe-audit');
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

// Install axe-core 4.14.0 separately or point AXE_SOURCE_PATH at its axe.min.js.
const axePath=process.env.AXE_SOURCE_PATH||require.resolve('axe-core/axe.min.js');
(async()=>{
 fs.mkdirSync(out,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port;let browser;
 const report={generatedAt:new Date().toISOString(),sourceBaseCommit:require('node:child_process').execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),sourceNote:'Tested working tree; see accompanying change notes for edits beyond the base commit',axeOptions:{preload:false},preloadNote:'CSSOM preload disabled due to relative @import fetching issue; no rules disabled. Incomplete results retained for manual review.',scope:'axe default rules on loaded pages; no exclusions or disabled rules; fresh isolated context; not full WCAG certification',scans:[],errors:[]};
 try{
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined});report.browser=await browser.version();
  const context=await browser.newContext({locale:'vi-VN'});const page=await context.newPage();page.setDefaultTimeout(10000);
  page.on('pageerror',e=>report.errors.push(e.message));page.on('response',r=>{if(r.status()>=400)report.errors.push(r.status()+' '+r.url())});
  await page.goto(base+'/html/sv1/login.html');await page.evaluate(()=>{Store.reset();Navigation.activate('Client',Store.get().users)});
  async function scan(name,width){
   await page.addScriptTag({path:axePath});await page.evaluate(()=>document.fonts.ready);
   const result=await page.evaluate(()=>axe.run(document,{preload:false}));report.axeVersion=result.testEngine.version;
   report.engineSha256=require('node:crypto').createHash('sha256').update(fs.readFileSync(axePath)).digest('hex');
   const compact=items=>items.map(v=>({id:v.id,impact:v.impact,help:v.help,helpUrl:v.helpUrl,nodes:v.nodes.map(n=>({target:n.target,html:n.html,failureSummary:n.failureSummary,any:n.any,all:n.all,none:n.none}))}));
   report.scans.push({name,width,violations:compact(result.violations),incomplete:compact(result.incomplete),passedRules:result.passes.length});
   if(process.env.QA_SCREENSHOTS==='1'&&width===375&&['admin-brief-template-management','create-user-dialog','client-creative-brief'].includes(name))await page.screenshot({path:path.join(out,name+'-'+width+'.png'),fullPage:true});
   console.log(name,width,'violations',result.violations.map(v=>v.id+':'+v.nodes.length).join(',')||'0');
  }
  for(const width of [1440,375])for(const screen of screens){
   await page.setViewportSize({width,height:1000});if(screen.role)await page.evaluate(role=>Navigation.activate(role,Store.get().users),screen.role);
   await page.goto(base+'/'+screen.file);if(new URL(page.url()).pathname!==new URL(base+'/'+screen.file).pathname)throw Error('Wrong route '+screen.name);
   await scan(screen.name,width);
  }
  for(const width of [1440,375])for(const item of [
   {name:'create-task-dialog',file:'html/sv3/lead-task-board.html',role:'Lead',button:'#new-task'},
   {name:'create-user-dialog',file:'html/sv3/admin-user-management.html',role:'Admin',button:'#add-user'},
   {name:'create-template-dialog',file:'html/sv2/admin-brief-template-management.html',role:'Admin',button:'#add-template-btn'}
  ]){
   await page.setViewportSize({width,height:1000});await page.evaluate(role=>Navigation.activate(role,Store.get().users),item.role);
   await page.goto(base+'/'+item.file);await page.locator(item.button).click();await page.locator('dialog[open]').waitFor();await scan(item.name,width);
  }
  report.violationNodes=report.scans.reduce((n,s)=>n+s.violations.reduce((v,r)=>v+r.nodes.length,0),0);
  report.incompleteNodes=report.scans.reduce((n,s)=>n+s.incomplete.reduce((v,r)=>v+r.nodes.length,0),0);
  report.status=report.violationNodes||report.errors.length?'FAIL':'NO_AUTOMATED_VIOLATIONS';
  if(report.status==='FAIL')process.exitCode=1;
 }catch(e){report.error=String(e);report.status='ERROR';process.exitCode=1}finally{
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));await browser?.close();server.close();
 }
 console.log('RESULT',report.status,'scans',report.scans.length,'nodes',report.violationNodes,'incomplete',report.incompleteNodes);
})();
