import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fetchApiJson } from "../client.ts";

describe("fetchApiJson", () => {
	it("returns unwrapped data and sends GET with credentials omit and Accept application/json", async () => {
		let capturedUrl = "";
		let capturedInit: RequestInit | undefined;

		const mockFetch = async (
			input: RequestInfo | URL,
			init?: RequestInit,
		) => {
			capturedUrl = String(input);
			capturedInit = init;
			return new Response(JSON.stringify({ data: { ok: true, count: 2 } }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		};

		const outcome = await fetchApiJson<{ ok: boolean; count: number }>(
			"/api/v1/achievements?format=grouped",
			{ fetchFn: mockFetch },
		);

		assert.deepEqual(outcome, { ok: true, data: { ok: true, count: 2 } });
		assert.equal(capturedUrl, "/api/v1/achievements?format=grouped");
		assert.equal(capturedInit?.method, "GET");
		assert.equal(capturedInit?.credentials, "omit");
		const headers = new Headers(capturedInit?.headers);
		assert.equal(headers.get("Accept"), "application/json");
	});

	it("maps HTTP 404 to NOT_FOUND with status 404", async () => {
		const mockFetch = async () =>
			new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

		const outcome = await fetchApiJson("/api/v1/achievements?format=grouped", {
			fetchFn: mockFetch,
		});

		assert.equal(outcome.ok, false);
		if (!outcome.ok) {
			assert.equal(outcome.error.code, "NOT_FOUND");
			assert.equal(outcome.error.status, 404);
		}
	});

	it("maps HTTP 429 to RATE_LIMITED with status 429", async () => {
		const mockFetch = async () =>
			new Response(JSON.stringify({ error: "Too Many Requests" }), {
				status: 429,
			});

		const outcome = await fetchApiJson("/api/v1/achievements?format=grouped", {
			fetchFn: mockFetch,
		});

		assert.equal(outcome.ok, false);
		if (!outcome.ok) {
			assert.equal(outcome.error.code, "RATE_LIMITED");
			assert.equal(outcome.error.status, 429);
		}
	});

	it("maps HTTP 500 to HTTP_ERROR with status 500", async () => {
		const mockFetch = async () =>
			new Response("Internal Server Error", { status: 500 });

		const outcome = await fetchApiJson("/api/v1/achievements?format=grouped", {
			fetchFn: mockFetch,
		});

		assert.equal(outcome.ok, false);
		if (!outcome.ok) {
			assert.equal(outcome.error.code, "HTTP_ERROR");
			assert.equal(outcome.error.status, 500);
		}
	});

	it("maps 200 HTML/non-JSON response body to INVALID_PAYLOAD", async () => {
		const mockFetch = async () =>
			new Response("<!doctype html><html><body>Error</body></html>", {
				status: 200,
				headers: { "Content-Type": "text/html" },
			});

		const outcome = await fetchApiJson("/api/v1/achievements?format=grouped", {
			fetchFn: mockFetch,
		});

		assert.equal(outcome.ok, false);
		if (!outcome.ok) {
			assert.equal(outcome.error.code, "INVALID_PAYLOAD");
			assert.equal(outcome.error.status, 200);
		}
	});

	it("maps 200 JSON missing data property to INVALID_PAYLOAD", async () => {
		const mockFetch = async () =>
			new Response(JSON.stringify({ items: [] }), { status: 200 });

		const outcome = await fetchApiJson("/api/v1/achievements?format=grouped", {
			fetchFn: mockFetch,
		});

		assert.equal(outcome.ok, false);
		if (!outcome.ok) {
			assert.equal(outcome.error.code, "INVALID_PAYLOAD");
			assert.equal(outcome.error.status, 200);
		}
	});

	it("maps network rejection to NETWORK_ERROR with 0 retries", async () => {
		let callCount = 0;
		const mockFetch = async () => {
			callCount += 1;
			throw new TypeError("Failed to fetch");
		};

		const outcome = await fetchApiJson("/api/v1/achievements?format=grouped", {
			fetchFn: mockFetch,
		});

		assert.equal(callCount, 1);
		assert.equal(outcome.ok, false);
		if (!outcome.ok) {
			assert.equal(outcome.error.code, "NETWORK_ERROR");
			assert.equal(outcome.error.status, undefined);
		}
	});

	it("aborts with TIMEOUT when request exceeds timeoutMs", async () => {
		const mockFetch = async (
			_input: RequestInfo | URL,
			init?: RequestInit,
		) =>
			new Promise<Response>((_resolve, reject) => {
				init?.signal?.addEventListener(
					"abort",
					() => {
						reject(new DOMException("The operation was aborted.", "AbortError"));
					},
					{ once: true },
				);
			});

		const outcome = await fetchApiJson("/api/v1/achievements?format=grouped", {
			fetchFn: mockFetch,
			timeoutMs: 25,
		});

		assert.equal(outcome.ok, false);
		if (!outcome.ok) {
			assert.equal(outcome.error.code, "TIMEOUT");
		}
	});

	it("aborts immediately when caller AbortSignal fires without waiting for timeout", async () => {
		const callerController = new AbortController();
		const mockFetch = async (
			_input: RequestInfo | URL,
			init?: RequestInit,
		) =>
			new Promise<Response>((_resolve, reject) => {
				if (init?.signal?.aborted) {
					reject(new DOMException("Aborted", "AbortError"));
					return;
				}
				init?.signal?.addEventListener(
					"abort",
					() => {
						reject(new DOMException("Aborted", "AbortError"));
					},
					{ once: true },
				);
			});

		const startedAt = Date.now();
		setTimeout(() => callerController.abort(), 15);

		const outcome = await fetchApiJson("/api/v1/achievements?format=grouped", {
			fetchFn: mockFetch,
			signal: callerController.signal,
			timeoutMs: 5000,
		});
		const elapsedMs = Date.now() - startedAt;

		assert.equal(outcome.ok, false);
		assert.ok(elapsedMs < 1000, `Expected fast abort, took ${elapsedMs}ms`);
		if (!outcome.ok) {
			assert.equal(outcome.error.code, "NETWORK_ERROR");
		}
	});
});
