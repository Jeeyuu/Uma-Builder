<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Uma Builder</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    .slots {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 50px;
      position: relative;
    }
    .slot {
      width: 150px;
      min-height: 150px;
      border: 2px dashed #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 5px;
      position: relative;
      background: #f9f9f9;
    }
    .slot img {
      width: 100%;
      cursor: pointer;
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
    .remove-btn {
      position: absolute;
      top: -20px;
      right: 0;
      background: red;
      color: white;
      border: none;
      padding: 2px 5px;
      cursor: pointer;
      display: none;
    }
    .slot.has-card .remove-btn {
      display: block;
    }
    .cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }
    .card {
      width: 150px;
      border: 1px solid #ccc;
      padding: 5px;
      text-align: center;
      cursor: pointer;
      background: #fff;
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
  </style>
</head>
<body>
  <h1>Uma Builder</h1>
  <div class="slots">
    <button class="clear-all">Clear All</button>
    <div class="slot"><button class="remove-btn">X</button></div>
    <div class="slot"><button class="remove-btn">X</button></div>
    <div class="slot"><button class="remove-btn">X</button></div>
    <div class="slot"><button class="remove-btn">X</button></div>
    <div class="slot"><button class="remove-btn">X</button></div>
    <div class="slot"><button class="remove-btn">X</button></div>
  </div>

  <div class="cards" id="cards-container"></div>

  <script>
    const cardsData = Array.from({length: 10}, (_, i) => {
      const id = 10001 + i;
      return {
        id: id,
        name: `Card ${id}`,
        image: `https://gametora.com/images/umamusume/supports/support_card_s_${id}.png`,
        skills: Array.from({length: Math.floor(Math.random() * 5) + 1}, (_, j) => `Skill ${j + 1}`)
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
        <button class="remove-btn">X</button>
        <img src="${card.image}" alt="${card.name}">
        <div class="skills">
          ${card.skills.map(skill => `<div class="skill">${skill}</div>`).join('')}
        </div>
      `;

      // Remove on button click
      availableSlot.querySelector('.remove-btn').addEventListener('click', () => removeFromSlot(availableSlot, card.id));
      // Remove on image click
      availableSlot.querySelector('img').addEventListener('click', () => removeFromSlot(availableSlot, card.id));

      document.querySelector(`.card[data-id="${card.id}"]`).classList.add('disabled');
    }

    function removeFromSlot(slot, cardId) {
      slot.classList.remove('has-card');
      slot.innerHTML = `<button class="remove-btn">X</button>`;
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
          slot.innerHTML = `<button class="remove-btn">X</button>`;
        }
      });
    });

    renderCards();
  </script>
</body>
</html>
