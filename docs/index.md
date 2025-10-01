<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Uma Builder — Card Picker</title>
<style>
:root { --card-w: 118px; --gap: 10px; }
body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; width: 100%; background: #fff; color: #111; display: flex; justify-content: flex-start; }
.container { position: relative; transform: translateX(-100px); left: 0; top: 0; width: 100%; max-width: none; display: flex; gap: 20px; align-items: flex-start; }
.sidebar { flex-shrink: 0; width: 180px; display: flex; flex-direction: column; gap: 20px; }
.filter-group label { font-weight: 700; margin-bottom: 6px; display: block; }
select { padding: 6px; border-radius: 6px; border: 1px solid #ccc; background: #fff; width: 100%; }
.main-content { flex-grow: 1; display: flex; flex-direction: column; }
.slots-header { display: flex; justify-content: flex-end; margin-bottom: 8px; }
.clear-all { padding: 5px 10px; font-size: 14px; cursor: pointer; border: none; border-radius: 6px; background: #444; color: #fff; }
.slots { display: grid; grid-template-columns: repeat(6, var(--card-w)); gap: var(--gap); margin-bottom: 18px; }
.slot { border: 1px solid #ddd; padding: 8px; box-sizing: border-box; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; cursor: pointer; position: relative; width: var(--card-w); min-height: var(--card-w); }
.slot:not(.has-card) { border: 2px dashed #ccc; background: #fafafa; }
.slot img { width: 100%; height: auto; }
.slot .name { margin: 8px 0 6px 0; font-weight: 600; text-align: center; word-break: break-word; }
.slot .skills { width: 100%; display: flex; flex-direction: column; gap: 4px; }
.slot .skill { background: #eef2ff; border-radius: 6px; padding: 4px 6px; font-size: 12px; word-break: break-word; white-space: normal; }
.cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-top: 6px; margin-bottom: 12px; }
.card { border: 1px solid #ddd; padding: 8px; box-sizing: border-box; background: #fff; display: flex; flex-direction: column; align-items: center; cursor: pointer; width: var(--card-w); position: relative; }
.card img { width: 100%; height: auto; }
.card .name { margin: 8px 0 6px 0; font-weight: 600; text-align: center; word-break: break-word; }
.card .skills { width: 100%; display: flex; flex-direction: column; gap: 4px; }
.card .skill { background: #eef2ff; border-radius: 6px; padding: 4px 6px; font-size: 12px; word-break: break-word; white-space: normal; }
.card .type-icon, .slot .type-icon { position: absolute; top: 6px; right: 6px; width: 30px; height: 30px; border: 1px solid #ccc; background: #fff; border-radius: 4px; overflow: hidden; }
.card.disabled { opacity: 0.45; pointer-events: none; }
.skills-group { margin-bottom: 4px; }
.skills-header { font-weight: bold; font-size: 11px; color: #555; margin-bottom: 2px; }
@media (max-width: 1100px) { :root { --card-w: 100px; } }
</style>
</head>
<body>

<div class="container">
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
        <option value="Sprint">1000-1400m</option>
        <option value="Mile">1401-1800m</option>
        <option value="Medium">1801-2400m</option>
        <option value="Long">2401-3600m</option>
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

    <button id="clearFiltersBtn" class="clear-all" style="margin-top:auto;">Clear Filters</button>
  </div>

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

    <div class="card-sections" id="cardSections"></div>
  </div>
</div>

<script>
let cardsData = [];
const cardSections = document.getElementById('cardSections');
const slots = Array.from(document.querySelectorAll('.slot'));
const clearAllBtn = document.getElementById('clearAllBtn');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const selectedCardIds = new Set();
const slotListeners = new Map();

const categories = [
  {id:'racecourse', title:'Racecourse', prop:'racecourse'},
  {id:'length', title:'Length', prop:'length'},
  {id:'direction', title:'Direction', prop:'direction'},
  {id:'track', title:'Track Conditions', prop:'track'},
  {id:'season', title:'Season', prop:'season'},
  {id:'weather', title:'Weather', prop:'weather'}
];

function createSkillsHTML(card){
  return `
    <div class="skills">
      <div class="skills-group">
        <div class="skills-header">Support Hints</div>
        ${card.supportHints.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}
      </div>
      <div class="skills-group">
        <div class="skills-header">Event Skills</div>
        ${card.eventSkills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}
      </div>
    </div>`;
}

function createCardElement(card){
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.id = card.id;
  el.innerHTML = `
    <div class="type-icon"><img src="${card.typeImage}" alt="type"></div>
    <img src="${card.image}" alt="${card.name}">
    <div class="name">${escapeHtml(card.name)}</div>
    ${createSkillsHTML(card)}
  `;
  el.addEventListener('click', ()=> addToSlot(card));
  if(selectedCardIds.has(card.id)) el.classList.add('disabled');
  return el;
}

function renderSections(){
  cardSections.innerHTML = '';
  let any = false;

  categories.forEach(cat=>{
    let val = (document.getElementById(cat.id) || {value: ''}).value;
    if(!val) return;

    let searchTerms = [];

    switch(cat.id){
      case 'length':
        if(val === 'Sprint') searchTerms.push('1000m','1100m','1200m','1300m','1400m');
        if(val === 'Mile') searchTerms.push('1500m','1600m','1700m','1800m');
        if(val === 'Medium') searchTerms.push('1900m','2000m','2100m','2200m','2300m','2400m');
        if(val === 'Long') searchTerms.push('2500m','2600m','2800m','3000m','3200m','3400m','3600m');
        break;
      case 'direction':
        searchTerms.push(val === 'Clockwise' ? 'Right-Handed' : 'Left-Handed');
        break;
      case 'track':
        searchTerms.push(val === 'Firm' ? 'Firm Conditions' : 'Wet Conditions');
        break;
      case 'season':
        searchTerms.push(val + ' Runner');
        break;
      case 'weather':
        searchTerms.push(val + ' Days');
        break;
      default:
        searchTerms.push(val);
    }

    any = true;
    const section = document.createElement('div');
    section.className = 'card-section';
    const header = document.createElement('h2');
    header.textContent = `${cat.title}: ${val}`;
    section.appendChild(header);
    const grid = document.createElement('div');
    grid.className = 'cards';

    const matches = cardsData.filter(card =>
      searchTerms.some(term =>
        card.supportHints.includes(term) || card.eventSkills.includes(term)
      )
    );

    matches.forEach(card => grid.appendChild(createCardElement(card)));
    section.appendChild(grid);
    cardSections.appendChild(section);
  });

  if(!any){
    const msg = document.createElement('div');
    msg.style.opacity = '0.7';
    msg.style.marginTop = '8px';
    msg.textContent = 'Select options from the left to show matching card sections.';
    cardSections.appendChild(msg);
  }
}

function addToSlot(card){
  const freeSlot = slots.find(s => !s.dataset.cardId);
  if(!freeSlot) return;

  if(slotListeners.has(freeSlot)){
    freeSlot.removeEventListener('click', slotListeners.get(freeSlot));
    slotListeners.delete(freeSlot);
  }

  freeSlot.dataset.cardId = card.id;
  freeSlot.classList.add('has-card');
  freeSlot.innerHTML = `
    <div class="type-icon"><img src="${card.typeImage}" alt="type"></div>
    <img src="${card.image}" alt="${card.name}">
    <div class="name">${escapeHtml(card.name)}</div>
    ${createSkillsHTML(card)}
  `;

  function slotClickHandler(){ removeFromSlot(freeSlot, card.id); }
  freeSlot.addEventListener('click', slotClickHandler);
  slotListeners.set(freeSlot, slotClickHandler);

  selectedCardIds.add(card.id);
  document.querySelectorAll(`.card[data-id="${card.id}"]`).forEach(el => el.classList.add('disabled'));
}

function removeFromSlot(slotEl, cardId){
  if(slotListeners.has(slotEl)){
    slotEl.removeEventListener('click', slotListeners.get(slotEl));
    slotListeners.delete(slotEl);
  }
  slotEl.classList.remove('has-card');
  delete slotEl.dataset.cardId;
  slotEl.innerHTML = '';
  selectedCardIds.delete(Number(cardId));
  document.querySelectorAll(`.card[data-id="${cardId}"]`).forEach(el => el.classList.remove('disabled'));
}

clearAllBtn.addEventListener('click', ()=>{
  selectedCardIds.clear();
  slots.forEach(slot=>{
    if(slotListeners.has(slot)){
      slot.removeEventListener('click', slotListeners.get(slot));
      slotListeners.delete(slot);
    }
    slot.classList.remove('has-card');
    delete slot.dataset.cardId;
    slot.innerHTML = '';
  });
  document.querySelectorAll('.card').forEach(el => el.classList.remove('disabled'));
});

clearFiltersBtn.addEventListener('click', () => {
  categories.forEach(cat => {
    const sel = document.getElementById(cat.id);
    if(sel){
      sel.value = '';
      localStorage.removeItem('filter_'+cat.id);
    }
  });
  renderSections();
});

function setupFilterPersistence(){
  categories.forEach(cat=>{
    const sel = document.getElementById(cat.id);
    if(!sel) return;
    const saved = localStorage.getItem('filter_'+cat.id);
    if(saved) sel.value = saved;
    sel.addEventListener('change', ()=>{
      localStorage.setItem('filter_'+cat.id, sel.value);
      renderSections();
    });
  });
}

function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

// Load JSONs and build cardsData
Promise.all([
  fetch("cards.json").then(r=>r.json()),
  fetch("supportHints.json").then(r=>r.json()),
  fetch("eventSkills.json").then(r=>r.json())
]).then(([cards, hints, events])=>{
  cardsData = cards.map(card => ({
    ...card,
    supportHints: hints[card.id] || [],
    eventSkills: events[card.id] || []
  }));
  setupFilterPersistence();
  renderSections();
});
</script>

</body>
</html>
