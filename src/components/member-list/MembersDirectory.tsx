import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ChevronUp,
	Grid2X2,
	Search,
	Tag,
	X,
} from "lucide-react";
import { type ChangeEvent, useMemo, useState } from "react";
import styles from "./MembersDirectory.module.css";
import { matchQueryToCanonicalTags } from "./tags";
import { CANONICAL_TAGS } from "./tags/rules";

export interface DirectoryMember {
	npm: string;
	name: string;
	nama_panggilan: string;
	major: string;
	majorCode: string;
	niche: string;
	tags: string[];
	badge: string;
	slug: string;
	photoUrl: string;
}

interface Props {
	members: DirectoryMember[];
	pageSize?: number;
}

const MAJORS = [
	{ label: "All", value: "ALL" },
	{ label: "Computer Science", value: "Ilmu Komputer" },
	{ label: "Information System", value: "Sistem Informasi" },
	{ label: "KKI", value: "Ilmu Komputer KKI" },
	{ label: "AI", value: "Kecerdasan Artifisial" },
];

const INITIAL_VISIBLE_TAG_COUNT = 12;

export default function MembersDirectory({ members, pageSize = 40 }: Props) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMajor, setSelectedMajor] = useState("ALL");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [showAllTags, setShowAllTags] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	// Compute tag counts across members matching the current major filter
	const tagCounts = useMemo(() => {
		const counts = new Map<string, number>();
		for (const m of members) {
			if (selectedMajor !== "ALL" && m.major !== selectedMajor) continue;
			for (const t of m.tags) {
				counts.set(t, (counts.get(t) || 0) + 1);
			}
		}
		return counts;
	}, [members, selectedMajor]);

	// Visible canonical tags (top N by default, plus any currently selected tags outside top N)
	const visibleTags = useMemo(() => {
		if (showAllTags) return [...CANONICAL_TAGS];
		const initial = CANONICAL_TAGS.slice(0, INITIAL_VISIBLE_TAG_COUNT);
		const extraSelected = CANONICAL_TAGS.slice(
			INITIAL_VISIBLE_TAG_COUNT,
		).filter((t) => selectedTags.includes(t));
		return [...initial, ...extraSelected];
	}, [showAllTags, selectedTags]);

	// Filter members based on major category, selected tag chips, and search text
	const filteredMembers = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		const matchedQueryCanonicalTags = query
			? matchQueryToCanonicalTags(query)
			: [];

		return members.filter((m) => {
			const matchesMajor = selectedMajor === "ALL" || m.major === selectedMajor;
			if (!matchesMajor) return false;

			if (selectedTags.length > 0) {
				const hasSelectedTag = selectedTags.some((tag) => m.tags.includes(tag));
				if (!hasSelectedTag) return false;
			}

			if (!query) return true;

			const nameMatch = m.name?.toLowerCase().includes(query);
			const nickMatch = m.nama_panggilan?.toLowerCase().includes(query);
			const nicheMatch = m.niche?.toLowerCase().includes(query);
			const directTagMatch = m.tags.some((t) =>
				t.toLowerCase().includes(query),
			);
			const canonicalAliasMatch =
				matchedQueryCanonicalTags.length > 0 &&
				matchedQueryCanonicalTags.some((canonicalTag) =>
					m.tags.includes(canonicalTag),
				);

			return (
				nameMatch ||
				nickMatch ||
				nicheMatch ||
				directTagMatch ||
				canonicalAliasMatch
			);
		});
	}, [members, selectedMajor, selectedTags, searchQuery]);

	// Total pages calculation
	const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));

	// Current page records slice
	const paginatedMembers = useMemo(() => {
		const start = (currentPage - 1) * pageSize;
		return filteredMembers.slice(start, start + pageSize);
	}, [filteredMembers, currentPage, pageSize]);

	// Handlers that reset page to 1 on filter/search change
	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	const handleMajorSelect = (major: string) => {
		setSelectedMajor(major);
		setCurrentPage(1);
	};

	const handleTagToggle = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
		setCurrentPage(1);
	};

	const handleClearTags = () => {
		setSelectedTags([]);
		setCurrentPage(1);
	};

	const goToPage = (page: number) => {
		const target = Math.max(1, Math.min(page, totalPages));
		setCurrentPage(target);
		// Smooth scroll up towards top of grid on page change
		const gridEl = document.getElementById("members-grid-top");
		gridEl?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	// Generate visible page numbers with ellipsis
	const pageNumbers = useMemo(() => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const pages: (number | string)[] = [];
		if (currentPage <= 4) {
			pages.push(1, 2, 3, 4, 5, "ellipsis-end", totalPages);
		} else if (currentPage >= totalPages - 3) {
			pages.push(
				1,
				"ellipsis-start",
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages,
			);
		} else {
			pages.push(
				1,
				"ellipsis-start",
				currentPage - 1,
				currentPage,
				currentPage + 1,
				"ellipsis-end",
				totalPages,
			);
		}
		return pages;
	}, [currentPage, totalPages]);

	const hiddenTagCount = CANONICAL_TAGS.length - visibleTags.length;

	const statusSummary = useMemo(() => {
		const parts: string[] = [];
		if (searchQuery.trim()) {
			parts.push(`"${searchQuery.trim()}"`);
		}
		if (selectedMajor !== "ALL") {
			parts.push(selectedMajor);
		}
		if (selectedTags.length > 0) {
			parts.push(selectedTags.join(", "));
		}
		return parts.length > 0
			? `Showing results for: ${parts.join(" • ")}`
			: "Showing all members";
	}, [searchQuery, selectedMajor, selectedTags]);

	return (
		<div className={styles.directory_root}>
			{/* Search Bar & Filters */}
			<div className={styles.search_container}>
				<div className={styles.search_bar}>
					<Search className={styles.search_icon} width={22} height={22} />
					<input
						type="search"
						id="member-search"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Search by name, nickname, or interest tag..."
						className={styles.search_input}
						autoComplete="off"
					/>
				</div>

				{/* Study Program (Major) Filter Pills */}
				<div className={styles.filter_pills}>
					{MAJORS.map((m) => {
						const isActive = selectedMajor === m.value;
						return (
							<button
								key={m.value}
								type="button"
								onClick={() => handleMajorSelect(m.value)}
								className={`${styles.filter_pill} ${isActive ? styles.filter_pill__active : ""}`}
							>
								{m.label}
							</button>
						);
					})}
				</div>

				{/* Multi-Tag Interest Selector Chips */}
				<div className={styles.tag_filter_section}>
					<div className={styles.tag_filter_header}>
						<span className={styles.tag_filter_label}>
							<Tag width={14} height={14} />
							<span>Filter by interest tags</span>
						</span>
						{selectedTags.length > 0 && (
							<button
								type="button"
								onClick={handleClearTags}
								className={styles.clear_tags_btn}
							>
								<X width={13} height={13} />
								<span>Clear ({selectedTags.length})</span>
							</button>
						)}
					</div>

					<div className={styles.tag_chips}>
						{visibleTags.map((tag) => {
							const isSelected = selectedTags.includes(tag);
							const count = tagCounts.get(tag) || 0;
							return (
								<button
									key={tag}
									type="button"
									onClick={() => handleTagToggle(tag)}
									aria-pressed={isSelected}
									className={`${styles.tag_chip} ${isSelected ? styles.tag_chip__active : ""}`}
								>
									<span>{tag}</span>
									<span className={styles.tag_chip_count}>{count}</span>
								</button>
							);
						})}

						<button
							type="button"
							onClick={() => setShowAllTags((prev) => !prev)}
							className={styles.tag_toggle_btn}
						>
							{showAllTags ? (
								<>
									<span>Show fewer</span>
									<ChevronUp width={14} height={14} />
								</>
							) : (
								<>
									<span>+{hiddenTagCount} more</span>
									<ChevronDown width={14} height={14} />
								</>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Status Bar */}
			<div className={styles.status_bar} id="members-grid-top">
				<span className={styles.status_text}>{statusSummary}</span>
				<div className={styles.status_meta}>
					<span className={styles.count_badge}>{filteredMembers.length}</span>
					<Grid2X2 width={20} height={20} />
				</div>
			</div>

			{/* Member Grid */}
			<section className={styles.grid_container}>
				{filteredMembers.length === 0 ? (
					<div className={styles.no_results}>
						<p>No members found matching your search.</p>
					</div>
				) : (
					<div className={styles.grid} id="members-grid">
						{paginatedMembers.map((member) => (
							<a
								key={member.npm}
								href={`/members/${member.slug}`}
								className={styles.card}
							>
								<div className={styles.picture}>
									<img
										src={member.photoUrl}
										alt={member.name}
										className={styles.picture_image}
										loading="lazy"
										decoding="async"
									/>
									<span className={styles.picture_badge}>{member.badge}</span>
								</div>
								<div className={styles.info}>
									<h2 className={styles.info_name} title={member.name}>
										{member.nama_panggilan || member.name}
									</h2>
									<span className={styles.info_major}>{member.majorCode}</span>
								</div>
							</a>
						))}
					</div>
				)}
			</section>

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<nav
					className={styles.pagination_wrapper}
					aria-label="Members pagination"
				>
					<button
						type="button"
						onClick={() => goToPage(1)}
						disabled={currentPage === 1}
						className={styles.pagination_nav_btn}
						aria-label="First page"
						title="First page"
					>
						<ChevronsLeft width={18} height={18} />
					</button>

					<button
						type="button"
						onClick={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}
						className={styles.pagination_nav_btn}
						aria-label="Previous page"
						title="Previous page"
					>
						<ChevronLeft width={18} height={18} />
					</button>

					<div className={styles.pagination_numbers}>
						{pageNumbers.map((p) => {
							if (typeof p === "string") {
								return (
									<span key={p} className={styles.pagination_ellipsis}>
										...
									</span>
								);
							}
							const isCurrent = p === currentPage;
							return (
								<button
									key={p}
									type="button"
									onClick={() => goToPage(p)}
									aria-current={isCurrent ? "page" : undefined}
									className={`${styles.pagination_number_btn} ${
										isCurrent ? styles.pagination_number_btn__active : ""
									}`}
								>
									{p}
								</button>
							);
						})}
					</div>

					<button
						type="button"
						onClick={() => goToPage(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={styles.pagination_nav_btn}
						aria-label="Next page"
						title="Next page"
					>
						<ChevronRight width={18} height={18} />
					</button>

					<button
						type="button"
						onClick={() => goToPage(totalPages)}
						disabled={currentPage === totalPages}
						className={styles.pagination_nav_btn}
						aria-label="Last page"
						title="Last page"
					>
						<ChevronsRight width={18} height={18} />
					</button>
				</nav>
			)}
		</div>
	);
}
