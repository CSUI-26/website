import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Member } from "@/types/member";
import { getMajorCode, getMemberSlug } from "@/util";

/**
 * Manages dynamic cycling of member niche badges with fluid width transitions.
 */
function initBadgeCyclers() {
	// A hidden off-screen span for zero-flicker width measurement
	let measureSpan: HTMLSpanElement | null = null;
	function getMeasureSpan(referenceEl: HTMLElement): HTMLSpanElement {
		if (!measureSpan) {
			measureSpan = document.createElement("span");
			measureSpan.style.position = "absolute";
			measureSpan.style.visibility = "hidden";
			measureSpan.style.pointerEvents = "none";
			measureSpan.style.whiteSpace = "nowrap";
			measureSpan.style.top = "-9999px";
			measureSpan.style.left = "-9999px";
			document.body.appendChild(measureSpan);
		}
		const style = window.getComputedStyle(referenceEl);
		measureSpan.style.font = style.font;
		measureSpan.style.fontSize = style.fontSize;
		measureSpan.style.fontWeight = style.fontWeight;
		measureSpan.style.letterSpacing = style.letterSpacing;
		measureSpan.style.paddingLeft = style.paddingLeft;
		measureSpan.style.paddingRight = style.paddingRight;
		measureSpan.style.border = style.border;
		measureSpan.style.boxSizing = "border-box";
		return measureSpan;
	}

	const activeIntervals = new WeakMap<HTMLElement, number>();
	const currentIndexMap = new WeakMap<HTMLElement, number>();

	function startCyclingBadge(badgeEl: HTMLElement) {
		if (activeIntervals.has(badgeEl)) return;

		const nichesRaw = badgeEl.getAttribute("data-niches");
		if (!nichesRaw) return;

		let niches: string[] = [];
		try {
			niches = JSON.parse(nichesRaw);
		} catch {
			return;
		}

		if (!Array.isArray(niches) || niches.length <= 1) return;

		const timer = window.setInterval(() => {
			if (!document.contains(badgeEl)) {
				stopCyclingBadge(badgeEl);
				return;
			}
			const currentIdx = currentIndexMap.get(badgeEl) || 0;
			const nextIdx = (currentIdx + 1) % niches.length;
			currentIndexMap.set(badgeEl, nextIdx);

			const nextText = niches[nextIdx];
			const textSpan = badgeEl.querySelector<HTMLElement>("span");
			if (!textSpan || !nextText) return;

			// 1. Lock current width in pixels before changing text
			const currentWidth = badgeEl.getBoundingClientRect().width;
			badgeEl.style.width = `${currentWidth}px`;

			// 2. Measure target width using off-screen helper
			const measurer = getMeasureSpan(badgeEl);
			measurer.textContent = nextText;
			const targetWidth = measurer.getBoundingClientRect().width;

			const parentWidth = badgeEl.parentElement
				? badgeEl.parentElement.offsetWidth - 24
				: 9999;
			const finalWidth = Math.min(targetWidth, parentWidth);

			// 3. Animate text exit
			textSpan.style.opacity = "0";
			textSpan.style.transform = "translateY(-6px)";

			window.setTimeout(() => {
				textSpan.textContent = nextText;
				// Animate rounded frame width smoothly to new text width
				badgeEl.style.width = `${finalWidth}px`;
				textSpan.style.transform = "translateY(6px)";

				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						textSpan.style.opacity = "1";
						textSpan.style.transform = "translateY(0)";
					});
				});

				// After transition finishes, allow width to adjust with screen size
				window.setTimeout(() => {
					badgeEl.style.width = "fit-content";
				}, 450);
			}, 200);
		}, 5000);

		activeIntervals.set(badgeEl, timer);
	}

	function stopCyclingBadge(badgeEl: HTMLElement) {
		const timer = activeIntervals.get(badgeEl);
		if (timer) {
			window.clearInterval(timer);
			activeIntervals.delete(badgeEl);
		}
	}

	// IntersectionObserver: only cycle cards currently in viewport
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const badgeEl = entry.target as HTMLElement;
				if (entry.isIntersecting) {
					startCyclingBadge(badgeEl);
				} else {
					stopCyclingBadge(badgeEl);
				}
			}
		},
		{ rootMargin: "100px" },
	);

	document
		.querySelectorAll<HTMLElement>("[data-badge-cycler]")
		.forEach((el) => {
			observer.observe(el);
		});

	return {
		observe: (el: HTMLElement) => observer.observe(el),
		refresh: (badgeEl: HTMLElement, newNiches: string[]) => {
			badgeEl.setAttribute("data-niches", JSON.stringify(newNiches));
			const textSpan = badgeEl.querySelector<HTMLElement>("span");
			if (textSpan && newNiches[0]) {
				textSpan.textContent = newNiches[0];
			}
			stopCyclingBadge(badgeEl);
			currentIndexMap.delete(badgeEl);
			if (newNiches.length > 1) {
				observer.observe(badgeEl);
			}
		},
	};
}

