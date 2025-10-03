const fs = require('fs');
const path = require('path');

const supportsPath = './docs/supports.json';
const skillsPath = './docs/skills.json';
const archiveDir = './docs/archive';
const transformedPath = './docs/transformed_supports.json';

function loadJson(filePath) {
  const data = fs.readFileSync(filePath, 'utf8').trim();
  if (!data.startsWith('[') && !data.startsWith('{')) {
    console.error(`❌ ${filePath} is not valid JSON. Aborting.`);
    process.exit(1);
  }
  return JSON.parse(data);
}

const supports = loadJson(supportsPath);
const skills = loadJson(skillsPath);

// Map skill ID -> English name
const skillMap = {};
skills.forEach(skill => {
  skillMap[skill.id || skill.iconid] = skill.name_en || skill.enname;
});

// Transform supports
const transformed = supports.map(card => ({
  char_id: card.char_id,
  char_name: card.char_name,
  event_skills: card.event_skills.map(id => skillMap[id] || id),
  event_skills_en: (card.event_skills_en || []).map(id => skillMap[id] || id),
  hint_skills: (card.hints?.hint_skills || []).map(id => skillMap[id] || id),
  obtained: card.obtained,
  rarity: card.rarity,
  release: card.release,
  release_en: card.release_en,
  type: card.type,
  url_name: card.url_name
}));

// Ensure archive folder exists
if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, { recursive: true });

// Save transformed JSON
fs.writeFileSync(transformedPath, JSON.stringify(transformed, null, 2));

// Archive with date
const timestamp = new Date().toISOString().slice(0, 10);
const archivePath = path.join(archiveDir, `transformed_supports_${timestamp}.json`);
fs.writeFileSync(archivePath, JSON.stringify(transformed, null, 2));

// Prune older than 7 days
fs.readdirSync(archiveDir).forEach(file => {
  const match = file.match(/transformed_supports_(\d{4}-\d{2}-\d{2})\.json/);
  if (match) {
    const fileDate = new Date(match[1]);
    const age = (Date.now() - fileDate.getTime()) / (1000 * 60 * 60 * 24);
    if (age > 7) fs.unlinkSync(path.join(archiveDir, file));
  }
});

// Touch skills.json to ensure commit
fs.writeFileSync('./docs/skills.json', fs.readFileSync('./docs/skills.json', 'utf8'));

console.log(`✅ Transformed ${transformed.length} support cards`);
