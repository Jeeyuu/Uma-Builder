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
.slot .name { margin: 8px 0 6px 0; font-weight: 400; text-align: center; word-break: break-word; }

.slot .skills, .card .skills {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;  /* gap between each skill */
}

.slot .skills-group, .card .skills-group {
  display: flex;
  flex-direction: column;
  align-items: center; /* centers skill boxes */
  gap: 6px;
}

.slot .skill, .card .skill {
  width: 100%;      /* full width skill box */
  background: #eef2ff;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 10px;
  word-break: break-word;
  white-space: normal;
  text-align: center; /* center text inside skill box */
}

.cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-top: 6px; margin-bottom: 12px; }
.card { border: 1px solid #ddd; padding: 8px; box-sizing: border-box; background: #fff; display: flex; flex-direction: column; align-items: center; cursor: pointer; width: var(--card-w); position: relative; }
.card img { width: 100%; height: auto; }
.card .name { margin: 8px 0 6px 0; font-weight: 600; text-align: center; word-break: break-word; }

.card .type-icon, .slot .type-icon { position: absolute; top: 6px; right: 6px; width: 30px; height: 30px; border: 1px solid #ccc; background: #fff; border-radius: 4px; overflow: hidden; text-align:center; font-size:10px; line-height:28px; font-weight:bold;}
.card.disabled { opacity: 0.45; pointer-events: none; }
.skills-header {
  font-weight: bold;
  font-size: 10px;
  color: #444;
  margin-bottom: 2px;
  text-align: center; /* center Support Hints / Event Skills text */
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

const categories = [
  {id:'racecourse', title:'Racecourse', prop:'racecourse'},
  {id:'length', title:'Length', prop:'length'},
  {id:'direction', title:'Direction', prop:'direction'},
  {id:'track', title:'Track Conditions', prop:'track'},
  {id:'season', title:'Season', prop:'season'},
  {id:'weather', title:'Weather', prop:'weather'}
];

const slotListeners = new Map();

// type → icon code map
const typeMap = {
  "Speed":"00",
  "Stamina":"01",
  "Power":"02",
  "Guts":"03",
  "Wit":"04",
  "Support":"05",
  "Group":"06"
};

// load all jsons (SSR first, then SR, then R)
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

// create card element
function createCardElement(card){
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.id = card.id;
  el.dataset.name = card.name;

  el.innerHTML = `
    <div class="type-icon"><img src="${card.typeImage}" alt="${card.type}"></div>
    <img src="${card.image}" alt="${escapeHtml(card.name)}">
    <div class="name">${escapeHtml(card.name)}</div>
    <div class="skills">
      <div class="skills-group">
        <div class="skills-header">Support Hints</div>
        ${(card.support_hints||[]).map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}
      </div>
      <div class="skills-group">
        <div class="skills-header">Event Skills</div>
        ${(card.event_skills||[]).map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}
      </div>
    </div>
  `;

  el.addEventListener('click', ()=> addToSlot(card));

  if(selectedCardIds.has(card.id) || isNameBlocked(card.name)){
    el.classList.add('disabled');
  }

  return el;
}

// check if card with same name already chosen
function isNameBlocked(name){
  for(const id of selectedCardIds){
    const chosen = cardsData.find(c=>c.id===id);
    if(chosen && chosen.name===name) return true;
  }
  return false;
}

function renderSections(){
  cardSections.innerHTML = '';
  let any = false;

  categories.forEach(cat=>{
    let val = (document.getElementById(cat.id) || {value: ''}).value;
    if(!val) return;

    let searchTerms = [];

    switch(cat.id){
      case 'racecourse':
        searchTerms.push(val + ' Racecourse');
        break;
      case 'length':
        if(val==='Sprint') searchTerms.push('Sprint Corners','Sprint Straightaways');
        if(val==='Mile') searchTerms.push('Mile Corners','Mile Straightaways');
        if(val==='Medium') searchTerms.push('Medium Corners','Medium Straightaways');
        if(val==='Long') searchTerms.push('Long Corners','Long Straightaways');
        break;
      case 'direction':
        searchTerms.push(val === 'Clockwise' ? 'Right-Handed' : 'Left-Handed');
        break;
      case 'track':
        if(val === 'Firm') searchTerms.push('Firm Conditions');
        else searchTerms.push('Wet Conditions');
        break;
      case 'season':
        searchTerms.push(val + ' Runner');
        break;
      case 'weather':
        searchTerms.push(val + ' Days');
        break;
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
        (card.support_hints || []).some(h => h.toLowerCase().includes(term.toLowerCase())) ||
        (card.event_skills || []).some(e => e.toLowerCase().includes(term.toLowerCase()))
      )
    );


    if(matches.length === 0){
      const noMsg = document.createElement('div');
      noMsg.style.opacity = '0.6';
      noMsg.textContent = '(No matching cards)';
      grid.appendChild(noMsg);
    } else {
      matches.forEach(card => grid.appendChild(createCardElement(card)));
    }

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
    <div class="type-icon"><img src="${card.typeImage}" alt="${card.type}"></div>
    <img src="${card.image}" alt="${escapeHtml(card.name)}">
    <div class="name">${escapeHtml(card.name)}</div>
    <div class="skills">
      <div class="skills-group">
        <div class="skills-header">Support Hints</div>
        ${(card.support_hints||[]).map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}
      </div>
      <div class="skills-group">
        <div class="skills-header">Event Skills</div>
        ${(card.event_skills||[]).map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}
      </div>
    </div>
  `;

  function slotClickHandler(){ removeFromSlot(freeSlot, card); }
  freeSlot.addEventListener('click', slotClickHandler);
  slotListeners.set(freeSlot, slotClickHandler);

  selectedCardIds.add(card.id);
  renderSections();
}

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
  renderSections();
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

setupFilterPersistence();
</script>
</body>
</html>
