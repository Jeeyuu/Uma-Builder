:root {
  --img-h: 140px; /* image height */
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px;
  background: #fff;
  color: #111;
}

/* Container */
.container {
  max-width: 2560px; /* full width */
  margin: 0 auto;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* Sidebar */
.sidebar {
  flex: 0 0 175px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-weight: 700;
  margin-bottom: 6px;
}

select {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
}

/* Main content */
.main-content {
  flex: 1;
  min-width: 0; /* allow flex shrink */
}

/* Clear button */
.slots-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.clear-all {
  background: #444;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

/* Slots grid */
.slots {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}

.slot {
  min-height: 150px;
  border: 2px dashed #ccc;
  background: #fafafa;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  position: relative;
  width: 100%; /* fit grid column */
}

.slot.has-card {
  border-color: #9aa;
  background: #fff;
}

/* Cards grid */
.cards {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 6px;
}

.card {
  border: 1px solid #ddd;
  padding: 8px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 100%; /* fit grid column */
}

/* Images: fixed height */
.card img,
.slot img {
  width: 100%;
  height: var(--img-h);
  object-fit: contain;
  display: block;
}

/* Name */
.name {
  margin: 8px 0 6px 0;
  font-weight: 600;
  text-align: center;
  word-break: break-word;
}

/* Skills: overflow width, keep text readable */
.skills {
  width: 200%;       /* twice as wide visually */
  max-width: 500px;  /* optional: constrain extreme overflow */
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill {
  background: #eef2ff;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 12px;
  box-sizing: border-box;
  word-break: break-word;
  white-space: normal;
}

/* Type icon */
.card .type-icon,
.slot .type-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

/* Disabled card style */
.card.disabled {
  opacity: 0.45;
  pointer-events: none;
}

/* Responsiveness */
@media (max-width: 1100px) {
  :root {
    --img-h: 120px;
  }
}

@media (max-width: 900px) {
  :root {
    --img-h: 100px;
  }
}

@media (max-width: 640px) {
  .container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .sidebar .filter-group {
    flex: 1;
    min-width: 150px;
  }
}
