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

.slot .name, .card .name {
  margin: 8px 0 6px 0;
  font-weight: 700;
  text-align: center;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slot .skills, .card .skills {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.slot .skills-group, .card .skills-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.slot .skill, .card .skill {
  width: 100%;
  background: #eef2ff;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 10px;
  word-break: break-word;
  white-space: normal;
  text-align: center;
}

.cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-top: 6px; margin-bottom: 12px; }
.card { border: 1px solid #ddd; padding: 8px; box-sizing: border-box; background: #fff; display: flex; flex-direction: column; align-items: center; cursor: pointer; width: var(--card-w); position: relative; }
.card img { width: 100%; height: auto; }

.card .type-icon, .slot .type-icon { position: absolute; top: 6px; right: 6px; width: 30px; height: 30px; border: 1px solid #ccc; background: #fff; border-radius: 4px; overflow: hidden; text-align:center; font-size:10px; line-height:28px; font-weight:bold;}
.card.disabled { opacity: 0.45; pointer-events: auto; } /* still clickable for toggle */

.skills-header {
  font-weight: bold;
  font-size: 10px;
  color: #444;
  margin-bottom: 2px;
  text-align: center;
}

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
        <option value="1000">1000m</option>
        <option value="1150">1150m</option>
        <option value="1200">1200m</option>
        <option value="1300">1300m</option>
        <option value="1400">1400m</option>
        <option value="1500">1500m</option>
        <option value="1600">1600m</option>
        <option value="1700">1700m</option>
        <option value="1800">1800m</option>
        <option value="1900">1900m</option>
        <option value="2000">2000m</option>
        <option value="2100">2100m</option>
        <option value="2200">2200m</option>
        <option value="2300">2300m</option>
        <option value="2400">2400m</option>
        <option value="2500">2500m</option>
        <option value="2600">2600m</option>
        <option value="3000">3000m</option>
        <option value="3200">3200m</option>
        <option value="3400">3400m</option>
        <option value="3600">3600m</option>
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
const typeMap = { "Speed":"00", "Stamina":"01", "Power":"02", "Guts":"03", "Intelligence":"04", "Support":"05", "Group":"06" };
const sectionPages = new Map();

const categories = [
  {id:'racecourse', title:'Racecourse', prop:'racecourse'},
  {id:'length', title:'Length', prop:'length'},
  {id:'direction', title:'Direction', prop:'direction'},
  {id:'track', title:'Track Conditions', prop:'track'},
  {id:'season', title:'Season', prop:'season'},
  {id:'weather', title:'Weather', prop:'weather'}
];

// --- Load cards ---
Promise.all([
  fetch("supportcards_SSR.json").then(r=>r.json()),
  fetch("supportcards_SR.json").then(r=>r.json()),
  fetch("supportcards_R.json").then(r=>r.json())
]).then(([ssr, sr, r])=>{
  cardsData = [...ssr, ...sr, ...r].map(card=>({
    ...card,
    image: `https://gametora.com/images/umamusume/supports/support_card_s_${card.id}.png`,
    typeImage: `https://gametora.com/images/umamusume/icons/utx_ico_obtain_${typeMap[card.type] || "xx"}.png`
  }));
  renderSections();
});

// --- Card element ---
function createCardElement(card){
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.id = card.id;
  el.dataset.name = card.name;

  let skillsHTML = '';
  if(card.support_hints?.length) skillsHTML += `<div class="skills-group"><div class="skills-header">Support Hints</div>${card.support_hints.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>`;
  if(card.event_skills?.length) skillsHTML += `<div class="skills-group"><div class="skills-header">Event Skills</div>${card.event_skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>`;

  el.innerHTML = `
    <div class="type-icon"><img src="${card.typeImage}" alt="${card.type}"></div>
    <img src="${card.image}" alt="${escapeHtml(card.name)}">
    <div class="name">${escapeHtml(card.name)}</div>
    <div class="skills">${skillsHTML}</div>
  `;

  // Toggle behavior: add/remove from slot
  el.addEventListener('click', ()=>{
    if(selectedCardIds.has(card.id)){
      // Find slot with this exact card
      const slot = slots.find(s => Number(s.dataset.cardId) === card.id);
      if(slot) removeFromSlot(slot, card);
    } else addToSlot(card);
  });

  // Initially disable if in slot
  if(selectedCardIds.has(card.id)) el.classList.add('disabled');
  return el;
}

// --- Add to slot ---
function addToSlot(card){
  const freeSlot = slots.find(s => !s.dataset.cardId);
  if(!freeSlot) return;

  if(slotListeners.has(freeSlot)){
    freeSlot.removeEventListener('click', slotListeners.get(freeSlot));
    slotListeners.delete(freeSlot);
  }

  let skillsHTML = '';
  if(card.support_hints?.length) skillsHTML += `<div class="skills-group"><div class="skills-header">Support Hints</div>${card.support_hints.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>`;
  if(card.event_skills?.length) skillsHTML += `<div class="skills-group"><div class="skills-header">Event Skills</div>${card.event_skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>`;

  freeSlot.dataset.cardId = card.id;
  freeSlot.classList.add('has-card');
  freeSlot.innerHTML = `
    <div class="type-icon"><img src="${card.typeImage}" alt="${card.type}"></div>
    <img src="${card.image}" alt="${escapeHtml(card.name)}">
    <div class="name">${escapeHtml(card.name)}</div>
    <div class="skills">${skillsHTML}</div>
  `;

  function slotClickHandler(){ removeFromSlot(freeSlot, card); }
  freeSlot.addEventListener('click', slotClickHandler);
  slotListeners.set(freeSlot, slotClickHandler);

  selectedCardIds.add(card.id);
  renderSections();
}

// --- Remove from slot ---
function removeFromSlot(slotEl, card){
  if(slotListeners.has(slotEl)){
    slotEl.removeEventListener('click', slotListeners.get(slotEl));
    slotListeners.delete(slotEl);
  }
  slotEl.classList.remove('has-card');
  delete slotEl.dataset.cardId;
  slotEl.innerHTML = '';
  selectedCardIds.delete(Number(card.id));
  renderSections();
}

// --- Render Sections & Filters ---
function renderSections(){
  cardSections.innerHTML = '';
  sectionPages.clear();
  let any = false;
  function normalizeText(s){ return s.replace(/[◎○]/g,'').trim().toLowerCase(); }

  categories.forEach(cat=>{
    const val = (document.getElementById(cat.id) || {value:''}).value;
    if(!val) return;
    any = true;

    const section = document.createElement('div');
    section.className = 'card-section';
    const header = document.createElement('h2');
    header.textContent = cat.title + ': ' + val;
    section.appendChild(header);

    const rowContainer = document.createElement('div');
    rowContainer.style.position='relative';
    rowContainer.style.marginBottom='30px';

    const rowHeader = document.createElement('div');
    rowHeader.style.fontWeight='bold'; rowHeader.style.marginBottom='6px';

    if(cat.id === 'racecourse' && val) rowHeader.textContent = val + ' Racecourse';
    else if(cat.id === 'direction' && val) rowHeader.textContent = val + ' Direction';
    else if(cat.id === 'track' && val) rowHeader.textContent = val + ' Track Conditions';
    else if(cat.id === 'season' && val) rowHeader.textContent = val + ' Season';
    else if(cat.id === 'weather' && val) rowHeader.textContent = val + ' Weather';
    else rowHeader.textContent = cat.title;

    rowContainer.appendChild(rowHeader);

    const grid = document.createElement('div'); grid.className='cards';
    rowContainer.appendChild(grid);

    // --- Filter Matches ---
    let matches = [];
    const filterTerm = val.toLowerCase();
    matches = cardsData.filter(card=>{
      switch(cat.id){
        case 'racecourse':
          return (card.support_hints||[]).some(h=>h.toLowerCase().includes(filterTerm)) || 
                 (card.event_skills||[]).some(e=>e.toLowerCase().includes(filterTerm));
        case 'length':
          const dist = parseInt(val);
          let catLabel = dist<=1400?'Sprint':dist<=1800?'Mile':dist<=2400?'Medium':'Long';
          return (card.support_hints||[]).some(h=>normalizeText(h).includes(catLabel.toLowerCase())) ||
                 (card.event_skills||[]).some(e=>normalizeText(e).includes(catLabel.toLowerCase()));
        case 'direction':
          const dirVal = val==='Clockwise'?'Right-Handed':'Left-Handed';
          return (card.support_hints||[]).some(h=>normalizeText(h).includes(dirVal.toLowerCase())) ||
                 (card.event_skills||[]).some(e=>normalizeText(e).includes(dirVal.toLowerCase()));
        default:
          return (card.support_hints||[]).some(h=>normalizeText(h).includes(filterTerm)) ||
                 (card.event_skills||[]).some(e=>normalizeText(e).includes(filterTerm));
      }
    });

    if(matches.length===0){ grid.innerHTML='(No matching cards)'; section.appendChild(rowContainer); return; }

    matches.forEach(c=>grid.appendChild(createCardElement(c)));
    section.appendChild(rowContainer);
  });

  if(!any){
    const msg=document.createElement('div');
    msg.style.opacity='0.7';
    msg.style.marginTop='8px';
    msg.textContent='Select options from the left to show matching card sections.';
    cardSections.appendChild(msg);
  }
}

// --- Clear buttons ---
clearAllBtn.addEventListener('click', ()=>{
  selectedCardIds.clear();
  slots.forEach(slot=>{
    if(slotListeners.has(slot)){
      slot.removeEventListener('click', slotListeners.get(slot));
      slotListeners.delete(slot);
    }
    slot.classList.remove('has-card');
    delete slot.dataset.cardId;
    slot.innerHTML='';
  });
  renderSections();
});

clearFiltersBtn.addEventListener('click', ()=>{
  categories.forEach(cat=>{
    const sel=document.getElementById(cat.id);
    if(sel){
      sel.value='';
      localStorage.removeItem('filter_'+cat.id);
    }
  });
  renderSections();
});

function setupFilterPersistence(){
  categories.forEach(cat=>{
    const sel=document.getElementById(cat.id);
    if(!sel) return;
    const saved = localStorage.getItem('filter_'+cat.id);
    if(saved) sel.value=saved;
    sel.addEventListener('change', ()=>{
      localStorage.setItem('filter_'+cat.id, sel.value);
      renderSections();
    });
  });
}

function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
setupFilterPersistence();
</script>

</body>
</html>
