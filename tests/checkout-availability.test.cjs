const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const full=fs.readFileSync(path.join(root,'app.js'),'utf8');
const source=full.slice(full.indexOf("const purchaseDialog="),full.indexOf("document.querySelector('#explore-samples')"));
function setup(checkoutUrl){
 const buttons=[{},{}];let destination=null,opened=false;
 buttons.forEach(button=>button.addEventListener=(_,cb)=>button.click=cb);
 const dialog={showModal(){opened=true;}};const status={};
 const window={MISSAO_CONFIG:{checkoutUrl},MISSAO_OFFER:{isExpired:()=>true},localStorage:{getItem:()=> '1'},location:{assign:url=>destination=url}};
 const document={querySelector:s=>s==='#purchase-dialog'?dialog:status,querySelectorAll:()=>buttons};
 vm.runInNewContext(source,{window,document,URL});
 return {buttons,destination:()=>destination,opened:()=>opened};
}
test('checkout stays available after an old stored deadline expires',()=>{
 const ctx=setup('https://pay.kiwify.com.br/rBDUk0v');
 ctx.buttons.forEach(button=>{assert.notEqual(button.disabled,true);button.click();assert.equal(ctx.destination(),'https://pay.kiwify.com.br/rBDUk0v');});
});
test('missing or insecure checkout shows the fallback dialog',()=>{
 for(const url of [undefined,'http://example.com']){const ctx=setup(url);ctx.buttons[0].click();assert.equal(ctx.opened(),true);assert.equal(ctx.destination(),null);}
});
test('page contains no offer deadline or countdown script',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.doesNotMatch(html,/Sua oferta termina|countdown\.js|01:20:00/);
 assert.match(html,/Coleção completa por <strong>R\$ 27,90/);
});

