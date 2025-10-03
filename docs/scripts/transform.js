const fs = require("fs");
const path = require("path");

// Load JSONs
const supports = JSON.parse(fs.readFileSync("docs/supports.json", "utf8"));
const skills = JSON.parse(fs.readFileSync("docs/skills.json", "utf8"));

// Build skill dictionary (id -> English name)
const skillLookup = {};
skills.forEach(skill => {
  skillLookup[skill.id] = skill.name_en || skill.enname || `Skill ${skill.id}`;
});

// Transform supports
const transformed = supports.map(card => {
  return {
    char_id: card.char_id,
    char_name: card.char_name,
    url_name: card.url_name,
    rarity: card.rarity,
    type: card.type,
    obtained: card.obtained,
    release: card.release,
    release_en: card.release_en,
    event_skills: card.event_skills,
    event_skills_en: card.event_skills.map(id => skillLookup[id] || `Skill ${id}`),
    hints_skills: card.hints.hint_skills.map(id => skillLookup[id] || `Skill ${id}`)
  };
});

// Save the main transformed file
const mainOutput = "docs/transformed_supports.json";
fs.writeFileSync(mainOutput, JSON.stringify(transformed, null, 2), "utf8");

// Archive system
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
const archiveDir = "docs/archive";
if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir);

const archiveFile = path.join(archiveDir, `transformed_supports_${today}.json`);
fs.writeFileSync(archiveFile, JSON.stringify(transformed, null, 2), "utf8");
console.log(`✅ Transformed supports.json updated and archived as ${archiveFile}`);

// Prune archives older than 7 days
const files = fs.readdirSync(archiveDir);
const now = new Date();
files.forEach(file => {
  const match = file.match(/transformed_supports_(\d{4}-\d{2}-\d{2})\.json$/);
  if (match) {
    const fileDate = new Date(match[1]);
    const diffDays = (now - fileDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) {
      fs.unlinkSync(path.join(archiveDir, file));
      console.log(`🗑️ Deleted old archive: ${file}`);
    }
  }
});
