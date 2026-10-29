import fs from "node:fs";

const downloadPath = "c:/Users/pabia/Downloads/data.json";
const data = JSON.parse(fs.readFileSync(downloadPath, "utf8"));

console.log("=== STUDENTS WITH UNUSUAL NICHE STRINGS ===");
data.forEach((m, idx) => {
	const n = m.niche || "";
	if (
		/\d\./.test(n) ||
		/mau/i.test(n) ||
		/tahu/i.test(n) ||
		/focus/i.test(n) ||
		/wish/i.test(n) ||
		/something/i.test(n) ||
		/gua/i.test(n) ||
		n.length > 50
	) {
		console.log(`[${idx}] ${m.name} (${m.npm}): "${n}"`);
	}
});
