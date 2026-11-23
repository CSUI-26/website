import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { type ProgramStudy, programStudies } from "../../../data/academic.ts";
import {
	buildCoursesUrl,
	COURSES_ENDPOINT,
	clearAcademicCache,
	fetchCourses,
	fetchProgramById,
	fetchPrograms,
	normalizeCourse,
	normalizeProgram,
	normalizePrograms,
	normalizeSemester,
	PROGRAMS_ENDPOINT,
	programByIdEndpoint,
} from "../academic.ts";
import type { StorageLike } from "../cache.ts";

function createMockStorage(): StorageLike {
	const store = new Map<string, string>();
	return {
		getItem: (key) => store.get(key) ?? null,
		setItem: (key, value) => {
			store.set(key, value);
		},
		removeItem: (key) => {
			store.delete(key);
		},
	};
}

const sampleFallback: ProgramStudy[] = [
	{
		id: "ilmu-komputer",
		name: "Ilmu Komputer",
		slug: "/academic/ilmu-komputer",
		description: "Fallback CS",
		careers: ["SOFTWARE ENGINEER"],
		courseMapUrl: "https://course.csui.dev/?prodi=CS",
		driveUrl: "https://course.csui.dev/?prodi=CS",
		semesters: [
			{
				semester: 1,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 1",
						code: "DDP 1",
						sks: 4,
						prerequisites: ["DDP 2"],
					},
				],
			},
		],
	},
];

