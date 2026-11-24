# `src/lib/api` — Shared Client API Library

`src/lib/api/` is the shared client-side API layer for fetching public backend JSON endpoints via same-origin `/api/*` paths. It provides:

- A shared HTTP `GET` JSON transport with fail-fast timeouts and standardized errors (`client.ts`)
- Reusable client-side TTL / stale-while-revalidate caching with `sessionStorage` persistence and in-flight deduplication (`cache.ts`)
- Shared runtime type guards and URL sanitization helpers (`sanitize.ts`)
- Domain-specific API modules that validate, normalize, cache, and safely fall back to static data (`achievements.ts`, `academic.ts`, and future modules you add)
- Local Vite dev-server proxy resolution synced with `vercel.json` (`vercel-proxy.ts`)
- Unit tests runnable directly with Node's built-in test runner (`__tests__/`)

This guide is written for **junior developers** and **AI coding agents** extending this library with new API endpoints.

---

## Architecture & Request Flow

```text
Astro Page (e.g. src/pages/achievements/index.astro)
  │ passes static fallback initialData
  ▼
React Island (e.g. src/components/Achievements/AchievementsView.tsx)
  │ useEffect + AbortController
  ▼
Domain Module (src/lib/api/<resource>.ts)
  │ calls fetchApiJson<unknown>(endpoint, options)
  │ validates & normalizes data; falls back to static data on error
  ▼
Core Client (src/lib/api/client.ts -> fetchApiJson)
  │ GET, Accept: application/json, credentials: "omit", 5000ms timeout, 0 retries
  │ requires { data: ... } JSON envelope
  ▼
Same-origin /api/v1/*
  ├─ Local dev (astro dev): Vite server.proxy via src/lib/api/vercel-proxy.ts
  └─ Production / Staging: Vercel rewrites in vercel.json
  ▼
Backend JSON { data: ... }
```

### Files in `src/lib/api/`

| File / Directory | Purpose | Runtime Environment |
| --- | --- | --- |
| `client.ts` | Shared HTTP `GET` JSON client (`fetchApiJson`, `fetchPaginatedApiJson`) and core result/error types. | Browser & Node (tests) |
| `cache.ts` | Reusable in-memory + `sessionStorage` TTL/SWR cache (`createApiCache`) and in-flight deduplication. | Browser & Node (tests) |
| `sanitize.ts` | Shared runtime type guards (`isRecord`) and URL sanitizers (`sanitizeUrl`, `sanitizeHttpUrl`, `sanitizeImageUrl`). | Browser & Node (tests) |
| `achievements.ts` | Reference domain module (`fetchGroupedAchievements`, normalizer). | Browser & Node (tests) |
| `academic.ts` | Study programs & courses module (`fetchPrograms`, `fetchProgramById`, `fetchCourses`) with SWR caching. | Browser & Node (tests) |
| `vercel-proxy.ts` | Reads `vercel.json` `rewrites` (or `API_PROXY_TARGET`) into Vite proxy config for `astro.config.mts`. | **Node-only** (never import in browser/UI code) |
| `__tests__/` | Unit tests for `client.ts`, `cache.ts`, `sanitize.ts`, `achievements.ts`, `academic.ts`, and `vercel-proxy.ts` using `node:test`. | Node (`node --test`) |

---

## Core Client Reference (`client.ts`)

`src/lib/api/client.ts` exports `DEFAULT_TIMEOUT_MS` (`5000`), `fetchApiJson`, and the core TypeScript contracts shared by every domain module.

### Exported Types & Constants

```ts
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
```

### Key Behavioral Guarantees

- **Safe public caching (`credentials: "omit"`)**: Every request uses `method: "GET"`, `Accept: "application/json"`, and `credentials: "omit"`. This prevents same-origin `/studio` session cookies from leaking or disabling shared CDN caching.
- **Fail-fast timeout, 0 retries**: Defaults to `5000` ms (`DEFAULT_TIMEOUT_MS`) and never retries failed requests automatically.
- **Caller cancellation**: Passing `options.signal` (`AbortSignal`) aborts immediately when the caller cancels (for example, on React component unmount) and resolves as `NETWORK_ERROR` without waiting for the timeout.
- **Never throws**: `fetchApiJson` catches network, abort, HTTP, and JSON parsing failures and returns `RawApiOutcome<T>` (`{ ok: true, data }` or `{ ok: false, error }`).
- **Envelope check only**: `fetchApiJson` verifies that the response body is a non-null, non-array JSON object containing a `"data"` key (`{ data: ... }`) and unwraps `parsed.data`. For paginated endpoints (`{ data, total, page, limit, totalPages }`), use `fetchPaginatedApiJson<T>`. **Neither validates the inner fields of `data`** — each domain module must validate `outcome.data` at runtime.
- **Testable**: Inject a mock `fetchFn` via `options.fetchFn` in unit tests.

