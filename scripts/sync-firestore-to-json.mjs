import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "../src/data.json");

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

async function sync() {
  console.log("Fetching latest members from Cloud Firestore...");
  const snapshot = await getDocs(collection(db, "members"));
  const members = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    // Remove internal metadata before saving to static data.json
    delete data.updatedAt;
    members.push(data);
  });

  if (members.length === 0) {
    console.log("No members found in Firestore. Skipping overwrite.");
    process.exit(0);
  }

  // Sort alphabetically
  members.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  fs.writeFileSync(dataPath, `${JSON.stringify(members, null, "\t")}\n`, "utf-8");
  console.log(`Successfully synced ${members.length} members from Cloud Firestore into src/data.json!`);
  process.exit(0);
}

sync().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
