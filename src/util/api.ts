/**
 * Client for the Zenith backend API.
 *
 * Production is served from `https://zenith.csui.dev`, the same origin as the
 * API, so relative URLs work in the browser and no CORS is involved. The
 * `vercel.json` rewrite of `/api/:path*` exists for the Vercel deployment, and
 * it answers with a redirect rather than proxying, which lands on that same
 * origin again.
 *
 * The API grants no `Access-Control-Allow-Origin` to any origin, so a browser
 * call from an origin other than the API host fails outright. That rules out a
 * cross-origin frontend talking to it directly, and it is why
 * `PUBLIC_ZENITH_API_URL` is only useful where CORS does not apply: during the
 * Astro build, in a server route, or behind a proxy that adds the headers.
 *
 * Credentials ride on the `token` cookie, which is enough on its own; the
 * `session` cookie does not authenticate. A bearer header works too, but only
 * for a caller that can read the token, which page JavaScript cannot. Server
 * routes should pass the cookie through `RequestOptions.cookie`.
 */

/** Origin serving the API. Empty means "same origin as the page". */
const API_ORIGIN = (import.meta.env.PUBLIC_ZENITH_API_URL ?? "").replace(
	/\/+$/,
	"",
);

/** Prefix every endpoint lives under. */
const API_BASE = `${API_ORIGIN}/api/v1`;

/** Envelope every list endpoint returns. */
interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

/** Envelope every single-resource endpoint returns. */
interface ItemResponse<T> {
	data: T;
}

/** Crop and zoom applied to a member photo in the studio editor. */
export interface MemberPhotoConfig {
	x: number;
	y: number;
	zoom: number;
	aspect: string;
	rotate?: number;
}

export interface MemberPhoto {
	url: string;
	config: MemberPhotoConfig;
}

export interface Member {
	npm: string;
	name: string;
	nama_panggilan: string;
	major: string;
	programId: string;
	instagram: string;
	line: string;
	github: string;
	linkedin: string;
	deskripsi: string;
	niche: string;
	quotes: string;
	foto: MemberPhoto;
}

export interface AchievementImage {
	url: string;
}

export interface Achievement {
	id: string;
	title: string;
	award: string;
	year: number;
	position: number;
	isFeatured: boolean;
	image: AchievementImage;
	teamName: string;
	/** Names as displayed, not member records: e.g. "Dolor SI'26". */
	members: string[];
	description: string;
	showOverlay: boolean;
}

export interface Course {
	id: number;
	name: string;
	code?: string;
	sks: number;
	description?: string;
	prerequisites?: string[];
	materialUrl?: string;
}

export interface CourseEntry {
	programId: string;
	programName: string;
	/** Semester number, or the string "Pilihan" for electives. */
	semester: number | string;
	course: Course;
}

/** The authenticated account, as returned by `/auth/me`. */
export interface AuthProfile {
	username: string;
	nama: string;
	npm: string;
	role: string;
	kd_org: string;
	isAdmin: boolean;
	isWhitelisted: boolean;
	isSuperAdmin: boolean;
	org: Record<string, string>;
}

export class ApiError extends Error {
	readonly status: number;
	readonly endpoint: string;

	constructor(message: string, status: number, endpoint: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.endpoint = endpoint;
	}
}

interface RequestOptions {
	/** Forward the caller's cookie header, for authenticated endpoints. */
	cookie?: string;
	signal?: AbortSignal;
}

async function request<T>(
	path: string,
	options: RequestOptions = {},
): Promise<T> {
	const endpoint = `${API_BASE}${path}`;
	const headers: Record<string, string> = { Accept: "application/json" };
	if (options.cookie) headers.Cookie = options.cookie;

	const init: RequestInit = { headers };
	if (options.signal) init.signal = options.signal;
	const response = await fetch(endpoint, init);

	if (!response.ok) {
		let message = `${response.status} ${response.statusText}`;
		try {
			const body = (await response.json()) as {
				error?: string;
				message?: string;
			};
			message = body.error ?? body.message ?? message;
		} catch {
			// Non-JSON error body; keep the status line.
		}
		throw new ApiError(message, response.status, endpoint);
	}

	return (await response.json()) as T;
}

/** Maximum page size the API honours; larger `limit` values are clamped. */
export const MAX_PAGE_SIZE = 100;

export interface ListParams {
	page?: number;
	limit?: number;
}

function buildQuery(
	params: Record<string, string | number | undefined>,
): string {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === "") continue;
		search.set(key, String(value));
	}
	const query = search.toString();
	return query ? `?${query}` : "";
}

/**
 * Reads one page of members.
 *
 * The API also accepts `major` (canonical name, e.g. "Ilmu Komputer") and
 * `search` (free text over name, nickname, and niche). `programId` and `q`
 * are accepted but ignored, so use `major` and `search`.
 */
export async function getMembersPage(
	params: ListParams & { major?: string; search?: string } = {},
	options: RequestOptions = {},
): Promise<PaginatedResponse<Member>> {
	return request(
		`/members${buildQuery({
			page: params.page,
			limit: params.limit,
			major: params.major,
			search: params.search,
		})}`,
		options,
	);
}

/**
 * Reads the complete member list, following pagination.
 *
 * `limit=100` caps a page at 100 records, so the current cohort of 546 members
 * costs six requests and about 460 KB. Prefer `getMembersPage` when a single
 * page is enough.
 */
