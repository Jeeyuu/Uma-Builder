<html>
<head>
  <style>
    :root {
      --card-w: 118px; /* base image width */
    }

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
    }

    /* Main container */
    .container {
      width: 1280px;
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    /* Sidebar filters */
    .sidebar {
      width: 175px;
      flex-shrink: 0;
    }

    .filter-group {
      margin-bottom: 20px;
    }

    .filter-group label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }

    .filter-group select {
      width: 100%;
    }

    /* Main content */
    .main {
      flex-grow: 1;
    }

    /* Slots section */
    .slots-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .slots {
      display: grid;
      grid-template-columns: repeat(6, calc(var(--card-w) + 16px));
      justify-content: start;
      gap: 10px;
    }

    .slot {
      border: 1px solid #ddd;
      padding: 8px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      width: calc(var(--card-w) + 16px);
      min-height: calc(var(--card-w) + 16px); /* empty = square */
      transition: all 0.2s;
    }

    .slot img {
      max-width: var(--card-w);
      height: auto;
    }

    /* Clear All button */
    .clear-all {
      padding: 5px 10px;
      font-size: 14px;
      cursor: pointer;
    }

    /* Cards grid */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(calc(var(--card-w) + 16px), 1fr));
      gap: 10px;
      justify-items: center;
    }

    .card {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: center;
      cursor: pointer;
      background: #fff;
      position: relative;
      width: calc(var(--card-w) + 16px);
      box-sizing: border-box;
    }

    .card img {
      max-width: var(--card-w);
      height: auto;
    }

    .type-icon {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 24px;
      height: 24px;
    }

    .type-icon img {
      width: 100%;
      height: 100%;
    }

    .name {
      font-size: 14px;
      font-weight: bold;
      margin-top: 5px;
      word-wrap: break-word;
    }

    .skills {
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      justify-content: center;
    }

    .skill {
      background: #f0f0f0;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      word-wrap: break-word;
      max-width: 100%;
    }

    .card.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Sidebar Filters -->
    <div class="sidebar">
      <div class="filter-group">
        <label for="racecourse">Racecourse</label>
        <select id="racecourse">
          <option value="">--</option>
          <option>Sapporo</option>
          <option>Hakodate</option>
          <option>Niigata</option>
          <option>Fukushima</option>
          <option>Nakayama</option>
          <option>Tokyo</option>
          <option>Chukyo</option>
          <option>Kyoto</option>
          <option>Hanshin</option>
          <option>Kokura</option>
          <option>Oi</option>
          <option>Kawasaki</option>
          <option>Funabashi</option>
          <option>Morioka</option>
          <option>Longchamp</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="length">Length</label>
        <select id="length">
          <option value="">--</option>
          <option>1000m</option>
          <option>1150m</option>
          <option>1200m</option>
          <option>1300m</option>
          <option>1400m</option>
          <option>1500m</option>
          <option>1600m</option>
          <option>1700m</option>
          <option>1800m</option>
          <option>1900m</option>
          <option>2000m</option>
          <option>2100m</option>
          <option>2200m</option>
          <option>2300m</option>
          <option>2400m</option>
          <option>2500m</option>
          <option>2600m</option>
          <option>3000m</option>
          <option>3200m</option>
          <option>3400m</option>
          <option>3600m</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="lengthType">Length Type</label>
        <select id="lengthType">
          <option value="">--</option>
          <option>Sprint</option>
          <option>Mile</option>
          <option>Medium</option>
          <option>Long</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="direction">Direction</label>
        <select id="direction">
          <option value="">--</option>
          <option>Clockwise</option>
          <option>Counterclockwise</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="track">Track Conditions</label>
        <select id="track">
          <option value="">--</option>
          <option>Firm</option>
          <option>Good</option>
          <option>Soft</option>
          <option>Heavy</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="season">Season</label>
        <select id="season">
          <option value="">--</option>
          <option>Spring</option>
          <option>Summer</option>
          <option>Fall</option>
          <option>Winter</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="weather">Weather</label>
        <select id="weather">
          <option value="">--</option>
          <option>Sunny</option>
          <option>Cloudy</option>
          <option>Rainy</option>
          <option>Snowy</option>
        </select>
      </div>
    </div>

    <!-- Main content -->
    <div class="main">
      <div class="slots-container">
        <div class="slots"></div>
        <button class="clear-all">Clear All</button>
      </div>
      <div class="cards"></div>
    </div>
  </div>

  <script>
    const slotsContainer = document.querySelector('.slots');
    const cardsContainer = document.querySelector('.cards');
    const clearAllBtn = document.querySelector('.clear-all');

    const cardsData = [];
    for (let i = 10001; i <= 10010; i++) {
      cardsData.push({
        id: i,
        name: `Card ${i}`,
        img: `https://gametora.com/images/umamusume/supports/support_card_s_${i}.png`,
        type: `https://gametora.com/images/umamusume/icons/utx_ico_obtain_0${(i % 6)}.png`,
        skills: [
          "Sapporo", "1000m", "Sprint", "Clockwise", "Firm", "Spring", "Sunny"
        ].slice(0, (i % 7) + 1) // vary skills
      });
    }

    // Create slots
    for (let i = 0; i < 6; i++) {
      const slot = document.createElement('div');
      slot.classList.add('slot');
      slot.dataset.slot = i;
      slotsContainer.appendChild(slot);
    }

    // Render cards
    function renderCards() {
      cardsContainer.innerHTML = '';
      cardsData.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.dataset.id = card.id;

        cardEl.innerHTML = `
          <div class="type-icon"><img src="${card.type}" alt="type"></div>
          <img src="${card.img}" alt="${card.name}">
          <div class="name">${card.name}</div>
          <div class="skills">${card.skills.map(s => `<div class="skill">${s}</div>`).join('')}</div>
        `;

        cardEl.addEventListener('click', () => addToSlot(card));
        cardsContainer.appendChild(cardEl);
      });
    }

    function addToSlot(card) {
      if (document.querySelector(`.slot[data-id="${card.id}"]`)) return;

      const slot = Array.from(slotsContainer.children).find(s => !s.dataset.id);
      if (!slot) return;

      slot.dataset.id = card.id;
      slot.innerHTML = `
        <div class="type-icon"><img src="${card.type}" alt="type"></div>
        <img src="${card.img}" alt="${card.name}">
        <div class="name">${card.name}</div>
        <div class="skills">${card.skills.map(s => `<div class="skill">${s}</div>`).join('')}</div>
      `;

      slot.addEventListener('click', () => removeFromSlot(slot, card));
      document.querySelector(`.card[data-id="${card.id}"]`).classList.add('disabled');
    }

    function removeFromSlot(slot, card) {
      slot.innerHTML = '';
      delete slot.dataset.id;
      document.querySelector(`.card[data-id="${card.id}"]`).classList.remove('disabled');
    }

    clearAllBtn.addEventListener('click', () => {
      Array.from(slotsContainer.children).forEach(slot => {
        if (slot.dataset.id) {
          const cardId = slot.dataset.id;
          slot.innerHTML = '';
          delete slot.dataset.id;
          document.querySelector(`.card[data-id="${cardId}"]`).classList.remove('disabled');
        }
      });
    });

    renderCards();
  </script>
</body>
</html>
