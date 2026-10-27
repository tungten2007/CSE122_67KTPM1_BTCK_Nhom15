// Run: node tests/browser-sv3-p1.cjs. Requires Playwright and an installed Chromium/Edge.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=process.env.QA_OUTPUT_DIR||path.join(require('node:os').tmpdir(),'creatorstudio-sv3-p1');
const checks=[],errors=[],mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try{
 fs.mkdirSync(out,{recursive:true});
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.CHROMIUM_EXECUTABLE_PATH}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();page.setDefaultTimeout(8000);
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 const base='http://127.0.0.1:'+server.address().port;
 const routesDir=fs.existsSync(path.join(root,'html/sv3'))?'html/sv3/':'';
 const go=f=>page.goto(base+'/'+routesDir+f+'.html');
 const choose=async(role,file)=>{await page.evaluate(r=>Navigation.activate(r,Store.get().users),role);await go(file)};
 const pass=name=>{checks.push(name);console.log('PASS '+name)};
 const search=async(id,value)=>{await page.locator(id).fill(value);await page.waitForTimeout(300)};
 const submit=()=>page.locator('#dialog-form button[type=submit]').click();
 const escape=()=>page.keyboard.press('Escape');
 await go('lead-task-board');await choose('Admin','admin-user-management');
 const users=page.locator('.users-table tbody tr');
 assert.match(await page.locator('.user-stats').innerText(),/15/);
 let seen=[];while(true){seen.push(...await users.locator('.member small').allTextContents());if(await page.locator('#next').isDisabled())break;await page.locator('#next').click();}
 assert.equal(new Set(seen).size,15);assert.equal(seen.length,15);
 pass('User pagination covers 15 unique accounts without missing/duplicate rows');
 await page.locator('#prev').click();assert.equal(await users.count(),6);
 await page.locator('#filter-role').selectOption('Designer');await page.locator('#filter-status').selectOption('true');
 assert((await users.locator('.role-label').allTextContents()).every(x=>x==='Nhà thiết kế'));
 assert((await users.locator('.badge').allTextContents()).every(x=>x==='Hoạt động'));
 await page.locator('#clear-user-filters').click();
 await search('#search-user','annguyen@example.com');
 await users.locator('[data-delete-user]').click();await submit();
 assert.match(await page.locator('#form-error').innerText(),/công việc/);assert.equal(await page.locator('#form-error').evaluate(el=>el===document.activeElement),true);
 await escape();
 await page.locator('#clear-user-filters').click();await page.locator('#add-user').click();
 assert.equal(await page.locator('[name=name]').evaluate(el=>el===document.activeElement),true);
 await page.locator('[name=name]').fill('QA P1');await page.locator('[name=email]').fill('qa-p1@example.com');await submit();await page.waitForFunction(()=>!document.querySelector('#dialog').open);
 await search('#search-user','qa-p1@example.com');assert.equal(await users.count(),1);
 await users.locator('[data-delete-user]').click();await page.locator('#dialog [data-close]').last().click();assert.equal(await users.count(),1);
 await users.locator('[data-delete-user]').click();await submit();await page.reload();await search('#search-user','qa-p1@example.com');assert.equal(await users.count(),0);
 pass('User filters/reset, modal focus/error, create/delete confirmation and persistence');
 const q=page.locator('#search-user');await q.fill('');await q.pressSequentially('abc',{delay:300});await page.keyboard.press('Shift+Digit2');await page.waitForTimeout(300);assert.equal(await q.inputValue(),'abc@');
 await page.keyboard.type('example.com');await page.waitForTimeout(300);assert.equal(await q.inputValue(),'abc@example.com');
 pass('User search keeps prefix when typing @ and continuing email');
 await page.locator('#clear-user-filters').click();
 await page.screenshot({path:path.join(out,'users-desktop.png'),fullPage:true});
 await choose('Lead','lead-task-board');
 const allIds=await page.evaluate(()=>Store.get().tasks.filter(t=>t.projectId===App.project.id).map(t=>t.id));
 let taskIds=[];while(true){taskIds.push(...await page.locator('.task-card').evaluateAll(es=>es.map(e=>e.dataset.id)));if(await page.locator('#task-next').isDisabled())break;await page.locator('#task-next').click();}
 assert.deepEqual([...taskIds].sort(),[...allIds].sort());
 await page.locator('#sort-tasks').selectOption('title');
 for(const col of await page.locator('.kanban-column').all()){const names=await col.locator('.task-title').allTextContents();assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b,'vi')));}
 await page.locator('#person').selectOption('u-an');await page.locator('#priority').selectOption('high');
 const shown=await page.locator('.task-card').evaluateAll(es=>es.map(e=>e.dataset.id));
 assert(await page.evaluate(ids=>{const d=Store.get();return ids.every(id=>d.tasks.some(t=>t.id===id&&t.assignee==='u-an'&&t.priority==='high'))},shown));
 await page.locator('#clear-task-filters').click();
 const tq=page.locator('#search');await tq.pressSequentially('test',{delay:300});await page.keyboard.press('Shift+Digit2');await page.waitForTimeout(300);assert.equal(await tq.inputValue(),'test@');
 await tq.fill('abcxyz');await page.waitForTimeout(300);await tq.evaluate(e=>e.setSelectionRange(3,3));await page.keyboard.type('M');await page.waitForTimeout(300);assert.equal(await tq.inputValue(),'abcMxyz');assert.equal(await tq.evaluate(e=>e.selectionStart),4);
 await page.locator('#clear-task-filters').click();
 pass('Board pagination, title sorting, combined filters/reset and caret-aware search');
 await page.locator('#new-task').click();await page.locator('[name=title]').fill('QA hủy và xóa');await submit();await page.waitForFunction(()=>!document.querySelector('#dialog').open);
 await search('#search','QA hủy và xóa');
 const card=page.locator('.task-card').filter({hasText:'QA hủy và xóa'});
 await card.locator('[data-cancel]').click();await page.locator('[name=reason]').fill('   ');await submit();assert.match(await page.locator('#form-error').innerText(),/lý do/);
 await page.locator('[name=reason]').fill('Hết phạm vi kiểm tra');await submit();await page.waitForFunction(()=>!document.querySelector('#dialog').open);
 assert.match(await card.innerText(),/Hết phạm vi kiểm tra/);assert.equal(await card.getAttribute('draggable'),'false');
 await card.locator('[data-delete-task]').click();await submit();await page.reload();await search('#search','QA hủy và xóa');assert.equal(await page.locator('.task-card').count(),0);
 pass('Task cancel reason validation, terminal-state card, deletion and reload persistence');
 await page.locator('#clear-task-filters').click();await page.screenshot({path:path.join(out,'board-desktop.png'),fullPage:true});
 for(const width of [320,390,768]){
  await page.setViewportSize({width,height:900});if(await page.locator('[data-tab=doing]').isVisible())await page.locator('[data-tab=doing]').click();
  await page.waitForFunction(()=>innerWidth>760||document.querySelector('.sidebar').getBoundingClientRect().right<=1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'Board overflow at '+width);
  if(width<=390)assert((await page.locator('#person').boundingBox()).width>=200,'Filter label width at '+width);await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:path.join(out,'board-'+width+'.png'),fullPage:true});
 }
 await page.setViewportSize({width:390,height:844});await choose('Admin','admin-user-management');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'User overflow at 390');
 await page.screenshot({path:path.join(out,'users-mobile.png'),fullPage:true});
 pass('Board layout at 320/390/768px and users at 390px without horizontal overflow');
 assert.deepEqual(errors,[]);
 const result={date:new Date().toISOString(),browser:browser.version(),status:'PASS',checks,errors,note:'Fresh isolated browser context; no user LocalStorage reset.'};
 fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(result,null,2));console.log('RESULT '+out);
 }catch(e){fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({date:new Date().toISOString(),status:'FAIL',checks,errors,error:String(e)},null,2));throw e}
 finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});

