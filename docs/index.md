<html lang="en">
<head>
<meta charset="utf-8" />
<title>Uma Builder — Card Picker</title>
<style>
  :root{--card-width:100%;--img-h:110px}
  body{font-family:Arial,Helvetica,sans-serif;margin:20px;background:#fff;color:#111}
  .container{max-width:1280px;margin:0 auto;display:flex;gap:20px;align-items:flex-start}
  /* Sidebar */
  .sidebar{flex:0 0 165px;display:flex;flex-direction:column;gap:12px} /* reduced from 220px (25% less) */
  .filter-group{display:flex;flex-direction:column}
  .filter-group label{font-weight:700;margin-bottom:6px}
  select{padding:6px;border-radius:6px;border:1px solid #ccc;background:#fff}
  /* Main area */
  .main-content{flex:1;min-width:0}
  .slots-header{display:flex;justify-content:flex-end;margin-bottom:8px}
  .clear-all{background:#444;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer}
  /* Slots grid */
  .slots{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:18px}
  .slot{width:100%;min-height:150px;border:2px dashed #ccc;background:#fafafa;padding:6px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;cursor:pointer;position:relative}
  .slot.has-card{border-color:#9aa; background:#fff}
  .slot .type-icon{position:absolute;top:6px;right:6px;width:30px;height:30px;border:1px solid #ccc;background:#fff;border-radius:4px;overflow:hidden}
  /* Card grid */
  .cards{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:6px}
  .card{width:100%;border:1px solid #ddd;padding:8px;box-sizing:border-box;background:#fff;position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer}
  .card .type-icon{position:absolute;top:6px;right:6px;width:30px;height:30px;border:1px solid #ccc;background:#fff;border-radius:4px;overflow:hidden}
  .card img, .slot img{width:100%;height:var(--img-h);object-fit:contain;display:block}
  .name{margin:8px 0 6px 0;font-weight:600;text-align:center;word-break:break-word;white-space:normal}
  .skills{width:100%;display:flex;flex-direction:column;gap:4px}
  .skill{background:#eef2ff;border-radius:6px;padding:4px 6px;font-size:12px;box-sizing:border-box;word-break:break-word;white-space:normal}
  .card.disabled{opacity:0.45;pointer-events:none}
  @media (max-width:900px){:root{--img-h:90px}}
  @media (max-width:640px){.container{flex-direction:column}.sidebar{width:100%;flex-direction:row;flex-wrap:wrap}.sidebar .filter-group{flex:1;min-width:150px}}
</style>
</head>
<body>
  <h1>Uma Builder</h1>

  <div class="container">
    <!-- Sidebar filters -->
    <div class="sidebar">
      <div class="filter-group">
        <label for="racecourse">Racecourse</label>
        <select id="racecourse">
          <option value="">-- Select --</option>
          <option>Sapporo</option><option>Hakodate</option><option>Niigata</option><option>Fukushima</option>
          <option>Nakayama</option><option>Tokyo</option><option>Chukyo</option><option>Kyoto</option>
          <option>Hanshin</option><option>Kokura</option><option>Oi</option><option>Kawasaki</option>
          <option>Funabashi</option><option>Morioka</option><option>Longchamp</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="length">Length</label>
        <select id="length">
          <option value="">-- Select --</option>
          <option>1000m</option><option>1150m</option><option>1200m</option><option>1300m</option>
          <option>1400m</option><option>1500m</option><option>1600m</option><option>1700m</option>
          <option>1800m</option><option>1900m</option><option>2000m</option><option>2100m</option>
          <option>2200m</option><option>2300m</option><option>2400m</option><option>2500m</option>
          <option>2600m</option><option>3000m</option><option>3200m</option><option>3400m</option>
          <option>3600m</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="lengthType">Length Type</label>
        <select id="lengthType">
          <option value="">-- Select --</option>
          <option>Sprint</option><option>Mile</option><option>Medium</option><option>Long</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="direction">Direction</label>
        <select id="direction">
          <option value="">-- Select --</option>
          <option>Clockwise</option><option>Counterclockwise</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="track">Track Conditions</label>
        <select id="track">
          <option value="">-- Select --</option>
          <option>Firm</option><option>Good</option><option>Soft</option><option>Heavy</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="season">Season</label>
        <select id="season">
          <option value="">-- Select --</option>
          <option>Spring</option><option>Summer</option><option>Fall</option><option>Winter</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="weather">Weather</label>
        <select id="weather">
          <option value="">-- Select --</option>
          <option>Sunny</option><option>Cloudy</option><option>Rainy</option><option>Snowy</option>
        </select>
      </div>
    </div>

    <!-- Main content -->
    <div class="main-content">
      <div class="slots-header">
        <button class="clear-all" id="clearAllBtn">Clear All</button>
      </div>

      <div class="slots" id="slots">
        <div class="slot" data-slot="0"></div>
        <div class="slot" data-slot="1"></div>
        <div class="slot" data-slot="2"></div>
        <div class="slot" data-slot="3"></div>
        <div class="slot" data-slot="4"></div>
        <div class="slot" data-slot="5"></div>
      </div>

      <div class="cards" id="cardsContainer"></div>
    </div>
  </div>

<script>
/* --- Data: 10 placeholder cards (IDs 10001..10010) --- */
const cardsData = Array.from({length:10}, (_, i) => {
  const id = 10001 + i;
  const typeNum = String(Math.floor(Math.random()*6)).padStart(2,"0"); // 00..05
  return {
    id,
    name: `Card ${id}`,
    image: `https://gametora.com/images/umamusume/supports/support_card_s_${id}.png`,
    skills: [
      i % 5 === 0 ? "Sapporo" : (i % 5 === 1 ? "Hakodate" : (i % 5 === 2 ? "Niigata" : (i % 5 === 3 ? "Fukushima" : "Tokyo"))),
      (i%3===0?"1000m": (i%3===1?"1200m":"1500m")),
      (i%4===0?"Sprint":"Medium"),
      (i%2===0?"Clockwise":"Counterclockwise"),
      (i%3===0?"Firm":"Soft"),
      (i%4===0?"Spring":"Summer")
    ],
    typeNum,
    typeImage: `https://gametora.com/images/umamusume/icons/utx_ico_obtain_${typeNum}.png`
  };
});

const slots = Array.from(document.querySelectorAll('.slot'));
const cardsContainer = document.getElementById('cardsContainer');
const clearAllBtn = document.getElementById('clearAllBtn');
const slotListeners = new Map();

function renderCards(){
  cardsContainer.innerHTML = '';
  cardsData.forEach(card=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.id = card.id;
    el.innerHTML = `
      <div class="type-icon"><img src="${card.typeImage}" alt="type"></div>
      <img src="${card.image}" alt="${card.name}">
      <div class="name">${escapeHtml(card.name)}</div>
      <div class="skills">${card.skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>
    `;
    el.addEventListener('click', ()=> addToSlot(card));
    cardsContainer.appendChild(el);
  });
}

function escapeHtml(s){
  return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

function addToSlot(card){
  const freeSlot = slots.find(s=>!s.classList.contains('has-card'));
  if(!freeSlot) return;
  if(slotListeners.has(freeSlot)){
    freeSlot.removeEventListener('click', slotListeners.get(freeSlot));
    slotListeners.delete(freeSlot);
  }
  freeSlot.classList.add('has-card');
  freeSlot.innerHTML = `
    <div class="type-icon"><img src="${card.typeImage}" alt="type"></div>
    <img src="${card.image}" alt="${card.name}">
    <div class="name">${escapeHtml(card.name)}</div>
    <div class="skills">${card.skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>
  `;
  function removeSlotHandler(){ removeFromSlot(freeSlot, card.id); }
  freeSlot.addEventListener('click', removeSlotHandler);
  slotListeners.set(freeSlot, removeSlotHandler);
  document.querySelectorAll(`.card[data-id="${card.id}"]`).forEach(c=>c.classList.add('disabled'));
}

function removeFromSlot(slotEl, cardId){
  if(slotListeners.has(slotEl)){
    slotEl.removeEventListener('click', slotListeners.get(slotEl));
    slotListeners.delete(slotEl);
  }
  slotEl.classList.remove('has-card');
  slotEl.innerHTML = '';
  document.querySelectorAll(`.card[data-id="${cardId}"]`).forEach(c=>c.classList.remove('disabled'));
}

clearAllBtn.addEventListener('click', ()=>{
  document.querySelectorAll('.card.disabled').forEach(c=>c.classList.remove('disabled'));
  slots.forEach(slot=>{
    if(slotListeners.has(slot)){
      slot.removeEventListener('click', slotListeners.get(slot));
      slotListeners.delete(slot);
    }
    slot.classList.remove('has-card');
    slot.innerHTML = '';
  });
});

renderCards();
</script>
</body>
</html>
