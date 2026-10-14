/**
 * Initializes interactive search, category filter, and progressive pagination ("Load more")
 * on the members page.
 */
export function initMembersPage(pillActiveClass: string, pageSize = 24) {
	const searchInput = document.getElementById(
		"member-search",
	) as HTMLInputElement | null;
	const filterButtons =
		document.querySelectorAll<HTMLButtonElement>("button[data-major]");
	const resultsLabel = document.getElementById("results-label");
	const resultsCount = document.getElementById("results-count");
	const cards = Array.from(
		document.querySelectorAll<HTMLElement>("[data-member-card]"),
	);
	const noResults = document.getElementById("no-results");
	const loadMoreWrapper = document.getElementById("load-more-wrapper");
	const loadMoreBtn = document.getElementById("load-more-btn");

	let currentMajor = "ALL";
	let currentQuery = "";
	let visibleLimit = pageSize;

	function filterCards() {
		const query = currentQuery.toLowerCase().trim();
		const matchingCards: HTMLElement[] = [];

		for (const card of cards) {
			const name = (card.getAttribute("data-name") || "").toLowerCase();
			const nickname = (card.getAttribute("data-nickname") || "").toLowerCase();
			const major = card.getAttribute("data-major") || "";
			const niche = (card.getAttribute("data-niche") || "").toLowerCase();

			const matchesMajor = currentMajor === "ALL" || major === currentMajor;
			const matchesQuery =
				!query ||
				name.includes(query) ||
				nickname.includes(query) ||
				niche.includes(query);

			if (matchesMajor && matchesQuery) {
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
			if (query) {
				resultsLabel.textContent = `Showing results for: "${query}"`;
			} else if (currentMajor !== "ALL") {
				resultsLabel.textContent = `Showing results for: ${currentMajor}`;
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

	// Trigger initial filter / load more state setup
	filterCards();
}