const sampleApiPrograms = [
	{
		id: "sistem-informasi",
		name: "Sistem Informasi",
		slug: "/academic/sistem-informasi",
		description: "Live SI",
		careers: ["BUSINESS ANALYST"],
		courseMapUrl: "https://course.csui.dev/?prodi=SI",
		driveUrl: "https://course.csui.dev/?prodi=SI",
		semesters: [
			{
				semester: "1",
				courses: [
					{
						id: 101,
						name: "Pengantar Sistem Informasi",
						code: "PSI",
						sks: 3,
						category: "Wajib Program Studi",
						track: "Sistem Informasi & Aplikasi",
						description: "Dasar SI",
						prerequisites: ["Logika"],
						unlocks: ["APSI"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
				],
			},
		],
	},
	{
		id: "ilmu-komputer",
		name: "Ilmu Komputer",
		slug: "/academic/ilmu-komputer",
		description: "Live CS",
		careers: ["SOFTWARE ENGINEER"],
		courseMapUrl: "https://course.csui.dev/?prodi=CS",
		driveUrl: "https://course.csui.dev/?prodi=CS",
		semesters: [
			{
				semester: "Pilihan",
				courses: [
					{
						id: 202,
						name: "Cloud Computing",
						sks: 3,
					},
				],
			},
		],
	},
];

describe("academic normalizers", () => {
	it("normalizes course with category, track, and unlocks, omits invalid optional fields, and sanitizes materialUrl", () => {
		assert.deepEqual(
			normalizeCourse({
				id: 5,
				name: "  DDP 1  ",
				code: " CSGE601020 ",
				sks: 4,
				category: " Wajib Fakultas ",
				track: " Komputasi & Algoritma ",
				description: " Intro Python ",
				prerequisites: ["DDP 2", 42, "  "],
				unlocks: ["  Dasar-Dasar Pemrograman 2  ", null, ""],
				materialUrl: "javascript:alert(1)",
			}),
			{
				id: 5,
				name: "DDP 1",
				code: "CSGE601020",
				sks: 4,
				category: "Wajib Fakultas",
				track: "Komputasi & Algoritma",
				description: "Intro Python",
				prerequisites: ["DDP 2"],
				unlocks: ["Dasar-Dasar Pemrograman 2"],
			},
		);

		assert.equal(normalizeCourse({ name: "Bad SKS", sks: 0 }), null);
		assert.equal(normalizeCourse({ name: "Bad SKS", sks: 7 }), null);
		assert.equal(normalizeCourse({ name: "", sks: 3 }), null);
	});

	it("validates static programStudies fallback data through normalizePrograms", () => {
		const normalized = normalizePrograms(programStudies);
		assert.ok(normalized !== null);
		assert.equal(normalized.length, programStudies.length);
		assert.equal(normalized[0]?.id, "ilmu-komputer");
		assert.equal(
			normalized[0]?.semesters[0]?.courses[0]?.category,
			"Wajib Fakultas",
		);
	});

	it("normalizes numeric string semesters to numbers and preserves string labels", () => {
		const numSem = normalizeSemester({
			semester: "2",
			courses: [{ name: "DDP 2", sks: 4 }, { name: "Invalid", sks: 99 }],
		});
		assert.deepEqual(numSem, {
			semester: 2,
			courses: [{ name: "DDP 2", sks: 4 }],
		});

		const elecSem = normalizeSemester({
			semester: "Pilihan",
			courses: [{ name: "Game Dev", sks: 3 }],
		});
		assert.equal(elecSem?.semester, "Pilihan");
		assert.equal(normalizeSemester({ semester: "0", courses: [] }), null);
	});

	it("normalizes programs while preserving API order and sanitizing URLs/slugs", () => {
		const normalized = normalizePrograms([
			{
				id: "sistem-informasi",
				name: "Sistem Informasi",
				slug: "javascript:alert(1)",
				description: " Desc ",
				careers: ["PM", 123],
				courseMapUrl: "javascript:evil()",
				driveUrl: "https://drive.example/si",
				semesters: [],
			},
			{
				id: "ilmu-komputer",
				name: "Ilmu Komputer",
				slug: "/academic/ilmu-komputer",
				description: "CS",
				careers: [],
				courseMapUrl: "https://course.csui.dev/?prodi=CS",
				driveUrl: "",
				semesters: [],
			},
			{ id: "", name: "Missing ID", semesters: [] },
		]);

		assert.equal(normalized?.length, 2);
		assert.equal(normalized?.[0]?.id, "sistem-informasi");
		assert.equal(normalized?.[0]?.slug, "/academic/sistem-informasi");
		assert.equal(normalized?.[0]?.courseMapUrl, "");
		assert.equal(normalized?.[0]?.driveUrl, "https://drive.example/si");
		assert.equal(normalized?.[1]?.id, "ilmu-komputer");
		assert.equal(normalizePrograms(null), null);
		assert.equal(normalizeProgram({ id: "x", name: "X", semesters: "bad" }), null);
	});
});

describe("fetchPrograms", () => {
	let storage: StorageLike;

	beforeEach(() => {
		storage = createMockStorage();
		clearAcademicCache({ storage });
	});

	it("requests /api/v1/programs and returns source api on valid 200 OK", async () => {
		let requestedUrl = "";
		const mockFetch = async (input: RequestInfo | URL) => {
			requestedUrl = String(input);
			return new Response(JSON.stringify({ data: sampleApiPrograms }), {
				status: 200,
			});
		};

		const result = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			storage,
			isDev: false,
		});

		assert.equal(requestedUrl, PROGRAMS_ENDPOINT);
		assert.equal(result.source, "api");
		assert.equal(result.fromCache, false);
		assert.equal(result.error, undefined);
		assert.deepEqual(
			result.data.map((p) => p.id),
			["sistem-informasi", "ilmu-komputer"],
		);
		const firstCourse = result.data[0]?.semesters[0]?.courses[0];
		assert.equal(firstCourse?.category, "Wajib Program Studi");
		assert.equal(firstCourse?.track, "Sistem Informasi & Aplikasi");
		assert.deepEqual(firstCourse?.unlocks, ["APSI"]);

		// Mutating returned unlocks must not leak into cached entries
		firstCourse?.unlocks?.push("Mutated");
		const cachedAgain = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			storage,
			isDev: false,
		});
		assert.deepEqual(
			cachedAgain.data[0]?.semesters[0]?.courses[0]?.unlocks,
			["APSI"],
		);
	});

	it("trusts valid 200 OK empty array as source api without falling back", async () => {
		const mockFetch = async () =>
			new Response(JSON.stringify({ data: [] }), { status: 200 });

		const result = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			storage,
			isDev: false,
		});

		assert.equal(result.source, "api");
		assert.deepEqual(result.data, []);
	});

	it("serves fresh cache without network call and revalidates stale cache in background", async () => {
		let clock = 10_000;
		let fetchCount = 0;

		const mockFetch = async () => {
			fetchCount += 1;
			return new Response(
				JSON.stringify({
					data:
						fetchCount === 1
							? sampleApiPrograms
							: [sampleApiPrograms[1]],
				}),
				{ status: 200 },
			);
		};

		// 1. Cold fetch
		const first = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			storage,
			now: () => clock,
			isDev: false,
		});
		assert.equal(fetchCount, 1);
		assert.equal(first.fromCache, false);
		assert.equal(first.data.length, 2);

		// 2. Fresh cache hit (within 60s)
		clock += 30_000;
		const second = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			storage,
			now: () => clock,
			isDev: false,
		});
		assert.equal(fetchCount, 1);
		assert.equal(second.fromCache, true);
		assert.equal(second.data.length, 2);
		assert.notEqual(second.data, first.data);

		// 3. Stale cache hit (between 60s and 300s) triggers background revalidation
		clock += 90_000;
		let revalidatedIds: string[] = [];
		const third = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			storage,
			now: () => clock,
			isDev: false,
			onRevalidate: (fresh) => {
				revalidatedIds = fresh.data.map((p) => p.id);
			},
		});
		assert.equal(third.fromCache, true);
		assert.equal(third.data.length, 2);

		await new Promise((resolve) => setTimeout(resolve, 15));
		assert.equal(fetchCount, 2);
		assert.deepEqual(revalidatedIds, ["ilmu-komputer"]);
	});

	it("falls back to cloned fallbackData across error cases and logs only when isDev is true", async () => {
		const warnings: string[] = [];
		const errorCases = [
			async () => new Response("Not Found", { status: 404 }),
			async () => new Response("Rate Limited", { status: 429 }),
			async () => new Response("Server Error", { status: 500 }),
			async () => new Response(JSON.stringify({ data: {} }), { status: 200 }),
			async () => {
				throw new TypeError("Offline");
			},
			async (_input: RequestInfo | URL, init?: RequestInit) =>
				new Promise<Response>((_resolve, reject) => {
					init?.signal?.addEventListener(
						"abort",
						() => reject(new DOMException("Aborted", "AbortError")),
						{ once: true },
					);
				}),
		];

		for (const fetchFn of errorCases) {
			clearAcademicCache({ storage });
			const res = await fetchPrograms({
				fetchFn,
				fallbackData: sampleFallback,
				storage,
				timeoutMs: 15,
				isDev: false,
				warn: (msg) => warnings.push(msg),
			});
			assert.equal(res.source, "fallback");
			assert.deepEqual(res.data, sampleFallback);
			assert.notEqual(res.data, sampleFallback);
		}
		assert.equal(warnings.length, 0);

		clearAcademicCache({ storage });
		await fetchPrograms({
			fetchFn: async () => new Response("Server Error", { status: 500 }),
			fallbackData: sampleFallback,
			storage,
			isDev: true,
			warn: (msg) => warnings.push(msg),
		});
		assert.equal(warnings.length, 1);
	});
});

