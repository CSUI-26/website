import type { Member } from "@/types/member";

declare type RecordValues<T extends Record<PropertyKey, any>> = T[keyof T];

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
