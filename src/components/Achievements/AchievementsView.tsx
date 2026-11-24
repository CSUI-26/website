import { ArrowRight, Trophy } from "lucide-react";
import { type KeyboardEvent, useEffect, useState } from "react";
import {
	fetchGroupedAchievements,
	type GroupedAchievements,
	hasAnyAchievements,
} from "@/api/achievements";
import pageStyles from "@/pages/achievements/index.module.css";
import latestStyles from "./LatestAchievements.module.css";
import yearlyStyles from "./YearlyAchievements.module.css";

export interface AchievementsViewProps {
	initialData: GroupedAchievements;
	galleryHref: string;
}

const SKELETON_CARD_KEYS = [
	"sk-1",
	"sk-2",
	"sk-3",
	"sk-4",
	"sk-5",
] as const;

export default function AchievementsView({
	initialData,
	galleryHref,
}: AchievementsViewProps) {
	const [data, setData] = useState<GroupedAchievements>(initialData);
	const [status, setStatus] = useState<"loading" | "ready">(
		hasAnyAchievements(initialData) ? "ready" : "loading",
	);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

	useEffect(() => {
		const controller = new AbortController();

		void fetchGroupedAchievements({
			signal: controller.signal,
			fallbackData: initialData,
		}).then((result) => {
			if (controller.signal.aborted) {
				return;
			}
			setData(result.data);
			setCurrentIndex(0);
			setBrokenImages({});
			setStatus("ready");
		});

		return () => {
			controller.abort();
		};
	}, [initialData]);

	if (status === "loading") {
		return (
			<div
				className={pageStyles.skeleton_region}
				role="status"
				aria-busy="true"
				data-achievements-skeleton
			>
				<span className={pageStyles.sr_only}>Memuat data prestasi...</span>
				<div className={pageStyles.skeleton_title} aria-hidden="true" />
				<div className={pageStyles.skeleton_subtitle} aria-hidden="true" />
				<div className={pageStyles.skeleton_bar} aria-hidden="true" />
				<div className={pageStyles.skeleton_details} aria-hidden="true">
					<div className={pageStyles.skeleton_stack}>
						<div
							className={`${pageStyles.skeleton_line} ${pageStyles.skeleton_line_short}`}
						/>
						<div className={pageStyles.skeleton_line} />
						<div className={pageStyles.skeleton_line} />
					</div>
					<div className={pageStyles.skeleton_stack}>
						<div className={pageStyles.skeleton_line} />
						<div className={pageStyles.skeleton_line} />
						<div
							className={`${pageStyles.skeleton_line} ${pageStyles.skeleton_line_short}`}
						/>
					</div>
				</div>
				<div className={pageStyles.skeleton_grid} aria-hidden="true">
					{SKELETON_CARD_KEYS.map((key) => (
						<div key={key} className={pageStyles.skeleton_card} />
					))}
				</div>
			</div>
		);
	}

	const { latestAchievements } = data;
	const yearGroups = data.yearlyAchievementsByYear.filter(
		({ items }) => items.length > 0,
	);
	const hasAchievements =
		latestAchievements.length > 0 || yearGroups.length > 0;

	if (!hasAchievements) {
		return (
			<section className={pageStyles.empty_state} aria-labelledby="prestasi-title">
				<div className={pageStyles.trophy} aria-hidden="true">
					<Trophy size={40} strokeWidth={1.5} focusable="false" />
				</div>
				<p className={pageStyles.eyebrow}>CSUI 2026</p>
				<h1 className={pageStyles.page_title} id="prestasi-title">
					Prestasi
				</h1>
				<p className={pageStyles.empty_title}>
					Belum ada prestasi yang ditampilkan.
				</p>
				<a className={pageStyles.gallery_link} href={galleryHref}>
					Lihat Galeri{" "}
					<ArrowRight size={18} aria-hidden="true" focusable="false" />
				</a>
			</section>
		);
	}

	const totalSlides = latestAchievements.length;
	const activeIndex =
		totalSlides > 0 ? ((currentIndex % totalSlides) + totalSlides) % totalSlides : 0;
	const activeItem = latestAchievements[activeIndex];

	function goToSlide(nextIndex: number) {
		if (totalSlides <= 1) return;
		setCurrentIndex(((nextIndex % totalSlides) + totalSlides) % totalSlides);
	}

	function handleCarouselKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (totalSlides <= 1) return;
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			goToSlide(activeIndex - 1);
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			goToSlide(activeIndex + 1);
		}
	}

	return (
		<>
			<h1 className={pageStyles.page_title}>Prestasi</h1>
			<p className={pageStyles.empty_description}>
				Lihat hasil lomba dan karya mahasiswa Zenith.
			</p>

			{totalSlides > 0 && activeItem && (
				<section
					className={latestStyles.latest_section}
					aria-label="Prestasi terbaru"
					onKeyDown={handleCarouselKeyDown}
				>
					<h2 className={latestStyles.heading}>PRESTASI TERBARU</h2>

					<div className={latestStyles.carousel_bar}>
						{totalSlides > 1 && (
							<button
								type="button"
								className={`${latestStyles.nav_button} ${latestStyles.prev_btn}`}
								onClick={() => goToSlide(activeIndex - 1)}
								aria-label="Prestasi sebelumnya"
							>
								<svg
									className={latestStyles.nav_icon}
									viewBox="0 0 24 24"
									aria-hidden="true"
									focusable="false"
								>
									<path d="M16 4L6 12L16 20Z" />
								</svg>
							</button>
						)}

						<div className={latestStyles.cards_viewport}>
							{latestAchievements.map((item, idx) => {
								const isActive = idx === activeIndex;
								const showFallback =
									item.image.length === 0 || Boolean(brokenImages[item.id]);

								return (
									<article
										key={item.id}
										className={latestStyles.slide_card}
										data-active={isActive ? "true" : undefined}
										aria-roledescription="salindia"
										aria-label={`${item.title} - ${item.award}`}
										aria-hidden={!isActive}
									>
										{showFallback ? (
											<div
												className={latestStyles.card_image_fallback}
												aria-hidden="true"
											/>
										) : (
											<img
												src={item.image}
												alt={item.title}
												className={latestStyles.card_image}
												loading={idx === 0 ? "eager" : "lazy"}
												{...(idx === 0 ? { fetchPriority: "high" as const } : {})}
												onError={() =>
													setBrokenImages((prev) => ({
														...prev,
														[item.id]: true,
													}))
												}
											/>
										)}
										<div className={latestStyles.card_overlay}>
											<span className={latestStyles.card_award}>
												{item.award}
											</span>
											<span className={latestStyles.card_title}>
												{item.title}
											</span>
										</div>
									</article>
								);
							})}
						</div>

						{totalSlides > 1 && (
							<button
								type="button"
								className={`${latestStyles.nav_button} ${latestStyles.next_btn}`}
								onClick={() => goToSlide(activeIndex + 1)}
								aria-label="Prestasi berikutnya"
							>
								<svg
									className={latestStyles.nav_icon}
									viewBox="0 0 24 24"
									aria-hidden="true"
									focusable="false"
								>
									<path d="M8 4L18 12L8 20Z" />
								</svg>
							</button>
						)}
					</div>

					<div className={latestStyles.details_row}>
						<div className={latestStyles.team_col}>
							<h2 className={latestStyles.team_name}>{activeItem.teamName}</h2>
							<ol className={latestStyles.member_list}>
								{(() => {
									const seen = new Map<string, number>();
									return activeItem.members.map((member) => {
										const count = (seen.get(member) ?? 0) + 1;
										seen.set(member, count);
										return (
											<li
												key={`${activeItem.id}-${member}-${count}`}
												className={latestStyles.member_item}
											>
												{member}
											</li>
										);
									});
								})()}
							</ol>
						</div>

						<div className={latestStyles.desc_col}>
							<p className={latestStyles.description_text}>
								{activeItem.description}
							</p>
						</div>
					</div>
				</section>
			)}

			{yearGroups.length > 0 && (
				<section className={yearlyStyles.yearly_section} aria-label="Arsip prestasi">
					<h2 className={yearlyStyles.heading}>ARSIP PRESTASI</h2>

					{yearGroups.map((group) => (
						<div key={group.year} className={yearlyStyles.year_group}>
							<h3 className={yearlyStyles.year_label}>{group.year}</h3>

							<div className={yearlyStyles.cards_grid}>
								{group.items.map((item) => (
									<article
										key={item.id}
										className={yearlyStyles.card}
										aria-label={`${item.title} - ${group.year}`}
									>
										<div className={yearlyStyles.card_placeholder}>
											<svg
												className={yearlyStyles.card_icon}
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="1.75"
												strokeLinecap="round"
												strokeLinejoin="round"
												aria-hidden="true"
												focusable="false"
											>
												<circle cx="12" cy="8" r="6" />
												<path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
											</svg>
										</div>
										<p className={yearlyStyles.card_title}>{item.title}</p>
									</article>
								))}
							</div>
						</div>
					))}
				</section>
			)}
		</>
	);
}
