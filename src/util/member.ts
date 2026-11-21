import fs from "node:fs";
import path from "node:path";

import type { Member } from "@/types/member";
import { slugify } from "@/util/string";

/**
 * Returns a Set of cached photo filenames under public/photos/.
 * Memoized across calls during the build / SSG phase.
 */
let localPhotosSet: Set<string> | null = null;

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
 * Returns the local cached asset `/photos/<npm>.<ext>` if present in
 * `public/photos/`, otherwise falls back to the original remote URL.
 *
 * Unlike the API's own `foto.url` values, the local assets are served over the
 * page's own scheme, so this is the preferred source whenever a cache exists.
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
 * Generates a unique, deterministic slug identifier for a member.
 * Standard format: clean full name slug. If empty, falls back to NPM.
 */
export function getMemberSlug(member: Pick<Member, "name" | "npm">): string {
	const base = slugify(member.name);
	return base || member.npm;
}
