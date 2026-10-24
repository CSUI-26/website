export const CANONICAL_TAGS = [
	"Data Science",
	"Cybersecurity",
	"AI",
	"Machine Learning",
	"UI/UX",
	"Data Analytics",
	"Business & Analytics",
	"Backend",
	"Software Engineering",
	"Frontend",
	"Product Management",
	"Game Development",
	"LLM",
	"Web Development",
	"Full-Stack",
	"Cloud & DevOps",
	"Mobile Development",
	"Data Engineering",
	"FinTech & Web3",
	"Networking & Systems",
	"Robotics & IoT",
	"Competitive Programming",
	"Consulting",
	"Research",
	"Project Management",
] as const;

export type CanonicalTag = (typeof CANONICAL_TAGS)[number];

export interface TagRule {
	tag: CanonicalTag;
	/**
	 * Array of patterns acting as an "OR" match for this canonical tag.
	 * Kept as discrete expressions for clarity and readability.
	 */
	patterns: readonly RegExp[];
}

export const TAG_RULES: readonly TagRule[] = [
	{
		tag: "Frontend",
		patterns: [/\bfront[\s-]*end\b/i, /\bfe\b/i, /\bweb\s*design\b/i],
	},
	{
		tag: "Backend",
		patterns: [
			/\bback[\s-]*end\b/i,
			/\bbe\b/i,
			/\bdistributed\s*systems\b/i,
		],
	},
	{
		tag: "Full-Stack",
		patterns: [/\bfull[\s-]*stack\b/i],
	},
	{
		tag: "Web Development",
		patterns: [/\bweb[\s-]*dev(elop(ment|er))?\b/i, /\bwebsite\s*dev\b/i],
	},
	{
		tag: "Mobile Development",
		patterns: [
			/\bmobile(\s*app)?\s*dev(elop(ment|er))?\b/i,
			/\bapp(s|\s+dev(elop(ment|er)|emnet))\b/i,
			/\bapplication\s*developer\b/i,
		],
	},
	{
		tag: "UI/UX",
		patterns: [
			/\bui[\s/-]*ux\b/i,
			/\bux\s*(design(er)?|research(er)?)\b/i,
			/\bui\b/i,
			/\bux\b/i,
			/\buser\s*interface\b/i,
			/\bhuman[\s-]*computer\s*interaction\b/i,
			/\bhci\b/i,
			/\bproduct\s*design\b/i,
			/\bgraphic\s*design\b/i,
			/\bvisual\s*(design(er)?|identity)\b/i,
			/\bdesain\s*ui\b/i,
			/\bnarrative\s*design\b/i,
			/\bdigital\s*(design|experience)\b/i,
			/\bdesign\b/i,
		],
	},
	{
		tag: "Data Science",
		patterns: [
			/\bdata[\s-]*(scien(ce|tist|tists|ces|e)|sains|mining)\b/i,
			/\bdatascience\b/i,
			/\bbig\s*data\b/i,
			/\bdsai\b/i,
			/\bds\b/i,
		],
	},
	{
		tag: "Data Analytics",
		patterns: [
			/\bdata[\s-]*(analy(st|sis|tics|tic)|storytelling|processing)\b/i,
			/\banalisis\s*data\b/i,
			/\bgrowth\s*analyst\b/i,
			/\bdata\s*&\s*(business\s*)?analytics\b/i,
			/^data$/i,
		],
	},
	{
		tag: "Data Engineering",
		patterns: [
			/\bdata[\s-]*(engineer(ing)?|management)\b/i,
			/\bdatabase(\s*(management|administrator))?\b/i,
		],
	},
	{
		tag: "AI",
		patterns: [
			/\bartificial[\s-]*intel[li]*gen(ce|t)\b/i,
			/\bartificial\s*intelegent\b/i,
			/\bai\b/i,
			/\bdsai\b/i,
			/\bgenerative\s*ai\b/i,
			/\bprompt\s*engineering\b/i,
			/\bautonomous\s*agents\b/i,
		],
	},
	{
		tag: "Machine Learning",
		patterns: [
			/\bmachine[\s-]*learning\b/i,
			/\bmechine\s*learning\b/i,
			/\bml\b/i,
			/\bdeep\s*learning\b/i,
			/\breinforcement\s*learning\b/i,
			/\bcomputer\s*vis(ion|ual)\b/i,
			/\bnatural\s*language\s*processing\b/i,
			/\bnlp\b/i,
		],
	},
	{
		tag: "LLM",
		patterns: [/\bllm(s)?\b/i, /\blarge\s*language\s*model\b/i],
	},
	{
		tag: "Cybersecurity",
		patterns: [
			/\bcyber[\s-]*security\b/i,
			/\bcysec\b/i,
			/\bcyber\b/i,
			/\bnetwork\s*security\b/i,
			/\bsecurity\s*engineering\b/i,
			/\bethical\s*hacking\b/i,
			/\bpen\s*testing\b/i,
			/\bdigital\s*forensic\b/i,
			/\bdfir\b/i,
			/\bblue\s*teaming\b/i,
			/\breverse\s*engineering\b/i,
			/\bcti\b/i,
			/\bzero\s*trust\b/i,
		],
	},
	{
		tag: "Software Engineering",
		patterns: [
			/\bsoftware(\s*(eng(ineer(ing)?|inner)?|dev(elop(ment|er))?))?\b/i,
			/\bswe\b/i,
			/\bsoff?tware\b/i,
			/\bprogramming\b/i,
			/\bcoding\b/i,
			/\bsystem\s*architecture\b/i,
			/\bit\s*development\b/i,
			/\bqa\b/i,
		],
	},
	{
		tag: "Game Development",
		patterns: [
			/\bgame\s*dev(elop(ment|er|ing))?\b/i,
			/\bgamedev\b/i,
			/\bgame\s*design\b/i,
			/\bcomputer\s*graphic(s)?\b/i,
			/\bvirtual\s*reality\b/i,
			/\binteractive\s*systems\b/i,
		],
	},
	{
		tag: "Product Management",
		patterns: [
			/\bproduct[\s-]*manage(ment|r)\b/i,
			/\bproduct\s*development\b/i,
			/\bpm\b/i,
			/\bai\s*product\b/i,
			/\bproduct\b/i,
		],
	},
	{
		tag: "Project Management",
		patterns: [/\bproject\s*manage(ment|r)\b/i, /\bagile\b/i],
	},
	{
		tag: "Business & Analytics",
		patterns: [
			/\bbuss?iness?(\s*(analy(st|sis|tics)|intelligence|systems|management|technology|process|communication|and\s*development))?\b/i,
			/\bmanagement\s*buss?ines\b/i,
			/\bsystem(s)?\s*analy(st|sis|tic)\b/i,
			/\binformation\s*systems\b/i,
			/\bit\s*governance\b/i,
			/\berp\b/i,
			/\bbisnis\b/i,
			/\bmanajemen\s*bisnis\b/i,
			/\bdigital\s*(business|transformation|marketing)\b/i,
			/\be-business\b/i,
			/\bmarketing\b/i,
			/\bstart\s*up\b/i,
			/\bstartup\b/i,
			/\bentrepreneurship\b/i,
			/\bpeople\s*management\b/i,
			/^management$/i,
		],
	},
	{
		tag: "Consulting",
		patterns: [/\bconsult(ing|ant)\b/i],
	},
	{
		tag: "Cloud & DevOps",
		patterns: [
			/\bcloud(\s*(comput(ing|e)|engineer(ing)?|architect(ure)?|eng))?\b/i,
			/\bdevops\b/i,
			/\bdevsecops\b/i,
			/\bopdev\b/i,
		],
	},
	{
		tag: "Competitive Programming",
		patterns: [
			/\bcompetitive\s*programming\b/i,
			/\bcp\b/i,
			/\balgorithm(s)?\b/i,
			/\bdata\s*structure\b/i,
			/\bhackathon\b/i,
		],
	},
	{
		tag: "Robotics & IoT",
		patterns: [
			/\broboti(cs|k)\b/i,
			/\binternet\s*of\s*things\b/i,
			/\biot\b/i,
			/\bembedded\s*system(s)?\b/i,
		],
	},
	{
		tag: "Networking & Systems",
		patterns: [
			/\bnetwork(ing|\s*engineering)?\b/i,
			/\boperating\s*systems\b/i,
			/\bsystems\/os\b/i,
			/\bos\s*development\b/i,
			/\bkernel\b/i,
			/\blinux\b/i,
			/\bict\b/i,
			/\bcomputer\s*simulation\b/i,
			/\bsimulation\b/i,
		],
	},
	{
		tag: "FinTech & Web3",
		patterns: [
			/\bfintech\b/i,
			/\bfinancial(\s*(technology|analysis))?\b/i,
			/\bquantitative\b/i,
			/\bfinance\b/i,
			/\binvestment\b/i,
			/\bstock\s*market\b/i,
			/\bblockchain\b/i,
			/\bblock\s*chain\b/i,
			/\bcryptocurrency\b/i,
			/\bweb3\b/i,
		],
	},
	{
		tag: "Research",
		patterns: [/\bresearch(er)?\b/i, /\briset\b/i],
	},
];

export const IGNORE_LEFTOVER_PATTERN =
	/^(?:tapi\s+belum\s+tahu.*|something(?:\s+that\s+would\s+make\s+me\s+money)?|computer\s+science|creative(?:\s+technology)?)$/i;