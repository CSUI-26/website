import fs from "node:fs";
import { cleanNiche } from "./niche-cleaner.mjs";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";

const downloadPath = "c:/Users/pabia/Downloads/data.json";
const srcPath = "c:/Users/pabia/Documents/Antigravity/zenith/src/data.json";

const rawData = JSON.parse(fs.readFileSync(downloadPath, "utf8"));

let cleanedCount = 0;
const cleanedData = rawData.map((m) => {
	const original = m.niche || "";
	const cleaned = cleanNiche(original);
	if (original !== cleaned) {
		cleanedCount++;
	}
	return {
		...m,
		niche: cleaned,
	};
});

console.log(`Cleaned niches for ${cleanedCount} out of ${cleanedData.length} students.`);

// 1. Write to c:/Users/pabia/Downloads/data.json
fs.writeFileSync(downloadPath, `${JSON.stringify(cleanedData, null, "\t")}\n`, "utf8");
console.log(`Updated ${downloadPath}`);

// 2. Write to src/data.json
fs.writeFileSync(srcPath, `${JSON.stringify(cleanedData, null, "\t")}\n`, "utf8");
console.log(`Updated ${srcPath}`);

// 3. Sync to Cloud Firestore
const firebaseConfig = {
	projectId: "zenith-csui",
	appId: "1:1029895060300:web:bfd064b730f75f422bede9",
	storageBucket: "zenith-csui.firebasestorage.app",
	apiKey: "AIzaSyDUwvQ1UTjhpZ9AJY__jxP4iUMY8IOp1ac",
	authDomain: "zenith-csui.firebaseapp.com",
	messagingSenderId: "1029895060300",
	projectNumber: "1029895060300",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncToFirestore() {
	console.log("Updating Cloud Firestore with cleaned niches...");
	const batchSize = 400;
	for (let i = 0; i < cleanedData.length; i += batchSize) {
		const chunk = cleanedData.slice(i, i + batchSize);
		const batch = writeBatch(db);
		for (const member of chunk) {
			if (!member.npm) continue;
			const ref = doc(db, "members", member.npm);
			batch.set(ref, member, { merge: true });
		}
		await batch.commit();
		console.log(`Committed batch ${Math.min(i + batchSize, cleanedData.length)} / ${cleanedData.length}`);
	}
	console.log("Firestore update complete!");
	process.exit(0);
}

syncToFirestore().catch((err) => {
	console.error("Firestore sync error:", err);
	process.exit(1);
});
