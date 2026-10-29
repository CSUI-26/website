import fs from "node:fs";
import { cleanNiche } from "./niche-cleaner.mjs";

const downloadPath = "c:/Users/pabia/Downloads/data.json";
const data = JSON.parse(fs.readFileSync(downloadPath, "utf8"));

const nicheCounts = {};
let modifiedCount = 0;

const sampleComparisons = [];

data.forEach((m, idx) => {
	const original = m.niche || "";
	const cleaned = cleanNiche(original);

	if (original !== cleaned) {
		modifiedCount++;
		if (sampleComparisons.length < 30) {
			sampleComparisons.push({
				name: m.name,
				before: original,
				after: cleaned,
			});
		}
	}

	const parts = cleaned
		.split(/,\s*/)
		.map((s) => s.trim())
		.filter(Boolean);
	for (const p of parts) {
		nicheCounts[p] = (nicheCounts[p] || 0) + 1;
	}
});

console.log(`Total students: ${data.length}`);
console.log(`Total modified students: ${modifiedCount}`);
console.log(`Total standardized distinct niches: ${Object.keys(nicheCounts).length}\n`);

console.log("=== ALL STANDARDIZED NICHES & COUNTS ===");
const sorted = Object.entries(nicheCounts).sort((a, b) => b[1] - a[1]);
sorted.forEach(([niche, count]) => {
	console.log(`${String(count).padStart(3)}: ${niche}`);
});

console.log("\n=== SAMPLE BEFORE & AFTER COMPARISONS ===");
sampleComparisons.forEach((item, idx) => {
	console.log(`\n[${idx + 1}] ${item.name}:`);
	console.log(`  BEFORE: "${item.before}"`);
	console.log(`  AFTER : "${item.after}"`);
});
