<html lang="en">
<head>
<meta charset="utf-8" />
<title>Uma Builder — Card Picker</title>
<style>
:root {
  --card-w: 118px; /* fixed width for cards & slots */
  --gap: 10px;     /* unified gap */
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 20px;
  background: #fff;
  color: #111;
  display: flex;
  justify-content: center; /* centralize container */
}

.container {
  display: flex;
  gap: 20px;
  max-width: 1280px;
  width: 100%;
  align-items: flex-start;
}

.sidebar {
  flex-shrink: 0;
  width: 175px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Filters */
.filter-group label {
  font-weight: 700;
  margin-bottom: 6px;
  display: block;
}

select {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  width: 100%;
}

/* Main content */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Slots header */
.slots-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.clear-all {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background: #444;
  color: #fff;
}

/* Slots grid */
.slots {
  display: grid;
  grid-template-columns: repeat(6, var(--card-w));
  gap: var(--gap);
  margin-bottom: 18px;
}

.slot {
  border: 1px solid #ddd;
  padding: 8px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  position: relative;
  width: var(--card-w);
  min-height: var(--card-w); /* square empty slot */
}

.slot:not(.has-card) {
  border: 2px dashed #ccc;
  background: #fafafa;
}

.slot img {
  width: 100%;
  height: auto;
}

.slot .name {
  margin: 8px 0 6px 0;
  font-weight: 600;
  text-align: center;
  word-break: break-word;
}

.slot .skills {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slot .skill {
  background: #eef2ff;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 12px;
  word-break: break-word;
  white-space: normal;
}

/* Bottom cards grid */
.cards {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 cards per row */
  gap: 10px;          /* same gap as slots above */
  margin-top: 6px;    /* keep previous margin */
}

.card {
  border: 1px solid #ddd;
  padding: 8px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: var(--card-w);
  position: relative;
}

.card img {
  width: 100%;
  height: auto;
}

.card .name {
  margin: 8px 0 6px 0;
  font-weight: 600;
  text-align: center;
  word-break: break-word;
}

.card .skills {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card .skill {
  background: #eef2ff;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 12px;
  word-break: break-word;
  white-space: normal;
}

.card .type-icon,
.slot .type-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.card.disabled {
  opacity: 0.45;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 1100px) {
  :root { --card-w: 100px; }
}
</style>
</head>
<body>

<div class="container">
  <div class="sidebar">
    <!-- Filter groups (same as previous) -->
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
// Sample cards
const cardsData = Array.from({length:10}, (_, i) => {
  const id = 10001 + i;
  const raceArr = ["Sapporo","Hakodate","Niigata","Fukushima","Nakayama","Tokyo","Chukyo","Kyoto","Hanshin","Kokura"];
  const lenArr = ["1000m","1150m","1200m","1300m","1400m","1500m","1600m","1700m","1800m","1900m","2000m","2100m","2200m","2300m","2400m","2500m","2600m","3000m","3200m","3400m","3600m"];
  const lengthTypeArr = ["Sprint","Mile","Medium","Long"];
  const dirArr = ["Clockwise","Counterclockwise"];
  const trackArr = ["Firm","Good","Soft","Heavy"];
  const seasonArr = ["Spring","Summer","Fall","Winter"];
  const weatherArr = ["Sunny","Cloudy","Rainy","Snowy"];
  const race = raceArr[i % raceArr.length];
  const length = lenArr[i % lenArr.length];
  const lengthType = lengthTypeArr[i % lengthTypeArr.length];
  const direction = dirArr[i % dirArr.length];
  const track = trackArr[i % trackArr.length];
  const season = seasonArr[i % seasonArr.length];
  const weather = weatherArr[i % weatherArr.length];
  return {
    id, name: `Card ${id}`,
    image: `https://gametora.com/images/umamusume/supports/support_card_s_${id}.png`,
    racecourse: race, length, lengthType, direction, track, season, weather,
    skills: [race,length,lengthType,direction,track,season,weather],
    typeNum: String(Math.floor(Math.random()*6)).padStart(2,"0"),
    typeImage: `https://gametora.com/images/umamusume/icons/utx_ico_obtain_${String(Math.floor(Math.random()*6)).padStart(2,"0")}.png`
  };
});

const cardSections = document.getElementById('cardSections');
const slots = Array.from(document.querySelectorAll('.slot'));
const clearAllBtn = document.getElementById('clearAllBtn');
const selectedCardIds = new Set();
const categories = [
  {id:'racecourse', title:'Racecourse', prop:'racecourse'},
  {id:'length', title:'Length', prop:'length'},
  {id:'lengthType', title:'Length Type', prop:'lengthType'},
  {id:'direction', title:'Direction', prop:'direction'},
  {id:'track', title:'Track Conditions', prop:'track'},
  {id:'season', title:'Season', prop:'season'},
  {id:'weather', title:'Weather', prop:'weather'}
];
const slotListeners = new Map();

function createCardElement(card){
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
  if(selectedCardIds.has(card.id)) el.classList.add('disabled');
  return el;
}

function renderSections(){
  cardSections.innerHTML = '';
  let any = false;
  categories.forEach(cat=>{
    const val = (document.getElementById(cat.id) || {value: ''}).value;
    if(!val) return;
    any = true;
    const section = document.createElement('div');
    section.className = 'card-section';
    const header = document.createElement('h2');
    header.textContent = `${cat.title}: ${val}`;
    section.appendChild(header);
    const grid = document.createElement('div');
    grid.className = 'cards';
    const matches = cardsData.filter(c => String(c[cat.prop]) === String(val));
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
    <div class="skills">${card.skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>
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
renderSections();
window.addEventListener('load', ()=> renderSections());
</script>

</body>
</html>
