<html lang="en">
<head>
<meta charset="utf-8" />
<title>Uma Builder — Card Picker</title>
<style>
  :root {
    --img-h: 140px; /* height of card images */
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 20px;
    background: #fff;
    color: #111;
  }

  /* Container */
  .container {
    max-width: 2560px; /* full width */
    margin: 0 auto;
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  /* Sidebar */
  .sidebar {
    flex: 0 0 175px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
  }

  .filter-group label {
    font-weight: 700;
    margin-bottom: 6px;
  }

  select {
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background: #fff;
  }

  /* Main content */
  .main-content {
    flex: 1;
    min-width: 0; /* allow flex children to shrink */
  }

  .slots-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
  }

  .clear-all {
    background: #444;
    color: #fff;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
  }

  /* Slots grid */
  .slots {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-bottom: 18px;
  }

  .slot {
    min-height: 150px;
    border: 2px dashed #ccc;
    background: #fafafa;
    padding: 6px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    position: relative;
    width: 100%;
  }

  .slot.has-card {
    border-color: #9aa;
    background: #fff;
  }

  /* Cards grid */
  .cards {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-top: 6px;
  }

  .card {
    border: 1px solid #ddd;
    padding: 8px;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    width: 100%;
  }

  .card img,
  .slot img {
    width: 100%;
    height: var(--img-h);
    object-fit: contain;
    display: block;
  }

  .name {
    margin: 8px 0 6px 0;
    font-weight: 600;
    text-align: center;
    word-break: break-word;
  }

  /* Skills overflow */
  .skills {
    width: 200%;      /* allows overflow */
    max-width: 1000px; /* optional to limit extreme overflow */
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .skill {
    background: #eef2ff;
    border-radius: 6px;
    padding: 4px 6px;
    font-size: 12px;
    box-sizing: border-box;
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

  /* Responsive adjustments */
  @media (max-width: 1100px) {
    :root { --img-h: 120px; }
  }

  @media (max-width: 900px) {
    :root { --img-h: 100px; }
  }

  @media (max-width: 640px) {
    .container {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .sidebar .filter-group {
      flex: 1;
      min-width: 150px;
    }
  }
</style>

</head>
<body>
  <h1>Uma Builder</h1>

  <div class="container">
    <!-- Sidebar filters (labels/options from your table; Aptitude ignored) -->
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
        <!-- placed as normal element above the slots, aligned to the right -->
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

      <div class="card-sections" id="cardSections">
        <!-- sections will be rendered here based on dropdowns -->
      </div>
    </div>
  </div>

<script>
/* -------------------------
   Data (explicit attributes)
   ------------------------- */
const cardsData = Array.from({length:10}, (_, i) => {
  const id = 10001 + i;
  // Choose example attribute values so filters can be tested
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
    id,
    name: `Card ${id}`,
    image: `https://gametora.com/images/umamusume/supports/support_card_s_${id}.png`,
    racecourse: race,
    length: length,
    lengthType: lengthType,
    direction: direction,
    track: track,
    season: season,
    weather: weather,
    // for display in the card's skill box
    skills: [race, length, lengthType, direction, track, season, weather],
    typeNum: String(Math.floor(Math.random()*6)).padStart(2,"0"),
    typeImage: `https://gametora.com/images/umamusume/icons/utx_ico_obtain_${String(Math.floor(Math.random()*6)).padStart(2,"0")}.png`
  };
});

/* DOM references */
const cardSections = document.getElementById('cardSections');
const slots = Array.from(document.querySelectorAll('.slot'));
const clearAllBtn = document.getElementById('clearAllBtn');

/* Track selected card IDs so we can disable them consistently */
const selectedCardIds = new Set();

/* Categories mapping */
const categories = [
  {id:'racecourse', title:'Racecourse', prop:'racecourse'},
  {id:'length', title:'Length', prop:'length'},
  {id:'lengthType', title:'Length Type', prop:'lengthType'},
  {id:'direction', title:'Direction', prop:'direction'},
  {id:'track', title:'Track Conditions', prop:'track'},
  {id:'season', title:'Season', prop:'season'},
  {id:'weather', title:'Weather', prop:'weather'}
];

/* Keep slot listeners so we can remove reliably */
const slotListeners = new Map();

/* ---------- Helper: create card element for bottom lists ---------- */
function createCardElement(card) {
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.id = card.id;
  el.innerHTML = `
    <div class="type-icon"><img src="${card.typeImage}" alt="type"></div>
    <img src="${card.image}" alt="${card.name}">
    <div class="name">${escapeHtml(card.name)}</div>
    <div class="skills">${card.skills.map(s=>`<div class="skill">${escapeHtml(s)}</div>`).join('')}</div>
  `;
  // click to add to first free slot
  el.addEventListener('click', ()=> addToSlot(card));
  // if card is currently selected, mark disabled
  if(selectedCardIds.has(card.id)) el.classList.add('disabled');
  return el;
}

/* ---------- Render sections based on dropdown selections ---------- */
function renderSections(){
  cardSections.innerHTML = '';
  let any = false;
  categories.forEach(cat=>{
    const val = (document.getElementById(cat.id) || {value: ''}).value;
    if(!val) return; // skip if blank
    any = true;
    const section = document.createElement('div');
    section.className = 'card-section';
    const header = document.createElement('h2');
    header.textContent = `${cat.title}: ${val}`;
    section.appendChild(header);
    const grid = document.createElement('div');
    grid.className = 'cards';
    // find matching cards
    const matches = cardsData.filter(c => String(c[cat.prop]) === String(val));
    matches.forEach(card => {
      const cardEl = createCardElement(card);
      grid.appendChild(cardEl);
    });
    section.appendChild(grid);
    cardSections.appendChild(section);
  });

  if(!any){
    // helpful message when no filters selected
    const msg = document.createElement('div');
    msg.style.opacity = '0.7';
    msg.style.marginTop = '8px';
    msg.textContent = 'Select options from the left to show matching card sections.';
    cardSections.appendChild(msg);
  }
}

/* ---------- Add to slot (fills first empty slot) ---------- */
function addToSlot(card){
  const freeSlot = slots.find(s => !s.dataset.cardId);
  if(!freeSlot) return;
  // safety: remove any previous listener on this slot
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

  // attach click-to-remove
  function slotClickHandler(){
    removeFromSlot(freeSlot, card.id);
  }
  freeSlot.addEventListener('click', slotClickHandler);
  slotListeners.set(freeSlot, slotClickHandler);

  // mark selected
  selectedCardIds.add(card.id);
  // disable all bottom card elements with that id
  document.querySelectorAll(`.card[data-id="${card.id}"]`).forEach(el => el.classList.add('disabled'));
}

/* ---------- Remove from slot ---------- */
function removeFromSlot(slotEl, cardId){
  // remove listener if stored
  if(slotListeners.has(slotEl)){
    slotEl.removeEventListener('click', slotListeners.get(slotEl));
    slotListeners.delete(slotEl);
  }
  slotEl.classList.remove('has-card');
  delete slotEl.dataset.cardId;
  slotEl.innerHTML = '';
  // unmark selected
  selectedCardIds.delete(Number(cardId));
  // re-enable bottom cards with that id
  document.querySelectorAll(`.card[data-id="${cardId}"]`).forEach(el => el.classList.remove('disabled'));
}

/* ---------- Clear All ---------- */
clearAllBtn.addEventListener('click', ()=>{
  // unselect all
  selectedCardIds.clear();
  // remove slot listeners and clear slots
  slots.forEach(slot=>{
    if(slotListeners.has(slot)){
      slot.removeEventListener('click', slotListeners.get(slot));
      slotListeners.delete(slot);
    }
    slot.classList.remove('has-card');
    delete slot.dataset.cardId;
    slot.innerHTML = '';
  });
  // update bottom elements (remove disabled)
  document.querySelectorAll('.card').forEach(el => el.classList.remove('disabled'));
});

/* ---------- Persist/restore filter selections (localStorage) ---------- */
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

/* ---------- Utility: escape HTML ---------- */
function escapeHtml(s){
  return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

/* ---------- Init ---------- */
setupFilterPersistence();
renderSections();

/* Re-render sections on page load to reflect restored selections */
window.addEventListener('load', ()=> renderSections());
</script>
</body>
</html>
