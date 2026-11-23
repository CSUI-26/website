import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createApiCache, type StorageLike } from "../cache.ts";

function createMockStorage(): StorageLike & { store: Map<string, string> } {
	const store = new Map<string, string>();
	return {
		store,
		getItem(key) {
			return store.get(key) ?? null;
		},
		setItem(key, value) {
			store.set(key, value);
		},
		removeItem(key) {
			store.delete(key);
		},
	};
}

const isStringArray = (raw: unknown): string[] | null =>
	Array.isArray(raw) && raw.every((item) => typeof item === "string")
		? raw
		: null;

describe("createApiCache", () => {
	it("returns fresh, then stale, then null after expiration", () => {
		let currentTime = 1_000;
		const storage = createMockStorage();
		const cache = createApiCache<string[]>("test:ns", {
			freshTtlMs: 60_000,
			staleTtlMs: 300_000,
		});

		cache.set("k1", ["a", "b"], { storage, now: () => currentTime });

		const fresh = cache.get("k1", isStringArray, {
			storage,
			now: () => currentTime + 30_000,
		});
		assert.equal(fresh?.status, "fresh");
		assert.deepEqual(fresh?.data, ["a", "b"]);

		const stale = cache.get("k1", isStringArray, {
			storage,
			now: () => currentTime + 120_000,
		});
		assert.equal(stale?.status, "stale");
		assert.deepEqual(stale?.data, ["a", "b"]);

		currentTime += 300_001;
		const expired = cache.get("k1", isStringArray, {
			storage,
			now: () => currentTime,
		});
		assert.equal(expired, null);
		assert.equal(storage.store.has("test:ns:k1"), false);
	});

	it("hydrates from storage across fresh cache instances and bypasses when bypassCache is true", () => {
		const storage = createMockStorage();
		const cacheWriter = createApiCache<string[]>("test:persist");
		cacheWriter.set("items", ["one"], { storage, now: () => 5_000 });

		const cacheReader = createApiCache<string[]>("test:persist");
		assert.equal(
			cacheReader.get("items", isStringArray, {
				storage,
				bypassCache: true,
				now: () => 5_100,
			}),
			null,
		);

		const hit = cacheReader.get("items", isStringArray, {
			storage,
			now: () => 5_100,
		});
		assert.equal(hit?.status, "fresh");
		assert.deepEqual(hit?.data, ["one"]);
	});

	it("recovers safely from corrupted storage JSON or invalid shape", () => {
		const storage = createMockStorage();
		storage.setItem("test:corrupt:bad-json", "{not-json");
		storage.setItem(
			"test:corrupt:bad-shape",
			JSON.stringify({ version: 1, updatedAt: 1000, data: "not-an-array" }),
		);

		const cache = createApiCache<string[]>("test:corrupt");
		assert.equal(
			cache.get("bad-json", isStringArray, { storage, now: () => 1_050 }),
			null,
		);
		assert.equal(storage.store.has("test:corrupt:bad-json"), false);

		assert.equal(
			cache.get("bad-shape", isStringArray, { storage, now: () => 1_050 }),
			null,
		);
		assert.equal(storage.store.has("test:corrupt:bad-shape"), false);
	});

	it("degrades safely when storage throws quota or access errors", () => {
		const throwingStorage: StorageLike = {
			getItem() {
				throw new Error("SecurityError");
			},
			setItem() {
				throw new Error("QuotaExceededError");
			},
			removeItem() {
				throw new Error("SecurityError");
			},
		};

		const cache = createApiCache<string[]>("test:throw");
		cache.set("k", ["ok"], { storage: throwingStorage, now: () => 1_000 });
		const hit = cache.get("k", isStringArray, {
			storage: throwingStorage,
			now: () => 1_050,
		});
		assert.equal(hit?.status, "fresh");
		assert.deepEqual(hit?.data, ["ok"]);
		cache.clear(undefined, { storage: throwingStorage });
	});

	it("deduplicates concurrent in-flight tasks and clears after completion", async () => {
		const cache = createApiCache<string[]>("test:dedupe");
		let runs = 0;

		const task = async () => {
			runs += 1;
			await new Promise((resolve) => setTimeout(resolve, 15));
			return runs;
		};

		const [r1, r2] = await Promise.all([
			cache.dedupe("key", task),
			cache.dedupe("key", task),
		]);

		assert.equal(r1, 1);
		assert.equal(r2, 1);
		assert.equal(runs, 1);

		const r3 = await cache.dedupe("key", task);
		assert.equal(r3, 2);
	});
});
