/**
 * Barrel for the shared utilities.
 *
 * The implementations live in sibling modules grouped by concern, so a page can
 * import from `@/util` for convenience or from the specific module when only one
 * concern is needed:
 *
 * - `@/util/api` — Zenith backend client and its response types
 * - `@/util/member` — member photo resolution and slugs
 * - `@/util/string` — title casing, shuffling, and small generic helpers
 */

export {
	getMajorCode,
	getMajorThemeKey,
	MAJORS,
	type MajorCanonicalName,
	type MajorCode,
	type MajorThemeKey,
	resolveMajorParam,
} from "@/data/majors";
export { toSecurePhotoUrl } from "@/util/api";
export { getMemberPhotoUrl, getMemberSlug } from "@/util/member";
export {
	formatTitleCase,
	type RecordValues,
	shuffle,
	slugify,
} from "@/util/string";
