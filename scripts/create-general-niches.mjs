import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. PATHS - READ ONLY FOR data_untouched.json!
const untouchedPath = "C:/Users/pabia/Downloads/data_untouched.json";
const downloadsTargetPath = "C:/Users/pabia/Downloads/data.json";
const localDataPath = path.resolve(__dirname, "../src/data.json");

console.log("Reading untouched source data (READ-ONLY) from:", untouchedPath);
const untouchedData = JSON.parse(fs.readFileSync(untouchedPath, "utf-8"));

console.log("Reading current source data from:", localDataPath);
const currentData = JSON.parse(fs.readFileSync(localDataPath, "utf-8"));
const currentMap = new Map(currentData.map((m) => [m.npm, m]));

/**
 * Normalizes an individual token into standard English nomenclature.
 * Only groups same-concept terms typed differently or in different languages.
 * Preserves specific expressive terms (e.g. Stray Kids, BTS, individual hobbies).
 */
function normalizeSingleToken(raw) {
	if (!raw) return null;
	let s = raw.trim();

	// Strip leading/trailing bullets, dashes, digits, list markers
	s = s.replace(/^[-•*–—\d.)\s]+/, "");
	s = s.replace(/[.]+$/, "").trim();

	// Strip leading conjunctions like "dan ", "and ", "& "
	s = s.replace(/^(?:dan|and|&)\s+/i, "").trim();

	if (!s || s === "-" || s.toLowerCase() === "something") {
		return null;
	}

	const lower = s.toLowerCase();

	// Discard filler phrases
	if (
		lower.includes("belum tahu") ||
		lower.includes("something that would make") ||
		lower === "dan" ||
		lower === "and"
	) {
		return null;
	}

	// 1. UI/UX Rules ("UI and UX becomes one, UI/UX")
	if (
		lower === "ui" ||
		lower === "ux" ||
		lower === "ui/ux" ||
		lower === "ui / ux" ||
		lower === "ui ux" ||
		lower === "ui-ux" ||
		lower === "ui & ux" ||
		lower === "ui/ux design" ||
		lower === "ui/ux designer" ||
		lower === "ui/ux designing" ||
		lower === "ui/ux development" ||
		lower === "ui ux designer" ||
		lower === "desain ui/ux" ||
		lower === "user interface" ||
		lower === "user experience" ||
		lower === "user interface/experience" ||
		lower === "product design" ||
		lower === "visual design and ui/ux" ||
		lower === "ux research" ||
		lower === "ux researcher" ||
		lower === "digital design" ||
		lower === "design"
	) {
		return "UI/UX";
	}

	// 2. Website Development ("WebDev ... said completely like Website Development")
	if (
		lower === "webdev" ||
		lower === "web dev" ||
		lower === "web development" ||
		lower === "web-development" ||
		lower === "web developer" ||
		lower === "web design" ||
		lower === "pengembangan web" ||
		lower === "website development" ||
		lower === "website dev"
	) {
		return "Website Development";
	}

	// 3. Game Development ("GameDev ... said completely like Game Development")
	if (
		lower === "gamedev" ||
		lower === "game dev" ||
		lower === "game development" ||
		lower === "game developer" ||
		lower === "game developing" ||
		lower === "game design" ||
		lower === "narrative design" ||
		lower === "pengembangan game" ||
		lower === "lil bit of game dev"
	) {
		return "Game Development";
	}

	// 4. Mobile Development
	if (
		lower === "mobile dev" ||
		lower === "mobile development" ||
		lower === "mobile app development" ||
		lower === "app development" ||
		lower === "application developer" ||
		lower === "apps developemnet" ||
		lower === "programming and apps developemnet" ||
		lower === "ios" ||
		lower === "android" ||
		lower === "flutter"
	) {
		return "Mobile Development";
	}

	// 5. Frontend Development
	if (
		lower === "frontend" ||
		lower === "front-end" ||
		lower === "front end" ||
		lower === "frontend development" ||
		lower === "front-end development" ||
		lower === "front - end development" ||
		lower === "frontend developer" ||
		lower === "front-end developer"
	) {
		return "Frontend Development";
	}

	// 6. Backend Development
	if (
		lower === "backend" ||
		lower === "back-end" ||
		lower === "back end" ||
		lower === "backend development" ||
		lower === "back-end development" ||
		lower === "back-end dev" ||
		lower === "backend developer" ||
		lower === "distributed systems engineer (backend)"
	) {
		return "Backend Development";
	}

	// 7. Fullstack Development
	if (
		lower === "fullstack" ||
		lower === "full stack" ||
		lower === "full-stack" ||
		lower === "fullstack development" ||
		lower === "full stack development" ||
		lower === "full-stack development" ||
		lower === "fullstack dev" ||
		lower === "fullstack developer" ||
		lower === "fullstack ai development"
	) {
		return "Fullstack Development";
	}

	// 8. Software Engineering
	if (
		lower === "swe" ||
		lower === "software" ||
		lower === "software engineering" ||
		lower === "software engineer" ||
		lower === "software development" ||
		lower === "software developer" ||
		lower === "sofftware engineer" ||
		lower === "software enginner" ||
		lower === "rekayasa perangkat lunak" ||
		lower === "i wanna focus on learning software engineering" ||
		lower === "programming" ||
		lower === "coding" ||
		lower === "it development" ||
		lower === "development"
	) {
		return "Software Engineering";
	}

	// 9. Cybersecurity
	if (
		lower === "cybersecurity" ||
		lower === "cyber security" ||
		lower === "cysec" ||
		lower === "cyber it" ||
		lower === "cyber" ||
		lower === "keamanan siber" ||
		lower === "cybersecurity (dfir)" ||
		lower === "cybersecurity (mau)" ||
		lower === "cyber security(priority)" ||
		lower.includes("ethical hacking") ||
		lower.includes("penetration testing") ||
		lower === "pen testing" ||
		lower === "digital forensic" ||
		lower.includes("zero trust") ||
		lower.includes("blue teaming") ||
		lower === "reverse engineering"
	) {
		return "Cybersecurity";
	}

	// 10. Artificial Intelligence
	if (
		lower === "ai" ||
		lower === "artificial intelligence" ||
		lower === "artificial intelegent" ||
		lower === "artificial-intelligence" ||
		lower === "artificial intelligence (ai)" ||
		lower === "kecerdasan buatan" ||
		lower === "ai engineer" ||
		lower === "ai engineering" ||
		lower === "ai scientist" ||
		lower === "ai-officer" ||
		lower === "ai integration" ||
		lower === "applied ai integration" ||
		lower === "ai develoment" ||
		lower === "mau fokus di bidang ai" ||
		lower === "ai for social impact"
	) {
		return "Artificial Intelligence";
	}

	// 11. Machine Learning
	if (
		lower === "machine learning" ||
		lower === "machine-learning" ||
		lower === "machine learning (ml)" ||
		lower === "ml" ||
		lower === "mechine learning" ||
		lower === "machine learning engineer" ||
		lower.includes("machine learning optimization") ||
		lower === "reinforcement learning" ||
		lower === "deep learning"
	) {
		return "Machine Learning";
	}

	// 12. Large Language Models (LLM)
	if (
		lower === "llm" ||
		lower === "llms" ||
		lower === "large language model" ||
		lower === "large language models" ||
		lower === "generative ai" ||
		lower === "prompt engineering"
	) {
		return "Large Language Models (LLM)";
	}

	// 13. Data Science
	if (
		lower === "data science" ||
		lower === "data-science" ||
		lower === "datascience" ||
		lower === "data sciences" ||
		lower === "data sciene" ||
		lower === "data scientist" ||
		lower === "data scientists" ||
		lower === "data sains" ||
		lower === "sains data" ||
		lower === "data science (mau)" ||
		lower === "ds"
	) {
		return "Data Science";
	}

	// 14. Data Analytics
	if (
		lower === "data analyst" ||
		lower === "data analytics" ||
		lower === "data analysis" ||
		lower === "data analytic" ||
		lower === "analisis data" ||
		lower === "data & growth analyst" ||
		lower === "growth analyst" ||
		lower === "data storytelling" ||
		lower === "data mining" ||
		lower === "data" ||
		lower === "analytics" ||
		lower === "analyst"
	) {
		return "Data Analytics";
	}

	// 15. Data Engineering
	if (
		lower === "data engineering" ||
		lower === "data engineer" ||
		lower === "data processing" ||
		lower === "data management"
	) {
		return "Data Engineering";
	}

	// 16. Big Data Analytics
	if (lower === "big data" || lower === "big data analytics") {
		return "Big Data Analytics";
	}

	// 17. Cloud Computing
	if (
		lower === "cloud computing" ||
		lower === "cloud compute" ||
		lower === "cloud" ||
		lower === "cloud architecture" ||
		lower === "cloud engineering" ||
		lower === "cloudeng" ||
		lower === "cloud architect" ||
		lower === "i wish i’d be great at cloud architect"
	) {
		return "Cloud Computing";
	}

	// 18. DevOps
	if (
		lower === "devops" ||
		lower === "devops engineer" ||
		lower === "devsecops" ||
		lower === "opdev"
	) {
		return "DevOps";
	}

	// 19. Product Management
	if (
		lower === "product management" ||
		lower === "product manager" ||
		lower === "product-management" ||
		lower === "pm" ||
		lower === "product" ||
		lower === "product development" ||
		lower === "ai product" ||
		lower === "ai product management"
	) {
		return "Product Management";
	}

	// 20. Project Management
	if (
		lower === "project management" ||
		lower === "project manager" ||
		lower === "project/product manager" ||
		lower === "project" ||
		lower === "agile project management" ||
		lower === "people management"
	) {
		return "Project Management";
	}

	// 21. Business Analysis
	if (
		lower === "business analysis" ||
		lower === "business analyst" ||
		lower === "business analytics" ||
		lower === "it business analysis" ||
		lower === "it business analyst" ||
		lower === "system analyst" ||
		lower === "systems analysis" ||
		lower === "system analysis" ||
		lower === "systems analytic" ||
		lower === "bussiness analyst" ||
		lower === "business systems analysis" ||
		lower === "business intelligence" ||
		lower === "business process management" ||
		lower === "system architecture" ||
		lower === "system l" ||
		lower === "analisis sistem" ||
		lower === "sistem analisis"
	) {
		return "Business Analysis";
	}

	// 22. Business
	if (
		lower === "business" ||
		lower === "bisnis" ||
		lower === "bisnis it" ||
		lower === "bussiness" ||
		lower === "gua fokus ke bidang bisnis sih" ||
		lower === "business management" ||
		lower === "management bussines" ||
		lower === "manajemen bisnis" ||
		lower === "management" ||
		lower === "digital business" ||
		lower === "digital business & management" ||
		lower === "e-business" ||
		lower === "startup & entrepreneurship" ||
		lower === "startup" ||
		lower === "entrepreneurship" ||
		lower === "start up" ||
		lower === "business technology" ||
		lower === "digital transformation" ||
		lower === "enterprise" ||
		lower === "tech" ||
		lower === "technology"
	) {
		return "Business";
	}

	// 23. IT Consulting
	if (
		lower === "it consulting" ||
		lower === "it consultant" ||
		lower === "it-consulting" ||
		lower === "consulting" ||
		lower === "business consultant" ||
		lower === "it business consulting" ||
		lower === "tech consulting" ||
		lower === "konsultan it"
	) {
		return "IT Consulting";
	}

	// 24. Competitive Programming
	if (
		lower === "competitive programming" ||
		lower === "competitive programming (cp)" ||
		lower === "cp" ||
		lower === "algorithm and data structure" ||
		lower === "data structure and algorithm" ||
		lower === "data structure" ||
		lower === "algorithm" ||
		lower === "algorithms"
	) {
		return "Competitive Programming";
	}

	// 25. Internet of Things (IoT)
	if (
		lower === "iot" ||
		lower === "internet of things" ||
		lower === "internet of things (iot)" ||
		lower === "embedded system" ||
		lower === "embedded systems"
	) {
		return "Internet of Things (IoT)";
	}

	// 26. Robotics
	if (lower === "robotics" || lower === "robotik") {
		return "Robotics";
	}

	// 27. Blockchain
	if (
		lower === "blockchain" ||
		lower === "block chain" ||
		lower === "web3" ||
		lower === "cryptocurrency"
	) {
		return "Blockchain";
	}

	// 28. Fintech
	if (
		lower === "fintech" ||
		lower === "financial technology" ||
		lower === "financial technology (fintech)" ||
		lower === "quantitative finance" ||
		lower === "finance" ||
		lower === "financial analysis" ||
		lower === "investment" ||
		lower === "stock market" ||
		lower === "capital markets" ||
		lower === "quant"
	) {
		return "Fintech";
	}

	// 29. Natural Language Processing (NLP)
	if (lower === "nlp" || lower === "natural language processing (nlp)" || lower === "natural language processing") {
		return "Natural Language Processing (NLP)";
	}

	// 30. Computer Vision
	if (lower === "computer vision" || lower === "computer visual") {
		return "Computer Vision";
	}

	// 31. Computer Graphics
	if (
		lower === "computer graphics" ||
		lower === "computer graphic" ||
		lower === "graphics"
	) {
		return "Computer Graphics";
	}

	// 32. Operating Systems
	if (
		lower === "operating systems" ||
		lower === "os development" ||
		lower === "kernel development" ||
		lower === "systems/os" ||
		lower === "systems" ||
		lower === "os" ||
		lower === "linux and operating systems" ||
		lower === "linux"
	) {
		return "Operating Systems";
	}

	// 33. Database Management
	if (
		lower === "database" ||
		lower === "database management" ||
		lower === "database administrator"
	) {
		return "Database Management";
	}

	// 34. Computer Networks
	if (
		lower === "networking" ||
		lower === "network engineering" ||
		lower === "network security" ||
		lower === "jaringan"
	) {
		return "Computer Networks";
	}

	// 35. Graphic Design
	if (
		lower === "graphic design" ||
		lower === "desain grafis" ||
		lower === "visual designer" ||
		lower === "visual design" ||
		lower === "graphic & visual identity design" ||
		lower === "graphic" ||
		lower === "art"
	) {
		return "Graphic Design";
	}

	// 36. Human-Computer Interaction
	if (
		lower.includes("human-computer interaction") ||
		lower === "interactive systems"
	) {
		return "Human-Computer Interaction";
	}

	// 37. Quality Assurance (QA)
	if (lower === "qa" || lower === "quality assurance (qa)" || lower === "quality assurance") {
		return "Quality Assurance (QA)";
	}

	// 38. Virtual Reality (VR)
	if (lower === "virtual reality" || lower === "vr" || lower === "virtual reality (vr)" || lower === "ar") {
		return "Virtual Reality (VR)";
	}

	// 39. Research
	if (
		lower === "research" ||
		lower === "riset" ||
		lower === "quantitative research"
	) {
		return "Research";
	}

	// 40. Marketing & Communications
	if (
		lower === "marketing" ||
		lower === "digital marketing" ||
		lower === "communications" ||
		lower === "business communication"
	) {
		return "Marketing & Communications";
	}

	// 41. Creative Media
	if (
		lower === "cinematography" ||
		lower === "photography" ||
		lower === "visual documentation" ||
		lower === "creative editing" ||
		lower === "content creation" ||
		lower === "creative technology" ||
		lower === "creative" ||
		lower === "event creative lead" ||
		lower === "digital experience"
	) {
		return "Creative Media";
	}

	// 42. Public Speaking & Relations
	if (
		lower === "debate" ||
		lower === "public speaking" ||
		lower === "public relation" ||
		lower === "communication" ||
		lower === "relasi" ||
		lower === "pr"
	) {
		return "Public Speaking & Relations";
	}

	// SPECIFIC HOBBY / ARTIST TERMS: DO NOT group into generic buckets like K-Culture!
	if (lower === "stray kids") return "Stray Kids";
	if (lower === "bts") return "BTS";
	if (lower === "k-pop" || lower === "kpop") return "K-Pop";
	if (lower === "k-drama" || lower === "kdrama") return "K-Drama";
	if (lower === "manhwa") return "Manhwa";
	if (lower === "anime" || lower === "manga" || lower === "anime & manga") return "Anime & Manga";
	if (lower === "music" || lower === "musik" || lower === "playing guitar" || lower === "sound synthesis") return "Music";
	if (lower === "gaming" || lower === "gaming (in general)" || lower === "esport & games" || lower === "esport" || lower === "games" || lower === "minecraft" || lower === "valorant") return "Gaming";
	if (lower === "badminton" || lower === "bulu tangkis") return "Badminton";
	if (lower === "basketball" || lower === "basket") return "Basketball";
	if (lower === "running" || lower === "sports & exercises" || lower === "sports & fitness" || lower === "sports" || lower === "exercises" || lower === "martial arts") return "Sports & Fitness";
	if (lower === "volunteering" || lower === "volunteer" || lower === "dan volunteer" || lower === "social project") return "Volunteering";
	if (lower === "psychology" || lower === "human mental beahvior" || lower.includes("mental behavior")) return "Psychology";
	if (lower === "board games") return "Board Games";
	if (lower === "books" || lower === "literasi") return "Books & Literature";
	if (lower === "movies" || lower === "film") return "Movies & Film";
	if (lower === "gadgets") return "Gadgets";

	// Default clean English Title Case fallback
	return s
		.split(/\s+/)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
		.join(" ");
}