/**
 * Initializes interactive search, category filter, niche domain filter,
 * progressive pagination ("Load more"), dynamic badge cycling, and real-time live synchronization.
 */
export function initMembersPage(pillActiveClass: string, pageSize = 24) {
	const searchInput = document.getElementById(
		"member-search",
	) as HTMLInputElement | null;
	const filterButtons =
		document.querySelectorAll<HTMLButtonElement>("button[data-major]");
	const nicheSelect = document.getElementById(
		"niche-filter",
	) as HTMLSelectElement | null;
	const resultsLabel = document.getElementById("results-label");
	const resultsCount = document.getElementById("results-count");
	const noResults = document.getElementById("no-results");
	const loadMoreWrapper = document.getElementById("load-more-wrapper");
	const loadMoreBtn = document.getElementById("load-more-btn");
	const membersGrid = document.getElementById("members-grid");

	const cycler = initBadgeCyclers();

	let currentMajor = "ALL";
	let currentNiche = "ALL";
	let currentQuery = "";
	let visibleLimit = pageSize;

	function filterCards() {
		const cards = Array.from(
			document.querySelectorAll<HTMLElement>("[data-member-card]"),
		);
		const query = currentQuery.toLowerCase().trim();
		const matchingCards: HTMLElement[] = [];

		for (const card of cards) {
			const name = (card.getAttribute("data-name") || "").toLowerCase();
			const nickname = (card.getAttribute("data-nickname") || "").toLowerCase();
			const major = card.getAttribute("data-major") || "";
			const niche = (card.getAttribute("data-niche") || "").toLowerCase();

			const generalNichesRaw = card.getAttribute("data-general-niches") || "[]";
			let generalNiches: string[] = [];
			try {
				generalNiches = JSON.parse(generalNichesRaw);
			} catch {
				generalNiches = [];
			}
			const generalNichesLower = generalNiches
				.map((g) => g.toLowerCase())
				.join(" ");

			const matchesMajor = currentMajor === "ALL" || major === currentMajor;
			const matchesNiche =
				currentNiche === "ALL" ||
				generalNiches.some(
					(g) => g.toLowerCase() === currentNiche.toLowerCase(),
				);
			const matchesQuery =
				!query ||
				name.includes(query) ||
				nickname.includes(query) ||
				niche.includes(query) ||
				generalNichesLower.includes(query);

			if (matchesMajor && matchesNiche && matchesQuery) {
				matchingCards.push(card);
			} else {
				card.style.display = "none";
			}
		}

		const totalMatches = matchingCards.length;

		// Display up to visibleLimit matching cards
		matchingCards.forEach((card, index) => {
			if (index < visibleLimit) {
				card.style.display = "flex";
			} else {
				card.style.display = "none";
			}
		});

		if (resultsCount) {
			resultsCount.textContent = totalMatches.toString();
		}
		if (noResults) {
			noResults.style.display = totalMatches === 0 ? "block" : "none";
		}

		// Update Load More button visibility and remaining count
		if (loadMoreWrapper) {
			if (visibleLimit < totalMatches) {
				loadMoreWrapper.style.display = "flex";
				if (loadMoreBtn) {
					const remaining = totalMatches - visibleLimit;
					const countSpan = loadMoreBtn.querySelector("span");
					if (countSpan) {
						countSpan.textContent = `Load more (${remaining} remaining)`;
					}
				}
			} else {
				loadMoreWrapper.style.display = "none";
			}
		}

		if (resultsLabel) {
			const filterParts: string[] = [];
			if (currentMajor !== "ALL") filterParts.push(currentMajor);
			if (currentNiche !== "ALL") filterParts.push(currentNiche);
			const filterDesc = filterParts.join(" · ");

			if (query && filterDesc) {
				resultsLabel.textContent = `Showing results for: "${query}" in ${filterDesc}`;
			} else if (query) {
				resultsLabel.textContent = `Showing results for: "${query}"`;
			} else if (filterDesc) {
				resultsLabel.textContent = `Showing results for: ${filterDesc}`;
			} else {
				resultsLabel.textContent = "Showing all members";
			}
		}
	}

	loadMoreBtn?.addEventListener("click", () => {
		visibleLimit += pageSize;
		filterCards();
	});

	searchInput?.addEventListener("input", (e) => {
		currentQuery = (e.target as HTMLInputElement).value;
		visibleLimit = pageSize;
		filterCards();
	});

	for (const btn of filterButtons) {
		btn.addEventListener("click", () => {
			for (const b of filterButtons) {
				b.classList.remove(pillActiveClass);
			}
			btn.classList.add(pillActiveClass);
			currentMajor = btn.getAttribute("data-major") || "ALL";
			visibleLimit = pageSize;
			filterCards();
		});
	}

	nicheSelect?.addEventListener("change", (e) => {
		currentNiche = (e.target as HTMLSelectElement).value;
		visibleLimit = pageSize;
		filterCards();
	});

	// Trigger initial filter / load more state setup with pre-rendered cards
	filterCards();

	// Record pre-rendered NPMs so newly created members route to dynamic profile viewer
	const preRenderedNPMs = new Set<string>();
	document.querySelectorAll<HTMLElement>("[data-member-card]").forEach((c) => {
		const npm = c.getAttribute("data-npm");
		if (npm) preRenderedNPMs.add(npm);
	});

	// Real-time Firestore sync: updates, additions, and deletions from cruda-lumping
	if (membersGrid) {
		const membersRef = collection(db, "members");
		onSnapshot(
			membersRef,
			(snapshot) => {
				const firestoreMembers: Member[] = [];
				const currentDocNPMs = new Set<string>();

				snapshot.forEach((docSnap) => {
					const m = docSnap.data() as Member;
					firestoreMembers.push(m);
					if (m.npm) currentDocNPMs.add(m.npm);
				});

				if (firestoreMembers.length === 0) return;

				// 1. Update or create cards
				for (const m of firestoreMembers) {
					if (!m.npm) continue;
					const card = document.querySelector<HTMLElement>(
						`[data-member-card][data-npm="${m.npm}"]`,
					);

					const nichesList =
						m.general_niches && m.general_niches.length > 0
							? m.general_niches
							: m.niche
								? m.niche
										.split(/[,/]/)
										.map((t) => t.trim())
										.filter(Boolean)
								: ["Member"];
					const majorCode = getMajorCode(m.major);
					const displayName = m.nama_panggilan || m.name;
					const photoUrl = m.foto?.url || "";

					if (card) {
						// Update attributes
						card.setAttribute("data-name", m.name);
						card.setAttribute("data-nickname", m.nama_panggilan || "");
						card.setAttribute("data-major", m.major);
						card.setAttribute("data-niche", m.niche || "");
						card.setAttribute(
							"data-general-niches",
							JSON.stringify(nichesList),
						);

						// Update text & photo
						const nameEl = card.querySelector<HTMLElement>("h2");
						if (nameEl) {
							nameEl.textContent = displayName;
							nameEl.title = m.name;
						}

						const majorEl = card.querySelector<HTMLElement>(
							"[class*='info_major']",
						);
						if (majorEl) {
							majorEl.textContent = majorCode;
						}

						const badgeEl = card.querySelector<HTMLElement>(
							"[class*='picture_badge']",
						);
						if (badgeEl) {
							cycler.refresh(badgeEl, nichesList);
						}

						const imgEl = card.querySelector<HTMLImageElement>("img");
						if (imgEl && photoUrl && imgEl.src !== photoUrl) {
							imgEl.src = photoUrl;
						}
					} else {
						// Newly created member added live via cruda-lumping
						const sampleCard =
							document.querySelector<HTMLAnchorElement>("[data-member-card]");
						if (sampleCard) {
							const newCard = sampleCard.cloneNode(true) as HTMLAnchorElement;
							newCard.href = preRenderedNPMs.has(m.npm)
								? `/members/${getMemberSlug(m)}`
								: `/members/profile?npm=${encodeURIComponent(m.npm)}`;
							newCard.setAttribute("data-npm", m.npm);
							newCard.setAttribute("data-name", m.name);
							newCard.setAttribute("data-nickname", m.nama_panggilan || "");
							newCard.setAttribute("data-major", m.major);
							newCard.setAttribute("data-niche", m.niche || "");
							newCard.setAttribute(
								"data-general-niches",
								JSON.stringify(nichesList),
							);

							const nameEl = newCard.querySelector<HTMLElement>("h2");
							if (nameEl) {
								nameEl.textContent = displayName;
								nameEl.title = m.name;
							}

							const majorEl = newCard.querySelector<HTMLElement>(
								"[class*='info_major']",
							);
							if (majorEl) majorEl.textContent = majorCode;

							const badgeEl = newCard.querySelector<HTMLElement>(
								"[class*='picture_badge']",
							);
							if (badgeEl) {
								cycler.refresh(badgeEl, nichesList);
							}

							const imgEl = newCard.querySelector<HTMLImageElement>("img");
							if (imgEl) {
								imgEl.src =
									photoUrl ||
									"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
								imgEl.alt = m.name;
							}

							membersGrid.appendChild(newCard);
						}
					}
				}

				// 2. Remove deleted cards
				const allDomCards =
					document.querySelectorAll<HTMLElement>("[data-member-card]");
				allDomCards.forEach((c) => {
					const npm = c.getAttribute("data-npm");
					if (npm && !currentDocNPMs.has(npm)) {
						c.remove();
					}
				});

				filterCards();
			},
			(err) => {
				console.warn("Firestore live sync error:", err);
			},
		);
	}
}
