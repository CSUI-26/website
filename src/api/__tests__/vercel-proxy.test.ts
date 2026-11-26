import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadVercelDevProxy, resolveVercelProxyTargets } from "../vercel-proxy.ts";

describe("resolveVercelProxyTargets", () => {
	it("extracts /api and /storage proxy origins from vercel.json rewrites", () => {
		const proxy = resolveVercelProxyTargets({
			rewrites: [
				{
					source: "/studio",
					destination: "https://zenith-stage.vicky.id/studio/",
				},
				{
					source: "/api/:path*",
					destination: "https://zenith-stage.vicky.id/api/:path*",
				},
				{
					source: "/storage/:path*",
					destination: "https://zenith-stage.vicky.id/storage/:path*",
				},
			],
		});

		assert.deepEqual(proxy, {
			"/api": { target: "https://zenith-stage.vicky.id", changeOrigin: true },
			"/storage": {
				target: "https://zenith-stage.vicky.id",
				changeOrigin: true,
			},
		});
	});

	it("uses valid API_PROXY_TARGET envOverride for both /api and /storage", () => {
		const proxy = resolveVercelProxyTargets(
			{
				rewrites: [
					{
						source: "/api/:path*",
						destination: "https://zenith-stage.vicky.id/api/:path*",
					},
				],
			},
			"http://localhost:3001/extra/path",
		);

		assert.deepEqual(proxy, {
			"/api": { target: "http://localhost:3001", changeOrigin: true },
			"/storage": { target: "http://localhost:3001", changeOrigin: true },
		});
	});

	it("ignores invalid envOverride and falls back to vercel.json rewrites", () => {
		const proxy = resolveVercelProxyTargets(
			{
				rewrites: [
					{
						source: "/api/:path*",
						destination: "https://zenith-stage.vicky.id/api/:path*",
					},
					{
						source: "/storage/:path*",
						destination: "https://zenith-stage.vicky.id/storage/:path*",
					},
				],
			},
			"ftp://bad.example",
		);

		assert.deepEqual(proxy, {
			"/api": { target: "https://zenith-stage.vicky.id", changeOrigin: true },
			"/storage": {
				target: "https://zenith-stage.vicky.id",
				changeOrigin: true,
			},
		});
	});

	it("returns empty object when rewrites are missing or destination URL is invalid", () => {
		assert.deepEqual(resolveVercelProxyTargets({}), {});
		assert.deepEqual(
			resolveVercelProxyTargets(
				{
					rewrites: [
						{ source: "/api/:path*", destination: "not-a-valid-url" },
						{ source: "/storage/:path*", destination: "ftp://invalid" },
					],
				},
				"not-a-url",
			),
			{},
		);
	});
});

describe("loadVercelDevProxy", () => {
	it("reads the repository vercel.json and degrades to empty object when file is missing", () => {
		const repoProxy = loadVercelDevProxy();
		assert.deepEqual(repoProxy, {
			"/api": { target: "https://zenith-stage.vicky.id", changeOrigin: true },
			"/storage": {
				target: "https://zenith-stage.vicky.id",
				changeOrigin: true,
			},
		});

		const missingProxy = loadVercelDevProxy("D:/non-existent-vercel-12345.json");
		assert.deepEqual(missingProxy, {});
	});
});
