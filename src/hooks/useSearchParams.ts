import { useCallback, useMemo, useSyncExternalStore } from "react";

export type SetURLSearchParamsInit =
	| URLSearchParams
	| string
	| Record<string, string | readonly string[]>
	| [string, string][]
	| ((prev: URLSearchParams) => URLSearchParams);

export interface NavigateOptions {
	replace?: boolean;
	state?: Record<string, unknown>;
}

// Global listeners set to notify components when URL changes via setSearchParams or popstate
const listeners = new Set<() => void>();

function notify() {
	for (const listener of listeners) {
		listener();
	}
}

// Ensure popstate (browser back/forward) notifies all hook instances
if (typeof window !== "undefined") {
	window.addEventListener("popstate", notify);
}

function subscribe(callback: () => void): () => void {
	listeners.add(callback);
	return () => {
		listeners.delete(callback);
	};
}

function getSnapshot(): string {
	if (typeof window === "undefined") return "";
	return window.location.search;
}

function getServerSnapshot(): string {
	return "";
}

/**
 * Returns current browser history state object if available.
 */
export function getHistoryState<T = Record<string, unknown>>(): T | null {
	if (typeof window === "undefined") return null;
	return (window.history.state as T) || null;
}

/**
 * Updates browser history state without changing the URL.
 */
export function updateHistoryState(
	patch: Record<string, unknown> | ((prev: Record<string, unknown>) => Record<string, unknown>),
): void {
	if (typeof window === "undefined") return;
	const current = (window.history.state as Record<string, unknown>) || {};
	const next = typeof patch === "function" ? patch(current) : { ...current, ...patch };
	window.history.replaceState(next, "", window.location.href);
}

/**
 * Custom hook providing a React Router-like useSearchParams API
 * backed natively by URLSearchParams and window.history with history.state support.
 */
export function useSearchParams(): [
	URLSearchParams,
	(
		nextInit: SetURLSearchParamsInit,
		navigateOpts?: NavigateOptions,
	) => void,
] {
	const searchString = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	const searchParams = useMemo(
		() => new URLSearchParams(searchString),
		[searchString],
	);

	const setSearchParams = useCallback(
		(
			nextInit: SetURLSearchParamsInit,
			navigateOpts: NavigateOptions = { replace: true },
		) => {
			if (typeof window === "undefined") return;

			let nextParams: URLSearchParams;
			if (typeof nextInit === "function") {
				nextParams = nextInit(new URLSearchParams(window.location.search));
			} else if (nextInit instanceof URLSearchParams) {
				nextParams = nextInit;
			} else if (typeof nextInit === "string") {
				nextParams = new URLSearchParams(nextInit);
			} else if (Array.isArray(nextInit)) {
				nextParams = new URLSearchParams(nextInit);
			} else {
				nextParams = new URLSearchParams();
				for (const [key, value] of Object.entries(nextInit)) {
					if (Array.isArray(value)) {
						for (const item of value) {
							nextParams.append(key, item);
						}
					} else if (typeof value === "string") {
						nextParams.set(key, value);
					}
				}
			}

			const queryString = nextParams.toString();
			const newUrl = queryString
				? `${window.location.pathname}?${queryString}`
				: window.location.pathname;

			const currentFullUrl = `${window.location.pathname}${window.location.search}`;
			const currentState = (window.history.state as Record<string, unknown>) || {};
			const nextState = navigateOpts.state
				? { ...currentState, ...navigateOpts.state }
				: currentState;

			if (newUrl !== currentFullUrl || navigateOpts.state) {
				if (navigateOpts.replace ?? true) {
					window.history.replaceState(nextState, "", newUrl);
				} else {
					window.history.pushState(nextState, "", newUrl);
				}
				notify();
			}
		},
		[],
	);

	return [searchParams, setSearchParams];
}
