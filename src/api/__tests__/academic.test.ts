import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type ProgramStudy, programStudies } from "../../data/academic.ts";
import {
	buildCoursesUrl,
	COURSES_ENDPOINT,
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
			courses: [
				{ name: "DDP 2", sks: 4 },
				{ name: "Invalid", sks: 99 },
			],
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
		assert.equal(
			normalizeProgram({ id: "x", name: "X", semesters: "bad" }),
			null,
		);
	});
});

describe("fetchPrograms", () => {
	it("requests /api/v1/programs directly on each call and returns source api on valid 200 OK", async () => {
		let requestedUrl = "";
		let callCount = 0;
		const mockFetch = async (input: RequestInfo | URL) => {
			callCount += 1;
			requestedUrl = String(input);
			return new Response(JSON.stringify({ data: sampleApiPrograms }), {
				status: 200,
			});
		};

		const first = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			isDev: false,
		});
		const second = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			isDev: false,
		});

		assert.equal(callCount, 2);
		assert.equal(requestedUrl, PROGRAMS_ENDPOINT);
		assert.equal(first.source, "api");
		assert.equal(first.error, undefined);
		assert.equal("fromCache" in first, false);
		assert.equal(second.source, "api");
		assert.deepEqual(
			first.data.map((p) => p.id),
			["sistem-informasi", "ilmu-komputer"],
		);
		const firstCourse = first.data[0]?.semesters[0]?.courses[0];
		assert.equal(firstCourse?.category, "Wajib Program Studi");
		assert.equal(firstCourse?.track, "Sistem Informasi & Aplikasi");
		assert.deepEqual(firstCourse?.unlocks, ["APSI"]);
	});

	it("trusts valid 200 OK empty array as source api without falling back", async () => {
		const mockFetch = async () =>
			new Response(JSON.stringify({ data: [] }), { status: 200 });

		const result = await fetchPrograms({
			fetchFn: mockFetch,
			fallbackData: sampleFallback,
			isDev: false,
		});

		assert.equal(result.source, "api");
		assert.deepEqual(result.data, []);
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
			const res = await fetchPrograms({
				fetchFn,
				fallbackData: sampleFallback,
				timeoutMs: 15,
				isDev: false,
				warn: (msg) => warnings.push(msg),
			});
			assert.equal(res.source, "fallback");
			assert.deepEqual(res.data, sampleFallback);
			assert.notEqual(res.data, sampleFallback);
			res.data[0]?.semesters[0]?.courses[0]?.prerequisites?.push("Mutated");
			assert.deepEqual(
				sampleFallback[0]?.semesters[0]?.courses[0]?.prerequisites,
				["DDP 2"],
			);
		}
		assert.equal(warnings.length, 0);

		await fetchPrograms({
			fetchFn: async () => new Response("Server Error", { status: 500 }),
			fallbackData: sampleFallback,
			isDev: true,
			warn: (msg) => warnings.push(msg),
		});
		assert.equal(warnings.length, 1);
	});
});

describe("fetchProgramById", () => {
	it("fetches /api/v1/programs/:id directly, trims and encodes id, and falls back on error", async () => {
		let requestedUrl = "";
		const okFetch = async (input: RequestInfo | URL) => {
			requestedUrl = String(input);
			return new Response(JSON.stringify({ data: sampleApiPrograms[0] }), {
				status: 200,
			});
		};

		const ok = await fetchProgramById(" sistem-informasi ", {
			fetchFn: okFetch,
			isDev: false,
		});
		assert.equal(requestedUrl, programByIdEndpoint("sistem-informasi"));
		assert.equal(ok.source, "api");
		assert.equal("fromCache" in ok, false);
		assert.equal(ok.data?.name, "Sistem Informasi");

		const fallbackItem = sampleFallback[0];
		assert.ok(fallbackItem);
		const notFound = await fetchProgramById("ilmu-komputer", {
			fetchFn: async () => new Response("Not Found", { status: 404 }),
			fallbackData: fallbackItem,
			isDev: false,
		});
		assert.equal(notFound.source, "fallback");
		assert.equal(notFound.error?.code, "NOT_FOUND");
		assert.equal(notFound.data?.id, "ilmu-komputer");
		assert.notEqual(notFound.data?.careers, fallbackItem.careers);
		assert.notEqual(notFound.data?.semesters, fallbackItem.semesters);

		let unknownRequestedUrl = "";
		const unknownNotFound = await fetchProgramById(" unknown prodi ", {
			fetchFn: async (input: RequestInfo | URL) => {
				unknownRequestedUrl = String(input);
				return new Response("Not Found", { status: 404 });
			},
			isDev: false,
		});
		assert.equal(unknownRequestedUrl, "/api/v1/programs/unknown%20prodi");
		assert.equal(unknownNotFound.source, "fallback");
		assert.equal(unknownNotFound.data, null);
		assert.equal(unknownNotFound.error?.code, "NOT_FOUND");
		assert.equal(unknownNotFound.error?.status, 404);
	});
});

describe("buildCoursesUrl and fetchCourses", () => {
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

	it("fetches and normalizes paginated courses directly, returning cloned fallback on error", async () => {
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
			{ fetchFn: mockFetch, isDev: false },
		);
		const second = await fetchCourses(
			{ program: "ilmu-komputer" },
			{ fetchFn: mockFetch, isDev: false },
		);

		assert.equal(calls, 2);
		assert.equal(first.source, "api");
		assert.equal("fromCache" in first, false);
		assert.equal(first.data.items.length, 1);
		assert.equal(first.data.total, 1);
		assert.equal(second.source, "api");

		const fallback = await fetchCourses(
			{ search: "unknown" },
			{
				fetchFn: async () => new Response("Error", { status: 500 }),
				isDev: false,
			},
		);
		assert.equal(fallback.source, "fallback");
		assert.equal(fallback.data.items.length, 0);
		fallback.data.items.push({
			programId: "mutated",
			programName: "Mutated",
			semester: 1,
			course: { name: "Mutated", sks: 3 },
		});

		const fallbackAgain = await fetchCourses(
			{ search: "unknown" },
			{
				fetchFn: async () => new Response("Error", { status: 500 }),
				isDev: false,
			},
		);
		assert.deepEqual(fallbackAgain.data.items, []);
	});
});
