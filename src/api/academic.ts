import {
	type Course,
	type ProgramStudy,
	programStudies,
	type Semester,
} from "../data/academic.ts";
import {
	type ApiClientError,
	type ApiFetchResult,
	type FetchApiOptions,
	fetchApiJson,
	fetchPaginatedApiJson,
	type PaginatedApiData,
} from "./client.ts";
import { isRecord, sanitizeHttpUrl, sanitizeUrl } from "./sanitize.ts";

export const PROGRAMS_ENDPOINT = "/api/v1/programs";
export const COURSES_ENDPOINT = "/api/v1/courses";

export function programByIdEndpoint(id: string): string {
	return `${PROGRAMS_ENDPOINT}/${encodeURIComponent(id.trim())}`;
}

export interface CourseRow {
	programId: string;
	programName: string;
	semester: number | string;
	course: Course;
}

export type PaginatedCourses = PaginatedApiData<CourseRow>;

export interface FetchProgramsOptions extends FetchApiOptions {
	endpoint?: string;
	fallbackData?: ProgramStudy[];
	isDev?: boolean;
	warn?: (message: string, detail?: unknown) => void;
}

export interface FetchProgramByIdOptions extends FetchApiOptions {
	endpoint?: string;
	fallbackData?: ProgramStudy | null;
	isDev?: boolean;
	warn?: (message: string, detail?: unknown) => void;
}

export interface FetchCoursesQuery {
	search?: string;
	sks?: number;
	program?: string;
	semester?: number | string;
	page?: number;
	limit?: number;
}

export interface FetchCoursesOptions extends FetchApiOptions {
	endpoint?: string;
	fallbackData?: PaginatedCourses;
	isDev?: boolean;
	warn?: (message: string, detail?: unknown) => void;
}

function normalizeSemesterLabel(value: unknown): number | string | null {
	if (typeof value === "number") {
		return Number.isInteger(value) && value >= 1 ? value : null;
	}
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed) return null;
		if (/^\d+$/.test(trimmed)) {
			const parsed = Number(trimmed);
			return Number.isInteger(parsed) && parsed >= 1 ? parsed : null;
		}
		return trimmed;
	}
	return null;
}

function normalizeStringList(raw: unknown): string[] | undefined {
	if (!Array.isArray(raw)) return undefined;
	return raw
		.filter(
			(item): item is string =>
				typeof item === "string" && item.trim().length > 0,
		)
		.map((item) => item.trim());
}

/**
 * Validates and normalizes a single Course DTO into frontend Course shape.
 */
export function normalizeCourse(raw: unknown): Course | null {
	if (!isRecord(raw)) return null;
	if (typeof raw.name !== "string" || raw.name.trim().length === 0) {
		return null;
	}
	if (
		typeof raw.sks !== "number" ||
		!Number.isInteger(raw.sks) ||
		raw.sks < 1 ||
		raw.sks > 6
	) {
		return null;
	}

	const normalized: Course = {
		name: raw.name.trim(),
		sks: raw.sks,
	};

	if (
		typeof raw.id === "number" &&
		Number.isInteger(raw.id) &&
		raw.id >= 1
	) {
		normalized.id = raw.id;
	}
	if (typeof raw.code === "string" && raw.code.trim().length > 0) {
		normalized.code = raw.code.trim();
	}
	if (typeof raw.category === "string" && raw.category.trim().length > 0) {
		normalized.category = raw.category.trim();
	}
	if (typeof raw.track === "string" && raw.track.trim().length > 0) {
		normalized.track = raw.track.trim();
	}
	if (
		typeof raw.description === "string" &&
		raw.description.trim().length > 0
	) {
		normalized.description = raw.description.trim();
	}
	const prerequisites = normalizeStringList(raw.prerequisites);
	if (prerequisites !== undefined) {
		normalized.prerequisites = prerequisites;
	}
	const unlocks = normalizeStringList(raw.unlocks);
	if (unlocks !== undefined) {
		normalized.unlocks = unlocks;
	}
	const materialUrl = sanitizeHttpUrl(raw.materialUrl);
	if (materialUrl) {
		normalized.materialUrl = materialUrl;
	}

	return normalized;
}

/**
 * Validates and normalizes a semester entry and its courses array.
 */
export function normalizeSemester(raw: unknown): Semester | null {
	if (!isRecord(raw)) return null;
	const semester = normalizeSemesterLabel(raw.semester);
	if (semester === null) return null;
	if (!Array.isArray(raw.courses)) return null;

	const courses: Course[] = [];
	for (const entry of raw.courses) {
		const normalized = normalizeCourse(entry);
		if (normalized) {
			courses.push(normalized);
		}
	}

	return {
		semester,
		courses,
	};
}

