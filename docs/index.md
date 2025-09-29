<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Uma Builder</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }

    .slots-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      position: relative;
    }

    .slot {
      width: 120px;
      min-height: 120px;
      border: 2px dashed #aaa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 5px;
      background: #f9f9f9;
      position: relative; /* so absolute children align inside */
    }

    .slot img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin-bottom: 5px;
    }

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      justify-content: center;
    }

    .skill {
      background: #e0e0ff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
    }

    .card-list {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }

    .card {
      border: 1px solid #ccc;
      padding: 10px;
      width: 120px;
      cursor: pointer;
      text-align: center;
      background: #fff;
      transition: opacity 0.3s ease;
    }

    .card img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin-bottom: 5px;
    }

    .card.disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    .clear-btn {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #ff6666;
      border: none;
      color: white;
      font-size: 12px;
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 6px;
    }

    .remove-btn {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ff9999;
      border: none;
      padding: 2px 6px;
      font-size: 12px;
      cursor: pointer;
      border-radius: 50%;
      line-height: 1;
    }
  </style>
</head>
<body>
  <h1>Uma Builder</h1>

  <div class="slots-container">
    <button class="clear-btn" onclick="clearAllSlots()">Clear All</button>
    <div class="slot" data-slot="0"></div>
    <div class="slot" data-slot="1"></div>
    <div class="slot" data-slot="2"></div>
    <div class="slot" data-slot="3"></div>
    <div class="slot" data-slot="4"></div>
    <div class="slot" data-slot="5"></div>
  </div>

  <h2>Available Cards</h2>
  <div class="card-list" id="cardList"></div>

  <script>
    const cards = [
      { id: 1, name: "Card A", img: "https://via.placeholder.com/100", skills: ["Skill 1", "Skill 2", "Skill 3"] },
      { id: 2, name: "Card B", img: "https://via.placeholder.com/100", skills: ["Skill X", "Skill Y"] },
      { id: 3, name: "Card C", img: "https://via.placeholder.com/100", skills: ["Skill Alpha", "Skill Beta", "Skill Gamma", "Skill Delta"] },
      { id: 4, name: "Card D", img: "https://via.placeholder.com/100", skills: ["Skill Red", "Skill Blue"] },
      { id: 5, name: "Card E", img: "https://via.placeholder.com/100", skills: ["Skill Zeta"] },
    ];

    const cardList = document.getElementById("cardList");
    const slots = document.querySelectorAll(".slot");

    // Render card list
    cards.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.dataset.id = card.id;

      cardDiv.innerHTML = `
        <img src="${card.img}" alt="${card.name}">
        <div>${card.name}</div>
        <div class="skills">
          ${card.skills.map(skill => `<div class="skill">${skill}</div>`).join("")}
        </div>
      `;

      cardDiv.addEventListener("click", () => selectCard(card));
      cardList.appendChild(cardDiv);
    });

    function selectCard(card) {
      const emptySlot = [...slots].find(slot => slot.children.length === 0);
      if (!emptySlot) return;

      emptySlot.innerHTML = `
        <button class="remove-btn" onclick="removeCard(${card.id}, ${emptySlot.dataset.slot})">&times;</button>
        <img src="${card.img}" alt="${card.name}">
        <div>${card.name}</div>
        <div class="skills">
          ${card.skills.map(skill => `<div class="skill">${skill}</div>`).join("")}
        </div>
      `;

      disableCard(card.id, true);
    }

    function removeCard(cardId, slotIndex) {
      const slot = document.querySelector(`.slot[data-slot="${slotIndex}"]`);
      slot.innerHTML = "";
      disableCard(cardId, false);
    }

    function clearAllSlots() {
      slots.forEach(slot => slot.innerHTML = "");
      cards.forEach(c => disableCard(c.id, false));
    }

    function disableCard(cardId, disable) {
      const cardEl = document.querySelector(`.card[data-id="${cardId}"]`);
      if (cardEl) {
        if (disable) {
          cardEl.classList.add("disabled");
        } else {
          cardEl.classList.remove("disabled");
        }
      }
    }
  </script>
</body>
</html>
