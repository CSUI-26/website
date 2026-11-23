import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	isRecord,
	sanitizeHttpUrl,
	sanitizeImageUrl,
	sanitizeUrl,
} from "../sanitize.ts";

describe("isRecord", () => {
	it("matches plain objects and rejects null, arrays, and primitives", () => {
		assert.equal(isRecord({ a: 1 }), true);
		assert.equal(isRecord({}), true);
		assert.equal(isRecord(null), false);
		assert.equal(isRecord([]), false);
		assert.equal(isRecord("str"), false);
		assert.equal(isRecord(123), false);
	});
});

describe("sanitizeUrl", () => {
	it("allows http://, https://, and single leading / paths", () => {
		assert.equal(
			sanitizeUrl("  https://zenith.csui.dev/academic  "),
			"https://zenith.csui.dev/academic",
		);
		assert.equal(
			sanitizeUrl("http://localhost:3001/api/v1/programs"),
			"http://localhost:3001/api/v1/programs",
		);
		assert.equal(
			sanitizeUrl("/academic/ilmu-komputer"),
			"/academic/ilmu-komputer",
		);
	});

	it("rejects unsafe schemes, protocol-relative URLs, control chars, and non-strings", () => {
		assert.equal(sanitizeUrl("javascript:alert(1)"), "");
		assert.equal(sanitizeUrl("data:text/html,<script>1</script>"), "");
		assert.equal(sanitizeUrl("//evil.example/path"), "");
		assert.equal(sanitizeUrl("/\\evil.example/path"), "");
		assert.equal(sanitizeUrl("https://evil.example/a\nb"), "");
		assert.equal(sanitizeUrl("relative/no-slash"), "");
		assert.equal(sanitizeUrl(null), "");
		assert.equal(sanitizeUrl(42), "");
	});
});

describe("sanitizeHttpUrl", () => {
	it("allows only http:// and https:// URLs and rejects relative paths", () => {
		assert.equal(
			sanitizeHttpUrl("https://course.csui.dev/?prodi=CS"),
			"https://course.csui.dev/?prodi=CS",
		);
		assert.equal(
			sanitizeHttpUrl("http://localhost:3001/docs"),
			"http://localhost:3001/docs",
		);
		assert.equal(sanitizeHttpUrl("/academic/ilmu-komputer"), "");
		assert.equal(sanitizeHttpUrl("javascript:alert(1)"), "");
		assert.equal(sanitizeHttpUrl(""), "");
	});
});

describe("sanitizeImageUrl", () => {
	it("extracts and sanitizes image URLs from strings or ImageField objects", () => {
		assert.equal(
			sanitizeImageUrl({ url: "  /api/v1/media/a.webp " }),
			"/api/v1/media/a.webp",
		);
		assert.equal(
			sanitizeImageUrl("https://cdn.example.com/a.png"),
			"https://cdn.example.com/a.png",
		);
		assert.equal(sanitizeImageUrl({ url: "javascript:alert(1)" }), "");
		assert.equal(sanitizeImageUrl({}), "");
	});
});