describe("fetchProgramById", () => {
	let storage: StorageLike;

	beforeEach(() => {
		storage = createMockStorage();
		clearAcademicCache({ storage });
	});

	it("reuses fresh fetchPrograms cache without an extra network call", async () => {
		let fetchCount = 0;
		const mockFetch = async () => {
			fetchCount += 1;
			return new Response(JSON.stringify({ data: sampleApiPrograms }), {
				status: 200,
			});
		};

		await fetchPrograms({ fetchFn: mockFetch, storage, isDev: false });
		const detail = await fetchProgramById("ilmu-komputer", {
			fetchFn: mockFetch,
			storage,
			isDev: false,
		});

		assert.equal(fetchCount, 1);
		assert.equal(detail.source, "api");
		assert.equal(detail.fromCache, true);
		assert.equal(detail.data?.id, "ilmu-komputer");
	});

	it("fetches /api/v1/programs/:id on cache miss and falls back on 404", async () => {
		let requestedUrl = "";
		const okFetch = async (input: RequestInfo | URL) => {
			requestedUrl = String(input);
			return new Response(JSON.stringify({ data: sampleApiPrograms[0] }), {
				status: 200,
			});
		};

		const ok = await fetchProgramById("sistem-informasi", {
			fetchFn: okFetch,
			storage,
			isDev: false,
		});
		assert.equal(requestedUrl, programByIdEndpoint("sistem-informasi"));
		assert.equal(ok.source, "api");
		assert.equal(ok.data?.name, "Sistem Informasi");

		clearAcademicCache({ storage });
		const notFound = await fetchProgramById("ilmu-komputer", {
			fetchFn: async () => new Response("Not Found", { status: 404 }),
			fallbackData: sampleFallback[0] ?? null,
			storage,
			isDev: false,
		});
		assert.equal(notFound.source, "fallback");
		assert.equal(notFound.error?.code, "NOT_FOUND");
		assert.equal(notFound.data?.id, "ilmu-komputer");
	});
});

describe("buildCoursesUrl and fetchCourses", () => {
	let storage: StorageLike;

	beforeEach(() => {
		storage = createMockStorage();
		clearAcademicCache({ storage });
	});

	it("builds deterministic query strings", () => {
		assert.equal(buildCoursesUrl(), COURSES_ENDPOINT);
		assert.equal(
			buildCoursesUrl({
				search: " DDP ",
				sks: 4,
				program: "ilmu-komputer",
				semester: 1,
				page: 2,
				limit: 10,
			}),
			"/api/v1/courses?search=DDP&sks=4&program=ilmu-komputer&semester=1&page=2&limit=10",
		);
	});

	it("fetches, normalizes, and caches paginated courses, falling back on error", async () => {
		let calls = 0;
		const mockFetch = async () => {
			calls += 1;
			return new Response(
				JSON.stringify({
					data: [
						{
							programId: "ilmu-komputer",
							programName: "Ilmu Komputer",
							semester: 1,
							course: { id: 1, name: "DDP 1", sks: 4 },
						},
					],
					total: 1,
					page: 1,
					limit: 20,
					totalPages: 1,
				}),
				{ status: 200 },
			);
		};

		const first = await fetchCourses(
			{ program: "ilmu-komputer" },
			{ fetchFn: mockFetch, storage, isDev: false },
		);
		assert.equal(first.source, "api");
		assert.equal(first.fromCache, false);
		assert.equal(first.data.items.length, 1);
		assert.equal(first.data.total, 1);

		const cached = await fetchCourses(
			{ program: "ilmu-komputer" },
			{ fetchFn: mockFetch, storage, isDev: false },
		);
		assert.equal(calls, 1);
		assert.equal(cached.fromCache, true);

		clearAcademicCache({ storage });
		const fallback = await fetchCourses(
			{ search: "unknown" },
			{
				fetchFn: async () => new Response("Error", { status: 500 }),
				storage,
				isDev: false,
			},
		);
		assert.equal(fallback.source, "fallback");
		assert.deepEqual(fallback.data.items, []);
	});
});