### Error Codes (`ApiErrorCode`)

| Code | When it occurs | `error.status` |
| --- | --- | --- |
| `NOT_FOUND` | HTTP `404` response | `404` |
| `RATE_LIMITED` | HTTP `429` response | `429` |
| `HTTP_ERROR` | Any other non-`2xx` HTTP response (e.g., `400`, `403`, `500`, `502`) | Response status code |
| `TIMEOUT` | Request did not complete within `timeoutMs` | `undefined` |
| `NETWORK_ERROR` | `fetch` rejected (offline, DNS failure) or aborted by caller's `AbortSignal` | `undefined` |
| `INVALID_PAYLOAD` | Body is not valid JSON, JSON is missing the `{ data }` envelope, or domain normalizer rejected the payload | Response status code (from `client.ts`) or `undefined` (from domain normalizer) |

---

## How to Add a New API Module

Use `src/lib/api/achievements.ts` as the canonical reference implementation. Every new API module (for example, `src/lib/api/events.ts`) should follow the same 5-part structure:

1. **Endpoint constant**: Relative same-origin path (e.g., `"/api/v1/events"`). Never hardcode a domain/origin.
2. **Options interface**: Extend `FetchApiOptions` with `endpoint?`, `fallbackData?`, `isDev?`, and `warn?` so callers and tests can override defaults cleanly.
3. **Runtime validator & normalizer**: Check root shape, discard malformed entries safely, trim strings, sanitize any URLs, and apply deterministic sorting if needed. Return `null` only when the root payload structure itself is invalid.
4. **Deep-clone helper for fallback data**: Clone arrays and nested objects before returning fallback data so consumers cannot accidentally mutate shared static data in `src/data/`.
5. **Main fetcher returning `Promise<ApiFetchResult<T>>`**:
   - Call `fetchApiJson<unknown>(endpoint, options)` (always pass `<unknown>` so TypeScript forces runtime validation).
   - If `outcome.ok`, pass `outcome.data` to your normalizer.
   - **Trust valid empty responses**: If the API returns `200 OK` with valid empty arrays (e.g. `{ data: [] }`), return `{ data: normalized, source: "api" }` — do **not** treat empty API results as an error or fall back to static data.
   - Only when `outcome.ok === false` or `normalized === null` should you log a dev-only warning and return `{ data: cloneFallback(fallbackSource), source: "fallback", error }`.

### Reference Blueprint (Illustrative Example: `src/lib/api/events.ts`)

> **Note**: `src/lib/api/events.ts` does not exist yet — this example shows the exact pattern to copy and adapt when creating a new module.

```ts
import {
	type EventItem,
	eventsFallback,
} from "../../data/events.ts";
import {
	type ApiClientError,
	type ApiFetchResult,
	type FetchApiOptions,
	fetchApiJson,
} from "./client.ts";

export const EVENTS_ENDPOINT = "/api/v1/events";

export interface FetchEventsOptions extends FetchApiOptions {
	endpoint?: string;
	fallbackData?: EventItem[];
	isDev?: boolean;
	warn?: (message: string, detail?: unknown) => void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeEventItem(item: unknown): EventItem | null {
	if (!isRecord(item)) return null;
	if (typeof item.id !== "string" || item.id.trim().length === 0) return null;
	if (typeof item.title !== "string" || item.title.trim().length === 0) {
		return null;
	}

	const normalized: EventItem = {
		id: item.id.trim(),
		title: item.title.trim(),
	};

	// With exactOptionalPropertyTypes enabled, omit optional keys instead of setting `undefined`.
	if (typeof item.location === "string" && item.location.trim().length > 0) {
		normalized.location = item.location.trim();
	}

	return normalized;
}

/**
 * Validates and normalizes the events payload into frontend types.
 */
export function normalizeEvents(raw: unknown): EventItem[] | null {
	if (!Array.isArray(raw)) return null;

	const items: EventItem[] = [];
	for (const entry of raw) {
		const normalized = normalizeEventItem(entry);
		if (normalized) {
			items.push(normalized);
		}
	}

	return items;
}

function cloneEvents(source: EventItem[]): EventItem[] {
	return source.map((item) => ({ ...item }));
}

/**
 * Fetches events from the API and falls back to static src/data/ on failure.
 */
export async function fetchEvents(
	options?: FetchEventsOptions,
): Promise<ApiFetchResult<EventItem[]>> {
	const fallbackSource = options?.fallbackData ?? eventsFallback;
	const endpoint = options?.endpoint ?? EVENTS_ENDPOINT;

	const outcome = await fetchApiJson<unknown>(endpoint, options);
	let error: ApiClientError;

	if (outcome.ok) {
		const normalized = normalizeEvents(outcome.data);
		if (normalized !== null) {
			return {
				data: normalized,
				source: "api",
			};
		}
		error = {
			code: "INVALID_PAYLOAD",
			message: "Events payload does not match expected shape",
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
			`[api/events] Falling back to static data (${error.code}): ${error.message}`,
			error,
		);
	}

	return {
		data: cloneEvents(fallbackSource),
		source: "fallback",
		error,
	};
}
```

