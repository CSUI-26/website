import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Course, ProgramStudy } from "@/data/academic";
import extraStyles from "./ProdiCurriculum.module.css";

export type ProdiCurriculumStyles = Readonly<Record<string, string>>;

export interface ProdiCurriculumProps {
	prodi: ProgramStudy;
	otherProdis: ProgramStudy[];
	styles: ProdiCurriculumStyles;
	headingLevel?: "h1" | "h2";
	onSelectOtherProdi?: (prodiId: string) => void;
}

interface CourseIndexTarget {
	semesterIdx: number;
	courseKey: string;
}

function toUniqueKeyedItems(
	items: readonly string[],
): Array<{ value: string; keySuffix: string }> {
	const seen = new Map<string, number>();
	return items.map((value) => {
		const count = (seen.get(value) ?? 0) + 1;
		seen.set(value, count);
		return { value, keySuffix: `${value}-${count}` };
	});
}

function makeCourseKey(
	course: Course,
	semesterLabel: number | string,
	index: number,
): string {
	return String(
		course.id ?? `${String(semesterLabel)}-${course.code ?? course.name}-${index}`,
	);
}

function formatSemesterTabLabel(semester: number | string): string {
	return typeof semester === "number"
		? `SEMESTER ${semester}`
		: "MATKUL PILIHAN";
}

function formatSemesterBannerLabel(semester: number | string): string {
	return typeof semester === "number"
		? `Semester ${semester}`
		: "Mata Kuliah Pilihan";
}

function normalizeLookupName(value: string): string {
	return value.trim().toLowerCase();
}