/**
 * Parses raw niche string into an array of generalized niches.
 */
function extractGeneralNiches(raw) {
	if (!raw) return [];

	let pre = raw
		.replace(/\bWebsite dev\(front-end\)/gi, "Website Development, Frontend Development")
		.replace(/1\.\s*/g, ", ")
		.replace(/2\.\s*/g, ", ")
		.replace(/3\.\s*/g, ", ")
		.replace(/\band 2005-2015 VW\/Audi ifykyk\b/gi, "")
		.replace(/Front-end Development UI\/UX Design Data & Business Analysis/gi, "Frontend Development, UI/UX, Data Analytics, Business Analysis")
		.replace(/Cyber Security \(CTI and Zero Trust\)/gi, "Cybersecurity")
		.replace(/Cyber Security \(CTI \/ Zero Trust\)/gi, "Cybersecurity")
		.replace(/Security engineering \(or any related blue teaming role\)/gi, "Cybersecurity");

	const tokens = [];
	const rawParts = pre.split(/[,;\n•|]/);

	for (let part of rawParts) {
		part = part.trim();
		if (!part) continue;

		const protectedTokens = [];
		let temp = part
			.replace(/\bUI\/UX\b/gi, () => {
				protectedTokens.push("UI/UX");
				return `__PROT_${protectedTokens.length - 1}__`;
			})
			.replace(/\bAI\/ML\b/gi, () => {
				protectedTokens.push("AI/ML");
				return `__PROT_${protectedTokens.length - 1}__`;
			})
			.replace(/\bAI\/LLM\b/gi, () => {
				protectedTokens.push("AI/LLM");
				return `__PROT_${protectedTokens.length - 1}__`;
			});

		const subParts = temp.split(/\s+(?:&|and|dan|\+)\s+|\s*\/\s*/i);

		for (let sub of subParts) {
			sub = sub.replace(/__PROT_(\d+)__/g, (_, idx) => protectedTokens[Number(idx)]).trim();
			sub = sub.replace(/^(?:dan|and|&)\s+/i, "").trim();
			if (!sub) continue;

			const subLower = sub.toLowerCase();
			if (subLower === "ai/ml" || subLower === "ai machine learning" || subLower === "ai/machine learning") {
				tokens.push("Artificial Intelligence", "Machine Learning");
			} else if (subLower === "ai/llm" || subLower === "applied ai/llm") {
				tokens.push("Artificial Intelligence", "Large Language Models (LLM)");
			} else if (subLower === "ai/ml security") {
				tokens.push("Artificial Intelligence", "Machine Learning", "Cybersecurity");
			} else if (subLower === "ai software engineering") {
				tokens.push("Artificial Intelligence", "Software Engineering");
			} else if (subLower === "dsai") {
				tokens.push("Data Science", "Artificial Intelligence");
			} else if (subLower === "data science ai/ml") {
				tokens.push("Data Science", "Artificial Intelligence", "Machine Learning");
			} else {
				const norm = normalizeSingleToken(sub);
				if (norm) tokens.push(norm);
			}
		}
	}

	return Array.from(new Set(tokens));
}

