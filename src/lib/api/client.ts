import { isRecord } from "./sanitize.ts";

export const DEFAULT_TIMEOUT_MS = 5000;

export type ApiErrorCode =
	| "NOT_FOUND"
	| "RATE_LIMITED"
	| "HTTP_ERROR"
	| "TIMEOUT"
	| "NETWORK_ERROR"
	| "INVALID_PAYLOAD";

export interface ApiClientError {
	code: ApiErrorCode;
	status?: number;
	message: string;
}

export interface ApiFetchResult<T> {
	data: T;
	source: "api" | "fallback";
	error?: ApiClientError;
	fromCache?: boolean;
}

export interface PaginatedApiData<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export type FetchLike = (
	input: RequestInfo | URL,
	init?: RequestInit,
) => Promise<Response>;

export interface FetchApiOptions {
	timeoutMs?: number;
	signal?: AbortSignal;
	fetchFn?: FetchLike;
}

export type RawApiOutcome<T> =
	| { ok: true; data: T }
	| { ok: false; error: ApiClientError };

function mapHttpStatusToErrorCode(status: number): ApiErrorCode {
	if (status === 404) return "NOT_FOUND";
	if (status === 429) return "RATE_LIMITED";
	return "HTTP_ERROR";
}

function isEnvelopeRecord(value: unknown): value is { data: unknown } {
	return isRecord(value) && "data" in value;
}

function isNonNegativeInt(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function isPositiveInt(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 1;
}

function isPaginatedEnvelope(value: unknown): value is {
	data: unknown[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
} {
	return (
		isRecord(value) &&
		Array.isArray(value.data) &&
		isNonNegativeInt(value.total) &&
		isPositiveInt(value.page) &&
		isPositiveInt(value.limit) &&
		isPositiveInt(value.totalPages)
	);
}

type RawJsonOutcome =
	| { ok: true; status: number; body: unknown }
	| { ok: false; error: ApiClientError };

async function fetchRawJson(
	url: string,
	options?: FetchApiOptions,
): Promise<RawJsonOutcome> {
	const callerSignal = options?.signal;
	if (callerSignal?.aborted) {
		return {
			ok: false,
			error: {
				code: "NETWORK_ERROR",
				message: "Request aborted by caller",
			},
		};
	}

	const fetchFn = options?.fetchFn ?? globalThis.fetch;
	const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
	const controller = new AbortController();
	let didTimeout = false;

	const onCallerAbort = () => {
		controller.abort();
	};
	callerSignal?.addEventListener("abort", onCallerAbort, { once: true });

	const timeoutId = setTimeout(() => {
		didTimeout = true;
		controller.abort();
	}, timeoutMs);

	try {
		const response = await fetchFn(url, {
			method: "GET",
			// Never send same-origin /studio cookies so public CDN cache remains shared.
			credentials: "omit",
			headers: {
				Accept: "application/json",
			},
			signal: controller.signal,
		});

		if (!response.ok) {
			return {
				ok: false,
				error: {
					code: mapHttpStatusToErrorCode(response.status),
					status: response.status,
					message: response.statusText || `HTTP ${response.status}`,
				},
			};
		}

		let parsed: unknown;
		try {
			parsed = await response.json();
		} catch {
			return {
				ok: false,
				error: {
					code: "INVALID_PAYLOAD",
					status: response.status,
					message: "Response body is not valid JSON",
				},
			};
		}

		return {
			ok: true,
			status: response.status,
			body: parsed,
		};
	} catch (err) {
		if (didTimeout) {
			return {
				ok: false,
				error: {
					code: "TIMEOUT",
					message: `Request timed out after ${timeoutMs}ms`,
				},
			};
		}

		return {
			ok: false,
			error: {
				code: "NETWORK_ERROR",
				message: err instanceof Error ? err.message : "Network request failed",
			},
		};
	} finally {
		clearTimeout(timeoutId);
		callerSignal?.removeEventListener("abort", onCallerAbort);
	}
}

/**
 * Fetches a public JSON endpoint using GET with cookies omitted and a fail-fast timeout.
 */
export async function fetchApiJson<T>(
	url: string,
	options?: FetchApiOptions,
): Promise<RawApiOutcome<T>> {
	const raw = await fetchRawJson(url, options);
	if (!raw.ok) {
		return raw;
	}

	if (!isEnvelopeRecord(raw.body)) {
		return {
			ok: false,
			error: {
				code: "INVALID_PAYLOAD",
				status: raw.status,
				message: "Response JSON does not match { data } envelope",
			},
		};
	}

	return {
		ok: true,
		data: raw.body.data as T,
	};
}

/**
 * Fetches a public paginated JSON endpoint using GET with cookies omitted and a fail-fast timeout.
 */
export async function fetchPaginatedApiJson<T>(
	url: string,
	options?: FetchApiOptions,
): Promise<RawApiOutcome<PaginatedApiData<T>>> {
	const raw = await fetchRawJson(url, options);
	if (!raw.ok) {
		return raw;
	}

	if (!isPaginatedEnvelope(raw.body)) {
		return {
			ok: false,
			error: {
				code: "INVALID_PAYLOAD",
				status: raw.status,
				message:
					"Response JSON does not match paginated { data, total, page, limit, totalPages } envelope",
			},
		};
	}

	return {
		ok: true,
		data: {
			items: raw.body.data as T[],
			total: raw.body.total,
			page: raw.body.page,
			limit: raw.body.limit,
			totalPages: raw.body.totalPages,
		},
	};
}