export default function ProdiCurriculum({
	prodi,
	otherProdis,
	styles,
	headingLevel = "h2",
	onSelectOtherProdi,
}: ProdiCurriculumProps) {
	const [activeSemesterIdx, setActiveSemesterIdx] = useState(0);
	const [selectedTrack, setSelectedTrack] = useState("ALL");
	const [searchQuery, setSearchQuery] = useState("");
	const [openCourses, setOpenCourses] = useState<Record<string, boolean>>({});
	const [highlightedCourseKey, setHighlightedCourseKey] = useState<
		string | null
	>(null);
	const [pendingScrollKey, setPendingScrollKey] = useState<string | null>(null);
	const courseRefs = useRef<Map<string, HTMLDetailsElement>>(new Map());

	// Reset local view state when switching to a different program.
	// biome-ignore lint/correctness/useExhaustiveDependencies: reset intentionally on prodi.id change
	useEffect(() => {
		setActiveSemesterIdx(0);
		setSelectedTrack("ALL");
		setSearchQuery("");
		setOpenCourses({});
		setHighlightedCourseKey(null);
		setPendingScrollKey(null);
	}, [prodi.id]);

	useEffect(() => {
		if (!pendingScrollKey) return;
		const targetEl = courseRefs.current.get(pendingScrollKey);
		if (targetEl) {
			targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
		}
		setPendingScrollKey(null);
	}, [pendingScrollKey]);

	useEffect(() => {
		if (!highlightedCourseKey) return;
		const timerId = window.setTimeout(() => {
			setHighlightedCourseKey(null);
		}, 1800);
		return () => {
			window.clearTimeout(timerId);
		};
	}, [highlightedCourseKey]);

	const safeActiveIdx =
		prodi.semesters.length > 0 && activeSemesterIdx < prodi.semesters.length
			? activeSemesterIdx
			: 0;

	const courseIndex = useMemo(() => {
		const index = new Map<string, CourseIndexTarget>();
		prodi.semesters.forEach((sem, semesterIdx) => {
			sem.courses.forEach((course, cIdx) => {
				const courseKey = makeCourseKey(course, sem.semester, cIdx);
				const nameKey = normalizeLookupName(course.name);
				if (nameKey && !index.has(nameKey)) {
					index.set(nameKey, { semesterIdx, courseKey });
				}
				if (course.code) {
					const codeKey = normalizeLookupName(course.code);
					if (codeKey && !index.has(codeKey)) {
						index.set(codeKey, { semesterIdx, courseKey });
					}
				}
			});
		});
		return index;
	}, [prodi.semesters]);

	function handleSelectSemester(nextIdx: number) {
		setActiveSemesterIdx(nextIdx);
		setSelectedTrack("ALL");
	}

	function jumpToCourse(targetName: string) {
		const target = courseIndex.get(normalizeLookupName(targetName));
		if (!target) return;

		setSearchQuery("");
		setSelectedTrack("ALL");
		setActiveSemesterIdx(target.semesterIdx);
		setOpenCourses((prev) => ({ ...prev, [target.courseKey]: true }));
		setHighlightedCourseKey(target.courseKey);
		setPendingScrollKey(target.courseKey);
	}

	const trimmedQuery = searchQuery.trim().toLowerCase();
	const isFiltering = trimmedQuery.length > 0;

	const filteredSemesterGroups = useMemo(() => {
		if (!isFiltering) return [];

		return prodi.semesters
			.map((sem) => {
				const matched = sem.courses
					.map((course, cIdx) => ({
						course,
						courseKey: makeCourseKey(course, sem.semester, cIdx),
					}))
					.filter(({ course }) => {
						const haystack = [
							course.name,
							course.code ?? "",
							course.category ?? "",
							course.track ?? "",
						]
							.join(" ")
							.toLowerCase();
						return haystack.includes(trimmedQuery);
					});

				return {
					semester: sem.semester,
					items: matched,
				};
			})
			.filter((group) => group.items.length > 0);
	}, [isFiltering, prodi.semesters, trimmedQuery]);

	const totalFilteredCount = filteredSemesterGroups.reduce(
		(acc, group) => acc + group.items.length,
		0,
	);

	function renderRelationChips(
		items: readonly string[],
		keyPrefix: string,
	) {
		return (
			<div className={extraStyles.relation_chips}>
				{toUniqueKeyedItems(items).map(({ value, keySuffix }) => {
					const target = courseIndex.get(normalizeLookupName(value));
					if (target) {
						return (
							<button
								key={`${keyPrefix}-${keySuffix}`}
								type="button"
								className={extraStyles.relation_chip_btn}
								onClick={() => jumpToCourse(value)}
							>
								<span>{value}</span>
								<span aria-hidden="true">→</span>
							</button>
						);
					}
					return (
						<span
							key={`${keyPrefix}-${keySuffix}`}
							className={extraStyles.relation_chip_static}
						>
							{value}
						</span>
					);
				})}
			</div>
		);
	}

	function renderCourseCard(
		course: Course,
		courseKey: string,
		cardIdx: number,
	) {
		const isRed = cardIdx % 2 === 1;
		const themeClass = isRed ? styles.course_card_red : styles.course_card_blue;
		const isHighlighted = highlightedCourseKey === courseKey;
		const isOpen = Boolean(openCourses[courseKey]);
		const hasMeta = Boolean(course.code || course.category || course.track);

		return (
			<details
				key={courseKey}
				ref={(el) => {
					if (el) {
						courseRefs.current.set(courseKey, el);
					} else {
						courseRefs.current.delete(courseKey);
					}
				}}
				open={isOpen}
				onToggle={(event) => {
					const nextOpen = event.currentTarget.open;
					setOpenCourses((prev) => {
						if (Boolean(prev[courseKey]) === nextOpen) {
							return prev;
						}
						return { ...prev, [courseKey]: nextOpen };
					});
				}}
				className={`${styles.course_card ?? ""} ${themeClass ?? ""} ${isHighlighted ? (extraStyles.course_card_highlight ?? "") : ""}`}
			>
				<summary className={styles.course_summary}>
					<span className={styles.course_title}>{course.name}</span>
					<div className={styles.course_badge_group}>
						<span className={styles.sks_badge}>{course.sks} SKS</span>
						<span className={styles.expand_icon} aria-hidden="true">
							▾
						</span>
					</div>
				</summary>

				<div className={styles.course_details}>
					{hasMeta && (
						<div className={extraStyles.course_meta_row}>
							{course.code && (
								<span className={extraStyles.course_code_badge}>
									{course.code}
								</span>
							)}
							{course.category && (
								<span className={extraStyles.course_category_badge}>
									{course.category}
								</span>
							)}
							{course.track && (
								<span className={extraStyles.course_track_badge}>
									{course.track}
								</span>
							)}
						</div>
					)}

					{course.description && (
						<p className={styles.course_description}>{course.description}</p>
					)}

					{((course.prerequisites && course.prerequisites.length > 0) ||
						(course.unlocks && course.unlocks.length > 0)) && (
						<div className={extraStyles.relations_grid}>
							{course.prerequisites && course.prerequisites.length > 0 && (
								<div className={styles.prerequisites_box}>
									<span className={styles.prerequisites_label}>Prasyarat:</span>
									{renderRelationChips(
										course.prerequisites,
										`${courseKey}-pre`,
									)}
								</div>
							)}

							{course.unlocks && course.unlocks.length > 0 && (
								<div className={styles.prerequisites_box}>
									<span className={styles.prerequisites_label}>
										Membuka mata kuliah:
									</span>
									{renderRelationChips(course.unlocks, `${courseKey}-unlock`)}
								</div>
							)}
						</div>
					)}

					{/* SCeLE button removed
					<div className={styles.course_footer}>
						<a
							className={styles.material_btn}
							href="https://scele.cs.ui.ac.id/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Buka SCeLE Fasilkom ↗
						</a>
					</div>
					*/}
				</div>
			</details>
		);
	}

	const HeadingTag = headingLevel;

	return (
		<>
			<header className={styles.prodi_header}>
				<HeadingTag className={styles.prodi_title}>{prodi.name}</HeadingTag>

				<div className={styles.career_tags}>
					{toUniqueKeyedItems(prodi.careers).map(({ value, keySuffix }) => (
						<span
							key={`${prodi.id}-career-${keySuffix}`}
							className={styles.career_tag}
						>
							{value}
						</span>
					))}
				</div>

				<p className={styles.prodi_description}>{prodi.description}</p>

				<div className={styles.prodi_links}>
					{/* SCeLE button removed
					<a
						className={styles.action_btn}
						href="https://scele.cs.ui.ac.id/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Buka SCeLE Fasilkom ↗
					</a>
					*/}
					<a
						className={styles.action_btn}
						href="https://ristek.link/the-npc-guide-to-pacil"
						target="_blank"
						rel="noopener noreferrer"
					>
						Buka The NPC Guide to Pacil ↗
					</a>
				</div>
			</header>

			<section
				className={styles.curriculum_section}
				aria-label="Materi yang Dipelajari"
			>
				<h2 className={styles.curriculum_title}>MATERI YANG DIPELAJARI</h2>

				{!isFiltering && (
					<div className={styles.semester_tabs} role="tablist">
						{prodi.semesters.map((sem, sIdx) => {
							const isActive = sIdx === safeActiveIdx;
							return (
								<button
									key={`${prodi.id}-tab-${String(sem.semester)}`}
									type="button"
									role="tab"
									className={`${styles.semester_tab ?? ""} ${isActive ? (styles.semester_tab_active ?? "") : ""}`}
									data-active={isActive ? "true" : undefined}
									aria-selected={isActive}
									onClick={() => handleSelectSemester(sIdx)}
								>
									{formatSemesterTabLabel(sem.semester)}
								</button>
							);
						})}
					</div>
				)}

				{prodi.semesters.length > 0 && (
					<div className={extraStyles.filter_bar}>
						<div className={extraStyles.search_input_wrap}>
							<Search
								size={16}
								className={extraStyles.search_icon}
								aria-hidden="true"
							/>
							<input
								type="search"
								className={extraStyles.search_input}
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder="Cari mata kuliah, kode, kategori, atau peminatan..."
								aria-label="Cari mata kuliah"
							/>
							{searchQuery && (
								<button
									type="button"
									className={extraStyles.search_clear_btn}
									onClick={() => setSearchQuery("")}
									aria-label="Hapus pencarian"
								>
									<X size={14} aria-hidden="true" />
								</button>
							)}
						</div>
					</div>
				)}

				<div className={styles.curriculum_frame}>
					{isFiltering ? (
						<>
							<div className={extraStyles.search_results_bar}>
								<p className={extraStyles.search_results_count}>
									Menampilkan {totalFilteredCount} mata kuliah
								</p>
								<button
									type="button"
									className={extraStyles.reset_filter_btn}
									onClick={() => {
										setSearchQuery("");
									}}
								>
									Reset Filter
								</button>
							</div>

							{filteredSemesterGroups.length === 0 ? (
								<div className={extraStyles.empty_filter_state}>
									<p className={extraStyles.empty_filter_text}>
										Tidak ada mata kuliah yang cocok dengan filter saat ini.
									</p>
								</div>
							) : (
								<div className={extraStyles.search_results_groups}>
									{filteredSemesterGroups.map((group) => (
										<div
											key={`${prodi.id}-filtered-${String(group.semester)}`}
											className={extraStyles.search_semester_group}
										>
											<h3 className={extraStyles.search_semester_heading}>
												{formatSemesterBannerLabel(group.semester)}
											</h3>
											<div className={styles.course_list}>
												{group.items.map(({ course, courseKey }, cIdx) =>
													renderCourseCard(course, courseKey, cIdx),
												)}
											</div>
										</div>
									))}
								</div>
							)}
						</>
					) : (
						prodi.semesters.map((sem, sIdx) => {
							const isActive = sIdx === safeActiveIdx;
							const trackCounts = new Map<string, number>();
							for (const c of sem.courses) {
								if (c.track) {
									trackCounts.set(c.track, (trackCounts.get(c.track) ?? 0) + 1);
								}
							}
							const trackEntries = [...trackCounts.entries()];
							const activeTrack =
								isActive &&
								selectedTrack !== "ALL" &&
								trackCounts.has(selectedTrack)
									? selectedTrack
									: "ALL";

							const visibleEntries = sem.courses
								.map((course, cIdx) => ({
									course,
									courseKey: makeCourseKey(course, sem.semester, cIdx),
								}))
								.filter(
									({ course }) =>
										activeTrack === "ALL" || course.track === activeTrack,
								);

							const visibleSks = visibleEntries.reduce(
								(sum, { course }) => sum + course.sks,
								0,
							);
							const metaText =
								activeTrack === "ALL"
									? `${sem.courses.length} Mata Kuliah • ${visibleSks} SKS`
									: `${visibleEntries.length} dari ${sem.courses.length} Mata Kuliah • ${visibleSks} SKS`;

							return (
								<div
									key={`${prodi.id}-panel-${String(sem.semester)}`}
									className={`${styles.semester_panel ?? ""} ${isActive ? (styles.semester_panel_active ?? "") : ""}`}
									role="tabpanel"
									hidden={!isActive}
								>
									<div className={styles.semester_banner}>
										<div className={extraStyles.semester_banner_stack}>
											<h3 className={styles.semester_banner_title}>
												{formatSemesterBannerLabel(sem.semester)}
											</h3>
											<p className={extraStyles.semester_banner_meta}>
												{metaText}
											</p>
										</div>
									</div>

									{trackEntries.length > 0 && (
										<fieldset
											className={extraStyles.track_filters}
											aria-label="Filter peminatan mata kuliah"
										>
											<button
												type="button"
												className={`${extraStyles.track_chip ?? ""} ${activeTrack === "ALL" ? (extraStyles.track_chip_active ?? "") : ""}`}
												onClick={() => setSelectedTrack("ALL")}
												aria-pressed={activeTrack === "ALL"}
											>
												Semua ({sem.courses.length})
											</button>
											{trackEntries.map(([trackName, count]) => {
												const isTrackActive = activeTrack === trackName;
												return (
													<button
														key={`${prodi.id}-${String(sem.semester)}-track-${trackName}`}
														type="button"
														className={`${extraStyles.track_chip ?? ""} ${isTrackActive ? (extraStyles.track_chip_active ?? "") : ""}`}
														onClick={() => setSelectedTrack(trackName)}
														aria-pressed={isTrackActive}
													>
														{trackName} ({count})
													</button>
												);
											})}
										</fieldset>
									)}

									<div className={styles.course_list}>
										{visibleEntries.map(({ course, courseKey }, cIdx) =>
											renderCourseCard(course, courseKey, cIdx),
										)}
									</div>
								</div>
							);
						})
					)}
				</div>
			</section>

			{otherProdis.length > 0 && (
				<nav className={styles.other_majors} aria-label="Lihat Jurusan Lain">
					<span className={styles.other_majors_label}>Lihat Jurusan Lain:</span>
					<div className={styles.other_majors_list}>
						{otherProdis.map((other) =>
							onSelectOtherProdi ? (
								<button
									key={other.id}
									type="button"
									className={styles.other_major_btn}
									onClick={() => onSelectOtherProdi(other.id)}
								>
									{other.name} →
								</button>
							) : (
								<a
									key={other.id}
									className={styles.other_major_btn}
									href={other.slug}
								>
									{other.name} →
								</a>
							),
						)}
					</div>
				</nav>
			)}
		</>
	);
}
