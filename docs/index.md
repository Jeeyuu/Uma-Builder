<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Uma Builder — Card Picker</title>
<style>
:root { --card-w: 118px; --gap: 10px; }
body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; width: 100%; background: #fff; color: #111; display: flex; justify-content: flex-start; }
.container { position: relative; transform: translateX(-100px); left: 0; top: 0; width: 100%; max-width: none; display: flex; gap: 20px; align-items: flex-start; }
.sidebar { flex-shrink: 0; width: 180px; display: flex; flex-direction: column; gap: 20px; }
.filter-group label { font-weight: 700; margin-bottom: 6px; display: block; }
select { padding: 6px; border-radius: 6px; border: 1px solid #ccc; background: #fff; width: 100%; }
.main-content { flex-grow: 1; display: flex; flex-direction: column; }
.slots-header { display: flex; justify-content: flex-end; margin-bottom: 8px; }
.clear-all { padding: 5px 10px; font-size: 14px; cursor: pointer; border: none; border-radius: 6px; background: #444; color: #fff; }
.slots { display: grid; grid-template-columns: repeat(6, var(--card-w)); gap: var(--gap); margin-bottom: 18px; }
.slot { border: 1px solid #ddd; padding: 8px; box-sizing: border-box; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; cursor: pointer; position: relative; width: var(--card-w); min-height: var(--card-w); }
.slot:not(.has-card) { border: 2px dashed #ccc; background: #fafafa; }
.slot img { width: 100%; height: auto; }

/* Name styling: smaller and clamp 2 lines */
.slot .name, .card .name {
  margin: 8px 0 6px 0;
  font-weight: 700;
  text-align: center;
  font-size: 12px;
  white-space: nowrap;       /* single line */
  overflow: hidden;          /* hide overflow */
  text-overflow: ellipsis;   /* add ... if too long */
}


.slot .skills, .card .skills {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.slot .skills-group, .card .skills-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.slot .skill, .card .skill {
  width: 100%;
  background: #eef2ff;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 10px;
  word-break: break-word;
  white-space: normal;
  text-align: center;
}

.cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-top: 6px; margin-bottom: 12px; }
.card { border: 1px solid #ddd; padding: 8px; box-sizing: border-box; background: #fff; display: flex; flex-direction: column; align-items: center; cursor: pointer; width: var(--card-w); position: relative; }
.card img { width: 100%; height: auto; }

.card .type-icon, .slot .type-icon { position: absolute; top: 6px; right: 6px; width: 30px; height: 30px; border: 1px solid #ccc; background: #fff; border-radius: 4px; overflow: hidden; text-align:center; font-size:10px; line-height:28px; font-weight:bold;}
.card.disabled { opacity: 0.45; pointer-events: none; }

.skills-header {
  font-weight: bold;
  font-size: 10px;
  color: #444;
  margin-bottom: 2px;
  text-align: center;
}

@media (max-width: 1100px) { :root { --card-w: 100px; } }
</style>
</head>
<body>

<div class="container">
  <div class="sidebar">
    <div class="filter-group">
      <label for="racecourse">Racecourse</label>
      <select id="racecourse">
        <option value="">-- Select --</option>
        <option>Sapporo</option><option>Hakodate</option><option>Niigata</option><option>Fukushima</option>
        <option>Nakayama</option><option>Tokyo</option><option>Chukyo</option><option>Kyoto</option>
        <option>Hanshin</option><option>Kokura</option><option>Oi</option><option>Kawasaki</option>
        <option>Funabashi</option><option>Morioka</option><option>Longchamp</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="length">Length</label>
<select id="length">
  <option value="">-- Select --</option>
  <option value="1000">1000m</option>
  <option value="1150">1150m</option>
  <option value="1200">1200m</option>
  <option value="1300">1300m</option>
  <option value="1400">1400m</option>
  <option value="1500">1500m</option>
  <option value="1600">1600m</option>
  <option value="1700">1700m</option>
  <option value="1800">1800m</option>
  <option value="1900">1900m</option>
  <option value="2000">2000m</option>
  <option value="2100">2100m</option>
  <option value="2200">2200m</option>
  <option value="2300">2300m</option>
  <option value="2400">2400m</option>
  <option value="2500">2500m</option>
  <option value="2600">2600m</option>
  <option value="3000">3000m</option>
  <option value="3200">3200m</option>
  <option value="3400">3400m</option>
  <option value="3600">3600m</option>
</select>

    </div>

    <div class="filter-group">
      <label for="direction">Direction</label>
      <select id="direction">
        <option value="">-- Select --</option>
        <option>Clockwise</option><option>Counterclockwise</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="track">Track Conditions</label>
      <select id="track">
        <option value="">-- Select --</option>
        <option>Firm</option><option>Good</option><option>Soft</option><option>Heavy</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="season">Season</label>
      <select id="season">
        <option value="">-- Select --</option>
        <option>Spring</option><option>Summer</option><option>Fall</option><option>Winter</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="weather">Weather</label>
      <select id="weather">
        <option value="">-- Select --</option>
        <option>Sunny</option><option>Cloudy</option><option>Rainy</option><option>Snowy</option>
      </select>
    </div>

    <button id="clearFiltersBtn" class="clear-all" style="margin-top:auto;">Clear Filters</button>
  </div>

  <div class="main-content">
    <div class="slots-header">
      <button class="clear-all" id="clearAllBtn">Clear All</button>
    </div>

    <div class="slots" id="slots">
      <div class="slot" data-slot="0"></div>
      <div class="slot" data-slot="1"></div>
      <div class="slot" data-slot="2"></div>
      <div class="slot" data-slot="3"></div>
      <div class="slot" data-slot="4"></div>
      <div class="slot" data-slot="5"></div>
    </div>

    <div class="card-sections" id="cardSections"></div>
  </div>
</div>

<script>
// --- Pagination helper ---
function createPagination(rowContainer, matches, pageKey, renderCardsPerPage) {
    const btnContainer = document.createElement('div');
    btnContainer.style.position = 'absolute';
    btnContainer.style.top = '-20px';
    btnContainer.style.right = '0';
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '5px';
    rowContainer.appendChild(btnContainer);

    const leftBtn = document.createElement('button');
    leftBtn.textContent = '◀';
    leftBtn.style.padding = '5px 10px';
    leftBtn.style.fontSize = '14px';
    leftBtn.style.cursor = 'pointer';
    leftBtn.style.border = 'none';
    leftBtn.style.borderRadius = '6px';
    leftBtn.style.background = '#444';
    leftBtn.style.color = '#fff';

    const rightBtn = document.createElement('button');
    rightBtn.textContent = '▶';
    rightBtn.style.padding = '5px 10px';
    rightBtn.style.fontSize = '14px';
    rightBtn.style.cursor = 'pointer';
    rightBtn.style.border = 'none';
    rightBtn.style.borderRadius = '6px';
    rightBtn.style.background = '#444';
    rightBtn.style.color = '#fff';

    btnContainer.appendChild(leftBtn);
    btnContainer.appendChild(rightBtn);

    const totalPages = Math.ceil(matches.length / 6);
    sectionPages.set(pageKey, 0);

    function updateButtons(page) {
        leftBtn.style.opacity = page > 0 ? '1' : '0.4';
        leftBtn.style.pointerEvents = page > 0 ? 'auto' : 'none';
        rightBtn.style.opacity = page < totalPages - 1 ? '1' : '0.4';
        rightBtn.style.pointerEvents = page < totalPages - 1 ? 'auto' : 'none';
    }

    leftBtn.addEventListener('click', () => {
        let page = sectionPages.get(pageKey);
        if (page > 0) {
            page--;
            sectionPages.set(pageKey, page);
            renderCardsPerPage(page);
            updateButtons(page);
        }
    });

    rightBtn.addEventListener('click', () => {
        let page = sectionPages.get(pageKey);
        if (page < totalPages - 1) {
            page++;
            sectionPages.set(pageKey, page);
            renderCardsPerPage(page);
            updateButtons(page);
        }
    });

    return function renderPage(page) {
        renderCardsPerPage(page);
        updateButtons(page);
    };
}


// --- Render sections ---
function renderSections() {
    cardSections.innerHTML = '';
    sectionPages.clear();
    let any = false;

    categories.forEach(cat => {
        const val = (document.getElementById(cat.id) || { value: '' }).value;
        if (!val) return;
        any = true;

        const section = document.createElement('div');
        section.className = 'card-section';
        const header = document.createElement('h2');
        header.textContent = `${cat.title}: ${val}`;
        section.appendChild(header);

        let rows = [];
        if (cat.id === 'length') {
            const dist = parseInt(val);
            let catLabel = '';
            if (dist <= 1400) catLabel = 'Sprint';
            else if (dist <= 1800) catLabel = 'Mile';
            else if (dist <= 2400) catLabel = 'Medium';
            else catLabel = 'Long';
            rows = [
                { title: 'Corners', term: `${catLabel} Corners` },
                { title: 'Straightaways', term: `${catLabel} Straightaways` },
                { title: dist % 400 === 0 ? 'Standard Distance' : 'Non-Standard Distance',
                  term: dist % 400 === 0 ? 'Standard Distance' : 'Non-Standard Distance' }
            ];
        } else {
            let searchTerms = [];
            switch (cat.id) {
                case 'racecourse': searchTerms.push(val + ' Racecourse'); break;
                case 'direction': searchTerms.push(val === 'Clockwise' ? 'Right-Handed' : 'Left-Handed'); break;
                case 'track': searchTerms.push(val === 'Firm' ? 'Firm Conditions' : 'Wet Conditions'); break;
                case 'season': searchTerms.push(val + ' Runner'); break;
                case 'weather': searchTerms.push(val + ' Days'); break;
            }
            rows = [{ title: cat.title, term: searchTerms }];
        }

        rows.forEach((row, rowIndex) => {
            const rowContainer = document.createElement('div');
            rowContainer.style.position = 'relative';
            rowContainer.style.marginBottom = '30px';

            const rowHeader = document.createElement('div');
            rowHeader.textContent = row.title;
            rowHeader.style.fontWeight = 'bold';
            rowHeader.style.marginBottom = '6px';
            rowContainer.appendChild(rowHeader);

            const grid = document.createElement('div');
            grid.className = 'cards';
            rowContainer.appendChild(grid);

            const matches = cardsData.filter(card =>
                (Array.isArray(row.term) ? row.term : [row.term]).some(term =>
                    (card.support_hints || []).some(h => h.toLowerCase().includes(term.toLowerCase())) ||
                    (card.event_skills || []).some(e => e.toLowerCase().includes(term.toLowerCase()))
                )
            );

            if (matches.length === 0) {
                const noMsg = document.createElement('div');
                noMsg.style.opacity = '0.6';
                noMsg.textContent = '(No matching cards)';
                grid.appendChild(noMsg);
                section.appendChild(rowContainer);
                return;
            }

            const pageKey = cat.id + '-' + rowIndex;
            const renderPage = createPagination(rowContainer, matches, pageKey, page => {
                grid.innerHTML = '';
                matches.slice(page * 6, page * 6 + 6).forEach(card => grid.appendChild(createCardElement(card)));
            });

            renderPage(0);
            section.appendChild(rowContainer);
        });

        cardSections.appendChild(section);
    });

    if (!any) {
        const msg = document.createElement('div');
        msg.style.opacity = '0.7';
        msg.style.marginTop = '8px';
        msg.textContent = 'Select options from the left to show matching card sections.';
        cardSections.appendChild(msg);
    }
}
</script>


</body>
</html>