export async function getAllMembers(
	options: RequestOptions & { pageSize?: number; concurrency?: number } = {},
): Promise<Member[]> {
	const pageSize = Math.min(options.pageSize ?? MAX_PAGE_SIZE, MAX_PAGE_SIZE);
	const first = await getMembersPage({ page: 1, limit: pageSize }, options);
	const remaining = Math.max(first.totalPages - 1, 0);
	if (remaining === 0) return first.data;

	const pages = Array.from({ length: remaining }, (_, index) => index + 2);
	const concurrency = Math.max(1, options.concurrency ?? 4);
	const results: Member[] = [...first.data];

	for (let index = 0; index < pages.length; index += concurrency) {
		const batch = pages.slice(index, index + concurrency);
		const settled = await Promise.all(
			batch.map((page) => getMembersPage({ page, limit: pageSize }, options)),
		);
		for (const result of settled) results.push(...result.data);
	}

	return results;
}

/** Reads a single member by NPM. Throws `ApiError` with status 404 when absent. */
export async function getMember(
	npm: string,
	options: RequestOptions = {},
): Promise<Member> {
	const response = await request<ItemResponse<Member>>(
		`/members/${encodeURIComponent(npm)}`,
		options,
	);
	return response.data;
}

/**
 * Reads one page of achievements.
 *
 * The API also accepts `year` (integer) and `featured` ("true") filters.
 */
export async function getAchievementsPage(
	params: ListParams & { year?: number; featured?: boolean } = {},
	options: RequestOptions = {},
): Promise<PaginatedResponse<Achievement>> {
	return request(
		`/achievements${buildQuery({
			page: params.page,
			limit: params.limit,
			year: params.year,
			featured:
				params.featured === undefined ? undefined : String(params.featured),
		})}`,
		options,
	);
}

/** Reads every achievement. There are currently 30, so this is one request. */
export async function getAllAchievements(
	options: RequestOptions & { pageSize?: number } = {},
): Promise<Achievement[]> {
	const pageSize = Math.min(options.pageSize ?? MAX_PAGE_SIZE, MAX_PAGE_SIZE);
	const first = await getAchievementsPage(
		{ page: 1, limit: pageSize },
		options,
	);
	if (first.totalPages <= 1) return first.data;

	const pages = Array.from(
		{ length: first.totalPages - 1 },
		(_, index) => index + 2,
	);
	const rest = await Promise.all(
		pages.map((page) =>
			getAchievementsPage({ page, limit: pageSize }, options),
		),
	);
	return [first.data, ...rest.map((result) => result.data)].flat();
}

/**
 * Reads one page of course entries. Courses are stored flattened: one record
 * per course per program per semester.
 *
 * A single page is not a coherent view of the curriculum. The rows are grouped
 * by program, so `limit=100` returns all of Ilmu Komputer and CS KKI plus part
 * of AI, and `sistem-informasi` does not appear at all; the default `limit=20`
 * returns only Ilmu Komputer. Use `getAllCourses` unless you deliberately want
 * one slice.
 */
export async function getCoursesPage(
	params: ListParams & { programId?: string } = {},
	options: RequestOptions = {},
): Promise<PaginatedResponse<CourseEntry>> {
	return request(
		`/courses${buildQuery({
			page: params.page,
			limit: params.limit,
			programId: params.programId,
		})}`,
		options,
	);
}

/** Reads every course entry, following pagination (154 records today). */
export async function getAllCourses(
	options: RequestOptions & { pageSize?: number; programId?: string } = {},
): Promise<CourseEntry[]> {
	const pageSize = Math.min(options.pageSize ?? MAX_PAGE_SIZE, MAX_PAGE_SIZE);
	const programId = options.programId;
	const courseParams = programId
		? { page: 1, limit: pageSize, programId }
		: { page: 1, limit: pageSize };
	const first = await getCoursesPage(courseParams, options);
	if (first.totalPages <= 1) return first.data;

	const pages = Array.from(
		{ length: first.totalPages - 1 },
		(_, index) => index + 2,
	);
	const rest = await Promise.all(
		pages.map((page) =>
			getCoursesPage(
				programId
					? { page, limit: pageSize, programId }
					: { page, limit: pageSize },
				options,
			),
		),
	);
	return [first.data, ...rest.map((result) => result.data)].flat();
}

/**
 * Reads the authenticated account.
 *
 * Requires the caller's cookie. The `token` cookie alone authenticates; the
 * `session` cookie is not what the API reads. In a server context (an Astro
 * endpoint or `getStaticPaths`) pass `Astro.request.headers.get("cookie")`
 * through `options.cookie`.
 */
export async function getAuthProfile(
	options: RequestOptions = {},
): Promise<AuthProfile> {
	const response = await request<ItemResponse<AuthProfile>>(
		"/auth/me",
		options,
	);
	return response.data;
}

/**
 * Rewrites an API-supplied photo URL to HTTPS.
 *
 * Every member photo is stored as `http://zenith.csui.dev/storage/...`, which a
 * browser refuses to load on an HTTPS page as mixed content. The host serves
 * the same paths over HTTPS, so upgrading the scheme is safe. Paths that are
 * already relative or HTTPS are returned unchanged.
 */
export function toSecurePhotoUrl(url: string): string {
	if (!url) return "";
	return url.startsWith("http://")
		? `https://${url.slice("http://".length)}`
		: url;
}

export { API_BASE, API_ORIGIN };
