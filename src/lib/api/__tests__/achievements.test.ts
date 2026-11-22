import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	ACHIEVEMENTS_GROUPED_ENDPOINT,
	type GroupedAchievements,
	fetchGroupedAchievements,
	hasAnyAchievements,
	normalizeGroupedAchievements,
	sanitizeImageUrl,
} from "../achievements.ts";

const sampleFallback: GroupedAchievements = {
	latestAchievements: [
		{
			id: "fallback-1",
			title: "Fallback Achievement",
			award: "JUARA 1",
			image: "/images/achievements/ioai-winner.png",
			teamName: "Tim Fallback",
			members: ["A", "B"],
			description: "Fallback description",
		},
	],
	yearlyAchievementsByYear: [
		{
			year: 2026,
			items: [{ id: "fb-2026-1", title: "Lomba Fallback", year: 2026 }],
		},
	],
};

describe("sanitizeImageUrl", () => {
	it("allows https://, http://, and single leading /, and rejects unsafe schemes", () => {
		assert.equal(
			sanitizeImageUrl("https://cdn.example.com/banner.webp"),
			"https://cdn.example.com/banner.webp",
		);
		assert.equal(
			sanitizeImageUrl("http://localhost:3001/media/a.png"),
			"http://localhost:3001/media/a.png",
		);
		assert.equal(
			sanitizeImageUrl({
				url: "  /api/v1/media/achievements/ioai-123.webp ",
				config: { x: 50, y: 50, zoom: 1, aspect: "16:9" },
			}),
			"/api/v1/media/achievements/ioai-123.webp",
		);
		assert.equal(sanitizeImageUrl("javascript:alert(1)"), "");
		assert.equal(sanitizeImageUrl("data:image/png;base64,abc"), "");
		assert.equal(sanitizeImageUrl("//evil.example/banner.png"), "");
		assert.equal(sanitizeImageUrl("/\\evil.example/banner.png"), "");
		assert.equal(sanitizeImageUrl("https://evil.example/a\nb.png"), "");
		assert.equal(sanitizeImageUrl(null), "");
	});
});

describe("normalizeGroupedAchievements", () => {
	it("normalizes string and ImageField images, skips malformed entries, prunes empty groups, and sorts descending", () => {
		const normalized = normalizeGroupedAchievements({
			latestAchievements: [
				{
					id: "ioai-2026",
					title: "IOAI 2026",
					award: "GOLD MEDAL",
					image: {
						url: "/api/v1/media/achievements/ioai.webp",
						config: { x: 50, y: 50, zoom: 1.2, aspect: "16:9" },
					},
					teamName: "Tim Zenith",
					members: ["Alice", 123, "Bob"],
					description: "Global AI competition",
					showOverlay: false,
					position: 0,
				},
				{
					id: "icpc-2026",
					title: "ICPC Asia",
					award: "JUARA 1",
					image: "https://zenith.csui.dev/storage/icpc.jpg",
					teamName: "Tim Algo",
					members: ["Charlie"],
					description: "Regional contest",
				},
				{
					id: "",
					title: "Missing ID should skip",
				},
				null,
			],
			yearlyAchievementsByYear: [
				{
					year: 2025,
					items: [
						{ id: "y25-1", title: "Hackathon", year: 2025, award: "Juara 2" },
						{ id: "", title: "Broken item", year: 2025 },
					],
				},
				{
					year: 2027,
					items: [],
				},
				{
					year: 2026,
					items: [{ id: "y26-1", title: "Gemastik", year: 2026 }],
				},
			],
		});

		assert.deepEqual(normalized, {
			latestAchievements: [
				{
					id: "ioai-2026",
					title: "IOAI 2026",
					award: "GOLD MEDAL",
					image: "/api/v1/media/achievements/ioai.webp",
					teamName: "Tim Zenith",
					members: ["Alice", "Bob"],
					description: "Global AI competition",
				},
				{
					id: "icpc-2026",
					title: "ICPC Asia",
					award: "JUARA 1",
					image: "https://zenith.csui.dev/storage/icpc.jpg",
					teamName: "Tim Algo",
					members: ["Charlie"],
					description: "Regional contest",
				},
			],
			yearlyAchievementsByYear: [
				{
					year: 2026,
					items: [{ id: "y26-1", title: "Gemastik", year: 2026 }],
				},
				{
					year: 2025,
					items: [
						{ id: "y25-1", title: "Hackathon", year: 2025, award: "Juara 2" },
					],
				},
			],
		});
	});

	it("returns null when root payload is null or missing required arrays", () => {
		assert.equal(normalizeGroupedAchievements(null), null);
		assert.equal(
			normalizeGroupedAchievements({ latestAchievements: [] }),
			null,
		);
		assert.equal(
			normalizeGroupedAchievements({ yearlyAchievementsByYear: [] }),
			null,
		);
	});
});

