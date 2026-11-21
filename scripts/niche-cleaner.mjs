import fs from "node:fs";

/**
 * Normalizes an individual niche token into standard English industry nomenclature.
 */
function normalizeSingleNiche(raw) {
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
		lower === "website development"
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
	if (
		lower === "big data" ||
		lower === "big data analytics"
	) {
		return "Big Data Analytics";
	}

	// 17. Cloud Computing & Engineering
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

	// 21. Business Analysis & Intelligence
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
		lower === "system l"
	) {
		return "Business Analysis";
	}

	// 22. Business & Digital Business
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
		lower === "tech consulting"
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

	// 25. Internet of Things (IoT) & Embedded
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

	// 27. Blockchain & Web3
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
		lower === "capital markets"
	) {
		return "Fintech";
	}

	// 29. NLP
	if (lower === "nlp" || lower === "natural language processing (nlp)") {
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

	// 34. Information Systems
	if (
		lower === "information systems" ||
		lower === "is" ||
		lower === "it governance" ||
		lower === "erp" ||
		lower === "ict" ||
		lower === "it" ||
		lower === "computer science"
	) {
		return "Information Systems";
	}

	// 35. Graphic Design
	if (
		lower === "graphic design" ||
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

	// 37. Autonomous Agents & AI Ethics
	if (lower.includes("autonomous agents") || lower.includes("openclaw")) {
		return "Autonomous Agents";
	}
	if (lower.includes("ai ethics")) {
		return "AI Ethics";
	}

	// 38. Network Engineering
	if (
		lower === "networking" ||
		lower === "network engineering" ||
		lower === "network security"
	) {
		return "Network Engineering";
	}

	// 39. Quality Assurance (QA)
	if (lower === "qa" || lower === "quality assurance (qa)") {
		return "Quality Assurance (QA)";
	}

	// 40. Virtual Reality (VR)
	if (lower === "virtual reality" || lower === "vr" || lower === "virtual reality (vr)") {
		return "Virtual Reality (VR)";
	}

	// 41. Research
	if (
		lower === "research" ||
		lower === "riset" ||
		lower === "quantitative research"
	) {
		return "Research";
	}

	// 42. Marketing & Communications
	if (
		lower === "marketing" ||
		lower === "digital marketing" ||
		lower === "communications" ||
		lower === "business communication"
	) {
		return "Marketing & Communications";
	}

	// 43. Creative & Media
	if (
		lower === "cinematography" ||
		lower === "photography" ||
		lower === "visual documentation" ||
		lower === "creative editing" ||
		lower === "content creation" ||
		lower === "creative technology" ||
		lower === "creative" ||
		lower === "event creative lead" ||
		lower === "digital experience" ||
		lower === "experience"
	) {
		return "Creative Media";
	}

	// 44. Public Speaking & PR
	if (
		lower === "debate" ||
		lower === "public speaking" ||
		lower === "public relation" ||
		lower === "communication" ||
		lower === "relasi" ||
		lower === "people oriented"
	) {
		return "Public Speaking & Relations";
	}

	// 45. Hobbies / Non-technical (standardized in clean English)
	if (lower === "music" || lower === "playing guitar" || lower === "sound synthesis") return "Music";
	if (lower === "gaming" || lower === "gaming (in general)" || lower === "esport & games" || lower === "esport" || lower === "games" || lower === "minecraft" || lower === "valorant") return "Gaming";
	if (lower === "basketball") return "Basketball";
	if (lower === "badminton" || lower.includes("badminton")) return "Badminton";
	if (lower === "running" || lower === "sports & exercises" || lower === "sports & fitness" || lower === "sports" || lower === "exercises" || lower === "martial arts") return "Sports & Fitness";
	if (lower === "volunteering" || lower === "volunteer" || lower === "dan volunteer" || lower === "social project") return "Volunteering";
	if (lower === "human mental beahvior" || lower.includes("mental behavior")) return "Psychology";
	if (lower === "organization" || lower === "organisasi") return "Organization";
	if (lower === "board games") return "Board Games";
	if (lower === "card games") return "Card Games";
	if (lower === "anime & manga" || lower === "anime" || lower === "manga" || lower === "manhwa" || lower === "visual novel" || lower === "light novel") return "Anime & Manga";
	if (lower === "k-pop" || lower === "k-drama" || lower === "k-culture" || lower === "stray kids") return "K-Culture";
	if (lower === "snorkling" || lower === "snorkeling") return "Snorkeling";
	if (lower === "agricultural technology") return "Agricultural Technology";
	if (lower === "hackathon" || lower === "tech innovation enthusiast") return "Tech Innovation";
	if (lower === "books" || lower === "literasi") return "Reading & Literature";
	if (lower === "movies") return "Movies & Film";
	if (lower === "medical") return "Healthcare & Biotech";
	if (lower === "ice hockey") return "Ice Hockey";
	if (lower === "motorsports") return "Motorsports";
	if (lower === "education") return "Education";
	if (lower === "natural science") return "Natural Science";
	if (lower === "gadgets") return "Consumer Tech & Gadgets";
	if (lower === "simulation" || lower === "computer simulation") return "Simulation";

	// Default fallback: Title Case English
	return s
		.split(/\s+/)
		.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
		.join(" ");
}

/**
 * Full clean pipeline for a member's niche string.
 */
export function cleanNiche(raw) {
	if (!raw) return "";

	// Pre-cleanup on known compound/numbered sentences
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

	// Split by primary delimiters
	const rawParts = pre.split(/[,;\n•|]/);

	for (let part of rawParts) {
		part = part.trim();
		if (!part) continue;

		// Protect compound acronyms with slash from being split
		const protectedTokens = [];
		let temp = part
			.replace(/\bUI\/UX\b/gi, () => { protectedTokens.push("UI/UX"); return `__PROT_${protectedTokens.length - 1}__`; })
			.replace(/\bAI\/ML\b/gi, () => { protectedTokens.push("AI/ML"); return `__PROT_${protectedTokens.length - 1}__`; })
			.replace(/\bAI\/LLM\b/gi, () => { protectedTokens.push("AI/LLM"); return `__PROT_${protectedTokens.length - 1}__`; });

		// Split on conjunctions
		const subParts = temp.split(/\s+(?:&|and|dan|\+)\s+|\s*\/\s*/i);

		for (let sub of subParts) {
			sub = sub.replace(/__PROT_(\d+)__/g, (_, idx) => protectedTokens[Number(idx)]).trim();
			sub = sub.replace(/^(?:dan|and|&)\s+/i, "").trim();
			if (!sub) continue;

			const subLower = sub.toLowerCase();
			if (subLower === "ai/ml" || subLower === "ai machine learning" || subLower === "ai/machine learning") {
				tokens.push("Artificial Intelligence");
				tokens.push("Machine Learning");
			} else if (subLower === "ai/llm" || subLower === "applied ai/llm") {
				tokens.push("Artificial Intelligence");
				tokens.push("Large Language Models (LLM)");
			} else if (subLower === "ai/ml security") {
				tokens.push("Artificial Intelligence");
				tokens.push("Machine Learning");
				tokens.push("Cybersecurity");
			} else if (subLower === "ai/ml engineering") {
				tokens.push("Artificial Intelligence");
				tokens.push("Machine Learning");
			} else if (subLower === "ai software engineering") {
				tokens.push("Artificial Intelligence");
				tokens.push("Software Engineering");
			} else if (subLower === "dsai") {
				tokens.push("Data Science");
				tokens.push("Artificial Intelligence");
			} else if (subLower === "data science ai/ml") {
				tokens.push("Data Science");
				tokens.push("Artificial Intelligence");
				tokens.push("Machine Learning");
			} else {
				const norm = normalizeSingleNiche(sub);
				if (norm) tokens.push(norm);
			}
		}
	}

	// Deduplicate preserving order
	const unique = Array.from(new Set(tokens));
	return unique.join(", ");
}
