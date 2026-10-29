import fs from "node:fs";

const downloadPath = "c:/Users/pabia/Downloads/data.json";
const data = JSON.parse(fs.readFileSync(downloadPath, "utf8"));

/**
 * Normalizes a single niche term into standard English industry nomenclature.
 */
function normalizeTerm(rawTerm) {
	if (!rawTerm) return null;
	let s = rawTerm.trim().replace(/^[-•*–—\d.)\s]+/, "").replace(/[.]+$/, "").trim();
	if (!s || s === "-" || s.toLowerCase() === "something" || s.toLowerCase() === "tapi belum tahu lebih spesifiknya bagaimana.") {
		return null;
	}

	const lower = s.toLowerCase();

	// 1. UI / UX Rules ("UI and UX becomes one, UI/UX")
	if (
		lower === "ui" ||
		lower === "ux" ||
		lower === "ui/ux" ||
		lower === "ui / ux" ||
		lower === "ui ux" ||
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
		lower === "ux researcher"
	) {
		return "UI/UX";
	}

	// 2. Website Development ("something like WebDev should be said completely like Website Development")
	if (
		lower === "webdev" ||
		lower === "web dev" ||
		lower === "web development" ||
		lower === "web-development" ||
		lower === "web developer" ||
		lower === "web design" ||
		lower === "pengembangan web" ||
		lower === "dan web dev"
	) {
		return "Website Development";
	}

	// 3. Game Development ("something like GameDev should be said completely like Game Development")
	if (
		lower === "gamedev" ||
		lower === "game dev" ||
		lower === "game development" ||
		lower === "game developer" ||
		lower === "game developing" ||
		lower === "game design" ||
		lower === "pengembangan game" ||
		lower === "& game developer" ||
		lower === "dan game development"
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
		lower === "programming and apps developemnet"
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
		lower === "frontend developer"
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
		lower === "distributed systems engineer (backend)" ||
		lower === "and back-end"
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
		lower === "i wanna focus on learning software engineering"
	) {
		return "Software Engineering";
	}

	// 9. Cybersecurity
	if (
		lower === "cybersecurity" ||
		lower === "cyber security" ||
		lower === "cysec" ||
		lower === "cyber it" ||
		lower === "keamanan siber" ||
		lower === "cybersecurity (dfir)" ||
		lower === "cybersecurity (mau)" ||
		lower === "cyber security (cti and zero trust)" ||
		lower === "cyber security(priority)" ||
		lower.includes("ethical hacking") ||
		lower.includes("penetration testing") ||
		lower === "pen testing"
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
		lower === "dan ai" ||
		lower === "mau fokus di bidang ai"
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
		lower === "machine learning engineer"
	) {
		return "Machine Learning";
	}

	// 12. Large Language Models (LLM) & Generative AI
	if (
		lower === "llm" ||
		lower === "llms" ||
		lower === "large language model" ||
		lower === "large language models" ||
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
		lower === "dan data analyst" ||
		lower === "data & growth analyst"
	) {
		return "Data Analytics";
	}

	// 15. Data Engineering
	if (
		lower === "data engineering" ||
		lower === "data engineer" ||
		lower === "big data & data engineering" ||
		lower === "data processing"
	) {
		return "Data Engineering";
	}

	// 16. Cloud Computing
	if (
		lower === "cloud computing" ||
		lower === "cloud compute" ||
		lower === "cloud" ||
		lower === "cloud architecture" ||
		lower === "cloud engineering" ||
		lower === "cloudeng" ||
		lower === "i wish i’d be great at cloud architect"
	) {
		return "Cloud Computing";
	}

	// 17. DevOps
	if (
		lower === "devops" ||
		lower === "devops engineer" ||
		lower === "devsecops" ||
		lower === "opdev"
	) {
		return "DevOps";
	}

	// 18. Product Management
	if (
		lower === "product management" ||
		lower === "product manager" ||
		lower === "product-management" ||
		lower === "pm" ||
		lower === "product" ||
		lower === "product development"
	) {
		return "Product Management";
	}

	// 19. Project Management
	if (
		lower === "project management" ||
		lower === "project manager" ||
		lower === "project/product manager" ||
		lower === "agile project management"
	) {
		return "Project Management";
	}

	// 20. Business Analysis & Intelligence
	if (
		lower === "business analysis" ||
		lower === "business analyst" ||
		lower === "business analytics" ||
		lower === "it business analysis" ||
		lower === "it business analyst" ||
		lower === "system analyst" ||
		lower === "systems analysis" ||
		lower === "bussiness analyst" ||
		lower === "business systems analysis" ||
		lower === "business intelligence"
	) {
		return "Business Analysis";
	}

	// 21. Business & Digital Business
	if (
		lower === "business" ||
		lower === "bisnis" ||
		lower === "bisnis it" ||
		lower === "bussiness" ||
		lower === "gua fokus ke bidang bisnis sih" ||
		lower === "business management" ||
		lower === "manajemen bisnis" ||
		lower === "digital business" ||
		lower === "digital business & management" ||
		lower === "e-business" ||
		lower === "startup & entrepreneurship" ||
		lower === "start up"
	) {
		return "Business";
	}

	// 22. IT Consulting
	if (
		lower === "it consulting" ||
		lower === "it consultant" ||
		lower === "it-consulting" ||
		lower === "consulting" ||
		lower === "business consultant"
	) {
		return "IT Consulting";
	}

	// 23. Competitive Programming
	if (
		lower === "competitive programming" ||
		lower === "competitive programming (cp)" ||
		lower === "cp" ||
		lower === "algorithm and data structure" ||
		lower === "data structure and algorithm" ||
		lower === "algorithms"
	) {
		return "Competitive Programming";
	}

	// 24. Internet of Things (IoT) & Embedded
	if (
		lower === "iot" ||
		lower === "internet of things" ||
		lower === "embedded system" ||
		lower === "embedded systems"
	) {
		return "Internet of Things (IoT)";
	}

	// 25. Robotics
	if (lower === "robotics" || lower === "robotik") {
		return "Robotics";
	}

	// 26. Blockchain & Web3
	if (
		lower === "blockchain" ||
		lower === "block chain" ||
		lower === "web3" ||
		lower === "cryptocurrency"
	) {
		return "Blockchain";
	}

	// 27. Fintech
	if (
		lower === "fintech" ||
		lower === "financial technology" ||
		lower === "financial technology (fintech)" ||
		lower === "quantitative finance"
	) {
		return "Fintech";
	}

	// 28. NLP
	if (lower === "nlp" || lower === "natural language processing (nlp)") {
		return "Natural Language Processing (NLP)";
	}

	// 29. Computer Vision
	if (lower === "computer vision" || lower === "computer visual") {
		return "Computer Vision";
	}

	// 30. Computer Graphics
	if (lower === "computer graphics" || lower === "computer graphic") {
		return "Computer Graphics";
	}

	// 31. Operating Systems
	if (
		lower === "operating systems" ||
		lower === "os development" ||
		lower === "kernel development" ||
		lower === "systems/os" ||
		lower === "linux and operating systems"
	) {
		return "Operating Systems";
	}

	// 32. Database Management
	if (
		lower === "database" ||
		lower === "database management" ||
		lower === "database administrator"
	) {
		return "Database Management";
	}

	// 33. Information Systems
	if (lower === "information systems" || lower === "is" || lower === "it governance") {
		return "Information Systems";
	}

	// 34. Graphic Design
	if (lower === "graphic design" || lower === "visual designer" || lower === "graphic & visual identity design") {
		return "Graphic Design";
	}

	// 35. Research
	if (lower === "research" || lower === "riset") {
		return "Research";
	}

	// 36. Non-technical / Interests (ensure clean English title case)
	if (lower === "music") return "Music";
	if (lower === "gaming" || lower === "gaming (in general)" || lower === "esport & games") return "Gaming";
	if (lower === "basketball") return "Basketball";
	if (lower === "volunteering" || lower === "dan volunteer" || lower === "social project") return "Volunteering";
	if (lower === "organization" || lower === "organisasi") return "Organization";
	if (lower === "photography" || lower === "cinematography") return "Cinematography";
	if (lower === "board games") return "Board Games";
	if (lower === "card games") return "Card Games";
	if (lower === "anime & manga" || lower === "manhwa" || lower === "visual novel" || lower === "& light novel") return "Anime & Manga";
	if (lower === "k-pop" || lower === "k-drama") return "K-Culture";
	if (lower === "debate" || lower === "public speaking") return "Public Speaking";
	if (lower === "running" || lower === "sports & exercises") return "Sports & Fitness";
	if (lower === "snorkling") return "Snorkeling";

	// Default fallback: Title Case English
	return s
		.split(/\s+/)
		.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
		.join(" ");
}

