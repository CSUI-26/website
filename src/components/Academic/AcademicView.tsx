import { type ReactNode, useEffect, useState } from "react";
import type { ProgramStudy } from "@/data/academic";
import { fetchPrograms } from "@/lib/api/academic";
import styles from "@/pages/academic/index.module.css";
import ProdiCurriculum from "./ProdiCurriculum";

export interface AcademicViewProps {
	initialPrograms: ProgramStudy[];
	children?: ReactNode;
}

export default function AcademicView({
	initialPrograms,
	children,
}: AcademicViewProps) {
	const [programs, setPrograms] = useState<ProgramStudy[]>(initialPrograms);
	const [selectedProdiId, setSelectedProdiId] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		void fetchPrograms({
			signal: controller.signal,
			fallbackData: initialPrograms,
		}).then((result) => {
			if (controller.signal.aborted) {
				return;
			}
			setPrograms(result.data);
		});

		return () => {
			controller.abort();
		};
	}, [initialPrograms]);

	useEffect(() => {
		const syncFromHash = () => {
			const hash = window.location.hash.replace(/^#/, "");
			if (hash && programs.some((p) => p.id === hash)) {
				setSelectedProdiId(hash);
			} else if (!hash) {
				setSelectedProdiId(null);
			}
		};

		syncFromHash();
		window.addEventListener("popstate", syncFromHash);
		return () => {
			window.removeEventListener("popstate", syncFromHash);
		};
	}, [programs]);

	function selectProdi(prodiId: string) {
		setSelectedProdiId(prodiId);
		window.scrollTo({ top: 0, behavior: "instant" });
		history.pushState(null, "", `#${prodiId}`);
	}

	function backToHero() {
		setSelectedProdiId(null);
		window.scrollTo({ top: 0, behavior: "instant" });
		history.pushState(null, "", window.location.pathname);
	}

	const activeProdi = selectedProdiId
		? (programs.find((p) => p.id === selectedProdiId) ?? null)
		: null;

	if (!activeProdi) {
		return (
			<section id="hero-view" className={styles.academic_hero}>
				<div className={styles.hero_content}>
					<h1 className={styles.title}>Pilih program studimu</h1>
					<div className={styles.title_accent} aria-hidden="true" />

					<nav className={styles.majors_nav} aria-label="Pilih Program Studi">
						<ul className={styles.majors_list}>
							{programs.map((major) => (
								<li key={major.id} className={styles.major_item}>
									<button
										type="button"
										className={styles.major_btn}
										onClick={() => selectProdi(major.id)}
									>
										{major.name}
									</button>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{children}
			</section>
		);
	}

	const otherProdis = programs.filter((p) => p.id !== activeProdi.id);

	return (
		<div id="prodi-view" className={styles.prodi_view_container}>
			<div className={styles.top_bar}>
				<button
					type="button"
					className={styles.back_btn}
					onClick={backToHero}
				>
					← Kembali ke Pilih Jurusan
				</button>
			</div>

			<article
				id={`prodi-${activeProdi.id}`}
				className={styles.prodi_section}
			>
				<ProdiCurriculum
					prodi={activeProdi}
					otherProdis={otherProdis}
					styles={styles}
					headingLevel="h2"
					onSelectOtherProdi={selectProdi}
				/>
			</article>
		</div>
	);
}
