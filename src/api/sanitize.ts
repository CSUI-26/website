export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasControlCharacters(value: string): boolean {
	for (let i = 0; i < value.length; i += 1) {
		const code = value.charCodeAt(i);
		if (code <= 31 || code === 127) {
			return true;
		}
	}
	return false;
}

/**
 * Validates that a URL is an http(s) URL or a single-leading-slash relative path.
 */
export function sanitizeUrl(value: unknown): string {
	if (typeof value !== "string") {
		return "";
	}

	const trimmed = value.trim();
	if (!trimmed || hasControlCharacters(trimmed)) {
		return "";
	}

	if (/^https?:\/\//i.test(trimmed) || /^\/(?![/\\])/.test(trimmed)) {
		return trimmed;
	}

	return "";
}

/**
 * Validates that a URL strictly uses the http:// or https:// scheme.
 */
export function sanitizeHttpUrl(value: unknown): string {
	if (typeof value !== "string") {
		return "";
	}

	const trimmed = value.trim();
	if (!trimmed || hasControlCharacters(trimmed)) {
		return "";
	}

	if (/^https?:\/\//i.test(trimmed)) {
		return trimmed;
	}

	return "";
}

/**
 * Extracts and validates an image URL from either a string or an API ImageField object.
 */
export function sanitizeImageUrl(value: unknown): string {
	const raw =
		typeof value === "string"
			? value
			: isRecord(value) && typeof value.url === "string"
				? value.url
				: "";

	return sanitizeUrl(raw);
}
