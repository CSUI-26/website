import {
	type LatestAchievement,
	latestAchievements,
	type YearGroup,
	type YearlyAchievement,
	yearlyAchievementsByYear,
} from "../../data/achievements.ts";
import {
	type ApiClientError,
	type ApiFetchResult,
	type FetchApiOptions,
	fetchApiJson,
} from "./client.ts";

export const ACHIEVEMENTS_GROUPED_ENDPOINT =
	"/api/v1/achievements?format=grouped";

export interface GroupedAchievements {
	latestAchievements: LatestAchievement[];
	yearlyAchievementsByYear: YearGroup[];
}

export interface FetchAchievementsOptions extends FetchApiOptions {
	endpoint?: string;
	fallbackData?: GroupedAchievements;
	isDev?: boolean;
	warn?: (message: string, detail?: unknown) => void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasControlCharacters(value: string): boolean {
	for (let i = 0; i < value.length; i += 1) {
		const code = value.charCodeAt(i);
		if (code <= 31 || code === 127) {
			return true;
		}
	}
	return false;
}

/**
 * Extracts and validates an achievement banner URL from either a string or API ImageField.
 */
export function sanitizeImageUrl(value: unknown): string {
	const raw =
		typeof value === "string"
			? value
			: isRecord(value) && typeof value.url === "string"
				? value.url
				: "";

	const trimmed = raw.trim();
	if (!trimmed || hasControlCharacters(trimmed)) {
		return "";
	}

	if (/^https?:\/\//i.test(trimmed) || /^\/(?![/\\])/.test(trimmed)) {
		return trimmed;
	}

	return "";
}

function normalizeLatestItem(item: unknown): LatestAchievement | null {
	if (!isRecord(item)) return null;
	if (typeof item.id !== "string" || item.id.trim().length === 0) return null;
	if (typeof item.title !== "string" || item.title.trim().length === 0) {
		return null;
	}

	const members = Array.isArray(item.members)
		? item.members
				.filter(
					(member): member is string =>
						typeof member === "string" && member.trim().length > 0,
				)
				.map((member) => member.trim())
		: [];

	return {
		id: item.id.trim(),
		title: item.title.trim(),
		award: typeof item.award === "string" ? item.award.trim() : "",
		image: sanitizeImageUrl(item.image),
		teamName: typeof item.teamName === "string" ? item.teamName.trim() : "",
		members,
		description:
			typeof item.description === "string" ? item.description.trim() : "",
	};
}

function normalizeYearlyItem(
	item: unknown,
	groupYear: number,
): YearlyAchievement | null {
	if (!isRecord(item)) return null;
	if (typeof item.id !== "string" || item.id.trim().length === 0) return null;
	if (typeof item.title !== "string" || item.title.trim().length === 0) {
		return null;
	}

	const year =
		typeof item.year === "number" && Number.isInteger(item.year)
			? item.year
			: groupYear;

	const normalized: YearlyAchievement = {
		id: item.id.trim(),
		title: item.title.trim(),
		year,
	};

	if (typeof item.award === "string" && item.award.trim().length > 0) {
		normalized.award = item.award.trim();
	}

	return normalized;
}

function normalizeYearGroup(group: unknown): YearGroup | null {
	if (!isRecord(group)) return null;
	if (typeof group.year !== "number" || !Number.isInteger(group.year)) {
		return null;
	}
	if (!Array.isArray(group.items)) return null;

	const groupYear = group.year;
	const items: YearlyAchievement[] = [];
	for (const entry of group.items) {
		const normalized = normalizeYearlyItem(entry, groupYear);
		if (normalized) {
			items.push(normalized);
		}
	}

	if (items.length === 0) {
		return null;
	}

	return {
		year: groupYear,
		items,
	};
}

/**
 * Validates and normalizes grouped achievements payloads into existing frontend types.
 */
export function normalizeGroupedAchievements(
	raw: unknown,
): GroupedAchievements | null {
	if (!isRecord(raw)) return null;
	if (
		!Array.isArray(raw.latestAchievements) ||
		!Array.isArray(raw.yearlyAchievementsByYear)
	) {
		return null;
	}

	const latest: LatestAchievement[] = [];
	for (const item of raw.latestAchievements) {
		const normalized = normalizeLatestItem(item);
		if (normalized) {
			latest.push(normalized);
		}
	}

	const yearly: YearGroup[] = [];
	for (const group of raw.yearlyAchievementsByYear) {
		const normalized = normalizeYearGroup(group);
		if (normalized) {
			yearly.push(normalized);
		}
	}

	yearly.sort((a, b) => b.year - a.year);

	return {
		latestAchievements: latest,
		yearlyAchievementsByYear: yearly,
	};
}

function cloneGroupedAchievements(
	source: GroupedAchievements,
): GroupedAchievements {
	return {
		latestAchievements: source.latestAchievements.map((item) => ({
			...item,
			members: [...item.members],
		})),
		yearlyAchievementsByYear: source.yearlyAchievementsByYear.map((group) => ({
			year: group.year,
			items: group.items.map((item) => ({ ...item })),
		})),
	};
}

export function hasAnyAchievements(grouped: GroupedAchievements): boolean {
	return (
		grouped.latestAchievements.length > 0 ||
		grouped.yearlyAchievementsByYear.some((group) => group.items.length > 0)
	);
}

/**
 * Fetches grouped achievements from the API and falls back to static src/data/ on failure.
 */
export async function fetchGroupedAchievements(
	options?: FetchAchievementsOptions,
): Promise<ApiFetchResult<GroupedAchievements>> {
	const fallbackSource = options?.fallbackData ?? {
		latestAchievements,
		yearlyAchievementsByYear,
	};
	const endpoint = options?.endpoint ?? ACHIEVEMENTS_GROUPED_ENDPOINT;

	const outcome = await fetchApiJson<unknown>(endpoint, options);
	let error: ApiClientError;

	if (outcome.ok) {
		const normalized = normalizeGroupedAchievements(outcome.data);
		if (normalized !== null) {
			return {
				data: normalized,
				source: "api",
			};
		}
		error = {
			code: "INVALID_PAYLOAD",
			message: "Grouped achievements payload does not match expected shape",
		};
	} else {
		error = outcome.error;
	}

	const isDev =
		options?.isDev ??
		Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV);
	if (isDev) {
		const warn = options?.warn ?? console.warn;
		warn(
			`[api/achievements] Falling back to static data (${error.code}): ${error.message}`,
			error,
		);
	}

	return {
		data: cloneGroupedAchievements(fallbackSource),
		source: "fallback",
		error,
	};
}
