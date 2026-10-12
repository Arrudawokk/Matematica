const ageGalleries = [[{"src": "assets/galeria-1-1.webp", "page": 1, "label": "Capa do caderno"}, {"src": "assets/galeria-1-2.webp", "page": 5, "label": "Atividade — página 5"}, {"src": "assets/galeria-1-3.webp", "page": 9, "label": "Atividade — página 9"}, {"src": "assets/galeria-1-4.webp", "page": 14, "label": "Atividade — página 14"}, {"src": "assets/galeria-1-5.webp", "page": 22, "label": "Atividade — página 22"}], [{"src": "assets/galeria-2-1.webp", "page": 1, "label": "Capa do caderno"}, {"src": "assets/galeria-2-2.webp", "page": 5, "label": "Atividade — página 5"}, {"src": "assets/galeria-2-3.webp", "page": 9, "label": "Atividade — página 9"}, {"src": "assets/galeria-2-4.webp", "page": 14, "label": "Atividade — página 14"}, {"src": "assets/galeria-2-5.webp", "page": 22, "label": "Atividade — página 22"}], [{"src": "assets/galeria-3-1.webp", "page": 1, "label": "Capa do caderno"}, {"src": "assets/galeria-3-2.webp", "page": 5, "label": "Atividade — página 5"}, {"src": "assets/galeria-3-3.webp", "page": 9, "label": "Atividade — página 9"}, {"src": "assets/galeria-3-4.webp", "page": 14, "label": "Atividade — página 14"}, {"src": "assets/galeria-3-5.webp", "page": 22, "label": "Atividade — página 22"}], [{"src": "assets/galeria-4-1.webp", "page": 1, "label": "Capa do caderno"}, {"src": "assets/galeria-4-2.webp", "page": 5, "label": "Atividade — página 5"}, {"src": "assets/galeria-4-3.webp", "page": 9, "label": "Atividade — página 9"}, {"src": "assets/galeria-4-4.webp", "page": 14, "label": "Atividade — página 14"}, {"src": "assets/galeria-4-5.webp", "page": 22, "label": "Atividade — página 22"}], [{"src": "assets/galeria-5-1.webp", "page": 1, "label": "Capa do caderno"}, {"src": "assets/galeria-5-2.webp", "page": 5, "label": "Atividade — página 5"}, {"src": "assets/galeria-5-3.webp", "page": 9, "label": "Atividade — página 9"}, {"src": "assets/galeria-5-4.webp", "page": 14, "label": "Atividade — página 14"}, {"src": "assets/galeria-5-5.webp", "page": 22, "label": "Atividade — página 22"}]];
const ages = [
 {age:'3 a 4 anos',name:'Pequenos Exploradores',description:'As primeiras descobertas começam com um gesto, um desenho e muita curiosidade. O adulto lê e a criança pode apontar, falar ou desenhar.',topics:['Contagem e comparação de quantidades','Formas, sequências e traçados','Noções de espaço e posição']},
 {age:'5 a 6 anos',name:'Guardiões das Conchas',description:'Números, formas e primeiras contas entram na aventura. Propostas para explorar relações e praticar novas combinações.',topics:['Números e primeiras operações','Agrupamentos e medidas','Formas e simetria']},
 {age:'7 a 8 anos',name:'Construtores de Pontes',description:'A matemática encontra situações do dia a dia. Contas, desenhos e palavras ajudam a mostrar o caminho até a resposta.',topics:['Operações e resolução de problemas','Dinheiro, relógios e calendário','Frações, medidas e gráficos']},
 {age:'9 a 10 anos',name:'Navegadores dos Números',description:'Uma expedição por frações, decimais e estratégias. A criança pratica cálculos e explora diferentes maneiras de pensar.',topics:['Frações, decimais e porcentagens','Medidas, área e perímetro','Interpretação de dados']},
 {age:'11 a 12 anos',name:'Mestres dos Enigmas',description:'Novos desafios conectam números, proporções e investigação. Espaço para calcular, organizar informações e explicar estratégias.',topics:['Inteiros, frações e proporções','Equações e geometria','Estatística e planejamento']}
];
let currentAge = 0;
const tabs = [...document.querySelectorAll('[data-age]')];
function selectAge(index, focus=false) {
 currentAge=index; const item=ages[index];
 tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
 document.querySelector('#age-panel').setAttribute('aria-labelledby',`age-${index}`);
 document.querySelector('#age-kicker').textContent=`CADERNO 0${index+1} · ${item.age.toUpperCase()}`;
 document.querySelector('#age-title').textContent=item.name;
 document.querySelector('#age-description').textContent=item.description;
 renderGallery(index);
 document.querySelector('#age-topics').replaceChildren(...item.topics.map(topic=>{const li=document.createElement('li');li.textContent=topic;return li;}));
 if(focus) tabs[index].focus();
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectAge(i));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%5;if(event.key==='ArrowLeft')next=(i+4)%5;if(event.key==='Home')next=0;if(event.key==='End')next=4;if(next!==undefined){event.preventDefault();selectAge(next,true);}});});
const sampleDialog=document.querySelector('#sample-dialog');
function showSample(n){document.querySelector('#sample-image').src=`assets/amostra-${n}.webp`;document.querySelector('#sample-image').alt=`Atividade real do caderno ${ages[n-1].age}, ${ages[n-1].name}`;sampleDialog.showModal();}
document.querySelectorAll('[data-sample]').forEach(button=>button.addEventListener('click',()=>showSample(Number(button.dataset.sample))));
document.querySelector('#age-preview').addEventListener('click',()=>showSample(currentAge+1));