/**
 * Validates and normalizes a single Program DTO into frontend ProgramStudy shape.
 */
export function normalizeProgram(raw: unknown): ProgramStudy | null {
	if (!isRecord(raw)) return null;
	if (typeof raw.id !== "string" || raw.id.trim().length === 0) return null;
	if (typeof raw.name !== "string" || raw.name.trim().length === 0) {
		return null;
	}
	if (raw.semesters !== undefined && !Array.isArray(raw.semesters)) {
		return null;
	}

	const id = raw.id.trim();
	const sanitizedSlug = sanitizeUrl(raw.slug);
	const slug = sanitizedSlug.startsWith("/")
		? sanitizedSlug
		: `/academic/${id}`;

	const careers = Array.isArray(raw.careers)
		? raw.careers
				.filter(
					(career): career is string =>
						typeof career === "string" && career.trim().length > 0,
				)
				.map((career) => career.trim())
		: [];

	const semesters: Semester[] = [];
	if (Array.isArray(raw.semesters)) {
		for (const sem of raw.semesters) {
			const normalized = normalizeSemester(sem);
			if (normalized) {
				semesters.push(normalized);
			}
		}
	}

	return {
		id,
		name: raw.name.trim(),
		slug,
		description:
			typeof raw.description === "string" ? raw.description.trim() : "",
		careers,
		semesters,
		courseMapUrl: sanitizeHttpUrl(raw.courseMapUrl),
		driveUrl: sanitizeHttpUrl(raw.driveUrl),
	};
}

/**
 * Validates and normalizes a list of study programs, preserving API order.
 */
export function normalizePrograms(raw: unknown): ProgramStudy[] | null {
	if (!Array.isArray(raw)) return null;

	const programs: ProgramStudy[] = [];
	for (const entry of raw) {
		const normalized = normalizeProgram(entry);
		if (normalized) {
			programs.push(normalized);
		}
	}

	return programs;
}

/**
 * Validates and normalizes a single course search result row.
 */
export function normalizeCourseRow(raw: unknown): CourseRow | null {
	if (!isRecord(raw)) return null;
	if (
		typeof raw.programId !== "string" ||
		raw.programId.trim().length === 0
	) {
		return null;
	}
	if (
		typeof raw.programName !== "string" ||
		raw.programName.trim().length === 0
	) {
		return null;
	}
	const semester = normalizeSemesterLabel(raw.semester);
	if (semester === null) return null;

	const course = normalizeCourse(raw.course);
	if (!course) return null;

	return {
		programId: raw.programId.trim(),
		programName: raw.programName.trim(),
		semester,
		course,
	};
}

function cloneCourse(source: Course): Course {
	const cloned: Course = {
		name: source.name,
		sks: source.sks,
	};
	if (source.id !== undefined) cloned.id = source.id;
	if (source.code !== undefined) cloned.code = source.code;
	if (source.category !== undefined) cloned.category = source.category;
	if (source.track !== undefined) cloned.track = source.track;
	if (source.description !== undefined) cloned.description = source.description;
	if (source.prerequisites !== undefined) {
		cloned.prerequisites = [...source.prerequisites];
	}
	if (source.unlocks !== undefined) {
		cloned.unlocks = [...source.unlocks];
	}
	if (source.materialUrl !== undefined) cloned.materialUrl = source.materialUrl;
	return cloned;
}

function cloneSemester(source: Semester): Semester {
	return {
		semester: source.semester,
		courses: source.courses.map(cloneCourse),
	};
}

function cloneProgram(source: ProgramStudy): ProgramStudy {
	return {
		id: source.id,
		name: source.name,
		slug: source.slug,
		description: source.description,
		careers: [...source.careers],
		semesters: source.semesters.map(cloneSemester),
		courseMapUrl: source.courseMapUrl,
		driveUrl: source.driveUrl,
	};
}

function clonePrograms(source: ProgramStudy[]): ProgramStudy[] {
	return source.map(cloneProgram);
}

function clonePaginatedCourses(source: PaginatedCourses): PaginatedCourses {
	return {
		items: source.items.map((row) => ({
			programId: row.programId,
			programName: row.programName,
			semester: row.semester,
			course: cloneCourse(row.course),
		})),
		total: source.total,
		page: source.page,
		limit: source.limit,
		totalPages: source.totalPages,
	};
}

function logDevFallback(
	scope: string,
	error: ApiClientError,
	options?: {
		isDev?: boolean;
		warn?: (message: string, detail?: unknown) => void;
	},
): void {
	const isDev =
		options?.isDev ??
		Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV);
	if (isDev) {
		const warn = options?.warn ?? console.warn;
		warn(
			`[api/${scope}] Falling back (${error.code}): ${error.message}`,
			error,
		);
	}
}