// 2. BUILD THE DATASET
console.log("Processing members...");
const processedMembers = untouchedData.map((untouchedMember) => {
	const currentMember = currentMap.get(untouchedMember.npm) || {};
	const rawNiche = untouchedMember.niche || "";
	const generalNiches = extractGeneralNiches(rawNiche);

	const memberObj = {
		...untouchedMember,
		// Untouched expressive niche restored directly:
		niche: rawNiche,
		// New generalized niches variable for filtering & card animation:
		general_niches: generalNiches,
	};

	// Preserve website if set in current database
	if (currentMember.website) {
		memberObj.website = currentMember.website;
	}

	return memberObj;
});

// 3. WRITE TO FILES (DO NOT WRITE TO data_untouched.json!)
console.log(`Writing ${processedMembers.length} members to ${downloadsTargetPath}...`);
fs.writeFileSync(downloadsTargetPath, JSON.stringify(processedMembers, null, "\t"), "utf-8");

console.log(`Writing ${processedMembers.length} members to ${localDataPath}...`);
fs.writeFileSync(localDataPath, JSON.stringify(processedMembers, null, "\t"), "utf-8");

console.log("Local files updated successfully!");

// 4. BATCH COMMIT TO CLOUD FIRESTORE
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

async function syncFirestore() {
	console.log(`Synchronizing all ${processedMembers.length} members to Cloud Firestore...`);
	const chunkSize = 400;

	for (let i = 0; i < processedMembers.length; i += chunkSize) {
		const chunk = processedMembers.slice(i, i + chunkSize);
		const batch = writeBatch(db);

		for (const member of chunk) {
			if (!member.npm) continue;
			const ref = doc(db, "members", member.npm);
			batch.set(ref, member);
		}

		await batch.commit();
		console.log(`Uploaded batch ${i + 1} - ${Math.min(i + chunkSize, processedMembers.length)}`);
	}

	console.log("Firestore synchronization complete!");
	process.exit(0);
}

syncFirestore().catch((err) => {
	console.error("Firestore sync failed:", err);
	process.exit(1);
});
