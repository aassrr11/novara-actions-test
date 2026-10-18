const{chromium}=require('playwright');const fs=require('fs');fs.mkdirSync('shots',{recursive:true});
const handles=['سيفورا-سايز-أب-ماسكارا-ألترا-بلاك-14-مل','سيفورا-12h-إنتنس-إنك-آيلاينر-كاندي-بينك-2-8-مل','ملمع-شفاه-سيفورا-outrageous-plump-effect-05-pump-up-it-red-5-مل'];(async()=>{
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const data=[];
for(const[v,w]of[['mobile',390],['desktop',1440]])for(let i=0;i<handles.length;i++){
const ctx=await browser.newContext({viewport:{width:w,height:850}});
const page=await ctx.newPage();const url='https://anan-care.com/products/'+encodeURIComponent(handles[i]);
const row={view:v,name:handles[i]};try{const res=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(1500);row.status=res.status();row.checks=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth+8,clinical:document.body.innerText.includes('Clinical Results'),translation:document.body.innerText.includes('Translation missing'),demoreviews:document.body.innerText.includes('Verified Buyer')}));await page.screenshot({path:'shots/'+i+'-'+v+'.png',fullPage:true,timeout:20000})}catch(e){row.error=String(e)}data.push(row);await ctx.close();}
await browser.close();fs.writeFileSync('shots/report.json',JSON.stringify(data,null,2));console.log('ANAN_TEST',JSON.stringify(data))})();
