import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Grid2X2,
	Search,
} from "lucide-react";
import { type ChangeEvent, useMemo, useState } from "react";
import styles from "./MembersDirectory.module.css";

export interface DirectoryMember {
	npm: string;
	name: string;
	nama_panggilan: string;
	major: string;
	majorCode: string;
	niche: string;
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

export default function MembersDirectory({ members, pageSize = 40 }: Props) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMajor, setSelectedMajor] = useState("ALL");
	const [currentPage, setCurrentPage] = useState(1);

	// Filter members based on major category and search text
	const filteredMembers = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		return members.filter((m) => {
			const matchesMajor = selectedMajor === "ALL" || m.major === selectedMajor;
			if (!matchesMajor) return false;
			if (!query) return true;

			const nameMatch = m.name?.toLowerCase().includes(query);
			const nickMatch = m.nama_panggilan?.toLowerCase().includes(query);
			const nicheMatch = m.niche?.toLowerCase().includes(query);
			return nameMatch || nickMatch || nicheMatch;
		});
	}, [members, selectedMajor, searchQuery]);

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

	const goToPage = (page: number) => {
		const target = Math.max(1, Math.min(page, totalPages));
		setCurrentPage(target);
		// Smooth scroll up towards top of grid on page change
		if (typeof window !== "undefined") {
			const gridEl = document.getElementById("members-grid-top");
			if (gridEl) {
				gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}
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
						placeholder="Search by name, nickname, or niche..."
						className={styles.search_input}
						autoComplete="off"
					/>
				</div>

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
			</div>

			{/* Status Bar */}
			<div className={styles.status_bar} id="members-grid-top">
				<span className={styles.status_text}>
					{searchQuery
						? `Showing results for: "${searchQuery}"`
						: selectedMajor !== "ALL"
							? `Showing results for: ${selectedMajor}`
							: "Showing all members"}
				</span>
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
									className={`${styles.pagination_number_btn} ${isCurrent ? styles.pagination_number_btn__active : ""}`}
									aria-current={isCurrent ? "page" : undefined}
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
