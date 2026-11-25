/* PASIR — Mejoras progresivas del catálogo y barra de compra móvil. */
(function(){
  function init(){
    // Imágenes fuera de la primera pantalla se cargan cuando se necesitan.
    document.querySelectorAll('.card img.thumb').forEach(function(img,index){
      img.decoding='async';
      if(index>2){img.loading='lazy';}else{img.loading='eager';}
    });
    const overlay=document.getElementById('detailOverlay');
    const price=document.getElementById('detailPrice');
    const originalBuy=document.getElementById('detailBuy');
    const sheet=overlay&&overlay.querySelector('.detail-sheet');
    if(!overlay||!price||!originalBuy||!sheet)return;
    const bar=document.createElement('div');
    bar.className='pasir-mobile-purchase';
    bar.setAttribute('role','group');
    bar.setAttribute('aria-label','Comprar producto');
    const priceWrap=document.createElement('div');
    priceWrap.className='pasir-purchase-price';
    const label=document.createElement('small');
    label.textContent='Precio actual';
    const amount=document.createElement('strong');
    amount.textContent='Ver precio';
    priceWrap.append(label,amount);
    const button=document.createElement('button');
    button.type='button';
    button.textContent='Comprar ahora';
    button.addEventListener('click',function(){originalBuy.click();});
    bar.append(priceWrap,button);
    sheet.appendChild(bar);
    function sync(){
      const opened=overlay.classList.contains('open')&&overlay.getAttribute('aria-hidden')==='false';
      const allowed=!originalBuy.hidden;
      bar.hidden=!opened||!allowed;
      const isSimu=overlay.classList.contains('simuplc-mode');
      const now=price.querySelector('.now');
      amount.textContent=isSimu?'Planes PRO':(now&&now.textContent.trim())||'Consultar precio';
      label.textContent=isSimu?'Licencias SimuPLC':'Precio actual';
      button.textContent=isSimu?'Elegir licencia':'Comprar ahora';
    }
    new MutationObserver(sync).observe(price,{subtree:true,childList:true,characterData:true});
    new MutationObserver(sync).observe(overlay,{attributes:true,attributeFilter:['class','aria-hidden']});
    new MutationObserver(sync).observe(originalBuy,{attributes:true,attributeFilter:['hidden','href']});
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
