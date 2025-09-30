<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Uma Builder</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 20px;
    }

    .sidebar {
      flex: 0 0 200px; /* fixed width for filters */
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
    }

    .filter-group label {
      font-weight: bold;
      margin-bottom: 5px;
    }

    select {
      padding: 5px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    .main-content {
      flex: 1; /* remaining space for slots and cards */
    }

    .slots {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      margin-bottom: 30px;
      position: relative;
    }

    .slot {
      width: 100%;
      min-height: 150px;
      border: 2px dashed #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 5px;
      position: relative;
      background: #f9f9f9;
      cursor: pointer;
    }

    .slot img {
      width: 100%;
    }

    .skills {
      margin-top: 5px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .skill {
      background: #e0e0e0;
      border-radius: 4px;
      padding: 2px 5px;
      margin: 2px 0;
      width: 100%;
      box-sizing: border-box;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
    }

    .card {
      width: 100%;
      border: 1px solid #ccc;
      padding: 5px;
      text-align: center;
      cursor: pointer;
      background: #fff;
      position: relative;
    }

    .card img {
      width: 100%;
    }

    .card.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .clear-all {
      position: absolute;
      top: -40px;
      right: 0;
      background: #555;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }

    /* type icon overlay */
    .type-icon {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 30px;
      height: 30px;
      border-radius: 4px;
      overflow: hidden;
      background: white;
      border: 1px solid #ccc;
    }

    .type-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .slot .type-icon {
      top: 5px;
      right: 5px;
    }
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
          <option>Racecourse 1</option>
          <option>Racecourse 2</option>
          <option>Racecourse 3</option>
          <option>Racecourse 4</option>
          <option>Racecourse 5</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="length">Length</label>
        <select id="length">
          <option>Length 1</option>
          <option>Length 2</option>
          <option>Length 3</option>
          <option>Length 4</option>
          <option>Length 5</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="direction">Direction</label>
        <select id="direction">
          <option>Direction 1</option>
          <option>Direction 2</option>
          <option>Direction 3</option>
          <option>Direction 4</option>
          <option>Direction 5</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="track">Track Conditions</label>
        <select id="track">
          <option>Track 1</option>
          <option>Track 2</option>
          <option>Track 3</option>
          <option>Track 4</option>
          <option>Track 5</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="season">Season</label>
        <select id="season">
          <option>Season 1</option>
          <option>Season 2</option>
          <option>Season 3</option>
          <option>Season 4</option>
          <option>Season 5</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="weather">Weather</label>
        <select id="weather">
          <option>Weather 1</option>
          <option>Weather 2</option>
          <option>Weather 3</option>
          <option>Weather 4</option>
          <option>Weather 5</option>
        </select>
      </div>
    </div>

    <!-- Main content -->
    <div class="main-content">
      <div class="slots">
        <button class="clear-all">Clear All</button>
        <div class="slot"></div>
        <div class="slot"></div>
        <div class="slot"></div>
        <div class="slot"></div>
        <div class="slot"></div>
        <div class="slot"></div>
      </div>

      <div class="cards" id="cards-container"></div>
    </div>
  </div>

  <script>
    const cardsData = Array.from({length: 10}, (_, i) => {
      const id = 10001 + i;
      const typeNum = String(Math.floor(Math.random() * 6)).padStart(2, "0"); // 00–05
      return {
        id: id,
        name: `Card ${id}`,
        image: `https://gametora.com/images/umamusume/supports/support_card_s_${id}.png`,
        skills: Array.from({length: Math.floor(Math.random() * 5) + 1}, (_, j) => `Skill ${j + 1}`),
        typeNum: typeNum,
        typeImage: `https://gametora.com/images/umamusume/icons/utx_ico_obtain_${typeNum}.png`
      };
    });

    const slots = document.querySelectorAll('.slot');
    const cardsContainer = document.getElementById('cards-container');
    const clearAllBtn = document.querySelector('.clear-all');

    function renderCards() {
      cardsContainer.innerHTML = '';
      cardsData.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.dataset.id = card.id;
        cardDiv.innerHTML = `
          <div class="type-icon"><img src="${card.typeImage}" alt="type"></div>
          <img src="${card.image}" alt="${card.name}">
          <div>${card.name}</div>
          <div class="skills">
            ${card.skills.map(skill => `<div class="skill">${skill}</div>`).join('')}
          </div>
        `;
        cardDiv.addEventListener('click', () => addToSlot(card));
        cardsContainer.appendChild(cardDiv);
      });
    }

    function addToSlot(card) {
      const availableSlot = Array.from(slots).find(slot => !slot.classList.contains('has-card'));
      if (!availableSlot) return;

      availableSlot.classList.add('has-card');
      availableSlot.innerHTML = `
        <div class="type-icon"><img src="${card.typeImage}" alt="type"></div>
        <img src="${card.image}" alt="${card.name}">
        <div class="skills">
          ${card.skills.map(skill => `<div class="skill">${skill}</div>`).join('')}
        </div>
      `;

      availableSlot.addEventListener('click', function removeSlot() {
        removeFromSlot(availableSlot, card.id);
        availableSlot.removeEventListener('click', removeSlot);
      });

      document.querySelector(`.card[data-id="${card.id}"]`).classList.add('disabled');
    }

    function removeFromSlot(slot, cardId) {
      slot.classList.remove('has-card');
      slot.innerHTML = '';
      document.querySelector(`.card[data-id="${cardId}"]`).classList.remove('disabled');
    }

    clearAllBtn.addEventListener('click', () => {
      slots.forEach(slot => {
        if (slot.classList.contains('has-card')) {
          const img = slot.querySelector('img');
          if (img) {
            const cardId = parseInt(img.src.match(/(\d+)\.png$/)[1]);
            document.querySelector(`.card[data-id="${cardId}"]`).classList.remove('disabled');
          }
          slot.classList.remove('has-card');
          slot.innerHTML = '';
        }
      });
    });

    renderCards();
  </script>
</body>
</html>
