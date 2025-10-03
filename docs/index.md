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

/* Name styling: smaller and clamp 2 liness */
.slot .name, .card .name {
  margin: 8px 0 6px 0;
  font-weight: 700;
  text-align: center;
  font-size: 12px;
  white-space: nowrap;       /* single line */
  overflow: hidden;          /* hide overflow */
  text-overflow: ellipsis;   /* add ... if too long */
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
.card.disabled { opacity: 0.45; }

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

const categories = [
  {id:'racecourse', title:'Racecourse'},
  {id:'length', title:'Length'},
  {id:'direction', title:'Direction'},
  {id:'track', title:'Track Conditions'},
  {id:'season', title:'Season'},
  {id:'weather', title:'Weather'}
];

const slotListeners = new Map();
const typeMap = {
  "speed":"00",
  "stamina":"01",
  "power":"02",
  "guts":"03",
  "intelligence":"04",
  "support":"05",
  "group":"06"
};

// Pagination per section
const sectionPages = new Map();

// --- Fetch JSON ---
fetch("latest.json")
  .then(r => r.json())
  .then(data => {
    cardsData = data.map(card => ({
      id: card.char_id,
      name: card.char_name,
      type: card.type,
      hint_skills: card.hint_skills || [],
      event_skills: card.event_skills || [],
      obtained: card.obtained,
      rarity: card.rarity,
      release: card.release,
      release_en: card.release_en,
      image: `https://gametora.com/images/umamusume/supports/support_card_s_${card.char_id}.png`,
      typeImage: `https://gametora.com/images/umamusume/icons/utx_ico_obtain_${typeMap[card.type] || "xx"}.png`
    }));
    renderSections();
  });

// --- Card element ---
function createCardElement(card){
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.id = card.id;

  let skillsHTML = '';
  if(card.hint_skills.length) skillsHTML += `
    <div class="skills-group">
      <div class="skills-header">Support Hints</div>
      ${card.hint_skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}
    </div>`;
  if(card.event_skills.length) skillsHTML += `
    <div class="skills-group">
      <div class="skills-header">Event Skills</div>
      ${card.event_skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}
    </div>`;

  el.innerHTML = `
    <div class="type-icon"><img src="${card.typeImage}" alt="${card.type}"></div>
    <img src="${card.image}" alt="${escapeHtml(card.name)}">
    <div class="name">${escapeHtml(card.name)}</div>
    <div class="skills">${skillsHTML}</div>
  `;

  el.addEventListener('click', () => {
    const slot = slots.find(s => Number(s.dataset.cardId) === card.id);
    if(slot) removeFromSlot(slot, card);
    else addToSlot(card);
  });

  if(selectedCardIds.has(card.id)) el.classList.add('disabled');
  return el;
}

// --- Slots ---
function addToSlot(card){
  const freeSlot = slots.find(s=>!s.dataset.cardId);
  if(!freeSlot) return;

  if(slotListeners.has(freeSlot)){
    freeSlot.removeEventListener('click', slotListeners.get(freeSlot));
    slotListeners.delete(freeSlot);
  }

  let skillsHTML = '';
  if(card.hint_skills.length) skillsHTML += `<div class="skills-group"><div class="skills-header">Support Hints</div>${card.hint_skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>`;
  if(card.event_skills.length) skillsHTML += `<div class="skills-group"><div class="skills-header">Event Skills</div>${card.event_skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>`;

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
    const sel = document.getElementById(cat.id);
    if(sel) sel.value='';
  });
  renderSections();
});

function renderSections(){
  cardSections.innerHTML='';

  let anyFilterActive = false;
  categories.forEach(cat=>{
    const val = (document.getElementById(cat.id)?.value || '').trim();
    if(val) anyFilterActive = true;
  });

  // --- If no filters, show all cards in a single section ---
  if(!anyFilterActive){
    const section = document.createElement('div');
    section.className = 'card-section';
    const header = document.createElement('h2');
    header.textContent = 'All Cards';
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'cards';
    section.appendChild(grid);

    cardsData.forEach(card => grid.appendChild(createCardElement(card)));
    cardSections.appendChild(section);
    return;
  }

  // --- Filters are active ---
  categories.forEach((cat, catIndex)=>{
    const val = (document.getElementById(cat.id)?.value || '').trim();
    if(!val) return;

    const section = document.createElement('div');
    section.className='card-section';
    const header = document.createElement('h2');
    header.textContent = `${cat.title}: ${val}`;
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className='cards';
    section.appendChild(grid);

    // --- Filter matching cards ---
    const lowerVal = val.toLowerCase();
    const matches = cardsData.filter(card => 
      (card.hint_skills || []).some(h=>h.toLowerCase().includes(lowerVal)) ||
      (card.event_skills || []).some(e=>e.toLowerCase().includes(lowerVal))
    );

    if(matches.length===0){
      const noMsg = document.createElement('div');
      noMsg.style.opacity='0.6';
      noMsg.textContent='(No matching cards)';
      grid.appendChild(noMsg);
      cardSections.appendChild(section);
      return;
    }

    // --- Pagination ---
    const pageKey = cat.id+'-'+catIndex;
    const currentPage = sectionPages.get(pageKey) || 0;
    sectionPages.set(pageKey, currentPage);
    const totalPages = Math.ceil(matches.length/6);

    function renderPage(page){
      grid.innerHTML='';
      const start = page*6;
      const end = start+6;
      matches.slice(start,end).forEach(card=>grid.appendChild(createCardElement(card)));
      updateButtons(page);
    }

    // --- Pagination buttons ---
    const btnContainer = document.createElement('div');
    btnContainer.style.position='absolute';
    btnContainer.style.top='2px';
    btnContainer.style.right='0';
    btnContainer.style.display='flex';
    btnContainer.style.gap='5px';
    section.appendChild(btnContainer);

    const leftBtn = document.createElement('button');
    leftBtn.textContent='◀';
    const rightBtn = document.createElement('button');
    rightBtn.textContent='▶';
    [leftBtn,rightBtn].forEach(btn=>{
      btn.style.opacity='0.4';
      btn.style.pointerEvents='none';
      btn.style.border='none';
      btn.style.borderRadius='6px';
      btn.style.background='#444';
      btn.style.color='#fff';
    });
    btnContainer.appendChild(leftBtn);
    btnContainer.appendChild(rightBtn);

    function updateButtons(page){
      leftBtn.style.opacity = page>0?'1':'0.4';
      leftBtn.style.pointerEvents = page>0?'auto':'none';
      rightBtn.style.opacity = page<totalPages-1?'1':'0.4';
      rightBtn.style.pointerEvents = page<totalPages-1?'auto':'none';
    }

    leftBtn.addEventListener('click',()=>{
      let page = sectionPages.get(pageKey);
      if(page>0){
        page--;
        sectionPages.set(pageKey,page);
        renderPage(page);
      }
    });

    rightBtn.addEventListener('click',()=>{
      let page = sectionPages.get(pageKey);
      if(page<totalPages-1){
        page++;
        sectionPages.set(pageKey,page);
        renderPage(page);
      }
    });

    renderPage(currentPage);
    cardSections.appendChild(section);
  });
}

function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
</script>


</body>
</html>