/**
 * Splits and cleans a raw niche string into an array of distinct normalized niches.
 */
function cleanNicheString(raw) {
	if (!raw) return "";

	// Split by delimiters: comma, semicolon, bullet, newline, pipe
	const tokens = [];
	
	// Split multi-line or bulleted list
	const rawParts = raw.split(/[,;\n•|]/);

	for (let part of rawParts) {
		part = part.trim();
		if (!part) continue;

		// Check for common combined conjunctions: " & ", " and ", " dan ", " / " (except UI/UX, AI/ML, TCP/IP)
		// Protect "UI/UX", "AI/ML", "AI/LLM"
		const protectedTokens = [];
		let temp = part
			.replace(/\bUI\/UX\b/gi, () => { protectedTokens.push("UI/UX"); return `__PROT_${protectedTokens.length - 1}__`; })
			.replace(/\bAI\/ML\b/gi, () => { protectedTokens.push("AI/ML"); return `__PROT_${protectedTokens.length - 1}__`; })
			.replace(/\bAI\/LLM\b/gi, () => { protectedTokens.push("AI/LLM"); return `__PROT_${protectedTokens.length - 1}__`; });

		// Split on conjunctions
		const subParts = temp.split(/\s+(?:&|and|dan|\+)\s+|\s*\/\s*/i);

		for (let sub of subParts) {
			// Restore protected tokens
			sub = sub.replace(/__PROT_(\d+)__/g, (_, idx) => protectedTokens[Number(idx)]);
			sub = sub.trim();
			if (!sub) continue;

			// Handle special compound cases
			if (sub.toLowerCase() === "ai/ml") {
				tokens.push("Artificial Intelligence");
				tokens.push("Machine Learning");
			} else if (sub.toLowerCase() === "dsai") {
				tokens.push("Data Science");
				tokens.push("Artificial Intelligence");
			} else {
				const normalized = normalizeTerm(sub);
				if (normalized) tokens.push(normalized);
			}
		}
	}

	// Deduplicate preserving order
	const unique = Array.from(new Set(tokens));
	return unique.join(", ");
}

// Test on all 546 students
const cleanedCounts = {};
let changedCount = 0;

data.forEach((m, i) => {
	const cleaned = cleanNicheString(m.niche);
	if (cleaned !== m.niche) {
		changedCount++;
	}
	cleaned.split(/,\s*/).forEach(t => {
		if (t) cleanedCounts[t] = (cleanedCounts[t] || 0) + 1;
	});
});

console.log(`Out of ${data.length} students, ${changedCount} had niches normalized.`);
const sortedCleaned = Object.entries(cleanedCounts).sort((a,b) => b[1] - a[1]);
console.log(`Normalized distinct niche tags count: ${sortedCleaned.length} (down from 509!)\n`);

console.log("=== TOP 35 STANDARDIZED NICHES ===");
sortedCleaned.slice(0, 35).forEach(([tag, count]) => {
	console.log(`${String(count).padStart(3)}: ${tag}`);
});

console.log("\n=== ALL REMAINING NICHES ===");
sortedCleaned.slice(35).forEach(([tag, count]) => {
	console.log(`${String(count).padStart(3)}: ${tag}`);
});
