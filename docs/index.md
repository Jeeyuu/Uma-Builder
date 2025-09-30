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
      display: flex;
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .sidebar {
      flex: 0 0 200px;
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
      flex: 1;
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

    .card-section {
      margin-bottom: 30px;
    }

    .card-section h2 {
      margin-bottom: 10px;
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
          <option value="">-- Select --</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Kyoto">Kyoto</option>
          <option value="Osaka">Osaka</option>
          <option value="Sapporo">Sapporo</option>
          <option value="Hakodate">Hakodate</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="length">Length</label>
        <select id="length">
          <option value="">-- Select --</option>
          <option value="Short">Short</option>
          <option value="Medium">Medium</option>
          <option value="Long">Long</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="direction">Direction</label>
        <select id="direction">
          <option value="">-- Select --</option>
          <option value="Left">Left</option>
          <option value="Right">Right</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="track">Track Conditions</label>
        <select id="track">
          <option value="">-- Select --</option>
          <option value="Dry">Dry</option>
          <option value="Wet">Wet</option>
          <option value="Soft">Soft</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="season">Season</label>
        <select id="season">
          <option value="">-- Select --</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="weather">Weather</label>
        <select id="weather">
          <option value="">-- Select --</option>
          <option value="Sunny">Sunny</option>
          <option value="Rainy">Rainy</option>
          <option value="Cloudy">Cloudy</option>
          <option value="Snowy">Snowy</option>
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

      <!-- Sections for filtered cards -->
      <div id="card-sections"></div>
    </div>
  </div>

  <script>
    // placeholder cards with skills matching filter categories
    const cardsData = Array.from({length: 20}, (_, i) => {
      const id = 10001 + i;
      const racecourseOptions = ["Tokyo","Kyoto","Osaka","Sapporo","Hakodate"];
      const lengthOptions = ["Short","Medium","Long"];
      const directionOptions = ["Left","Right"];
      const trackOptions = ["Dry","Wet","Soft"];
      const seasonOptions = ["Spring","Summer","Autumn","Winter"];
      const weatherOptions = ["Sunny","Rainy","Cloudy","Snowy"];

      return {
        id: id,
        name: `Card ${id}`,
        image: `https://gametora.com/images/umamusume/supports/support_card_s_${id}.png`,
        skills: [
          racecourseOptions[i%5],
          lengthOptions[i%3],
          directionOptions[i%2],
          trackOptions[i%3],
          seasonOptions[i%4],
          weatherOptions[i%4]
        ],
        typeNum: String(Math.floor(Math.random() * 6)).padStart(2,"0"),
        typeImage: `https://gametora.com/images/umamusume/icons/utx_ico_obtain_${String(Math.floor(Math.random() * 6)).padStart(2,"0")}.png`
      };
    });

    const slots = document.querySelectorAll('.slot');
    const cardSections = document.getElementById('card-sections');
    const clearAllBtn = document.querySelector('.clear-all');

    // function to render cards filtered by category and selection
    function renderFilteredCards() {
      cardSections.innerHTML = '';
      const filters = {
        racecourse: document.getElementById('racecourse').value,
        length: document.getElementById('length').value,
        direction: document.getElementById('direction').value,
        track: document.getElementById('track').value,
        season: document.getElementById('season').value,
        weather: document.getElementById('weather').value
      };

      for (let category in filters) {
        if (!filters[category]) continue; // skip blank selection

        const section = document.createElement('div');
        section.className = 'card-section';
        section.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
        const cardsDiv = document.createElement('div');
        cardsDiv.className = 'cards';

        cardsData.forEach(card => {
          if (card.skills.includes(filters[category])) {
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
            cardsDiv.appendChild(cardDiv);
          }
        });

        section.appendChild(cardsDiv);
        cardSections.appendChild(section);
      }
    }

    // store selections in localStorage
    function setupDropdownPersistence() {
      ["racecourse","length","direction","track","season","weather"].forEach(id => {
        const dropdown = document.getElementById(id);
        const saved = localStorage.getItem(id);
        if (saved) dropdown.value = saved;
        dropdown.addEventListener('change', () => {
          localStorage.setItem(id, dropdown.value);
          renderFilteredCards();
        });
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

      document.querySelectorAll(`.card[data-id="${card.id}"]`).forEach(cardEl => {
        cardEl.classList.add('disabled');
      });
    }

    function removeFromSlot(slot, cardId) {
      slot.classList.remove('has-card');
      slot.innerHTML = '';
      document.querySelectorAll(`.card[data-id="${cardId}"]`).forEach(cardEl => {
        cardEl.classList.remove('disabled');
      });
    }

    clearAllBtn.addEventListener('click', () => {
      slots.forEach(slot => {
        if (slot.classList.contains('has-card')) {
          const img = slot.querySelector('img');
          if (img) {
            const cardId = parseInt(img.src.match(/(\d+)\.png$/)[1]);
            document.querySelectorAll(`.card[data-id="${cardId}"]`).forEach(cardEl => cardEl.classList.remove('disabled'));
          }
          slot.classList.remove('has-card');
          slot.innerHTML = '';
        }
      });
    });

    setupDropdownPersistence();
    renderFilteredCards();
  </script>
</body>
</html>
