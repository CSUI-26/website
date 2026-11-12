import {
	type CanonicalTag,
	IGNORE_LEFTOVER_PATTERN,
	TAG_RULES,
} from "./rules";

export * from "./rules";

/**
 * Splits raw niche strings by common list separators (commas, semicolons, bullets,
 * pipes, and numbered list markers like "1. ... 2. ...").
 *
 * Slashes ('/') are intentionally NOT used as delimiters so that compound tags
 * such as "UI/UX" and "AI/ML" remain intact.
 */
function splitRawNicheChunks(niche: string | undefined | null): string[] {
	if (!niche || niche.trim() === "-") return [];
	const normalizedLists = niche.replace(/(?:^|\s)\d+\.\s*/g, ", ");
	return normalizedLists
		.split(/[,;•|]+/)
		.map((chunk) => chunk.trim().replace(/\.+$/, "").trim())
		.filter(Boolean);
}

/**
 * Capitalizes the first letter of each word in a string.
 */
function toTitleCase(str: string): string {
	return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

/**
 * Cleans and formats leftover custom/hobby chunks that did not match any canonical tag rule.
 *
 * Handled regex cases & rationale:
 * 1. Leading conjunctions & connectors:
 *    - `^(?:&\s*|and\s+|dan\s+)`: strips dangling connectors left after splitting,
 *      e.g. "& Light Novel" -> "Light Novel", "dan volunteer" -> "Volunteer".
 * 2. Leading metadata prefixes:
 *    - `^non-it\s*:\s*`: removes category prefixes, e.g. "non-IT : Badminton" -> "Badminton".
 * 3. Trailing punctuation:
 *    - `\.+$`: trims trailing dots/periods from sentences, e.g. "Music." -> "Music".
 * 4. Conversational / placeholder noise filtering:
 *    - `IGNORE_LEFTOVER_PATTERN`: discards filler phrases like "something",
 *      "tapi belum tahu lebih spesifiknya...", and generic echoes like "computer science".
 * 5. Capitalization:
 *    - If the cleaned string is all-lowercase (e.g. "human mental beahvior"), formats to
 *      title case ("Human Mental Beahvior") while leaving acronyms and mixed casing untouched.
 */
function cleanCustomTagChunk(chunk: string): string | null {
	const cleaned = chunk
		.replace(/^(?:&\s*|and\s+|dan\s+|non-it\s*:\s*)/i, "")
		.replace(/\.+$/, "")
		.trim();

	if (!cleaned || IGNORE_LEFTOVER_PATTERN.test(cleaned)) {
		return null;
	}

	// Capitalize words if lowercased, otherwise preserve user casing (e.g. "K-Pop", "iOS")
	if (cleaned === cleaned.toLowerCase()) {
		return toTitleCase(cleaned);
	}

	return cleaned;
}

/**
 * Extracts normalized canonical tags and leftover custom/hobby tags from a member's niche string,
 * preserving the order in which interests appear.
 */
export function parseMemberNiche(niche: string | undefined | null): {
	canonicalTags: CanonicalTag[];
	customTags: string[];
	allTags: string[];
} {
	const chunks = splitRawNicheChunks(niche);
	const canonicalTags: CanonicalTag[] = [];
	const customTags: string[] = [];
	const allTags: string[] = [];

	const addTag = (tag: string, isCanonical: boolean) => {
		if (isCanonical) {
			const cTag = tag as CanonicalTag;
			if (!canonicalTags.includes(cTag)) {
				canonicalTags.push(cTag);
			}
		} else if (
			!customTags.includes(tag) &&
			!canonicalTags.includes(tag as CanonicalTag)
		) {
			customTags.push(tag);
		}
		if (!allTags.includes(tag)) {
			allTags.push(tag);
		}
	};

	for (const chunk of chunks) {
		const matches: Array<{ index: number; tag: CanonicalTag }> = [];
		for (const rule of TAG_RULES) {
			let earliestMatchIndex: number | null = null;
			for (const pattern of rule.patterns) {
				const match = pattern.exec(chunk);
				if (match) {
					if (earliestMatchIndex === null || match.index < earliestMatchIndex) {
						earliestMatchIndex = match.index;
					}
				}
			}
			if (earliestMatchIndex !== null) {
				matches.push({ index: earliestMatchIndex, tag: rule.tag });
			}
		}

		if (matches.length > 0) {
			matches.sort((a, b) => a.index - b.index);
			for (const m of matches) {
				addTag(m.tag, true);
			}
		} else {
			const custom = cleanCustomTagChunk(chunk);
			if (custom) {
				addTag(custom, false);
			}
		}
	}

	return { canonicalTags, customTags, allTags };
}

/**
 * Returns the primary badge label for a member card.
 */
export function getMemberBadge(niche: string | undefined | null): string {
	const { allTags } = parseMemberNiche(niche);
	return allTags[0] || "Member";
}

/**
 * Resolves a free-text search query into any canonical tags whose aliases or labels match.
 */
export function matchQueryToCanonicalTags(query: string): CanonicalTag[] {
	const trimmed = query.trim();
	if (!trimmed) return [];

	const matched = new Set<CanonicalTag>();
	const lower = trimmed.toLowerCase();

	for (const rule of TAG_RULES) {
		let patternMatched = false;
		for (const pattern of rule.patterns) {
			if (pattern.test(trimmed)) {
				matched.add(rule.tag);
				patternMatched = true;
				break;
			}
		}
		if (
			!patternMatched &&
			lower.length >= 2 &&
			rule.tag.toLowerCase().includes(lower)
		) {
			matched.add(rule.tag);
		}
	}

	return Array.from(matched);
}
