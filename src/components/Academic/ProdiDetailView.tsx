import { useEffect, useState } from "react";
import type { ProgramStudy } from "@/data/academic";
import { fetchProgramById } from "@/lib/api/academic";
import styles from "@/pages/academic/prodi.module.css";
import ProdiCurriculum from "./ProdiCurriculum";

export interface ProdiDetailViewProps {
	prodiId: string;
	initialProdi: ProgramStudy;
	initialOtherProdis: ProgramStudy[];
}

export default function ProdiDetailView({
	prodiId,
	initialProdi,
	initialOtherProdis,
}: ProdiDetailViewProps) {
	const [prodi, setProdi] = useState<ProgramStudy>(initialProdi);

	useEffect(() => {
		const controller = new AbortController();

		void fetchProgramById(prodiId, {
			signal: controller.signal,
			fallbackData: initialProdi,
		}).then((result) => {
			if (controller.signal.aborted || !result.data) {
				return;
			}
			setProdi(result.data);
		});

		return () => {
			controller.abort();
		};
	}, [prodiId, initialProdi]);

	return (
		<div className={styles.page_wrapper}>
			<div className={styles.top_bar}>
				<a className={styles.back_link} href="/academic">
					← Kembali ke Pilih Jurusan
				</a>
			</div>

			<ProdiCurriculum
				prodi={prodi}
				otherProdis={initialOtherProdis}
				styles={styles}
				headingLevel="h1"
			/>
		</div>
	);
}
