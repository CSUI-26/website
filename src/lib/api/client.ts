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
	return (
		typeof value === "object" &&
		value !== null &&
		!Array.isArray(value) &&
		"data" in value
	);
}

/**
 * Fetches a public JSON endpoint using GET with cookies omitted and a fail-fast timeout.
 */
export async function fetchApiJson<T>(
	url: string,
	options?: FetchApiOptions,
): Promise<RawApiOutcome<T>> {
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

		if (!isEnvelopeRecord(parsed)) {
			return {
				ok: false,
				error: {
					code: "INVALID_PAYLOAD",
					status: response.status,
					message: "Response JSON does not match { data } envelope",
				},
			};
		}

		return {
			ok: true,
			data: parsed.data as T,
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
