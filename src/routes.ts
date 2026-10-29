export const RootRoutes = new Map([
	["Home", "/"],
	["Gallery", "/gallery"],
	["Academic", "/academic"],
	["Members", "/members"],
	["Achievements", "/achievements"],
] as const) satisfies ReadonlyMap<string, string>;

export type RootRoutesValues =
	typeof RootRoutes extends ReadonlyMap<string, infer V> ? V : never;
