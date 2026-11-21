/**
 * Data kurikulum program studi Fasilkom UI
 * Sumber: https://course.csui.dev
 */

export interface Course {
	name: string;
	code?: string;
	sks: number;
	description?: string;
	prerequisites?: string[];
	materialUrl?: string;
}

export interface Semester {
	semester: number | string;
	courses: Course[];
}

export interface ProgramStudy {
	id: string;
	name: string;
	slug: string;
	description: string;
	careers: string[];
	semesters: Semester[];
	courseMapUrl: string;
	driveUrl: string;
}

export const programStudies: ProgramStudy[] = [
	{
		id: "ilmu-komputer",
		name: "Ilmu Komputer",
		slug: "/academic/ilmu-komputer",
		description:
			"Program studi Ilmu Komputer (IK) merupakan program reguler dengan 32 mata kuliah wajib dalam 8 semester, ditambah berbagai mata kuliah pilihan. Lulusan Ilmu Komputer memiliki bekal kuat dalam bidang rekayasa perangkat lunak, infrastruktur komputasi, algoritma tingkat lanjut, serta riset teknologi.",
		careers: [
			"SOFTWARE ENGINEER",
			"CYBER SECURITY",
			"DATA SCIENTIST",
			"GAME DEVELOPER",
		],
		courseMapUrl: "https://course.csui.dev/?prodi=CS",
		driveUrl: "https://course.csui.dev/?prodi=CS",
		semesters: [
			{
				semester: 1,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 1 (DDP 1)",
						code: "DDP 1",
						sks: 4,
						description:
							"Mempelajari logika pemrograman prosedural, struktur kontrol, fungsi, rekursi, dan algoritma dasar menggunakan Python.",
						prerequisites: [
							"Dasar-Dasar Pemrograman 2",
							"Struktur Data & Algoritma",
						],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Matematika Diskret 1 (MD 1)",
						code: "MD 1",
						sks: 3,
						description:
							"Membahas logika proposisional, teori himpunan, relasi, fungsi, pembuktian matematis, induksi, dan kombinatorika dasar.",
						prerequisites: ["Matematika Diskret 2", "Teori Bahasa & Automata"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Pengantar Sistem Digital (PSD)",
						code: "PSD",
						sks: 4,
						description:
							"Konsep representasi data biner, aljabar Boolean, rangkaian logika kombinasional dan sekuensial, serta dasar arsitektur CPU.",
						prerequisites: ["Pengantar Organisasi Komputer"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Kalkulus 1",
						code: "Kalkulus 1",
						sks: 3,
						description:
							"Membahas limit fungsi, turunan diferensial, integral Riemann dasar, dan penerapannya dalam permasalahan komputasi.",
						prerequisites: ["Kalkulus 2"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "MPK Agama",
						code: "MPK Agama",
						sks: 2,
						description:
							"Mata kuliah pengembangan kepribadian nilai-nilai ketuhanan, etika beragama, dan toleransi kemasyarakatan.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "MPK Bahasa Inggris",
						code: "MPK B.Inggris",
						sks: 2,
						description:
							"Peningkatan keterampilan komunikasi akademis berbahasa Inggris lisan dan tulisan, technical writing, dan presentasi.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
				],
			},
			{
				semester: 2,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 2 (DDP 2)",
						code: "DDP 2",
						sks: 4,
						description:
							"Pemrograman berorientasi objek (OOP) menggunakan Java: enkapsulasi, pewarisan, polimorfisme, exception handling, dan GUI dasar.",
						prerequisites: [
							"Pemrograman Berorientasi Objek",
							"Pemrograman Berbasis Platform",
						],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Matematika Diskret 2 (MD 2)",
						code: "MD 2",
						sks: 3,
						description:
							"Membahas teori graf, pohon (tree), relasi rekurens, dan teori bilangan komputasi dasar.",
						prerequisites: [
							"Desain & Analisis Algoritma",
							"Kriptografi dan Keamanan Informasi",
						],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Pengantar Organisasi Komputer (POK)",
						code: "POK",
						sks: 3,
						description:
							"Organisasi prosesor, memori hierarki, instruksi bahasa assembly, pipelining, dan antarmuka I/O.",
						prerequisites: ["Sistem Operasi", "Jaringan Komputer"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Aljabar Linear",
						code: "Alin",
						sks: 3,
						description:
							"Sistem persamaan linear, matriks, determinan, ruang vektor, nilai dan vektor eigen, serta transformasi linear.",
						prerequisites: [
							"Grafika & Komputasi Visual",
							"Kecerdasan Artifisial",
						],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Kalkulus 2",
						code: "Kalkulus 2",
						sks: 3,
						description:
							"Teknik integrasi lanjut, fungsi peubah banyak, integral lipat, dan barisan serta deret tak hingga.",
						prerequisites: ["Statistika dan Probabilitas"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "MPK Bahasa Indonesia",
						code: "MPK B.Indo",
						sks: 3,
						description:
							"Penulisan karya tulis ilmiah, sintaksis bahasa Indonesia baku, dan metodologi sitasi akademis.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
				],
			},
			{
				semester: 3,
				courses: [
					{
						name: "Struktur Data & Algoritma (SDA)",
						code: "SDA",
						sks: 4,
						description:
							"Implementasi struktur data: linked list, stack, queue, binary search tree, AVL tree, heap, graph, dan analisis kompleksitas Big-O.",
						prerequisites: ["Desain & Analisis Algoritma"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Sistem Operasi (OS)",
						code: "OS",
						sks: 4,
						description:
							"Konsep proses, thread, sinkronisasi, deadlock, manajemen memori virtual, dan file system.",
						prerequisites: ["Jaringan Komputer"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Basis Data (Basdat)",
						code: "Basdat",
						sks: 4,
						description:
							"Pemodelan ER diagram, perancangan relasional, normalisasi data, SQL querying, indexing, dan transaksi ACID.",
						prerequisites: [
							"Pemrograman Berbasis Platform",
							"Proyek Perangkat Lunak",
						],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Statistika dan Probabilitas (Statprob)",
						code: "Statprob",
						sks: 3,
						description:
							"Distribusi probabilitas diskret dan kontinu, estimasi parameter, uji hipotesis, dan analisis regresi.",
						prerequisites: ["Kecerdasan Artifisial", "Data Science"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Teori Bahasa & Automata (TBA)",
						code: "TBA",
						sks: 3,
						description:
							"Finite automata, regular expression, context-free grammar, pushdown automata, dan mesin Turing.",
						prerequisites: ["Desain Kompiler"],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
				],
			},
			{
				semester: 4,
				courses: [
					{
						name: "Teori Bahasa & Automata",
						code: "TBA",
						sks: 3,
						description:
							"Mempelajari finite automata, regular grammar, context-free languages, pushdown automata, dan mesin Turing.",
						prerequisites: ["Matematika Diskret 1"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Pemrograman Lanjut",
						code: "Pemlan",
						sks: 4,
						description:
							"Pengembangan perangkat lunak tingkat lanjut: design pattern, clean code, arsitektur multi-tier, concurrency, dan unit testing.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Pengantar Keamanan Perangkat Lunak",
						code: "PKPL",
						sks: 3,
						description:
							"Prinsip keamanan kode, secure coding lifecycle, vulnerability analysis, dan mitigasi eksploitasi software.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Sistem Interaksi",
						code: "Sisinter",
						sks: 3,
						description:
							"Prinsip interaksi manusia dan komputer, user experience (UX), usability testing, dan perancangan antarmuka pengguna.",
						prerequisites: [],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Basis Data",
						code: "Basdat",
						sks: 4,
						description:
							"Pemodelan data relasional, normalisasi, SQL tingkat lanjut, indexing, query optimization, dan manajemen transaksi.",
						prerequisites: ["Struktur Data & Algoritma"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
				],
			},
			{
				semester: 5,
				courses: [
					{
						name: "Analisis Numerik",
						code: "Anum",
						sks: 3,
						description:
							"Solusi numerik persamaan non-linear, interpolasi, diferensiasi dan integrasi numerik, serta pemodelan galat.",
						prerequisites: ["Kalkulus 2", "Aljabar Linear"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Jaringan Komputer",
						code: "Jarkom",
						sks: 4,
						description:
							"Arsitektur protokol jaringan OSI dan TCP/IP, routing, switching, socket programming, dan keamanan transmisi data.",
						prerequisites: ["Sistem Operasi"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Kecerdasan Artifisial dan Sains Data Dasar",
						code: "KASDD",
						sks: 3,
						description:
							"Konsep dasar machine learning, algoritma pencarian heuristik, data preprocessing, clustering, dan klasifikasi.",
						prerequisites: ["Aljabar Linear", "Statistika dan Probabilitas"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Rekayasa Perangkat Lunak",
						code: "RPL",
						sks: 4,
						description:
							"Metodologi Scrum/Agile, analisis kebutuhan sistem, perancangan arsitektur perangkat lunak, dan continuous integration.",
						prerequisites: ["Pemrograman Lanjut"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Desain dan Analisis Algoritma",
						code: "DAA",
						sks: 3,
						description:
							"Paradigma algoritma Greedy, Divide & Conquer, Dynamic Programming, Graph Algorithms, dan analisis kompleksitas Big-O.",
						prerequisites: [
							"Struktur Data & Algoritma",
							"Matematika Diskret 2",
						],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
				],
			},
			{
				semester: 6,
				courses: [
					{
						name: "Metodologi Penelitian dan Penulisan Ilmiah",
						code: "MPPI",
						sks: 3,
						description:
							"Metodologi riset bidang ilmu komputer, telaah literatur ilmiah, perumusan hipotesis, dan etika publikasi akademik.",
						prerequisites: [],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Proyek Perangkat Lunak",
						code: "PPL",
						sks: 6,
						description:
							"Pengembangan produk perangkat lunak riil skala industri bersama klien nyata dengan metodologi Scrum terapan.",
						prerequisites: ["Rekayasa Perangkat Lunak", "Basis Data"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
				],
			},
			{
				semester: 7,
				courses: [
					{
						name: "Kerja Praktik",
						code: "KP",
						sks: 3,
						description:
							"Penerapan ilmu komputer dan teknologi informasi secara profesional di industri teknologi atau institusi riset mitra.",
						prerequisites: ["Proyek Perangkat Lunak"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Komputer & Masyarakat",
						code: "Komas",
						sks: 3,
						description:
							"Kajian dampak sosial teknologi informasi, etika profesi komputasi, hukum siber, privasi data, dan hak kekayaan intelektual.",
						prerequisites: [],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
				],
			},
			{
				semester: 8,
				courses: [
					{
						name: "Tugas Akhir Proyek Kelompok",
						code: "TAPK",
						sks: 6,
						description:
							"Penyusunan proyek kapstone tugas akhir secara kolaboratif memecahkan permasalahan nyata berskala besar.",
						prerequisites: ["Proyek Perangkat Lunak"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
					{
						name: "Tugas Akhir Individu",
						code: "TAI",
						sks: 4,
						description:
							"Penulisan karya ilmiah riset mandiri dan sidang skripsi sarjana di bawah bimbingan dosen pembimbing.",
						prerequisites: ["Metodologi Penelitian dan Penulisan Ilmiah"],
						materialUrl: "https://scele.cs.ui.ac.id/",
					},
				],
			},
			{
				semester: "Pilihan",
				courses: [
					{
						name: "Pemrograman Fungsional",
						code: "PF",
						sks: 3,
						description:
							"Paradigma pemrograman deklaratif dan fungsional menggunakan Haskell atau Scala: immutability, higher-order functions, monad.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Cloud Computing & DevOps",
						code: "Cloud",
						sks: 3,
						description:
							"Arsitektur cloud AWS/GCP, kontainerisasi Docker, orkestrasi Kubernetes, dan implementasi infrastruktur CI/CD.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Data Mining & Business Intelligence",
						code: "Datmin",
						sks: 3,
						description:
							"Teknik ekstraksi pola dari big data: clustering, association rule mining, klasifikasi, dan visualisasi interaktif.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Pemrograman Kompetitif (CP)",
						code: "CP",
						sks: 3,
						description:
							"Penyelesaian problem algoritmik kompleks dengan batas waktu dan memori ketat ala ICPC.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
					{
						name: "Pengembangan Game (Game Dev)",
						code: "GameDev",
						sks: 3,
						description:
							"Pembuatan game 2D/3D menggunakan game engine Unity/Godot, fisika game, AI musuh, dan game loop.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=CS",
					},
				],
			},
		],
	},
	{
		id: "sistem-informasi",
		name: "Sistem Informasi",
		slug: "/academic/sistem-informasi",
		description:
			"Program studi Sistem Informasi (SI) memadukan ilmu teknologi informasi dengan domain strategi bisnis, analisis proses, dan tata kelola korporasi. Lulusan SI terampil merancang solusi digital yang memberi nilai strategis bagi organisasi.",
		careers: [
			"BUSINESS ANALYST",
			"IT CONSULTANT",
			"PRODUCT MANAGER",
			"DATA ANALYST",
		],
		courseMapUrl: "https://course.csui.dev/?prodi=SI",
		driveUrl: "https://course.csui.dev/?prodi=SI",
		semesters: [
			{
				semester: 1,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 1 (DDP 1)",
						code: "DDP 1",
						sks: 4,
						description:
							"Dasar logika pemrograman terstruktur dan pemecahan masalah komputasional menggunakan Python.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Pengantar Sistem Informasi (PSI)",
						code: "PSI",
						sks: 3,
						description:
							"Pengenalan peran teknologi informasi dalam transformasi proses bisnis dan manajemen organisasi kontemporer.",
						prerequisites: ["Analisis & Perancangan SI"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Matematika Diskret 1 (MD 1)",
						code: "MD 1",
						sks: 3,
						description:
							"Struktur matematika diskret: logika, himpunan, relasi, fungsi, dan kombinatorika dasar.",
						prerequisites: ["Matematika Diskret 2"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Kalkulus 1",
						code: "Kalkulus 1",
						sks: 3,
						description:
							"Fungsi, limit, turunan, dan konsep integral dasar untuk analisis optimasi kuantitatif.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "MPK Agama",
						code: "MPK Agama",
						sks: 2,
						description:
							"Pembentukan karakter spiritual dan etika peradaban masyarakat berketuhanan.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "MPK Bahasa Inggris",
						code: "MPK B.Inggris",
						sks: 2,
						description:
							"Komunikasi profesional berbahasa Inggris dalam konteks bisnis dan teknologi informasi.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
			{
				semester: 2,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 2 (DDP 2)",
						code: "DDP 2",
						sks: 4,
						description:
							"Konsep Object-Oriented Programming (OOP) dengan Java, struktur kelas, interface, dan GUI.",
						prerequisites: ["Pemrograman Berbasis Platform"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Pengantar Bisnis & Manajemen",
						code: "PBM",
						sks: 3,
						description:
							"Fungsi manajemen bisnis: operasional, pemasaran, keuangan, SDM, dan tata kelola strategis.",
						prerequisites: ["Sistem Enterprise & ERP"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Aljabar Linear",
						code: "Alin",
						sks: 3,
						description:
							"Matriks, sistem persamaan linear, determinan, dan ruang vektor untuk analisis data kuantitatif.",
						prerequisites: ["Statistika dan Probabilitas"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Pengantar Organisasi Komputer",
						code: "POK",
						sks: 3,
						description:
							"Prinsip kerja perangkat keras komputer, arsitektur dasar, dan sistem operasi pendukung.",
						prerequisites: ["Jaringan Komputer"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Matematika Diskret 2",
						code: "MD 2",
						sks: 3,
						description:
							"Teori graf, pohon, serta struktur relasi untuk optimasi alur informasi sistem.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "MPK Bahasa Indonesia",
						code: "MPK B.Indo",
						sks: 3,
						description:
							"Teknik penulisan laporan teknis, karya ilmiah, dan presentasi formal berstandar nasional.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
			{
				semester: 3,
				courses: [
					{
						name: "Basis Data (Basdat)",
						code: "Basdat",
						sks: 4,
						description:
							"Perancangan basis data relasional, SQL tingkat lanjut, normalisasi, dan integrasi aplikasi.",
						prerequisites: ["Manajemen Basis Data", "Business Intelligence"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Struktur Data & Algoritma (SDA)",
						code: "SDA",
						sks: 4,
						description:
							"Pengorganisasian data efisien: tree, graph, sorting, hashing, dan analisis algoritma.",
						prerequisites: ["Desain & Analisis Algoritma"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Statistika dan Probabilitas",
						code: "Statprob",
						sks: 3,
						description:
							"Statistik inferensial, pengujian hipotesis, dan pemodelan prediktif untuk data bisnis.",
						prerequisites: ["Data Science & Analytics"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Analisis & Perancangan SI (APSI)",
						code: "APSI",
						sks: 3,
						description:
							"Metodologi perancangan sistem informasi, requirements engineering, use case, dan UML modeling.",
						prerequisites: ["Proyek Perangkat Lunak"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Sistem Operasi",
						code: "OS",
						sks: 4,
						description:
							"Prinsip OS, konkurensi, penjadwalan CPU, dan pengelolaan sumber daya komputasi.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
			{
				semester: 4,
				courses: [
					{
						name: "Pemrograman Berbasis Platform (PBP)",
						code: "PBP",
						sks: 4,
						description:
							"Pengembangan solusi perangkat lunak multi-platform berbasis web dan mobile terintegrasi backend.",
						prerequisites: ["Proyek Perangkat Lunak"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Sistem Enterprise & ERP",
						code: "ERP",
						sks: 3,
						description:
							"Arsitektur Enterprise Resource Planning (SAP/Odoo), integrasi supply chain, keuangan, dan CRM.",
						prerequisites: ["Tata Kelola TI"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Jaringan Komputer",
						code: "Jarkom",
						sks: 4,
						description:
							"Infrastruktur jaringan telekomunikasi, routing, keamanan jaringan korporasi, dan protokol internet.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Rekayasa Perangkat Lunak (RPL)",
						code: "RPL",
						sks: 4,
						description:
							"Siklus hidup pengembangan software, QA testing, arsitektur microservices, dan manajemen rilis.",
						prerequisites: ["Proyek Perangkat Lunak"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Interaksi Manusia dan Komputer (IMK)",
						code: "IMK",
						sks: 2,
						description:
							"User-Centered Design (UCD), prototyping Figma, evaluasi heuristik, dan design system.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
			{
				semester: 5,
				courses: [
					{
						name: "Proyek Perangkat Lunak (PPL)",
						code: "PPL",
						sks: 6,
						description:
							"Pengerjaan proyek sistem informasi skala riil secara kolaboratif bersama stakeholder nyata.",
						prerequisites: ["Skripsi"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Manajemen Basis Data",
						code: "MBD",
						sks: 3,
						description:
							"Administrasi database, query optimization, backup recovery, data warehousing, dan NoSQL.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Tata Kelola TI (IT Governance)",
						code: "TataKelola",
						sks: 3,
						description:
							"Framework COBIT, ITIL, standar audit kepatuhan, serta penyelarasan strategi TI dengan bisnis.",
						prerequisites: ["Audit Sistem Informasi"],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Etika Profesi dan Keilmuan",
						code: "Etprof",
						sks: 3,
						description:
							"Etika profesi TI, privasi digital, kepatuhan GDPR/UU PDP, dan tanggung jawab sosial profesional.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
			{
				semester: 6,
				courses: [
					{
						name: "Manajemen Proyek TI (MPTI)",
						code: "MPTI",
						sks: 3,
						description:
							"Metodologi Project Management Body of Knowledge (PMBOK), budgeting, dan risk mitigation.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Mata Kuliah Pilihan 1",
						code: "Pilihan 1",
						sks: 3,
						description: "Mata kuliah peminatan sesuai fokus jalur karir.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Mata Kuliah Pilihan 2",
						code: "Pilihan 2",
						sks: 3,
						description:
							"Mata kuliah spesialisasi bisnis dan teknologi informasi.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
			{
				semester: 7,
				courses: [
					{
						name: "Mata Kuliah Pilihan 3",
						code: "Pilihan 3",
						sks: 3,
						description: "Peminatan tingkat lanjut sistem enterprise / data.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Mata Kuliah Pilihan 4",
						code: "Pilihan 4",
						sks: 3,
						description: "Peminatan penunjang topik riset akhir.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Mata Kuliah Pilihan 5",
						code: "Pilihan 5",
						sks: 3,
						description:
							"Mata kuliah elektif pendukung kompetensi profesional.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
			{
				semester: 8,
				courses: [
					{
						name: "Skripsi / Tugas Akhir",
						code: "Skripsi",
						sks: 6,
						description:
							"Penyusunan tugas akhir riset empiris sistem informasi dan sidang sarjana.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Mata Kuliah Pilihan 6",
						code: "Pilihan 6",
						sks: 3,
						description: "Mata kuliah pilihan penutup pemenuhan kurikulum.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
			{
				semester: "Pilihan",
				courses: [
					{
						name: "Business Intelligence & Analytics",
						code: "BI",
						sks: 3,
						description:
							"Perancangan ETL pipeline, data warehouse Kimball, OLAP cube, dan dashboard visualisasi Tableau/PowerBI.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Audit Sistem Informasi",
						code: "Audit SI",
						sks: 3,
						description:
							"Standar audit ISACA, kontrol internal sistem, forensic investigation, dan manajemen kerentanan.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "E-Business & Digital Transformation",
						code: "E-Biz",
						sks: 3,
						description:
							"Model bisnis digital platform, fintech, e-commerce architecture, dan strategi disrupsi inovasi.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
					{
						name: "Manajemen Layanan TI (ITSM)",
						code: "ITSM",
						sks: 3,
						description:
							"Best practice implementasi framework ITIL 4 untuk pengelolaan service desk dan incident management.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=SI",
					},
				],
			},
		],
	},
	{
		id: "kecerdasan-artifisial",
		name: "Kecerdasan Artifisial",
		slug: "/academic/kecerdasan-artifisial",
		description:
			"Program studi Kecerdasan Artifisial (AI) berfokus pada riset dan implementasi sistem cerdas, deep learning, computer vision, natural language processing, serta generative AI untuk menjawab tantangan revolusi industri masa kini.",
		careers: [
			"AI/ML ENGINEER",
			"RESEARCH SCIENTIST",
			"NLP SPECIALIST",
			"COMPUTER VISION ENG",
		],
		courseMapUrl: "https://course.csui.dev/?prodi=AI",
		driveUrl: "https://course.csui.dev/?prodi=AI",
		semesters: [
			{
				semester: 1,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 1 (DDP 1)",
						code: "DDP 1",
						sks: 4,
						description:
							"Algoritma komputasional, tipe data, abstraksi logika, dan scripting analitis dengan Python.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Kalkulus 1",
						code: "Kalkulus 1",
						sks: 3,
						description:
							"Diferensial, fungsi kontinu, optimasi gradien, dan dasar matematika machine learning.",
						prerequisites: ["Kalkulus 2"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Matematika Diskret 1",
						code: "MD 1",
						sks: 3,
						description:
							"Logika komputasi, teori graf, relasi himpunan, dan penalaran induktif formal.",
						prerequisites: ["Matematika Diskret 2"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Pengantar Sistem Digital",
						code: "PSD",
						sks: 4,
						description:
							"Rangkaian logika biner, arsitektur hardware komputasi, dan representasi data numerik.",
						prerequisites: ["Pengantar Organisasi Komputer"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "MPK Agama",
						code: "MPK Agama",
						sks: 2,
						description:
							"Penanaman akhlak, etika moral, dan keharmonisan sosial.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "MPK Bahasa Inggris",
						code: "MPK B.Inggris",
						sks: 2,
						description:
							"Academic reading dan writing untuk literatur ilmiah serta komunikasi paper riset AI.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
			{
				semester: 2,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 2 (DDP 2)",
						code: "DDP 2",
						sks: 4,
						description:
							"Object-Oriented Programming (OOP) dan struktur data berorientasi objek dalam Java.",
						prerequisites: ["Struktur Data & Algoritma"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Aljabar Linear untuk AI",
						code: "Alin AI",
						sks: 3,
						description:
							"Vektor, tensor, dekomposisi matriks (SVD, PCA), eigen value, dan ruang fitur numerik.",
						prerequisites: ["Pembelajaran Mesin"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Kalkulus Multivariabel (Kalkulus 2)",
						code: "Kalkulus 2",
						sks: 3,
						description:
							"Turunan parsial, gradien, matriks Hessian, dan metode optimasi numerik multi-dimensi.",
						prerequisites: ["Pembelajaran Mendalam (Deep Learning)"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Pengantar Organisasi Komputer",
						code: "POK",
						sks: 3,
						description:
							"Arsitektur CPU/GPU komputasi paralel dan memori akses berkecepatan tinggi.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Matematika Diskret 2",
						code: "MD 2",
						sks: 3,
						description:
							"Pohon keputusan, teori probabilitas diskret, dan pemodelan relasional logika.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "MPK Bahasa Indonesia",
						code: "MPK B.Indo",
						sks: 3,
						description:
							"Tata bahasa ilmiah bahasa Indonesia untuk publikasi karya akademik.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
			{
				semester: 3,
				courses: [
					{
						name: "Struktur Data & Algoritma (SDA)",
						code: "SDA",
						sks: 4,
						description:
							"Pencarian efisien, indexing pohon, grafik trajektori, dan optimasi struktur data memori.",
						prerequisites: ["Desain & Analisis Algoritma"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Statistika dan Teori Probabilitas",
						code: "Statprob",
						sks: 3,
						description:
							"Bayesian inference, rantai Markov, distribusi probabilitas multivariat, dan stochastic processes.",
						prerequisites: ["Pembelajaran Mesin"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Basis Data",
						code: "Basdat",
						sks: 4,
						description:
							"Manajemen relasional SQL, database vektor (Vector DB), dan NoSQL untuk dataset AI berskala besar.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Pengantar Kecerdasan Artifisial",
						code: "Intro AI",
						sks: 3,
						description:
							"Heuristic search, agen cerdas, game theory, logic programming, dan penalaran inferensial.",
						prerequisites: ["Pembelajaran Mesin", "Sistem Cerdas"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Sistem Operasi",
						code: "OS",
						sks: 4,
						description:
							"Manajemen proses, threads multitasking, virtualisasi sistem, dan komputasi awan.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
			{
				semester: 4,
				courses: [
					{
						name: "Pembelajaran Mesin (Machine Learning)",
						code: "ML",
						sks: 4,
						description:
							"Supervised dan unsupervised learning: regresi, SVM, Random Forest, k-Means, dimensionality reduction, dan model evaluation.",
						prerequisites: [
							"Pembelajaran Mendalam (Deep Learning)",
							"Pengolahan Bahasa Alami (NLP)",
						],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Desain & Analisis Algoritma",
						code: "DAA",
						sks: 3,
						description:
							"Algoritma optimasi lanjutan, pemrograman dinamis, dan analisis kompleksitas komputasional.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Pemrograman Berbasis Platform",
						code: "PBP",
						sks: 4,
						description:
							"Deployment model AI ke aplikasi web terdistribusi melalui API endpoint.",
						prerequisites: ["Proyek Perangkat Lunak AI"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Jaringan Komputer",
						code: "Jarkom",
						sks: 4,
						description:
							"Komunikasi data, protokol transfer data streaming, dan arsitektur distributed computing.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Rekayasa Perangkat Lunak",
						code: "RPL",
						sks: 4,
						description:
							"Software engineering best practices, MLOps, CI/CD pipeline, dan version control dataset.",
						prerequisites: ["Proyek Perangkat Lunak AI"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
			{
				semester: 5,
				courses: [
					{
						name: "Pembelajaran Mendalam (Deep Learning)",
						code: "DL",
						sks: 4,
						description:
							"Neural networks, backpropagation, CNN, RNN/LSTM, Transformer architecture, dan training dengan PyTorch.",
						prerequisites: ["Generative AI", "Visi Komputer"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Visi Komputer (Computer Vision)",
						code: "CV",
						sks: 3,
						description:
							"Image processing, feature extraction, object detection (YOLO), image segmentation, dan facial recognition.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Pengolahan Bahasa Alami (NLP)",
						code: "NLP",
						sks: 3,
						description:
							"Tokenisasi, embedding (Word2Vec, BERT), LLM prompting, text summarization, dan sentiment analysis.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Etika dan Regulasi AI",
						code: "Etika AI",
						sks: 2,
						description:
							"Keadilan algoritma (fairness), bias mitigasi, explainability (XAI), hak cipta generatif, dan etika kecerdasan buatan.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Interaksi Manusia dan AI",
						code: "HAI",
						sks: 2,
						description:
							"Perancangan antarmuka human-in-the-loop, agen percakapan (chatbots), dan user trust modeling.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
			{
				semester: 6,
				courses: [
					{
						name: "Proyek Sistem AI (PPL AI)",
						code: "Proyek AI",
						sks: 6,
						description:
							"Pengembangan solusi cerdas end-to-end berbasis deep learning yang siap pakai di lingkungan produksi riil.",
						prerequisites: ["Skripsi"],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Mata Kuliah Pilihan AI 1",
						code: "Pilihan AI 1",
						sks: 3,
						description:
							"Spesialisasi riset lanjutan di bidang kecerdasan buatan.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Mata Kuliah Pilihan AI 2",
						code: "Pilihan AI 2",
						sks: 3,
						description: "Pengembangan modul aplikasi cerdas spesifik.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
			{
				semester: 7,
				courses: [
					{
						name: "Mata Kuliah Pilihan AI 3",
						code: "Pilihan AI 3",
						sks: 3,
						description:
							"Eksplorasi state-of-the-art model dan teknologi AI mutakhir.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Mata Kuliah Pilihan AI 4",
						code: "Pilihan AI 4",
						sks: 3,
						description: "Riset peminatan interdisipliner.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Mata Kuliah Pilihan AI 5",
						code: "Pilihan AI 5",
						sks: 3,
						description: "Elektif terapan pendukung penyusunan tugas akhir.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
			{
				semester: 8,
				courses: [
					{
						name: "Skripsi / Tugas Akhir AI",
						code: "Skripsi AI",
						sks: 6,
						description:
							"Penyusunan naskah riset ilmiah kecerdasan artifisial dan uji kelayakan inovasi komputasi.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Mata Kuliah Pilihan AI 6",
						code: "Pilihan AI 6",
						sks: 3,
						description: "Mata kuliah pilihan penutup program sarjana.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
			{
				semester: "Pilihan",
				courses: [
					{
						name: "Generative AI & LLM Engineering",
						code: "GenAI",
						sks: 3,
						description:
							"Diffusion models, GANs, fine-tuning LLM (LoRA/QLoRA), RAG pipeline, dan prompt orchestration.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Reinforcement Learning",
						code: "RL",
						sks: 3,
						description:
							"Q-learning, Policy Gradients, Actor-Critic, Deep Q-Networks (DQN), dan simulasi game environment.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Robotika Cerdas",
						code: "Robotics",
						sks: 3,
						description:
							"Kinematika robot, sensor fusion (LiDAR/IMU), SLAM, path planning, dan ROS integration.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
					{
						name: "Bioinformatika Komputasional",
						code: "BioAI",
						sks: 3,
						description:
							"Analisis sekuens DNA, pemodelan struktur protein dengan AI, dan komputasi biomedis.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=AI",
					},
				],
			},
		],
	},
	{
		id: "ilmu-komputer-kki",
		name: "Ilmu Komputer KKI",
		slug: "/academic/ilmu-komputer-kki",
		description:
			"Program studi Ilmu Komputer KKI (Kelas Khusus Internasional) menyajikan kurikulum berstandar internasional dengan bahasa pengantar penuh Bahasa Inggris serta peluang program dual-degree bersama universitas mitra terkemuka di luar negeri.",
		careers: [
			"GLOBAL SOFTWARE ENG",
			"CLOUD ARCHITECT",
			"DEVOPS ENGINEER",
			"FULL-STACK DEVELOPER",
		],
		courseMapUrl: "https://course.csui.dev/?prodi=KKI",
		driveUrl: "https://course.csui.dev/?prodi=KKI",
		semesters: [
			{
				semester: 1,
				courses: [
					{
						name: "Foundations of Programming 1",
						code: "FOP 1",
						sks: 4,
						description:
							"Introduction to computational logic, procedural programming, algorithms, and modular design using Python in international standard curriculum.",
						prerequisites: [
							"Foundations of Programming 2",
							"Data Structures & Algorithms",
						],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Discrete Mathematics 1",
						code: "DM 1",
						sks: 3,
						description:
							"Propositional logic, set theory, functions, mathematical induction, and basic combinatorial proofs.",
						prerequisites: ["Discrete Mathematics 2"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Introduction to Digital Systems",
						code: "IDS",
						sks: 4,
						description:
							"Boolean algebra, combinational and sequential logic design, and basic microprocessor structure.",
						prerequisites: ["Computer Organization"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Calculus 1",
						code: "Calc 1",
						sks: 3,
						description:
							"Functions, limits, differentiation techniques, fundamental theorem of calculus, and optimization problems.",
						prerequisites: ["Calculus 2"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Religious Studies",
						code: "Religion",
						sks: 2,
						description:
							"Universal ethical perspectives, multicultural engagement, and personal morality.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Academic English Writing",
						code: "Eng Writing",
						sks: 2,
						description:
							"Advanced academic essay composition, technical literature review, and rhetorical argumentation in English.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
			{
				semester: 2,
				courses: [
					{
						name: "Foundations of Programming 2",
						code: "FOP 2",
						sks: 4,
						description:
							"Object-Oriented Programming (OOP) with Java: encapsulation, polymorphism, inheritance, collections, and event-driven GUI.",
						prerequisites: ["Platform-Based Programming"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Discrete Mathematics 2",
						code: "DM 2",
						sks: 3,
						description:
							"Graph theory, tree traversal, recurrence relations, and algorithmic discrete models.",
						prerequisites: ["Design & Analysis of Algorithms"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Computer Organization",
						code: "CompOrg",
						sks: 3,
						description:
							"Processor architecture, assembly instructions, memory hierarchy, cache optimization, and I/O bus systems.",
						prerequisites: ["Operating Systems"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Linear Algebra",
						code: "LinAlg",
						sks: 3,
						description:
							"Vector spaces, matrices, linear transformations, determinants, and spectral decompositions.",
						prerequisites: ["Artificial Intelligence"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Calculus 2",
						code: "Calc 2",
						sks: 3,
						description:
							"Techniques of integration, sequences and infinite series, multivariable differential calculus.",
						prerequisites: ["Probability & Statistics"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Bahasa Indonesia for International",
						code: "Indonesian",
						sks: 3,
						description:
							"Standard Indonesian linguistic structures for formal and professional discourse.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
			{
				semester: 3,
				courses: [
					{
						name: "Data Structures & Algorithms",
						code: "DSA",
						sks: 4,
						description:
							"Fundamental data structures (AVL, heaps, hash tables, graphs) and asymptotic complexity analysis.",
						prerequisites: ["Design & Analysis of Algorithms"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Operating Systems",
						code: "OS",
						sks: 4,
						description:
							"Concurrency, threads, deadlocks, virtual memory architectures, paging, and kernel I/O subsystems.",
						prerequisites: ["Computer Networks"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Database Systems",
						code: "Databases",
						sks: 4,
						description:
							"Relational database design, normalization, ACID transaction management, SQL queries, and indexing.",
						prerequisites: ["Platform-Based Programming"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Probability & Statistics",
						code: "ProbStat",
						sks: 3,
						description:
							"Continuous probability distributions, hypothesis testing, linear regression, and statistical modeling.",
						prerequisites: ["Artificial Intelligence"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Automata & Formal Languages",
						code: "Automata",
						sks: 3,
						description:
							"Regular languages, context-free grammars, pushdown automata, and universal Turing machines.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
			{
				semester: 4,
				courses: [
					{
						name: "Design & Analysis of Algorithms",
						code: "DAA",
						sks: 3,
						description:
							"Dynamic programming, greedy paradigms, amortized analysis, network flow, and intractable problems.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Platform-Based Programming",
						code: "PBP",
						sks: 4,
						description:
							"Full-stack web & mobile application engineering with modern reactive frameworks and RESTful APIs.",
						prerequisites: ["Software Engineering Project"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Computer Networks",
						code: "Networks",
						sks: 4,
						description:
							"Internet protocols, TCP/IP, routing algorithms, transport flow control, and cybersecurity fundamentals.",
						prerequisites: ["Cryptography & Security"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Software Engineering",
						code: "SE",
						sks: 4,
						description:
							"Software architecture, design patterns, testing strategies, DevOps, and agile methodologies.",
						prerequisites: ["Software Engineering Project"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Artificial Intelligence",
						code: "AI",
						sks: 3,
						description:
							"Search algorithms, reinforcement learning, machine learning principles, and knowledge representation.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
			{
				semester: 5,
				courses: [
					{
						name: "Software Engineering Project (PPL)",
						code: "SEP",
						sks: 6,
						description:
							"Collaborative agile project delivering production-grade enterprise software for real clients.",
						prerequisites: ["Undergraduate Thesis"],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Computer Graphics & Visual Computing",
						code: "Graphics",
						sks: 3,
						description:
							"3D transformations, shader programming, ray tracing, illumination models, and WebGL pipeline.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Cryptography & Information Security",
						code: "Crypto",
						sks: 3,
						description:
							"Symmetric/asymmetric encryption, cryptographic hashes, digital certificates, and network security protocols.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Human-Computer Interaction",
						code: "HCI",
						sks: 2,
						description:
							"User research, UX design workflows, accessibility compliance, and interface evaluation.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Professional Ethics in Computing",
						code: "Ethics",
						sks: 3,
						description:
							"Global cyber laws, intellectual property rights, data privacy regulations, and ethical engineering conduct.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
			{
				semester: 6,
				courses: [
					{
						name: "IT Project Management",
						code: "ITPM",
						sks: 3,
						description:
							"Agile project leadership, risk budgeting, team dynamics, and international resource delivery.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Elective Course 1",
						code: "Elective 1",
						sks: 3,
						description:
							"Advanced specialization subject (Exchange / Partner University credit transfer).",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Elective Course 2",
						code: "Elective 2",
						sks: 3,
						description:
							"Global specialization subject (Exchange / Partner University credit transfer).",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
			{
				semester: 7,
				courses: [
					{
						name: "Elective Course 3",
						code: "Elective 3",
						sks: 3,
						description: "Specialized senior elective at Fasilkom or abroad.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Elective Course 4",
						code: "Elective 4",
						sks: 3,
						description: "Partner university study abroad curriculum subject.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Elective Course 5",
						code: "Elective 5",
						sks: 3,
						description: "Advanced computational research seminar.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
			{
				semester: 8,
				courses: [
					{
						name: "Undergraduate Thesis",
						code: "Thesis",
						sks: 6,
						description:
							"Independent research investigation, defense presentation, and bachelor publication.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Elective Course 6",
						code: "Elective 6",
						sks: 3,
						description:
							"Final capstone elective to satisfy graduation degree requirements.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
			{
				semester: "Pilihan",
				courses: [
					{
						name: "Cloud Architecture & Microservices",
						code: "Cloud",
						sks: 3,
						description:
							"Distributed microservices, serverless computation, Kubernetes cluster management, and global cloud networks.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Functional Programming (Haskell)",
						code: "FuncProg",
						sks: 3,
						description:
							"Declarative type systems, currying, monads, lazy evaluation, and pure functional software verification.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "Mobile Application Engineering",
						code: "Mobile",
						sks: 3,
						description:
							"Cross-platform and native mobile software architecture for iOS and Android.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
					{
						name: "High Performance Computing",
						code: "HPC",
						sks: 3,
						description:
							"CUDA GPU programming, OpenMP, MPI distributed processing, and parallel algorithms.",
						prerequisites: [],
						materialUrl: "https://course.csui.dev/?prodi=KKI",
					},
				],
			},
		],
	},
];
