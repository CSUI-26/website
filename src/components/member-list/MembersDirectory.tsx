import {
	SiGithub as GithubIcon,
	SiInstagram as InstagramIcon,
	SiLine as LineIcon,
} from "@icons-pack/react-simple-icons";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ChevronUp,
	Grid2X2,
	LayoutList,
	Search,
	Tag,
	X,
} from "lucide-react";
import {
	type ChangeEvent,
	type MouseEvent,
	useEffect,
	useMemo,
	useState,
} from "react";
import styles from "./MembersDirectory.module.css";
import { matchQueryToCanonicalTags } from "./tags";
import { CANONICAL_TAGS } from "./tags/rules";

export interface DirectoryMemberSocials {
	instagram: string | null;
	linkedin: string | null;
	github: string | null;
	line: string | null;
}

export interface DirectoryMember {
	npm: string;
	name: string;
	nama_panggilan: string;
	major: string;
	majorCode: string;
	majorTheme?: "cs" | "si" | "kki" | "ai";
	niche: string;
	quote: string;
	tags: string[];
	badge: string;
	slug: string;
	photoUrl: string;
	socials?: DirectoryMemberSocials;
}

interface Props {
	members: DirectoryMember[];
	pageSize?: number;
}

const MAJORS = [
	{ label: "All", value: "ALL", theme: "all" },
	{ label: "Computer Science", value: "Ilmu Komputer", theme: "cs" },
	{ label: "Information System", value: "Sistem Informasi", theme: "si" },
	{ label: "KKI", value: "Ilmu Komputer KKI", theme: "kki" },
	{ label: "AI", value: "Kecerdasan Artifisial", theme: "ai" },
] as const;

const MAJORS_PARAM_MAP: Record<string, string> = {
	all: "ALL",
	cs: "Ilmu Komputer",
	"computer-science": "Ilmu Komputer",
	"computer science": "Ilmu Komputer",
	"ilmu-komputer": "Ilmu Komputer",
	"ilmu komputer": "Ilmu Komputer",
	si: "Sistem Informasi",
	"information-system": "Sistem Informasi",
	"information system": "Sistem Informasi",
	"sistem-informasi": "Sistem Informasi",
	"sistem informasi": "Sistem Informasi",
	kki: "Ilmu Komputer KKI",
	"cs-kki": "Ilmu Komputer KKI",
	"cs kki": "Ilmu Komputer KKI",
	"ilmu-komputer-kki": "Ilmu Komputer KKI",
	"ilmu komputer kki": "Ilmu Komputer KKI",
	ai: "Kecerdasan Artifisial",
	"artificial-intelligence": "Kecerdasan Artifisial",
	"artificial intelligence": "Kecerdasan Artifisial",
	"kecerdasan-artifisial": "Kecerdasan Artifisial",
	"kecerdasan artifisial": "Kecerdasan Artifisial",
};

/**
 * Normalizes query string major parameter into canonical internal major name.
 */
function resolveMajorParam(param: string | null): string | null {
	if (!param) return null;
	const key = param.trim().toLowerCase();
	return MAJORS_PARAM_MAP[key] || null;
}

/**
 * Matches a tag query parameter against canonical tags (case-insensitive)
 * or falls back to the literal trimmed tag string.
 */
function resolveTagParam(tagParam: string | null): string | null {
	if (!tagParam) return null;
	const trimmed = tagParam.trim();
	if (!trimmed) return null;
	const canonical = CANONICAL_TAGS.find(
		(t) => t.toLowerCase() === trimmed.toLowerCase(),
	);
	return canonical || trimmed;
}

const INITIAL_VISIBLE_TAG_COUNT = 12;

function LinkedInIconSvg({ size = 16 }: { size?: number }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
			<rect x="2" y="9" width="4" height="12" />
			<circle cx="4" cy="4" r="2" />
		</svg>
	);
}

