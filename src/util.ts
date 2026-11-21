import fs from "node:fs";
import path from "node:path";
import type { Member } from "@/types/member";

export type RecordValues<T extends Record<PropertyKey, unknown>> = T[keyof T];

let localPhotosSet: Set<string> | null = null;

/**
 * Returns a Set of cached photo filenames under public/photos/.
 * Memoized across calls during the build / SSG phase.
 */
function getCachedPhotosSet(): Set<string> {
	if (localPhotosSet !== null) {
		return localPhotosSet;
	}
	localPhotosSet = new Set<string>();
	try {
		const dir = path.resolve(process.cwd(), "public/photos");
		if (fs.existsSync(dir)) {
			for (const file of fs.readdirSync(dir)) {
				localPhotosSet.add(file);
			}
		}
	} catch {
		// Fallback safely if directory is not accessible
	}
	return localPhotosSet;
}

/**
 * Resolves the member's photo URL:
 * Returns the local cached asset `/photos/<npm>.<ext>` if present in `public/photos/`,
 * otherwise falls back to the original remote URL.
 */
export function getMemberPhotoUrl(
	member: Pick<Member, "npm" | "foto">,
): string {
	const fallbackUrl = member.foto?.url || "";
	if (!member.npm) return fallbackUrl;

	const cached = getCachedPhotosSet();
	if (cached.has(`${member.npm}.jpg`)) return `/photos/${member.npm}.jpg`;
	if (cached.has(`${member.npm}.png`)) return `/photos/${member.npm}.png`;
	if (cached.has(`${member.npm}.webp`)) return `/photos/${member.npm}.webp`;
	if (cached.has(`${member.npm}.jpeg`)) return `/photos/${member.npm}.jpeg`;

	return fallbackUrl;
}

/**
 * Creates a URL-friendly slug from a string.
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Generates a unique, deterministic slug identifier for a member.
 * Standard format: clean full name slug. If empty, falls back to NPM.
 */
export function getMemberSlug(member: Pick<Member, "name" | "npm">): string {
	const base = slugify(member.name);
	return base || member.npm;
}

/**
 * Maps major name to standardized short code.
 */
export function getMajorCode(major: string): string {
	switch (major) {
		case "Ilmu Komputer":
			return "CS";
		case "Ilmu Komputer KKI":
			return "CS KKI";
		case "Sistem Informasi":
			return "SI";
		case "Kecerdasan Artifisial":
			return "AI";
		default:
			return major;
	}
}

/**
 * Shuffles an array in-place using Fisher-Yates and Math.random().
 */
export function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const itemI = array[i];
		const itemJ = array[j];
		if (itemI !== undefined && itemJ !== undefined) {
			array[i] = itemJ;
			array[j] = itemI;
		}
	}
	return array;
}

/**
 * Sorts members alphabetically by full name (case-insensitive, Indonesian/Latin locale-aware).
 * Returns a new array without mutating the original input.
 */
export function sortMembersAlphabetically(members: Member[]): Member[] {
	return [...members].sort((a, b) =>
		a.name.localeCompare(b.name, "id", { sensitivity: "base" }),
	);
}

/**
 * Normalizes and extracts key domain/niche tokens from a member's niche string.
 */
export function extractNicheTokens(nicheStr?: string | null): Set<string> {
	if (!nicheStr) return new Set();
	const raw = nicheStr.toLowerCase();
	const tokens = new Set<string>();

	if (raw.includes("front") || raw.includes("fe")) tokens.add("frontend");
	if (raw.includes("back") || raw.includes("be")) tokens.add("backend");
	if (raw.includes("full") || raw.includes("fs")) tokens.add("fullstack");
	if (raw.includes("ui") || raw.includes("ux") || raw.includes("desain"))
		tokens.add("ui-ux");
	if (raw.includes("web")) tokens.add("web");
	if (
		raw.includes("data sc") ||
		raw.includes("data sa") ||
		raw.includes("data sci") ||
		raw.includes("scientist")
	)
		tokens.add("datascience");
	if (raw.includes("data en") || raw.includes("engineer"))
		tokens.add("dataengineer");
	if (
		raw.includes("data an") ||
		raw.includes("analyst") ||
		raw.includes("analisis") ||
		raw.includes("analytics")
	)
		tokens.add("dataanalyst");
	if (
		raw.includes("cyber") ||
		raw.includes("security") ||
		raw.includes("keamanan")
	)
		tokens.add("cybersecurity");
	if (raw.includes("game")) tokens.add("gamedev");
	if (
		raw.includes("mobile") ||
		raw.includes("android") ||
		raw.includes("ios") ||
		raw.includes("flutter")
	)
		tokens.add("mobile");
	if (
		raw.includes("ai") ||
		raw.includes("artificial") ||
		raw.includes("machine learning") ||
		raw.includes("ml") ||
		raw.includes("llm") ||
		raw.includes("deep learning")
	)
		tokens.add("ai");
	if (
		raw.includes("cloud") ||
		raw.includes("devops") ||
		raw.includes("sysadmin")
	)
		tokens.add("cloud-devops");
	if (
		raw.includes("project") ||
		raw.includes("product") ||
		raw.includes("pm") ||
		raw.includes("manajemen") ||
		raw.includes("business")
	)
		tokens.add("management");

	const stopWords = new Set([
		"dan",
		"yang",
		"dengan",
		"pada",
		"atau",
		"serta",
		"like",
		"with",
		"into",
		"also",
	]);
	const words = raw.split(/[^a-z0-9]+/);
	for (const w of words) {
		if (w.length > 3 && !stopWords.has(w)) {
			tokens.add(w);
		}
	}
	return tokens;
}

/**
 * Finds the most similar peers to the target member based primarily on shared niches.
 * Adds a secondary tie-breaker bonus if members share the same major program.
 */
export function getSimilarMembers(
	target: Member,
	allMembers: Member[],
	count = 14,
): Member[] {
	const targetCombined =
		(target.general_niches ? `${target.general_niches.join(" ")} ` : "") +
		(target.niche || "");
	const targetTokens = extractNicheTokens(targetCombined);

	const scored = allMembers
		.filter((m) => m.npm !== target.npm)
		.map((other) => {
			const otherCombined =
				(other.general_niches ? `${other.general_niches.join(" ")} ` : "") +
				(other.niche || "");
			const otherTokens = extractNicheTokens(otherCombined);
			let overlap = 0;
			for (const t of targetTokens) {
				if (otherTokens.has(t)) {
					overlap++;
				}
			}

			// Bonus for same major as secondary tiebreaker (+0.1)
			const sameMajorBonus = other.major === target.major ? 0.1 : 0;
			const score = overlap + sameMajorBonus;

			return { member: other, score };
		});

	// Sort descending by similarity score, then alphabetically by name for consistency
	scored.sort((a, b) => {
		if (b.score !== a.score) {
			return b.score - a.score;
		}
		return a.member.name.localeCompare(b.member.name, "id", {
			sensitivity: "base",
		});
	});

	return scored.slice(0, count).map((s) => s.member);
}
