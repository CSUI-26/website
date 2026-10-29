import fs from "node:fs";

const downloadPath = "c:/Users/pabia/Downloads/data.json";
const data = JSON.parse(fs.readFileSync(downloadPath, "utf8"));

const counts = {};
const rawNicheStrings = [];

data.forEach((m) => {
	if (!m.niche) return;
	rawNicheStrings.push(m.niche);
	// Test splitting by comma or semicolon
	const parts = m.niche
		.split(/[,;]/)
		.map((s) => s.trim())
		.filter(Boolean);
	for (const p of parts) {
		counts[p] = (counts[p] || 0) + 1;
	}
});

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

console.log(`Total students: ${data.length}`);
console.log(`Students with niche: ${rawNicheStrings.length}`);
console.log(`Unique niche phrases: ${sorted.length}\n`);

console.log("=== TOP 60 NICHES ===");
for (const [n, c] of sorted.slice(0, 60)) {
	console.log(`${String(c).padStart(3)}: "${n}"`);
}

console.log("\n=== NICHES 60 to 140 ===");
for (const [n, c] of sorted.slice(60, 140)) {
	console.log(`${String(c).padStart(3)}: "${n}"`);
}