export default function MembersDirectory({ members, pageSize = 40 }: Props) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMajor, setSelectedMajor] = useState("ALL");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [showAllTags, setShowAllTags] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "column">("grid");
	const [currentPage, setCurrentPage] = useState(1);

	// Synchronize filter selections from URL parameters when landing on the page
	useEffect(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);

		const majorParam = params.get("major") || params.get("prodi");
		const resolvedMajor = resolveMajorParam(majorParam);
		if (resolvedMajor) {
			setSelectedMajor(resolvedMajor);
		}

		const tagParam = params.get("tag");
		if (tagParam) {
			const resolvedTag = resolveTagParam(tagParam);
			if (resolvedTag) {
				setSelectedTags([resolvedTag]);
			}
		}

		const searchParam = params.get("q") || params.get("search");
		if (searchParam) {
			setSearchQuery(searchParam.trim());
		}
	}, []);

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
		const base: readonly string[] = showAllTags
			? CANONICAL_TAGS
			: CANONICAL_TAGS.slice(0, INITIAL_VISIBLE_TAG_COUNT);
		const extraSelected = selectedTags.filter((t) => !base.includes(t));
		return [...base, ...extraSelected];
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
			const quoteMatch = m.quote?.toLowerCase().includes(query);
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
				quoteMatch ||
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
		// Smooth scroll up towards top of grid/table on page change
		const gridEl = document.getElementById("members-grid-top");
		gridEl?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	// Prevent row navigation when clicking directly on a social media icon
	const handleSocialClick = (e: MouseEvent) => {
		e.stopPropagation();
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
								className={`${styles.filter_pill} ${
									styles[`filter_pill__${m.theme}`]
								} ${isActive ? styles.filter_pill__active : ""}`}
							>
								{m.theme !== "all" && (
									<span
										className={`${styles.filter_pill_dot} ${
											styles[`filter_pill_dot__${m.theme}`]
										}`}
										aria-hidden="true"
									/>
								)}
								<span>{m.label}</span>
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

			{/* Status Bar with View Switcher */}
			<div className={styles.status_bar} id="members-grid-top">
				<span className={styles.status_text}>{statusSummary}</span>
				<div className={styles.status_meta}>
					<span className={styles.count_badge}>{filteredMembers.length}</span>

					{/* View Switcher Controls (Grid vs Column) */}
					<div className={styles.view_toggle_group}>
						<button
							type="button"
							onClick={() => setViewMode("grid")}
							aria-label="Switch to grid view"
							title="Grid view"
							aria-pressed={viewMode === "grid"}
							className={`${styles.view_toggle_btn} ${
								viewMode === "grid" ? styles.view_toggle_btn__active : ""
							}`}
						>
							<Grid2X2 width={18} height={18} />
						</button>
						<button
							type="button"
							onClick={() => setViewMode("column")}
							aria-label="Switch to column view"
							title="Column view"
							aria-pressed={viewMode === "column"}
							className={`${styles.view_toggle_btn} ${
								viewMode === "column" ? styles.view_toggle_btn__active : ""
							}`}
						>
							<LayoutList width={18} height={18} />
						</button>
					</div>
				</div>
			</div>

			{/* Member Results Presentation */}
			<section className={styles.grid_container}>
				{filteredMembers.length === 0 ? (
					<div className={styles.no_results}>
						<p>No members found matching your search.</p>
					</div>
				) : viewMode === "grid" ? (
					/* ── Grid View ── */
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
									<span
										className={`${styles.info_major} ${
											styles[`info_major__${member.majorTheme || "cs"}`]
										}`}
									>
										{member.majorCode}
									</span>
								</div>
							</a>
						))}
					</div>
				) : (
					/* ── Column / Table View ── */
					<div className={styles.table_container} id="members-table">
						{/* Table Column Header */}
						<div className={styles.table_header_row} aria-hidden="true">
							<span className={styles.col_member}>Member</span>
							<span className={styles.col_prodi}>Prodi</span>
							<span className={styles.col_interests}>Interests</span>
							<span className={styles.col_socials}>Social</span>
						</div>

						{/* Table Rows */}
						<div className={styles.table_body}>
							{paginatedMembers.map((member) => {
								const socials = member.socials;
								const hasAnySocial =
									socials &&
									(socials.instagram ||
										socials.linkedin ||
										socials.github ||
										socials.line);

								return (
									<a
										key={member.npm}
										href={`/members/${member.slug}`}
										className={styles.table_row}
									>
										{/* Member Identity: Avatar & Names */}
										<div className={styles.col_member}>
											<div className={styles.row_avatar_wrapper}>
												<img
													src={member.photoUrl}
													alt={member.name}
													className={styles.row_avatar}
													loading="lazy"
													decoding="async"
												/>
											</div>
											<div className={styles.row_names}>
												<span className={styles.row_display_name}>
													{member.nama_panggilan || member.name}
												</span>
												<span className={styles.row_full_name} title={member.name}>
													{member.name}
												</span>
											</div>
										</div>

										{/* Prodi Badge */}
										<div className={styles.col_prodi}>
											<span
												className={`${styles.prodi_pill} ${
													styles[`prodi_pill__${member.majorTheme || "cs"}`]
												}`}
											>
												{member.majorCode}
											</span>
										</div>

										{/* Interests / Normalized Tags */}
										<div className={styles.col_interests}>
											{member.tags.length > 0 ? (
												<div className={styles.row_tag_list}>
													{member.tags.slice(0, 3).map((tag) => (
														<span key={tag} className={styles.row_tag}>
															{tag}
														</span>
													))}
													{member.tags.length > 3 && (
														<span
															className={styles.row_tag_more}
															title={member.tags.slice(3).join(", ")}
														>
															+{member.tags.length - 3}
														</span>
													)}
												</div>
											) : (
												<span className={styles.row_tag_empty}>-</span>
											)}
										</div>

										{/* Social Media Links Column */}
										<div className={styles.col_socials}>
											{hasAnySocial ? (
												<div className={styles.row_socials}>
													{socials.instagram && (
														<a
															href={socials.instagram}
															target="_blank"
															rel="noopener noreferrer"
															onClick={handleSocialClick}
															className={styles.row_social_btn}
															aria-label="Instagram"
															title="Instagram"
														>
															<InstagramIcon size={16} />
														</a>
													)}
													{socials.linkedin && (
														<a
															href={socials.linkedin}
															target="_blank"
															rel="noopener noreferrer"
															onClick={handleSocialClick}
															className={styles.row_social_btn}
															aria-label="LinkedIn"
															title="LinkedIn"
														>
															<LinkedInIconSvg size={16} />
														</a>
													)}
													{socials.github && (
														<a
															href={socials.github}
															target="_blank"
															rel="noopener noreferrer"
															onClick={handleSocialClick}
															className={styles.row_social_btn}
															aria-label="GitHub"
															title="GitHub"
														>
															<GithubIcon size={16} />
														</a>
													)}
													{socials.line && (
														<a
															href={socials.line}
															target="_blank"
															rel="noopener noreferrer"
															onClick={handleSocialClick}
															className={styles.row_social_btn}
															aria-label="LINE"
															title="LINE"
														>
															<LineIcon size={16} />
														</a>
													)}
												</div>
											) : (
												<span className={styles.row_tag_empty}>-</span>
											)}
										</div>
									</a>
								);
							})}
						</div>
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