function openGalleryImage(index) {
 const entry=ageGalleries[currentAge][index];
 const image=document.querySelector('#sample-image');
 image.src=entry.src;image.alt=`${entry.label}, ${ages[currentAge].age}`;
 sampleDialog.showModal();
}
function renderGallery(ageIndex) {
 const gallery=document.querySelector('#age-gallery');
 gallery.setAttribute('aria-label',`Cinco imagens do caderno de ${ages[ageIndex].age}`);
 gallery.replaceChildren(...ageGalleries[ageIndex].map((entry,index)=>{
  const button=document.createElement('button');button.type='button';button.className='gallery-item';button.dataset.gallery=String(index);
  button.setAttribute('aria-label',`Ampliar ${entry.label.toLowerCase()}, ${ages[ageIndex].age}`);
  const image=document.createElement('img');image.src=entry.src;image.alt=`${entry.label}, ${ages[ageIndex].age}`;image.width=893;image.height=1263;image.loading='lazy';
  const label=document.createElement('span');label.textContent=entry.label;
  button.append(image,label);return button;
 }));
}
document.querySelector('#age-gallery').addEventListener('click',event=>{
 const button=event.target.closest('[data-gallery]');
 if(button)openGalleryImage(Number(button.dataset.gallery));
});

document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});});
const purchaseDialog=document.querySelector('#purchase-dialog');
let checkout=null;
try{const url=new URL(window.MISSAO_CONFIG?.checkoutUrl);if(url.protocol==='https:')checkout=url.href;}catch{}
if(checkout){document.querySelector('#sales-status').textContent='Sim. Use o botão de compra para consultar as condições e concluir seu pedido na página de pagamento. A coleção custa R$ 27,90, em pagamento único.';}
function closeExpiredOffer() {
 if (!window.MISSAO_OFFER?.isExpired()) return;
 document.querySelectorAll('[data-buy]').forEach(button=>{button.disabled=true;button.textContent='Oferta encerrada';});
 document.querySelector('#sales-status').textContent='O prazo de 1h20 desta oferta terminou neste navegador. A compra por esta oferta está encerrada.';
 document.querySelector('.price-note').textContent='Prazo desta oferta encerrado';
 document.querySelectorAll('.hero .under-cta,.mobile-offer-price em').forEach(el=>{el.textContent='Prazo desta oferta encerrado';});
 const stickyButton=document.querySelector('.mobile-offer-cta');
 if(stickyButton)stickyButton.textContent='Ver coleção';
 if(purchaseDialog.open)purchaseDialog.close();
}
window.addEventListener('missao:offer-expired',closeExpiredOffer);
closeExpiredOffer();
document.querySelectorAll('[data-buy]').forEach(button=>button.addEventListener('click',()=>{if(window.MISSAO_OFFER?.isExpired()){closeExpiredOffer();return;}if(checkout){window.location.assign(checkout);}else{purchaseDialog.showModal();}}));
document.querySelector('#explore-samples').addEventListener('click',()=>{purchaseDialog.close();document.querySelector('#por-dentro').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('[data-sample]').focus({preventScroll:true});});
document.querySelector('#year').textContent=new Date().getFullYear();
