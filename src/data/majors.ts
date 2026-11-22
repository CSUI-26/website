export type MajorCanonicalName =
	| "Ilmu Komputer"
	| "Sistem Informasi"
	| "Ilmu Komputer KKI"
	| "Kecerdasan Artifisial";

export type MajorCode = "CS" | "SI" | "CS KKI" | "AI";

export type MajorThemeKey = "cs" | "si" | "kki" | "ai";

export interface MajorMetadata {
	readonly canonicalName: MajorCanonicalName;
	readonly code: MajorCode;
	readonly theme: MajorThemeKey;
	readonly aliases: readonly string[];
}

export const MAJOR_DEFINITIONS: readonly MajorMetadata[] = [
	{
		canonicalName: "Ilmu Komputer",
		code: "CS",
		theme: "cs",
		aliases: [
			"cs",
			"computer-science",
			"computer science",
			"ilmu-komputer",
			"ilmu komputer",
		],
	},
	{
		canonicalName: "Sistem Informasi",
		code: "SI",
		theme: "si",
		aliases: [
			"si",
			"information-system",
			"information system",
			"sistem-informasi",
			"sistem informasi",
		],
	},
	{
		canonicalName: "Ilmu Komputer KKI",
		code: "CS KKI",
		theme: "kki",
		aliases: [
			"kki",
			"cs-kki",
			"cs kki",
			"ilmu-komputer-kki",
			"ilmu komputer kki",
		],
	},
	{
		canonicalName: "Kecerdasan Artifisial",
		code: "AI",
		theme: "ai",
		aliases: [
			"ai",
			"artificial-intelligence",
			"artificial intelligence",
			"kecerdasan-artifisial",
			"kecerdasan artifisial",
		],
	},
] as const;

export interface MajorFilterOption {
	label: string;
	value: MajorCanonicalName | "ALL";
	theme: MajorThemeKey | "all";
}

export const MAJOR_FILTER_OPTIONS: readonly MajorFilterOption[] = [
	{ label: "Semua", value: "ALL", theme: "all" },
	...MAJOR_DEFINITIONS.map((m) => ({
		label: m.canonicalName,
		value: m.canonicalName,
		theme: m.theme,
	})),
];

/**
 * Backward-compatible alias for MAJOR_FILTER_OPTIONS.
 */
export const MAJORS = MAJOR_FILTER_OPTIONS;

const CANONICAL_BY_ALIAS = new Map<string, MajorCanonicalName>();
const CODE_BY_CANONICAL = new Map<string, MajorCode>();
const THEME_BY_IDENTIFIER = new Map<string, MajorThemeKey>();

for (const def of MAJOR_DEFINITIONS) {
	CODE_BY_CANONICAL.set(def.canonicalName, def.code);
	THEME_BY_IDENTIFIER.set(def.canonicalName.toLowerCase(), def.theme);
	THEME_BY_IDENTIFIER.set(def.code.toLowerCase(), def.theme);
	THEME_BY_IDENTIFIER.set(def.theme, def.theme);

	for (const alias of def.aliases) {
		CANONICAL_BY_ALIAS.set(alias.toLowerCase(), def.canonicalName);
	}
}

/**
 * Maps a major canonical name to its standard uppercase display code (e.g. "CS", "SI", "CS KKI", "AI").
 * Falls back to the input string if not matched.
 */
export function getMajorCode(major: string): string {
	return CODE_BY_CANONICAL.get(major) || major;
}

/**
 * Maps a major canonical name, display code, or query code to its theme identifier (e.g. "cs", "si", "kki", "ai").
 * Also serves as the URL query parameter code.
 * Falls back to "cs" if not matched.
 */
export function getMajorThemeKey(majorOrCode: string): MajorThemeKey {
	const key = majorOrCode.trim().toLowerCase();
	return THEME_BY_IDENTIFIER.get(key) || "cs";
}

/**
 * Resolves a query parameter string (e.g. "cs", "computer-science", "all") to its canonical major name or "ALL".
 * Returns null if not recognized or empty.
 */
export function resolveMajorParam(
	param: string | null,
): MajorCanonicalName | "ALL" | null {
	if (!param) return null;
	const key = param.trim().toLowerCase();
	if (key === "all") return "ALL";
	return CANONICAL_BY_ALIAS.get(key) || null;
}
