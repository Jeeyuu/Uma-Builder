<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1280px;
      margin: 0 auto;
      padding: 20px;
    }

    .filters {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 20px;
    }

    .filter {
      display: flex;
      flex-direction: column;
    }

    .filter label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      justify-items: center;
      margin-bottom: 40px;
    }

    .card {
      width: 180px;
      border: 1px solid #ccc;
      padding: 8px;
      text-align: center;
      cursor: pointer;
      background: #fff;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .card img {
      max-width: 100%;
      height: auto;
    }

    .slots-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      margin-bottom: 10px;
    }

    .slots {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
    }

    .slot {
      width: 180px;
      height: 220px;
      border: 2px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
    }

    .section {
      margin-bottom: 40px;
    }

    .section h2 {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="filters">
    <div class="filter">
      <label for="racecourse">Racecourse</label>
      <select id="racecourse">
        <option value="">-- Select --</option>
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

    <div class="filter">
      <label for="length">Length</label>
      <select id="length">
        <option value="">-- Select --</option>
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

    <div class="filter">
      <label for="lengthType">Length Type</label>
      <select id="lengthType">
        <option value="">-- Select --</option>
        <option>Sprint</option>
        <option>Mile</option>
        <option>Medium</option>
        <option>Long</option>
      </select>
    </div>

    <div class="filter">
      <label for="direction">Direction</label>
      <select id="direction">
        <option value="">-- Select --</option>
        <option>Clockwise</option>
        <option>Counterclockwise</option>
      </select>
    </div>

    <div class="filter">
      <label for="conditions">Track Conditions</label>
      <select id="conditions">
        <option value="">-- Select --</option>
        <option>Firm</option>
        <option>Good</option>
        <option>Soft</option>
        <option>Heavy</option>
      </select>
    </div>

    <div class="filter">
      <label for="season">Season</label>
      <select id="season">
        <option value="">-- Select --</option>
        <option>Spring</option>
        <option>Summer</option>
        <option>Fall</option>
        <option>Winter</option>
      </select>
    </div>

    <div class="filter">
      <label for="weather">Weather</label>
      <select id="weather">
        <option value="">-- Select --</option>
        <option>Sunny</option>
        <option>Cloudy</option>
        <option>Rainy</option>
        <option>Snowy</option>
      </select>
    </div>
  </div>

  <div id="cardSections">
    <div class="section" id="racecourseSection">
      <h2>Racecourse</h2>
      <div class="cards" id="racecourseCards"></div>
    </div>

    <div class="section" id="lengthSection">
      <h2>Length</h2>
      <div class="cards" id="lengthCards"></div>
    </div>

    <div class="section" id="lengthTypeSection">
      <h2>Length Type</h2>
      <div class="cards" id="lengthTypeCards"></div>
    </div>

    <div class="section" id="directionSection">
      <h2>Direction</h2>
      <div class="cards" id="directionCards"></div>
    </div>

    <div class="section" id="conditionsSection">
      <h2>Track Conditions</h2>
      <div class="cards" id="conditionsCards"></div>
    </div>

    <div class="section" id="seasonSection">
      <h2>Season</h2>
      <div class="cards" id="seasonCards"></div>
    </div>

    <div class="section" id="weatherSection">
      <h2>Weather</h2>
      <div class="cards" id="weatherCards"></div>
    </div>
  </div>

  <div class="slots-header">
    <h2>Slots</h2>
    <button id="clearAll">Clear All</button>
  </div>
  <div class="slots" id="slots">
    <div class="slot">Drop here</div>
    <div class="slot">Drop here</div>
    <div class="slot">Drop here</div>
  </div>

  <script>
    const filters = {
      racecourse: ["Sapporo", "Hakodate", "Niigata", "Fukushima", "Nakayama", "Tokyo", "Chukyo", "Kyoto", "Hanshin", "Kokura", "Oi", "Kawasaki", "Funabashi", "Morioka", "Longchamp"],
      length: ["1000m", "1150m", "1200m", "1300m", "1400m", "1500m", "1600m", "1700m", "1800m", "1900m", "2000m", "2100m", "2200m", "2300m", "2400m", "2500m", "2600m", "3000m", "3200m", "3400m", "3600m"],
      lengthType: ["Sprint", "Mile", "Medium", "Long"],
      direction: ["Clockwise", "Counterclockwise"],
      conditions: ["Firm", "Good", "Soft", "Heavy"],
      season: ["Spring", "Summer", "Fall", "Winter"],
      weather: ["Sunny", "Cloudy", "Rainy", "Snowy"]
    };

    function createCard(text) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="https://via.placeholder.com/150"><div>${text}</div>`;
      card.addEventListener("click", () => {
        addToSlot(text, card);
      });
      return card;
    }

    function populateSection(sectionId, items) {
      const container = document.getElementById(sectionId);
      container.innerHTML = "";
      items.forEach(item => {
        container.appendChild(createCard(item));
      });
    }

    Object.keys(filters).forEach(filter => {
      const select = document.getElementById(filter);
      select.addEventListener("change", () => {
        const sectionId = filter + "Cards";
        if (select.value === "") {
          populateSection(sectionId, []);
        } else {
          populateSection(sectionId, filters[filter].filter(i => i === select.value));
        }
      });
    });

    function addToSlot(text, card) {
      const slots = document.querySelectorAll(".slot");
      for (let slot of slots) {
        if (!slot.hasChildNodes() || slot.textContent === "Drop here") {
          slot.innerHTML = "";
          const newCard = card.cloneNode(true);
          newCard.addEventListener("click", () => {
            slot.innerHTML = "Drop here";
          });
          slot.appendChild(newCard);
          return;
        }
      }
    }

    document.getElementById("clearAll").addEventListener("click", () => {
      const slots = document.querySelectorAll(".slot");
      slots.forEach(slot => {
        slot.innerHTML = "Drop here";
      });
    });
  </script>
</body>
</html>
