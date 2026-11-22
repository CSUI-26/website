import fs from "node:fs";
import path from "node:path";

interface MemberItem {
	npm: string;
	name: string;
	foto?: {
		url?: string;
	};
}

const PUBLIC_PHOTOS_DIR = path.resolve(process.cwd(), "public/photos");
const DATA_FILE_PATH = path.resolve(process.cwd(), "src/data/members.json");
const MAX_RETRIES = 3;
const DELAY_BETWEEN_REQUESTS_MS = 100;

/**
 * Checks if a member's photo is already cached locally.
 */
function getExistingPhotoExtension(npm: string): string | null {
	for (const ext of ["jpg", "png", "webp", "jpeg"]) {
		const filePath = path.join(PUBLIC_PHOTOS_DIR, `${npm}.${ext}`);
		if (fs.existsSync(filePath)) {
			// Verify file is not empty (0 bytes)
			const stat = fs.statSync(filePath);
			if (stat.size > 0) {
				return ext;
			}
		}
	}
	return null;
}

/**
 * Maps Content-Type to standard image extension.
 */
function getExtensionFromContentType(contentType: string | null): string {
	if (!contentType) return "jpg";
	const lower = contentType.toLowerCase();
	if (lower.includes("image/png")) return "png";
	if (lower.includes("image/webp")) return "webp";
	if (lower.includes("image/jpeg") || lower.includes("image/jpg")) return "jpg";
	return "jpg";
}

/**
 * Sleeps for a given duration in milliseconds.
 */
function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Downloads a single photo with retry and exponential backoff.
 */
async function downloadPhoto(
	npm: string,
	url: string,
): Promise<{ success: boolean; ext?: string; error?: string }> {
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			const res = await fetch(url, {
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
					Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
				},
			});

			if (res.status === 429 || res.status >= 500) {
				const backoff = attempt * 1500;
				console.warn(
					`[sync-photos] HTTP ${res.status} for ${npm} (attempt ${attempt}/${MAX_RETRIES}). Backing off for ${backoff}ms...`,
				);
				await sleep(backoff);
				continue;
			}

			if (!res.ok) {
				return {
					success: false,
					error: `HTTP ${res.status} ${res.statusText}`,
				};
			}

			const contentType = res.headers.get("content-type");
			const ext = getExtensionFromContentType(contentType);
			const buffer = await res.arrayBuffer();

			if (buffer.byteLength === 0) {
				return { success: false, error: "Empty image payload received" };
			}

			const targetPath = path.join(PUBLIC_PHOTOS_DIR, `${npm}.${ext}`);
			fs.writeFileSync(targetPath, Buffer.from(buffer));
			return { success: true, ext };
		} catch (err) {
			if (attempt === MAX_RETRIES) {
				return { success: false, error: (err as Error).message };
			}
			await sleep(attempt * 1000);
		}
	}
	return { success: false, error: "Exceeded max retries" };
}

/**
 * Main photo sync runner.
 */
async function syncPhotos() {
	if (!fs.existsSync(PUBLIC_PHOTOS_DIR)) {
		fs.mkdirSync(PUBLIC_PHOTOS_DIR, { recursive: true });
	}

	const rawData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
	const members = JSON.parse(rawData) as MemberItem[];
	const toDownload: Array<{ npm: string; name: string; url: string }> = [];
	let cachedCount = 0;

	for (const m of members) {
		if (!m.foto?.url) continue;

		// Skip if already downloaded
		const existingExt = getExistingPhotoExtension(m.npm);
		if (existingExt) {
			cachedCount++;
			continue;
		}

		toDownload.push({ npm: m.npm, name: m.name, url: m.foto.url });
	}

	console.log(
		`[sync-photos] Total members: ${members.length} | Cached: ${cachedCount} | Pending download: ${toDownload.length}`,
	);

	if (toDownload.length === 0) {
		console.log(
			"[sync-photos] All member photos are cached locally in public/photos/. Done!",
		);
		return;
	}

	let downloadedCount = 0;
	let failedCount = 0;

	// Process downloads sequentially to prevent HTTP 429 rate limiting
	for (let i = 0; i < toDownload.length; i++) {
		const current = toDownload[i];
		if (!current) continue;

		const result = await downloadPhoto(current.npm, current.url);
		if (result.success) {
			downloadedCount++;
			console.log(
				`[sync-photos] [${cachedCount + downloadedCount}/${members.length}] Downloaded ${current.npm} (${current.name}) -> .${result.ext}`,
			);
		} else {
			failedCount++;
			console.error(
				`[sync-photos] Failed to download photo for ${current.npm} (${current.name}): ${result.error}`,
			);
		}

		// Polite delay between sequential requests to respect Google rate limits
		if (i < toDownload.length - 1) {
			await sleep(DELAY_BETWEEN_REQUESTS_MS);
		}
	}

	console.log(
		`[sync-photos] Finished: ${downloadedCount} newly downloaded, ${cachedCount} cached, ${failedCount} failed.`,
	);
}

syncPhotos().catch((err) => {
	console.error("[sync-photos] Fatal error during sync:", err);
	process.exit(1);
});
