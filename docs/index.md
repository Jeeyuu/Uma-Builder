<html>
<head>
  <style>
    :root {
      --card-w: 118px; /* unified width */
    }

    body {
      font-family: Arial, sans-serif;
      background: #f8f8f8;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
    }

    /* Container */
    .container {
      width: 1280px;
      margin: 20px auto;
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    /* Sidebar filters */
    .sidebar {
      width: 300px; /* restored to larger filter block */
      background: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr 1fr; /* two columns of labels */
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
    .filter-group select {
      width: 100%;
    }

    /* Main content */
    .main {
      flex: 1;
    }

    /* Slots area */
    .slots-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .slots {
      display: grid;
      grid-template-columns: repeat(6, var(--card-w));
      gap: 10px;
      margin-bottom: 20px;
    }
    .slot {
      width: var(--card-w);
      min-height: var(--card-w);
      border: 1px dashed #bbb;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      cursor: pointer;
    }

    /* Cards */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(var(--card-w), 1fr));
      gap: 15px;
      justify-items: center;
    }
    .card {
      width: var(--card-w);
      border: 1px solid #ccc;
      padding: 5px;
      text-align: center;
      cursor: pointer;
      background: #fff;
      position: relative;
      box-sizing: border-box;
    }
    .card img {
      width: 100%;
      height: auto;
      display: block;
    }
    .card.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
    .name {
      margin-top: 4px;
      font-size: 12px;
      font-weight: bold;
      word-wrap: break-word;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      margin-top: 4px;
      justify-content: center;
    }
    .skill {
      background: #eee;
      border: 1px solid #ccc;
      border-radius: 3px;
      padding: 2px 4px;
      font-size: 10px;
      word-break: break-word;
      max-width: 100%;
    }

    /* Type icon */
    .type-icon {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 20px;
      height: 20px;
    }
    .type-icon img {
      width: 100%;
      height: 100%;
    }

    /* Clear button */
    .clear-btn {
      background: #f44336;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 12px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Sidebar filters -->
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
        <label for="condition">Track Conditions</label>
        <select id="condition">
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
      <div class="slots-header">
        <h3>Selected Cards</h3>
        <button class="clear-btn" id="clearAll">Clear All</button>
      </div>
      <div class="slots" id="slots"></div>
      <h3>Available Cards</h3>
      <div class="cards" id="cards"></div>
    </div>
  </div>

  <script>
    const slotsContainer = document.getElementById("slots");
    const cardsContainer = document.getElementById("cards");
    const clearAllBtn = document.getElementById("clearAll");

    const cardsData = [];
    for (let i = 10001; i <= 10010; i++) {
      cardsData.push({
        id: i,
        name: "Card " + i,
        type: ("0" + (i % 6)).slice(-2),
        skills: ["Sapporo","1000m","Sprint","Clockwise","Firm","Spring","Sunny"]
      });
    }

    for (let i = 0; i < 6; i++) {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.slot = i;
      slotsContainer.appendChild(slot);

      slot.addEventListener("click", () => {
        if (slot.firstChild) {
          const cardId = slot.firstChild.dataset.id;
          slot.innerHTML = "";
          const cardEl = cardsContainer.querySelector(`[data-id="${cardId}"]`);
          if (cardEl) cardEl.classList.remove("disabled");
        }
      });
    }

    cardsData.forEach(card => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.dataset.id = card.id;
      cardEl.innerHTML = `
        <div class="type-icon"><img src="https://gametora.com/images/umamusume/icons/utx_ico_obtain_${card.type}.png"></div>
        <img src="https://gametora.com/images/umamusume/supports/support_card_s_${card.id}.png" alt="${card.name}">
        <div class="name">${card.name}</div>
        <div class="skills">${card.skills.map(s => `<div class="skill">${s}</div>`).join("")}</div>
      `;
      cardsContainer.appendChild(cardEl);

      cardEl.addEventListener("click", () => {
        if (cardEl.classList.contains("disabled")) return;
        const emptySlot = [...slotsContainer.children].find(s => !s.firstChild);
        if (!emptySlot) return;

        const clone = cardEl.cloneNode(true);
        clone.classList.remove("disabled");
        emptySlot.appendChild(clone);
        cardEl.classList.add("disabled");
      });
    });

    clearAllBtn.addEventListener("click", () => {
      [...slotsContainer.children].forEach(slot => {
        if (slot.firstChild) {
          const cardId = slot.firstChild.dataset.id;
          slot.innerHTML = "";
          const cardEl = cardsContainer.querySelector(`[data-id="${cardId}"]`);
          if (cardEl) cardEl.classList.remove("disabled");
        }
      });
    });

    const filters = ["racecourse", "length", "lengthType", "direction", "condition", "season", "weather"];
    filters.forEach(f => {
      document.getElementById(f).addEventListener("change", applyFilters);
    });

    function applyFilters() {
      const selections = {};
      filters.forEach(f => {
        selections[f] = document.getElementById(f).value;
      });

      cardsData.forEach(card => {
        const el = cardsContainer.querySelector(`[data-id="${card.id}"]`);
        if (!el) return;
        let visible = true;
        for (let key in selections) {
          if (selections[key] && !card.skills.includes(selections[key])) {
            visible = false;
            break;
          }
        }
        el.style.display = visible ? "block" : "none";
      });
    }
  </script>
</body>
</html>