describe("hasAnyAchievements", () => {
	it("returns false when both latest and non-empty year groups are empty", () => {
		assert.equal(
			hasAnyAchievements({
				latestAchievements: [],
				yearlyAchievementsByYear: [],
			}),
			false,
		);
		assert.equal(
			hasAnyAchievements({
				latestAchievements: [],
				yearlyAchievementsByYear: [{ year: 2026, items: [] }],
			}),
			false,
		);
		assert.equal(hasAnyAchievements(sampleFallback), true);
	});
});

describe("fetchGroupedAchievements", () => {
	it("requests the grouped endpoint and returns source api on valid 200 OK", async () => {
		let requestedUrl = "";
		const mockFetch = async (input: RequestInfo | URL) => {
			requestedUrl = String(input);
			return new Response(
				JSON.stringify({
					data: {
						latestAchievements: [
							{
								id: "api-1",
								title: "Live Award",
								award: "GOLD",
								image: { url: "/api/v1/media/achievements/live.webp" },
								teamName: "Tim Live",
								members: ["Dewi"],
								description: "Live description",
							},
						],
						yearlyAchievementsByYear: [],
					},
				}),
				{ status: 200 },
			);
		};

		const result = await fetchGroupedAchievements({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			isDev: false,
		});

		assert.equal(requestedUrl, ACHIEVEMENTS_GROUPED_ENDPOINT);
		assert.equal(result.source, "api");
		assert.equal(result.error, undefined);
		assert.equal(result.data.latestAchievements[0]?.id, "api-1");
		assert.equal(
			result.data.latestAchievements[0]?.image,
			"/api/v1/media/achievements/live.webp",
		);
	});

	it("trusts valid 200 OK empty arrays as source api without falling back", async () => {
		const mockFetch = async () =>
			new Response(
				JSON.stringify({
					data: {
						latestAchievements: [],
						yearlyAchievementsByYear: [],
					},
				}),
				{ status: 200 },
			);

		const result = await fetchGroupedAchievements({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			isDev: false,
		});

		assert.equal(result.source, "api");
		assert.equal(result.error, undefined);
		assert.deepEqual(result.data, {
			latestAchievements: [],
			yearlyAchievementsByYear: [],
		});
	});

	it("falls back to cloned fallbackData across 404, 500, 429, TIMEOUT, NETWORK_ERROR, and INVALID_PAYLOAD", async () => {
		const cases = [
			{
				name: "404",
				expectedCode: "NOT_FOUND",
				fetchFn: async () => new Response("Not Found", { status: 404 }),
			},
			{
				name: "500",
				expectedCode: "HTTP_ERROR",
				fetchFn: async () => new Response("Server Error", { status: 500 }),
			},
			{
				name: "429",
				expectedCode: "RATE_LIMITED",
				fetchFn: async () => new Response("Rate Limited", { status: 429 }),
			},
			{
				name: "INVALID_PAYLOAD html",
				expectedCode: "INVALID_PAYLOAD",
				fetchFn: async () => new Response("<html>err</html>", { status: 200 }),
			},
			{
				name: "INVALID_PAYLOAD missing arrays",
				expectedCode: "INVALID_PAYLOAD",
				fetchFn: async () =>
					new Response(JSON.stringify({ data: null }), { status: 200 }),
			},
			{
				name: "NETWORK_ERROR",
				expectedCode: "NETWORK_ERROR",
				fetchFn: async () => {
					throw new TypeError("Offline");
				},
			},
			{
				name: "TIMEOUT",
				expectedCode: "TIMEOUT",
				fetchFn: async (_input: RequestInfo | URL, init?: RequestInit) =>
					new Promise<Response>((_resolve, reject) => {
						init?.signal?.addEventListener(
							"abort",
							() => reject(new DOMException("Aborted", "AbortError")),
							{ once: true },
						);
					}),
			},
		] as const;

		for (const testCase of cases) {
			const result = await fetchGroupedAchievements({
				fetchFn: testCase.fetchFn,
				fallbackData: sampleFallback,
				timeoutMs: 20,
				isDev: false,
			});

			assert.equal(result.source, "fallback", testCase.name);
			assert.equal(result.error?.code, testCase.expectedCode, testCase.name);
			assert.deepEqual(result.data, sampleFallback, testCase.name);
			assert.notEqual(result.data, sampleFallback, testCase.name);
			assert.notEqual(
				result.data.latestAchievements,
				sampleFallback.latestAchievements,
				testCase.name,
			);
		}
	});

	it("logs warning only when isDev is true on fallback", async () => {
		const warnings: string[] = [];
		const mockFetch = async () => new Response("Not found", { status: 404 });

		await fetchGroupedAchievements({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			isDev: false,
			warn: (msg) => warnings.push(msg),
		});
		assert.equal(warnings.length, 0);

		await fetchGroupedAchievements({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			isDev: true,
			warn: (msg) => warnings.push(msg),
		});
		assert.equal(warnings.length, 1);
	});
});
