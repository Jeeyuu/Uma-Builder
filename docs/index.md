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

    .slots-wrapper {
      position: relative;
      margin-bottom: 40px; /* add space for Clear All */
      margin-right: 10px;
    }

    .slots-container {
      display: flex;
      gap: 10px;
    }

    .slot {
      width: 100px;
      min-height: 100px;
      border: 2px dashed #aaa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 5px;
      background: #f9f9f9;
      position: relative; /* so remove button aligns inside */
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
      gap: 5px;
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
      gap: 10px;
    }

    .card {
      border: 1px solid #ccc;
      width: 100px;
      min-height: 100px;
      padding: 5px;
      cursor: pointer;
      text-align: center;
      background: #fff;
      transition: opacity 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
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
      top: -25px;   /* move it above slots */
      right: 0;
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
      padding: 2px 2px;
      font-size: 12px;
      cursor: pointer;
      border-radius: 50%;
      line-height: 1;
    }
  </style>
</head>
<body>
  <h1>Uma Builder</h1>

  <div class="slots-wrapper">
    <button class="clear-btn" onclick="clearAllSlots()">Clear All</button>
    <div class="slots-container">
      <div class="slot" data-slot="0"></div>
      <div class="slot" data-slot="1"></div>
      <div class="slot" data-slot="2"></div>
      <div class="slot" data-slot="3"></div>
      <div class="slot" data-slot="4"></div>
      <div class="slot" data-slot="5"></div>
    </div>
  </div>

  <h2>Available Cards</h2>
  <div class="card-list" id="cardList"></div>

  <script>
    // Generate 10 placeholder cards with IDs 10001–10010
    const cards = Array.from({ length: 10 }, (_, i) => {
      const id = 10001 + i;
      return {
        id,
        name: `Card ${id}`,
        img: `https://gametora.com/images/umamusume/supports/support_card_s_${id}.png`,
        skills: [`Skill ${id}-1`, `Skill ${id}-2`], // placeholder skills
      };
    });

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
