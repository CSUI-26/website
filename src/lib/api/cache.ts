import { isRecord } from "./sanitize.ts";

export const DEFAULT_CACHE_FRESH_MS = 60_000;
export const DEFAULT_CACHE_STALE_MS = 300_000;

export interface StorageLike {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
}

export interface CachePolicyOptions {
	freshTtlMs?: number;
	staleTtlMs?: number;
	bypassCache?: boolean;
	storage?: StorageLike | null;
	now?: () => number;
}

export interface CacheLookup<T> {
	status: "fresh" | "stale";
	data: T;
	updatedAt: number;
}

export interface ApiCache<T> {
	get(
		key: string,
		validate: (raw: unknown) => T | null,
		options?: CachePolicyOptions,
	): CacheLookup<T> | null;
	set(key: string, data: T, options?: CachePolicyOptions): void;
	dedupe<R>(key: string, task: () => Promise<R>): Promise<R>;
	clear(key?: string, options?: { storage?: StorageLike | null }): void;
}

interface StoredEntry<T> {
	version: 1;
	updatedAt: number;
	data: T;
}

/**
 * Safely resolves browser sessionStorage, returning null in SSR, Node, or restricted contexts.
 */
export function getDefaultBrowserStorage(): StorageLike | null {
	try {
		if (typeof globalThis !== "undefined" && "sessionStorage" in globalThis) {
			const storage = (globalThis as { sessionStorage?: StorageLike })
				.sessionStorage;
			if (
				storage &&
				typeof storage.getItem === "function" &&
				typeof storage.setItem === "function" &&
				typeof storage.removeItem === "function"
			) {
				return storage;
			}
		}
	} catch {
		return null;
	}
	return null;
}

function resolveStorage(options?: {
	storage?: StorageLike | null;
}): StorageLike | null {
	if (options && options.storage !== undefined) {
		return options.storage;
	}
	return getDefaultBrowserStorage();
}

function safeStorageGet(
	storage: StorageLike | null,
	fullKey: string,
): string | null {
	if (!storage) return null;
	try {
		return storage.getItem(fullKey);
	} catch {
		return null;
	}
}

function safeStorageSet(
	storage: StorageLike | null,
	fullKey: string,
	value: string,
): void {
	if (!storage) return;
	try {
		storage.setItem(fullKey, value);
	} catch {
		// Ignore quota or private-browsing storage errors.
	}
}

function safeStorageRemove(
	storage: StorageLike | null,
	fullKey: string,
): void {
	if (!storage) return;
	try {
		storage.removeItem(fullKey);
	} catch {
		// Ignore storage access errors.
	}
}

/**
 * Creates a namespaced in-memory + sessionStorage TTL/SWR cache with in-flight deduplication.
 */
export function createApiCache<T>(
	namespace: string,
	defaults?: { freshTtlMs?: number; staleTtlMs?: number },
): ApiCache<T> {
	const memory = new Map<string, StoredEntry<T>>();
	const inFlight = new Map<string, Promise<unknown>>();
	const trackedKeys = new Set<string>();

	const makeFullKey = (key: string) => `${namespace}:${key}`;

	return {
		get(key, validate, options) {
			if (options?.bypassCache) {
				return null;
			}

			const fullKey = makeFullKey(key);
			const storage = resolveStorage(options);
			const now = options?.now ?? Date.now;
			const freshTtlMs = Math.max(
				0,
				options?.freshTtlMs ?? defaults?.freshTtlMs ?? DEFAULT_CACHE_FRESH_MS,
			);
			const staleTtlMs = Math.max(
				freshTtlMs,
				options?.staleTtlMs ?? defaults?.staleTtlMs ?? DEFAULT_CACHE_STALE_MS,
			);

			let entry = memory.get(key);

			if (!entry) {
				const rawJson = safeStorageGet(storage, fullKey);
				if (rawJson === null) {
					return null;
				}

				let parsed: unknown;
				try {
					parsed = JSON.parse(rawJson);
				} catch {
					safeStorageRemove(storage, fullKey);
					return null;
				}

				if (
					!isRecord(parsed) ||
					parsed.version !== 1 ||
					typeof parsed.updatedAt !== "number" ||
					!Number.isFinite(parsed.updatedAt)
				) {
					safeStorageRemove(storage, fullKey);
					return null;
				}

				const validated = validate(parsed.data);
				if (validated === null) {
					safeStorageRemove(storage, fullKey);
					return null;
				}

				entry = {
					version: 1,
					updatedAt: parsed.updatedAt,
					data: validated,
				};
				memory.set(key, entry);
				trackedKeys.add(key);
			}

			const age = now() - entry.updatedAt;
			if (age < 0 || age > staleTtlMs) {
				memory.delete(key);
				safeStorageRemove(storage, fullKey);
				return null;
			}

			return {
				status: age <= freshTtlMs ? "fresh" : "stale",
				data: entry.data,
				updatedAt: entry.updatedAt,
			};
		},

		set(key, data, options) {
			const now = options?.now ?? Date.now;
			const entry: StoredEntry<T> = {
				version: 1,
				updatedAt: now(),
				data,
			};
			memory.set(key, entry);
			trackedKeys.add(key);

			const storage = resolveStorage(options);
			try {
				safeStorageSet(storage, makeFullKey(key), JSON.stringify(entry));
			} catch {
				// Ignore serialization errors.
			}
		},

		dedupe<R>(key: string, task: () => Promise<R>): Promise<R> {
			const existing = inFlight.get(key) as Promise<R> | undefined;
			if (existing) {
				return existing;
			}

			const promise = task().finally(() => {
				if (inFlight.get(key) === promise) {
					inFlight.delete(key);
				}
			});

			inFlight.set(key, promise);
			return promise;
		},

		clear(key, options) {
			const storage = resolveStorage(options);
			if (key !== undefined) {
				memory.delete(key);
				inFlight.delete(key);
				trackedKeys.delete(key);
				safeStorageRemove(storage, makeFullKey(key));
				return;
			}

			for (const tracked of trackedKeys) {
				safeStorageRemove(storage, makeFullKey(tracked));
			}
			memory.clear();
			inFlight.clear();
			trackedKeys.clear();
		},
	};
}
