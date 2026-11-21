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

export type RecordValues<T extends Record<PropertyKey, unknown>> = T[keyof T];
