/* simple frontend that talks to /api/catalog and /api/orders
   - renders product grid on index.html
   - renders product details on product.html?id=###
   - maintains cart in localStorage
*/

const API_PREFIX = "/api";

function fetchJSON(path, opts) {
  return fetch(path, opts).then(r => {
    if (!r.ok) throw new Error(r.status + " " + r.statusText);
    return r.json();
  });
}

function getCart() {
  try { return JSON.parse(localStorage.getItem('innovatemart_cart')||'{"items":[]}'); }
  catch(e){ return {items:[]} }
}
function setCart(c){ localStorage.setItem('innovatemart_cart', JSON.stringify(c)); renderCartCount(); }

function addToCart(product, qty=1){
  const cart = getCart();
  const existing = cart.items.find(i=>i.id===product.id);
  if(existing) existing.quantity += qty;
  else cart.items.push({id: product.id, name: product.name, price: product.price, quantity: qty});
  setCart(cart);
  alert('Added to cart');
}

function renderCartCount(){
  const c = getCart();
  const count = c.items.reduce((s,i)=>s+i.quantity,0);
  const el = document.getElementById('cart-count');
  if(el) el.textContent = count;
}
document.addEventListener('DOMContentLoaded', renderCartCount);

async function renderProducts(items){
  const container = document.getElementById('products');
  if(!container) return;
  container.innerHTML = '';
  items.forEach(p => {
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <div class="product-image"><strong style="font-size:1.1rem">${escapeHtml(p.name)}</strong></div>
      <div><small>${escapeHtml(p.description||'')}</small></div>
      <div class="price">$${(p.price||0).toFixed(2)}</div>
      <div style="margin-top:8px">
        <a class="btn" href="/product.html?id=${encodeURIComponent(p.id)}">View</a>
        <button class="btn ghost" onclick='addToCart(${JSON.stringify(p).replace(/'/g,"&#39;")},1)'>Add</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function escapeHtml(text) {
  return (''+text).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

/* product page render */
async function renderProductDetail(id){
  try {
    const catalog = await fetchJSON(API_PREFIX + '/catalog');
    const item = (catalog.items||[]).find(x => `${x.id}` === `${id}`);
    const el = document.getElementById('product-card');
    if(!item){ el.innerHTML = '<div class="card">Product not found.</div>'; return; }
    el.innerHTML = `
      <div class="card">
        <div class="product-image"><h2>${escapeHtml(item.name)}</h2></div>
        <div><strong>Price:</strong> $${(item.price||0).toFixed(2)}</div>
        <p>${escapeHtml(item.description||'A great product.')}</p>
        <div style="margin-top:12px">
          <button class="btn" id="add-one">Add to cart</button>
          <a class="btn ghost" href="/">Back</a>
        </div>
      </div>
    `;
    document.getElementById('add-one').addEventListener('click', ()=>addToCart(item,1));
  } catch(e){
    document.getElementById('product-card').textContent = 'Error: ' + e;
  }
}

/* cart UI */
function showCartPanel() {
  const panel = document.getElementById('cart-panel');
  if(!panel) return;
  const cart = getCart();
  const el = document.getElementById('cart-items');
  if(!cart.items.length) el.innerHTML = '<div>Cart empty</div>';
  else el.innerHTML = '<ul>'+cart.items.map(i=>`<li>${escapeHtml(i.name)} x ${i.quantity} — $${(i.price*i.quantity).toFixed(2)}</li>`).join('')+'</ul>';
  panel.classList.remove('hidden');
}
function hideCartPanel(){ document.getElementById('cart-panel').classList.add('hidden'); }

async function checkout(){
  const cart = getCart();
  if(!cart.items.length){ alert('Cart is empty'); return; }
  try{
    const payload = { items: cart.items.map(i=>({ id: i.id, quantity: i.quantity })) };
    const r = await fetchJSON(API_PREFIX + '/orders', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    alert('Order created: ' + JSON.stringify(r));
    localStorage.removeItem('innovatemart_cart');
    renderCartCount();
    hideCartPanel();
  } catch(e){
    alert('Checkout failed: ' + e);
  }
}

/* wire up page */
document.addEventListener('DOMContentLoaded', async ()=>{
  // cart buttons
  const cb = document.getElementById('cart-btn');
  if(cb) cb.addEventListener('click', showCartPanel);
  const closeCart = document.getElementById('close-cart');
  if(closeCart) closeCart.addEventListener('click', hideCartPanel);
  const checkoutBtn = document.getElementById('checkout');
  if(checkoutBtn) checkoutBtn.addEventListener('click', checkout);

  // index catalog
  if(document.getElementById('products')) {
    try {
      const catalog = await fetchJSON(API_PREFIX + '/catalog');
      await renderProducts(catalog.items || []);
    } catch(e){
      document.getElementById('products').textContent = 'Failed to load catalog: ' + e;
    }
    return;
  }

  // product page
  if(document.getElementById('product-card')) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    await renderProductDetail(id);
  }
});