### URL & Media Sanitization (`sanitize.ts`)

Never place raw API strings directly into `<img src>`, `<a href>`, or similar DOM attributes. Import shared helpers from `./sanitize.ts`:

- `isRecord(value)`: Type guard for plain non-null, non-array objects.
- `sanitizeUrl(value)`: Allows `http://`, `https://`, or single-leading-slash relative paths (`/path`, rejecting `//` and `/\`), stripping ASCII control characters (`<= 31` or `127`) and blocking `javascript:` / `data:`.
- `sanitizeHttpUrl(value)`: Allows strictly `http://` or `https://` URLs (useful for external links like `courseMapUrl`, `driveUrl`, `materialUrl`).
- `sanitizeImageUrl(value)`: Extracts from either a plain `string` or a CMS `ImageField` object (`{ url: string }`) and validates with `sanitizeUrl`.

### Client Caching (`cache.ts`)

For public endpoints whose backend returns `Cache-Control: public, max-age=60, stale-while-revalidate=300` (such as `programs` and `courses`), use `createApiCache<T>(namespace)` from `./cache.ts` (see `src/lib/api/academic.ts` for a complete example):

- **Fresh (`<= 60s`, `DEFAULT_CACHE_FRESH_MS`)**: Returns cached data immediately (`fromCache: true`) with zero network calls.
- **Stale (`60s..300s`, `DEFAULT_CACHE_STALE_MS`)**: Returns stale data immediately (`fromCache: true`) and triggers background revalidation, notifying callers via `onRevalidate`.
- **Persistence & Safety**: Backs in-memory entries with `sessionStorage`, always re-validates parsed entries through your normalizer before returning, ignores quota/SSR storage errors safely, and exposes `dedupe(key, task)` for concurrent request deduplication.
- **Public data only**: Never cache authenticated or PII-bearing endpoints.

---

## Using an API Module in Astro & React

Pages pass static fallback data from `src/data/` into a React island (`client:load`), and the React component refreshes from the API on mount while guarding against unmounts with `AbortController`. Outside `src/lib/api/`, import via the `@/lib/api/...` alias.

Pattern from `src/pages/achievements/index.astro` and `src/components/Achievements/AchievementsView.tsx`:

```astro
---
// src/pages/<feature>/index.astro
import FeatureView from "@/components/Feature/FeatureView";
import { initialFallbackData } from "@/data/feature";
---

<FeatureView client:load initialData={initialFallbackData} />
```

```tsx
// src/components/Feature/FeatureView.tsx
import { useEffect, useState } from "react";
import { fetchFeatureData, type FeatureData } from "@/lib/api/feature";

export default function FeatureView({ initialData }: { initialData: FeatureData }) {
	const [data, setData] = useState<FeatureData>(initialData);

	useEffect(() => {
		const controller = new AbortController();

		void fetchFeatureData({
			signal: controller.signal,
			fallbackData: initialData,
		}).then((result) => {
			if (controller.signal.aborted) {
				return;
			}
			setData(result.data);
		});

		return () => {
			controller.abort();
		};
	}, [initialData]);

	return /* ... */;
}
```

---

## Local Development & Proxy Setup (`vercel-proxy.ts`)

All API modules request relative `/api/*` paths (and media may load from `/storage/*`).

- **In production/staging**: `vercel.json` defines `rewrites` for `/api/:path*` and `/storage/:path*` to the backend origin.
- **In local development (`bun run dev`)**: `astro.config.mts` calls `loadVercelDevProxy(undefined, process.env.API_PROXY_TARGET)` inside `vite.server.proxy`. It reads `vercel.json` automatically and configures Vite's proxy with `changeOrigin: true` for `/api` and `/storage`.

### Overriding the Backend Target Locally

To point your local dev server at a local backend without editing `vercel.json`, set `API_PROXY_TARGET`:

- **PowerShell**:
  ```powershell
  $env:API_PROXY_TARGET="http://localhost:3001"; bun run dev
  ```
- **Bash / zsh**:
  ```bash
  API_PROXY_TARGET=http://localhost:3001 bun run dev
  ```

Notes:
- `API_PROXY_TARGET` must be a valid `http://` or `https://` URL (`resolveVercelProxyTargets` extracts `.origin`). Invalid values (e.g. `ftp://` or malformed strings) are ignored and fall back to `vercel.json`.
- If `vercel.json` is missing or unreadable, `loadVercelDevProxy` degrades safely to `{}`.

---

## Rules & Common Pitfalls

1. **Use relative imports with `.ts` extensions inside `src/lib/api/`**
   - Inside `src/lib/api/*.ts` and `src/lib/api/__tests__/*.test.ts`, write `"./client.ts"` and `"../../data/<file>.ts"`.
   - **Do NOT use `@/` path aliases inside `src/lib/api/`**. Tests run directly with `node --test`, which does not resolve `tsconfig.json` `paths` aliases.
2. **Never import `vercel-proxy.ts` in browser or component code**
   - `vercel-proxy.ts` uses `node:fs` and `node:path`; it is strictly for `astro.config.mts` and Node tests.
3. **Never hardcode backend origins**
   - Always use relative paths like `"/api/v1/<resource>"`. Never embed `https://zenith-stage.vicky.id` in client code.
4. **Never remove `credentials: "omit"` from `fetchApiJson`**
   - Public endpoints must stay cookie-free so CDN caches remain shared. If an authenticated endpoint is ever introduced in the future, create a separate authenticated client helper instead of modifying `fetchApiJson`.
5. **Never trust `outcome.data` without runtime validation**
   - `fetchApiJson<unknown>` only guarantees `{ data: ... }`. Always check types (`typeof`, `Array.isArray`, `Number.isInteger`) in your normalizer.
6. **Watch `tsconfig.json` strictness (`astro/tsconfigs/strictest`)**
   - `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` are active. Do not assign `undefined` explicitly to optional fields (use conditional assignment like `if (val) obj.field = val;`), and handle possible `undefined` array indexing safely.
7. **Always deep-clone fallback data**
   - Return fresh copies so UI mutations never corrupt the static fallback constants.
8. **Respect Biome formatting and linting**
   - `biome.json` enforces tab indentation, double quotes, and organized imports. Run `bun run format` / `bun run lint` before committing.

---

## Testing Guide & Verification Commands

Unit tests live in `src/lib/api/__tests__/<resource>.test.ts` and use Node's built-in test runner (`node:test` + `node:assert/strict`). No network access is needed because `fetchFn`, `timeoutMs`, `fallbackData`, `isDev`, and `warn` are all injectable.

> **Important**: Run API tests with `node --test` — the test suite targets Node's native `node:test` and `node:assert/strict` modules.

### Minimum Required Test Cases for Any New API Module

1. **Happy path**: Verifies the exact requested endpoint, returns `source: "api"`, `error === undefined`, and normalized data.
2. **Valid empty `200 OK`**: Confirms `{ data: [] }` (or empty shape) returns `source: "api"` and does **not** fall back to `fallbackData`.
3. **Normalizer & sanitizer edge cases**: Verifies skipping malformed entries, trimming strings, rejecting unsafe URLs, sorting, and returning `null` for invalid root payloads.
4. **Fallback matrix**: Verifies falling back to a **cloned** copy of `fallbackData` (`result.data !== fallbackData`) across `404` (`NOT_FOUND`), `429` (`RATE_LIMITED`), `500` (`HTTP_ERROR`), invalid JSON/shape (`INVALID_PAYLOAD`), network throw (`NETWORK_ERROR`), and slow response (`TIMEOUT`).
5. **Dev-only logging**: Confirms `warn` is called when `isDev: true` and suppressed when `isDev: false`.

### Verification Commands

Run these commands after adding or modifying an API module:

```bash
# 1. Run all API unit tests
node --test src/lib/api/__tests__/*.test.ts

# 2. Check Biome lint rules
bun run lint

# 3. Check Astro & TypeScript types (run `bun run sync` first if `.astro/types.d.ts` is missing)
bun run check

# 4. Verify full production build
bun run build
```

---

## New API Module Checklist

- [ ] Static fallback data and types defined in `src/data/<resource>.ts` (if applicable).
- [ ] Domain module created at `src/lib/api/<resource>.ts` using relative `.ts` imports (`./client.ts`, `../../data/<resource>.ts`).
- [ ] Endpoint constant uses a relative `/api/...` path.
- [ ] `fetchApiJson<unknown>` output is validated at runtime by a `normalize*` function; unsafe URLs are sanitized.
- [ ] Valid empty `200 OK` responses return `source: "api"` (no fallback).
- [ ] Error / invalid-payload paths clone `fallbackData` and log via injectable `warn` only when `isDev` is `true`.
- [ ] Unit tests added in `src/lib/api/__tests__/<resource>.test.ts` covering happy path, empty `200 OK`, normalizer edge cases, fallback error matrix, cloning, and dev-only warnings.
- [ ] `node --test src/lib/api/__tests__/*.test.ts`, `bun run lint`, `bun run check`, and `bun run build` all pass.
