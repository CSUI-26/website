import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "../src/data.json");
const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

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

async function seed() {
  console.log(`Starting Firestore migration for ${rawData.length} members...`);
  const chunkSize = 400; // Batch write limit is 500

  for (let i = 0; i < rawData.length; i += chunkSize) {
    const chunk = rawData.slice(i, i + chunkSize);
    const batch = writeBatch(db);

    for (const member of chunk) {
      const docId = member.npm;
      if (!docId) continue;
      const ref = doc(db, "members", docId);
      batch.set(ref, member);
    }

    await batch.commit();
    console.log(
      `Uploaded batch ${i + 1} - ${Math.min(i + chunkSize, rawData.length)} of ${rawData.length}`
    );
  }

  console.log("Seeding complete! All members uploaded to Cloud Firestore.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
