<html>
<head>
  <style>
    :root {
      --card-w: 118px;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f8f8f8;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
    }

    .container {
      width: 1280px;
      margin: 20px auto;
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    /* Sidebar - single column */
    .sidebar {
      width: 220px;
      background: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
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
        </select>
      </div>
      <div class="filter-group">
        <label for="length">Length</label>
        <select id="length">
          <option value="">--</option>
          <option>1000m</option>
          <option>1200m</option>
          <option>1600m</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="lengthType">Length Type</label>
        <select id="lengthType">
          <option value="">--</option>
          <option>Sprint</option>
          <option>Mile</option>
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

    // Mock data
    const cardsData = [];
    for (let i = 10001; i <= 10010; i++) {
      cardsData.push({
        id: i,
        name: "Card " + i,
        type: ("0" + (i % 6)).slice(-2),
        skills: ["Sapporo","1000m","Sprint","Clockwise"]
      });
    }

    // Slots
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

    // Cards
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

    // Clear all
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

    // Filters
    const filters = ["racecourse", "length", "lengthType", "direction"];
    filters.forEach(f => {
      document.getElementById(f).addEventListener("change", applyFilters);
    });

    function applyFilters() {
      // Collect all non-empty selections
      let activeSelections = [];
      filters.forEach(f => {
        const val = document.getElementById(f).value;
        if (val) activeSelections.push(val);
      });

      cardsData.forEach(card => {
        const el = cardsContainer.querySelector(`[data-id="${card.id}"]`);
        if (!el) return;
        if (activeSelections.length === 0) {
          el.style.display = "block"; // nothing picked → show all
        } else {
          // OR match: if card has at least one selected skill, show
          const match = activeSelections.some(sel => card.skills.includes(sel));
          el.style.display = match ? "block" : "none";
        }
      });
    }
  </script>
</body>
</html>
