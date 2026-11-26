import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface ViteProxyTarget {
	target: string;
	changeOrigin: true;
}

export interface VercelRewrite {
	source: string;
	destination: string;
}

export interface VercelConfig {
	rewrites?: VercelRewrite[];
}

const PROXY_RULES = [
	{ prefix: "/api", sources: new Set(["/api/:path*", "/api"]) },
	{ prefix: "/storage", sources: new Set(["/storage/:path*", "/storage"]) },
] as const;

function parseHttpOrigin(candidate: string | undefined): string | null {
	if (!candidate) return null;
	const trimmed = candidate.trim();
	if (!trimmed) return null;
	try {
		const parsed = new URL(trimmed);
		if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
			return null;
		}
		return parsed.origin;
	} catch {
		return null;
	}
}

/**
 * Resolves Vite dev-server proxy targets for /api and /storage from vercel.json rewrites.
 */
export function resolveVercelProxyTargets(
	config: VercelConfig,
	envOverride?: string | undefined,
): Record<string, ViteProxyTarget> {
	const overrideOrigin = parseHttpOrigin(envOverride);
	if (overrideOrigin) {
		return {
			"/api": { target: overrideOrigin, changeOrigin: true },
			"/storage": { target: overrideOrigin, changeOrigin: true },
		};
	}

	const proxy: Record<string, ViteProxyTarget> = {};
	const rewrites = Array.isArray(config.rewrites) ? config.rewrites : [];

	for (const rule of PROXY_RULES) {
		const match = rewrites.find((entry) => rule.sources.has(entry.source));
		const origin = parseHttpOrigin(match?.destination);
		if (origin) {
			proxy[rule.prefix] = { target: origin, changeOrigin: true };
		}
	}

	return proxy;
}

/**
 * Loads vercel.json from disk and returns Vite proxy configuration, degrading safely to {}.
 */
export function loadVercelDevProxy(
	vercelJsonPath = resolve(process.cwd(), "vercel.json"),
	envOverride?: string | undefined,
): Record<string, ViteProxyTarget> {
	let config: VercelConfig = {};

	try {
		if (existsSync(vercelJsonPath)) {
			const parsed: unknown = JSON.parse(readFileSync(vercelJsonPath, "utf-8"));
			if (typeof parsed === "object" && parsed !== null) {
				config = parsed as VercelConfig;
			}
		}
	} catch {
		config = {};
	}

	return resolveVercelProxyTargets(config, envOverride);
}
