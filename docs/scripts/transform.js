const fs = require('fs');
const path = require('path');

const supportsPath = path.join(__dirname, '..', 'supports.json');
const skillsPath = path.join(__dirname, '..', 'skills.json');
const outputPath = path.join(__dirname, '..', 'transformed_supports.json');
const archiveDir = path.join(__dirname, '..', 'archive');

// Ensure archive dir exists
if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir);

// Read and parse JSON safely
function readJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(`Failed to parse ${filePath}. Check if it is valid JSON:`);
    console.error(data.slice(0, 500)); // print first 500 chars
    process.exit(1);
  }
}

const supports = readJSON(supportsPath);
const skills = readJSON(skillsPath);

// Build a skill lookup by ID for easy numeral → name mapping
const skillMap = {};
skills.forEach(skill => {
  skillMap[skill.id] = skill.enname || skill.name_en || "Unknown Skill";
});

// Transform supports data
const transformed = supports.map(s => {
  const eventSkills = s.event_skills.map(id => skillMap[id] || id);
  const hintSkills = (s.hints?.hint_skills || []).map(id => skillMap[id] || id);

  return {
    char_id: s.char_id,
    char_name: s.char_name,
    event_skills: s.event_skills,
    event_skills_en: eventSkills,
    hint_skills: hintSkills,
    obtained: s.obtained,
    rarity: s.rarity,
    release: s.release,
    release_en: s.release_en,
    type: s.type,
    url_name: s.url_name
  };
});

// Save current transformed file
fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2));

// Save to archive with timestamp
const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const archivePath = path.join(archiveDir, `transformed_supports_${timestamp}.json`);
fs.writeFileSync(archivePath, JSON.stringify(transformed, null, 2));

// Prune old archives (keep last 7 days)
const files = fs.readdirSync(archiveDir);
const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
files.forEach(file => {
  const filePath = path.join(archiveDir, file);
  if (fs.statSync(filePath).mtimeMs < cutoff) fs.unlinkSync(filePath);
});

console.log("Transformation and archive complete!");
