import fs from "node:fs";

const downloadPath = "c:/Users/pabia/Downloads/data.json";
const data = JSON.parse(fs.readFileSync(downloadPath, "utf8"));

const allUnique = new Set();
const studentNiches = [];

data.forEach((m, idx) => {
	if (!m.niche) return;
	studentNiches.push({ idx, name: m.name, raw: m.niche });
	// Check delimiters: comma, slash, semicolon, bullet, etc.
	// We'll see how raw niches are composed
	const parts = m.niche.split(/[,;\n•|]/);
	for (const p of parts) {
		const trimmed = p.trim();
		if (trimmed) allUnique.add(trimmed);
	}
});

const sorted = Array.from(allUnique).sort((a, b) => a.localeCompare(b));
fs.writeFileSync(
	"scripts/all-unique-niches.json",
	JSON.stringify(sorted, null, 2),
);
console.log(`Saved ${sorted.length} unique niche items.`);
