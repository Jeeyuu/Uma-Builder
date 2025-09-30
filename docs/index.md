<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
    }
    .container {
      display: grid;
      grid-template-columns: 25% 75%;
      max-width: 1280px;
      width: 100%;
      gap: 10px;
      padding: 10px;
      box-sizing: border-box;
    }
    .filters {
      display: flex;
      flex-direction: column;
      gap: 15px;
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
    }
    .slots-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .slots-header {
      display: flex;
      justify-content: flex-end;
    }
    #clearAll {
      padding: 5px 10px;
      cursor: pointer;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
    }
    .card {
      width: 150px;
      border: 1px solid #ccc;
      padding: 5px;
      text-align: center;
      cursor: pointer;
      background: #fff;
      word-wrap: break-word;
      overflow-wrap: break-word;
      position: relative;
    }
    .card img {
      width: 100%;
      height: auto;
      display: block;
      margin-bottom: 5px;
    }
    .slots {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
    }
    .slot {
      width: 150px;
      height: 200px;
      border: 2px dashed #aaa;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f9f9f9;
      cursor: pointer;
    }
    .slot img {
      width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- FILTERS -->
    <div class="filters">
      <div class="filter-group">
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
      <div class="filter-group">
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
      <div class="filter-group">
        <label for="lengthType">Length Type</label>
        <select id="lengthType">
          <option value="">-- Select --</option>
          <option>Sprint</option>
          <option>Mile</option>
          <option>Medium</option>
          <option>Long</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="direction">Direction</label>
        <select id="direction">
          <option value="">-- Select --</option>
          <option>Clockwise</option>
          <option>Counterclockwise</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="track">Track Conditions</label>
        <select id="track">
          <option value="">-- Select --</option>
          <option>Firm</option>
          <option>Good</option>
          <option>Soft</option>
          <option>Heavy</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="season">Season</label>
        <select id="season">
          <option value="">-- Select --</option>
          <option>Spring</option>
          <option>Summer</option>
          <option>Fall</option>
          <option>Winter</option>
        </select>
      </div>
      <div class="filter-group">
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

    <!-- SLOTS + CARDS -->
    <div class="slots-container">
      <div class="slots-header">
        <button id="clearAll">Clear All</button>
      </div>
      <div class="cards" id="cardPool">
        <div class="card" data-racecourse="Tokyo" data-length="1600m" data-lengthtype="Mile" data-direction="Clockwise" data-track="Firm" data-season="Spring" data-weather="Sunny">
          <img src="https://via.placeholder.com/100x150?text=Tokyo1600" alt="Tokyo 1600">
          <div>Tokyo 1600m</div>
        </div>
        <div class="card" data-racecourse="Kyoto" data-length="2000m" data-lengthtype="Medium" data-direction="Counterclockwise" data-track="Soft" data-season="Fall" data-weather="Rainy">
          <img src="https://via.placeholder.com/100x150?text=Kyoto2000" alt="Kyoto 2000">
          <div>Kyoto 2000m</div>
        </div>
      </div>
      <div class="slots" id="slotsArea">
        <div class="slot"></div>
        <div class="slot"></div>
        <div class="slot"></div>
      </div>
    </div>
  </div>

  <script>
    const dropdowns = document.querySelectorAll('#racecourse, #length, #lengthType, #direction, #track, #season, #weather');
    const cards = document.querySelectorAll('.card');
    const slots = document.querySelectorAll('.slot');
    const clearAllBtn = document.getElementById('clearAll');

    // Filtering
    function filterCards() {
      const filters = {
        racecourse: document.getElementById('racecourse').value,
        length: document.getElementById('length').value,
        lengthtype: document.getElementById('lengthType').value,
        direction: document.getElementById('direction').value,
        track: document.getElementById('track').value,
        season: document.getElementById('season').value,
        weather: document.getElementById('weather').value,
      };

      cards.forEach(card => {
        let visible = true;
        for (let key in filters) {
          if (filters[key] && card.dataset[key] !== filters[key]) {
            visible = false;
            break;
          }
        }
        card.style.display = visible ? 'block' : 'none';
      });
    }
    dropdowns.forEach(dropdown => dropdown.addEventListener('change', filterCards));

    // Slot logic
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const emptySlot = Array.from(slots).find(slot => slot.children.length === 0);
        if (emptySlot) {
          const clone = card.cloneNode(true);
          clone.addEventListener('click', () => {
            clone.remove();
            card.style.display = 'block';
          });
          emptySlot.appendChild(clone);
          card.style.display = 'none';
        }
      });
    });

    // Clear all
    clearAllBtn.addEventListener('click', () => {
      slots.forEach(slot => slot.innerHTML = '');
      cards.forEach(card => card.style.display = 'block');
    });
  </script>
</body>
</html>