/**
 * Fetches all study programs (with nested semesters and courses) and falls back to static data on failure.
 */
export async function fetchPrograms(
	options?: FetchProgramsOptions,
): Promise<ApiFetchResult<ProgramStudy[]>> {
	const endpoint = options?.endpoint ?? PROGRAMS_ENDPOINT;
	const fallbackSource = options?.fallbackData ?? programStudies;

	const outcome = await fetchApiJson<unknown>(endpoint, options);
	let error: ApiClientError;

	if (outcome.ok) {
		const normalized = normalizePrograms(outcome.data);
		if (normalized !== null) {
			return {
				data: normalized,
				source: "api",
			};
		}
		error = {
			code: "INVALID_PAYLOAD",
			message: "Programs payload does not match expected array shape",
		};
	} else {
		error = outcome.error;
	}

	logDevFallback("academic/programs", error, options);

	return {
		data: clonePrograms(fallbackSource),
		source: "fallback",
		error,
	};
}

/**
 * Fetches a single study program by ID and falls back to static data on failure.
 */
export async function fetchProgramById(
	id: string,
	options?: FetchProgramByIdOptions,
): Promise<ApiFetchResult<ProgramStudy | null>> {
	const trimmedId = id.trim();
	const endpoint = options?.endpoint ?? programByIdEndpoint(trimmedId);
	const fallbackSource =
		options?.fallbackData !== undefined
			? options.fallbackData
			: (programStudies.find((p) => p.id === trimmedId) ?? null);

	const outcome = await fetchApiJson<unknown>(endpoint, options);
	let error: ApiClientError;

	if (outcome.ok) {
		const normalized = normalizeProgram(outcome.data);
		if (normalized !== null) {
			return {
				data: normalized,
				source: "api",
			};
		}
		error = {
			code: "INVALID_PAYLOAD",
			message: "Program payload does not match expected shape",
		};
	} else {
		error = outcome.error;
	}

	logDevFallback(`academic/programs/${trimmedId}`, error, options);

	return {
		data: fallbackSource ? cloneProgram(fallbackSource) : null,
		source: "fallback",
		error,
	};
}

/**
 * Builds the /api/v1/courses endpoint URL with deterministic query parameters.
 */
export function buildCoursesUrl(
	query?: FetchCoursesQuery,
	baseEndpoint = COURSES_ENDPOINT,
): string {
	if (!query) return baseEndpoint;

	const params = new URLSearchParams();
	if (typeof query.search === "string" && query.search.trim().length > 0) {
		params.set("search", query.search.trim());
	}
	if (typeof query.sks === "number" && Number.isInteger(query.sks)) {
		params.set("sks", String(query.sks));
	}
	if (typeof query.program === "string" && query.program.trim().length > 0) {
		params.set("program", query.program.trim());
	}
	if (query.semester !== undefined) {
		const sem = String(query.semester).trim();
		if (sem.length > 0) {
			params.set("semester", sem);
		}
	}
	if (typeof query.page === "number" && Number.isInteger(query.page)) {
		params.set("page", String(query.page));
	}
	if (typeof query.limit === "number" && Number.isInteger(query.limit)) {
		params.set("limit", String(query.limit));
	}

	const qs = params.toString();
	return qs ? `${baseEndpoint}?${qs}` : baseEndpoint;
}

const EMPTY_COURSES_PAGE: PaginatedCourses = {
	items: [],
	total: 0,
	page: 1,
	limit: 20,
	totalPages: 1,
};

/**
 * Fetches paginated courses from /api/v1/courses and falls back safely on failure.
 */
export async function fetchCourses(
	query?: FetchCoursesQuery,
	options?: FetchCoursesOptions,
): Promise<ApiFetchResult<PaginatedCourses>> {
	const url = buildCoursesUrl(query, options?.endpoint ?? COURSES_ENDPOINT);
	const fallbackSource = options?.fallbackData ?? EMPTY_COURSES_PAGE;

	const outcome = await fetchPaginatedApiJson<unknown>(url, options);

	if (outcome.ok) {
		const items: CourseRow[] = [];
		for (const row of outcome.data.items) {
			const normalized = normalizeCourseRow(row);
			if (normalized) {
				items.push(normalized);
			}
		}

		return {
			data: {
				items,
				total: outcome.data.total,
				page: outcome.data.page,
				limit: outcome.data.limit,
				totalPages: outcome.data.totalPages,
			},
			source: "api",
		};
	}

	logDevFallback("academic/courses", outcome.error, options);

	return {
		data: clonePaginatedCourses(fallbackSource),
		source: "fallback",
		error: outcome.error,
	};
}
