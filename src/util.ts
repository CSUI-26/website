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
 * Maps major name or code to a theme identifier for distinct prodi coloring:
 * - CS: blue
 * - SI: red
 * - CS KKI: dark blue
 * - AI: green
 */
export function getMajorThemeKey(
	majorOrCode: string,
): "cs" | "si" | "kki" | "ai" {
	switch (majorOrCode) {
		case "Ilmu Komputer":
		case "CS":
			return "cs";
		case "Sistem Informasi":
		case "SI":
			return "si";
		case "Ilmu Komputer KKI":
		case "CS KKI":
			return "kki";
		case "Kecerdasan Artifisial":
		case "AI":
			return "ai";
		default:
			return "cs";
	}
}

/**
 * Formats a name string into title case (capitalizing the initial letter of each word).
 * Handles word boundaries including spaces, hyphens, and periods.
 */
export function formatTitleCase(text: string): string {
	if (!text) return "";
	return text
		.toLowerCase()
		.replace(/(?:^|[\s\-/.])[a-z]/g, (char) => char.toUpperCase());
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
