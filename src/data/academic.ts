/**
 * Data kurikulum program studi Fasilkom UI
 * Sumber: https://course.csui.dev
 */

export interface Course {
	id?: number;
	name: string;
	code?: string;
	sks: number;
	category?: string;
	track?: string;
	description?: string;
	prerequisites?: string[];
	unlocks?: string[];
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
						name: "Dasar-Dasar Pemrograman 1",
						code: "CSGE601020",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Dasar-Dasar Pemrograman 1 (DDP 1) adalah mata kuliah yang bertujuan untuk mengajarkan konsep-konsep dasar serta teknik untuk membuat program komputer dalam konteks pengenalan ilmu komputasi dan problem solving. Kuliah ini disampaikan dalam bentuk kombinasi kuliah tatap-muka dan hands-on latihan pemrograman di Laboratorium. Perlu diperhatikan bahwa Bahasa pemrograman bukan hal yang penting di kuliah DDP1 ini.",
						prerequisites: [],
						unlocks: [
							"Dasar-Dasar Pemrograman 2",
							"Jaringan Komputer",
							"Pemrograman Berbasis Platform",
							"Struktur Data dan Algoritma",
							"Ethical Hacking",
							"Pemrograman Logika",
						],
					},
					{
						name: "Kalkulus 1",
						code: "CSGE601012",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Kuliah ini membahas konsep dasar kalkulus dengan menekankan kepada kegunaan kalkulus untuk menyelesaikan permasalahan sains dan untuk memberikan basis dari banyak teknik dan metode yang ada di bidang komputasi.",
						prerequisites: [],
						unlocks: ["Kalkulus 2", "Statistika dan Probabilitas"],
					},
					{
						name: "Mata Kuliah Pengembangan Kepribadian (MPK) Agama",
						code: "UIGE600004",
						sks: 2,
						category: "Wajib Universitas",
						description:
							"Setelah selesai mengikuti perkuliahan MPK Agama, mahasiswa mampu menganalisis berbagai permasalahan yang terjadi di masyarakat berdasarkan ajaran agama. Mata kuliah ini disajikan dengan pendekatan Active Learning dengan materi pembelajarannya meliputi sejarah dan makna agama, pokok-pokok ajaran agama, agama dan budaya, serta analisis kasus-kasus nyata yang terjadi di masyarakat. Proses pembelajaran dilakukan dengan menggunakan bahasa Indonesia.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Mata Kuliah Pengembangan Kepribadian (MPK) Bahasa Inggris",
						code: "UIGE600003",
						sks: 2,
						category: "Wajib Universitas",
						description: "Mata Kuliah Pengembangan Kepribadian",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Matematika Diskret 1",
						code: "CSGE601010",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Kuliah ini membahas berbagai topik dalam Matematika Diskret yang memberikan landasan teori untuk mendukung studi lanjutan di bidang Ilmu Komputer. Kuliah ini juga akan membahas penerapan masing-masing topik tersebut dalam Ilmu Komputer.",
						prerequisites: [],
						unlocks: [
							"Statistika dan Probabilitas",
							"Teori Bahasa & Automata",
							"Kriptografi dan Keamanan Informasi",
							"Pemrograman Logika",
							"Representasi Pengetahuan dan Penalaran",
						],
					},
					{
						name: "Pengantar Sistem Digital",
						code: "CSCM601150",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Kuliah ini memberikan pemahaman dasar dan aspek praktis dalam merancang sistem digital menggunakan bahasa pemrograman tingkat tinggi, seperti VHDL. Mahasiswa akan mempelajari konsep dasar dalam merancang sirkuit digital, seperti representasi biner, aljabar Boolean, mesin keadaan hingga (finite-state-machine), dan prosesor set instruksi (instruction-set processor). Selain itu, mahasiswa juga akan mempelajari komponen dasar untuk perancangan pada berbagai tingkat abstraksi, seperti transistor, gerbang logika (gate), flip- flop, adder, multiplier, register, memori, dan prosesor.",
						prerequisites: [],
						unlocks: ["Pengantar Organisasi Komputer"],
					},
				],
			},
			{
				semester: 2,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 2",
						code: "CSGE601021",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							'Kuliah ini merupakan bagian kedua dari rangkaian dua kuliah "Dasar-Dasar Pemrograman" dan dirancang untuk membangun pengetahuan dan pengalaman yang didapatkan dari Dasar-Dasar Pemrograman 1 untuk meningkatkan kemampuan pemrograman mahasiswa. Kuliah ini secara khusus berfokus pada paradigma pemrograman berorientasi objek dan menekankan penggunaan paradigma ini dalam pemecahan masalah.',
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: [
							"Basis Data",
							"Pemrograman Lanjut",
							"Pengantar Keamanan Perangkat Lunak",
							"Rekayasa Perangkat Lunak",
							"Pemrograman Paralel",
						],
					},
					{
						name: "Kalkulus 2",
						code: "CSCM601213",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Kuliah ini menyampaikan topik-topik lanjutan dari Kalkulus 1 yang sudah disampaikan sebelumnya pada kuliah terpisah. Serupa dengan Kalkulus 1, Kalkulus 2 berguna untuk menyelesaikan permasalahan sains dan untuk memberikan basis dari banyak teknik dan metode yang ada di bidang komputasi",
						prerequisites: ["Kalkulus 1"],
						unlocks: [
							"Analisis Numerik",
							"Pemrograman Paralel",
							"Persamaan Differensial",
						],
					},
					{
						name: "Mata Kuliah Pengembangan Kepribadian (MPK) Terintegrasi",
						code: "UIGE600007",
						sks: 6,
						category: "Wajib Universitas",
						description:
							"Mata Kuliah Pengembangan Kepribadian Terintegrasi (MPKT) adalah bagian dari Penyelenggaraan Kuliah Pengembangan Kepribadian Pendidikan Tinggi (PKPKPT) yang diselenggarakan bagi mahasiswa yang mengandung unsur internalisasi nilai dasar kehidupan, keterampilan interaksi/berelasi, berbangsa dan keterampilan akademik sebagai dasar kepribadian mahasiswa menjalankan pembelajaran sesuai disiplin ilmu. MPKT dilaksanakan berupa serangkaian kegiatan pembelajaran di luar kelas formal, kegiatan yang dilakukan meliputi keikutsertaan dalam ceramah/ seminar, magang, praktik kerja lapangan, kerja sosial, aktivitas olah raga dan/ atau kesenian dan bentuk kegiatan lain yang memiliki sasaran utama membekali mahasiswa dengan soft skills dan dibuktikan dengan dokumen portofolio. Bentuk kegiatan pembelajaran ini berbeda dengan mata kuliah MPKT yang telah dijalankan di UI sebelumnya. Materi yang diberikan pada MPKT bertujuan untuk membentuk pola berpikir manusia dengan nilai dan moral untuk mewujudkan manusia yang berkepribadian dengan memiliki cara berpikir kritis, logis, kreatif, inovatif, serta memiliki keingintahuan intelektual dan jiwa kewirausahaan. Materi yang diberikan meliputi 9 nilai UI, nilai-nilai kebangsaan, negara, dan warga negara berdasarkan Pancasila. Pemecahan masalah dalam sains, teknologi, kesehatan, dan manusia sebagai manajer alam dengan menggunakan penalaran dan memanfaatkan Teknologi Informasi dan Komunikasi (TIK) untuk mencapai tujuan akhir modul ini. Kegiatan perkuliahan dilakukan dengan pendekatan student centered learning (SCL) secara daring yang dapat menggunakan metode: experiential learning (EL), collaborative learning (CL), problem-based learning (PBL), question-based learning, dan project based learning. Penggunaan berbagai metode tersebut dilakukan melalui kegiatan diskusi kelompok, latihan tugas mandiri, presentasi, pembuatan makalah dengan Bahasa Indonesia dan diskusi interaktif dalam forum diskusi daring. Bahasa pengantar dalam perkuliahan ini menggunakan Bahasa Indonesia.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Matematika Diskret 2",
						code: "CSGE601011",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Kuliah ini merupakan kelanjutan dari Matematika Diskret 1 yang memberikan landasan teori untuk mendukung studi lanjutan di bidang Ilmu Komputer. Topik-topik di Matematika Diskret 2 meliputi teori bilangan dan relasi rekurensi, serta pembahasan seputar struktur diskret yang fundamental di Ilmu Komputer, yaitu relasi, graf, dan pohon.",
						prerequisites: [],
						unlocks: [
							"Teori Bahasa & Automata",
							"Graf Pengetahuan",
							"Kriptografi dan Keamanan Informasi",
							"Representasi Pengetahuan dan Penalaran",
						],
					},
					{
						name: "Pengantar Organisasi Komputer",
						code: "CSCM601252",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Kuliah ini memberikan landasan organisasi komputer sekuensial yang terdiri dari input, output, memori, dan prosesor (jalur kontrol dan data). Pemahaman tentang konsep-konsep ini juga akan didukung dengan beberapa latihan pemrograman menggunakan bahasa tingkat rendah (low-level languages), misalnya bahasa assembly.",
						prerequisites: ["Pengantar Sistem Digital"],
						unlocks: [
							"Sistem Operasi",
							"Ethical Hacking",
							"Robotika",
							"Sistem Tertanam",
						],
					},
				],
			},
			{
				semester: 3,
				courses: [
					{
						name: "Aljabar Linier",
						code: "CSGE602012",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata ajar Aljabar Linear membekali mahasiswa keterampilan pemecahan masalah terkait dengan aljabar vektor dan meningkatkan penalaran matematis (logis, konsisten, jelas, seksama) yang merupakan disposisi dan keterampilan berpikir kritis. Bahan kajian meliputi sistem persamaan linear, aljabar matriks, determinan, ruang vektor dan hasil kali dalam, nilai dan vektor eigen, serta transformasi linear.",
						prerequisites: [],
						unlocks: [
							"Analisis Numerik",
							"Kecerdasan Artifisial dan Sains Data Dasar",
							"Pemrograman Paralel",
							"Persamaan Differensial",
						],
					},
					{
						name: "Pemrograman Berbasis Platform",
						code: "CSGE602022",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Pemrograman Berbasis Platform (PBP) merupakan mata ajar yang melatih dan memberikan pengalaman pengembangan aplikasi berbasis platform baik dari sisi server maupun di sisi client, memperkenalkan pengembangan platform Web dan platform Mobile. Peserta perkuliahan juga dituntut untuk bisa melakukan pemrograman dengan bahasa Python, Dart, Java, HTML, CSS, dan JavaScript.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: [
							"Pemrograman Lanjut",
							"Sistem Interaksi",
							"Arsitektur Aplikasi Web",
							"Pengajaran Berbantuan Komputer",
						],
					},
					{
						name: "Sistem Operasi",
						code: "CSCM602055",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Ini adalah pengantar untuk kuliah sistem operasi modern. Kuliah ini akan mencakup gambaran umum, tinjauan arsitektur komputer, gambaran umum sistem operasi, GNU/Linux CLI, scripting, pengantar bahasa C, proteksi, keamanan, privasi, systemd, I/O, pengalamatan dan pointer, manajemen memori, proses dan thread, memori virtual, sinkronisasi, mutual exclusion, deadlock, algoritma penjadwalan CPU, sistem file, dan pemrograman I/O. Kuliah ini berpusat pada siswa dan tanggung jawab ada di tangan siswa. Mahasiswa diharapkan untuk siap menghadapi pertemuan kelas. Mahasiswa akan memiliki pemahaman menyeluruh tentang bagaimana GNU/Linux menyediakan layanan dengan menggunakan Command Line Interface.",
						prerequisites: ["Pengantar Organisasi Komputer"],
						unlocks: [
							"Jaringan Komputer",
							"Pemrograman Paralel",
							"Pemrograman Sistem",
						],
					},
					{
						name: "Statistika dan Probabilitas",
						code: "CSCM602013",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Kuliah ini berorientasi pada aplikasi, dengan fokus pada bagaimana menggunakan konsep probabilitas dan statistik untuk memecahkan masalah nyata di bidang ilmu komputer.",
						prerequisites: ["Kalkulus 1", "Matematika Diskret 1"],
						unlocks: [
							"Kecerdasan Artifisial dan Sains Data Dasar",
							"Bioinformatika",
							"Kriptografi dan Keamanan Informasi",
							"Simulasi dan Pemodelan",
						],
					},
					{
						name: "Struktur Data dan Algoritma",
						code: "CSGE602040",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Kuliah ini membahas tentang teknik dasar untuk abstraksi data dan manipulasi struktur abstrak tersebut melalui algoritma yang tepat. Kuliah ini juga membahas tentang analisis kompleksitas alokasi ruang dan waktu dalam implementasi algoritma.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: [
							"Desain dan Analisis Algoritma",
							"Kecerdasan Artifisial dan Sains Data Dasar",
							"Bioinformatika",
							"Game Development",
							"Geometri Komputasional",
							"Pemrograman Fungsional",
							"Pemrograman Kompetitif",
							"Pemrograman Sistem",
							"Praktikum Pemrograman Kompetitif",
							"Teknik Kompilator",
						],
					},
				],
			},
			{
				semester: 4,
				courses: [
					{
						name: "Basis Data",
						code: "CSGE602070",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Kuliah ini membahas konsep dasar pengelolaan basis data, meliputi aspek pemodelan dan perancangan, bahasa, fasilitas, implementasi, dan aplikasi dari basis data.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						unlocks: [
							"Proyek Perangkat Lunak",
							"Basis Data Lanjut",
							"Graf Pengetahuan",
							"Penambangan Data",
						],
					},
					{
						name: "Pemrograman Lanjut",
						code: "CSCM602223",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini merupakan mata kuliah lanjutan dari mata kuliah Dasar-dasar Pemrograman. Mata kuliah Pemrograman Lanjut akan menyajikan teknik dalam pemrograman menggunakan topik terbaru dan terkini yang sedang berkembang di dalam dunia industri. Selain teori, mata kuliah ini juga mengajarkan mahasiswa untuk beradaptasi dalam menggunakan teknik pemrograman skala enterprise sehingga dapat membantu mahasiswa untuk mendesain, mengimplementasikan dan menjaga sistem yang kompleks. Dibantu dengan Agile software development methodology, mahasiswa belajar mengenai siklus pengembangan perangkat lunak. Ruang lingkup mata kuliah ini mencakup Object Oriented Analysis & Design, Applying OO Principles, Test-driven Development, Software Packaging and Deployment, Scaling up Software, Design Patterns, Continuous Integration, Concurrency, High-level Networking, Familiarity with Cloud Deployment, dan Web Services. Bahasa pengantar yang dipakai untuk kelas reguler yaitu bahasa Indonesia sedangkan kelas internasional bahasa Inggris. Mata kuliah ini memanfaatkan beberapa media teknologi untuk bantu menyukseskan jalannya perkuliahan yaitu: (1) Scele sebagai LMS, (2) Gitlab sebagai repository code masing-masing mahasiswa, (3) Java Spring, (4) Rust.",
						prerequisites: [
							"Dasar-Dasar Pemrograman 2",
							"Pemrograman Berbasis Platform",
						],
						unlocks: ["Proyek Perangkat Lunak"],
					},
					{
						name: "Pengantar Keamanan Perangkat Lunak",
						code: "CSGE602023",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Di era digital ini, keamanan siber menjadi semakin penting. Kuliah ini akan memperkenalkan mahasiswa pada konsep dan praktik penting dalam keamanan perangkat lunak, membantu mahasiswa memahami ancaman yang dihadapi perangkat lunak, dan memberi alat untuk mengembangkan perangkat lunak yang lebih tahan terhadap serangan. Kuliah ini akan menggabungkan kegiatan tatap-muka, diskusi, dan latihan langsung untuk membantu memahami konsep dan menerapkannya pada situasi dunia nyata.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						unlocks: [],
					},
					{
						name: "Sistem Interaksi",
						code: "CSGE602024",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Kuliah ini berfokus pada konsep desain antarmuka untuk perangkat lunak. Dalam kuliah ini, mahasiswa diajarkan bagaimana menerapkan prinsip-prinsip interaksi manusia-komputer dalam pengembangan aplikasi, dan menawarkan desain interaksi alternatif yang lebih baik. Materi disampaikan melalui metode pembelajaran aktif, seperti: diskusi kelompok kecil, pembelajaran berbasis proyek, dan penggunaan sistem manajemen pembelajaran elektronik. Cakupan yang dibahas dalam kuliah ini meliputi: konteks sejarah interaksi manusia-komputer (HCI), desain interaksi, kognisi, teknik dalam HCI, aspek sosial HCI, pengumpulan dan analisis data, proses desain interaksi, pembuatan prototipe, dan evaluasi.",
						prerequisites: ["Pemrograman Berbasis Platform"],
						unlocks: [],
					},
					{
						name: "Teori Bahasa & Automata",
						code: "CSCM602241",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Kuliah ini membahas model teoretis dari konsep komputasi dan bahasa formal. Pembahasan di kuliah ini meliputi konsep dasar dari teori komputasi, beberapa mesin komputasi abstrak sebagai model komputasi, termasuk turing machine dan bahasa formal seperti context-free grammar. Kuliah ini juga membahas batasan-batasan yang ada ketika membacarkan konsep komputasi.",
						prerequisites: ["Matematika Diskret 1", "Matematika Diskret 2"],
						unlocks: ["Pengolahan Bahasa Manusia", "Teknik Kompilator"],
					},
				],
			},
			{
				semester: 5,
				courses: [
					{
						name: "Analisis Numerik",
						code: "CSCM603117",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini membahas dasar-dasar penerapan komputasi ilmiah untuk ilmu komputer. Topik yang dibahas meliputi prinsip-prinsip matematika dasar serta algoritma analisis numerik sampai pada isu-isu praktis seperti reliabilitas perangkat lunak dan kinerja pada perangkat keras mutakhir; dan juga teknik optimisasi yang relevan dengan isu machine learning yang populer akhir-akhir. Peserta dilatih untuk memecahkan persoalan terkait tema-tema analisis numerik. Beberapa latihan dibuat dengan pembuatan program dengan bahasa apapun, namun dianjurkan C, Python, Octave atau tools open source lainnya.",
						prerequisites: ["Aljabar Linier", "Kalkulus 2"],
						unlocks: [],
					},
					{
						name: "Desain dan Analisis Algoritma",
						code: "CSCM603142",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Kuliah ini membahas tentang cara merancang dan menganalisis algoritma untuk memecahkan masalah yang diberikan. Kuliah ini berfokus pada dua isu utama, yaitu kebenaran dan kompleksitas algoritma. Beberapa teknik dan pendekatan akan dibahas, termasuk pemrograman dinamis (dynamic programming), algoritma greedy, algoritma graf, algoritma aproksimasi, dan NP-completeness.",
						prerequisites: ["Struktur Data dan Algoritma"],
						unlocks: [],
					},
					{
						name: "Jaringan Komputer",
						code: "CSCM603154",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Kuliah ini membahas tentang prinsip-prinsip jaringan komputer, internet, dan keamanan. Kuliah ini menekankan pendekatan top-down dari model jaringan komputer dan internet, dimulai dari lapisan aplikasi di bagian atas dan membahas semua lapisan, mulai dari lapisan aplikasi, lapisan transport, lapisan jaringan, lapisan data link, hingga lapisan fisik. Di bagian akhir, kuliah ini juga membahas topik keamanan, termasuk keamanan dalam jaringan komputer dan metode kriptografi untuk mengamankan komunikasi dalam jaringan komputer.",
						prerequisites: ["Dasar-Dasar Pemrograman 1", "Sistem Operasi"],
						unlocks: [
							"Administrasi Sistem",
							"Arsitektur Aplikasi Web",
							"Forensik Digital",
							"Internet of Things",
							"Komputasi Awan",
							"Sistem Terdistribusi",
							"Teknologi Mobile",
						],
					},
					{
						name: "Kecerdasan Artifisial dan Sains Data Dasar",
						code: "CSGE603130",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Kuliah ini mengenalkan konsep dan teknik dasar kecerdasan buatan (AI) dan sains data. Peserta kuliah ini akan dilengkapi dengan pemahaman teoritis dasar dan keterampilan praktis untuk memecahkan masalah kecerdasan buatan dan sains data. Selain itu, mereka juga akan dilengkapi dengan pemahaman tentang bagaimana sains data menjadi prinsip dasar kecerdasan buatan untuk memproses pengetahuan dari data.",
						prerequisites: [
							"Statistika dan Probabilitas",
							"Struktur Data dan Algoritma",
							"Aljabar Linier",
						],
						unlocks: [
							"Computer Vision",
							"Deep Learning",
							"Pemelajaran Mesin",
							"Pemrosesan Bahasa Lisan",
							"Penambangan Data",
							"Robotika",
							"Temu-balik Informasi",
						],
					},
					{
						name: "Rekayasa Perangkat Lunak",
						code: "CSCM603125",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata Kuliah ini mencakup materi tentang konsep pengembangan perangkat lunak, mulai dari tahapan analisis sampai dengan pengujian. Mahasiswa akan diperkenalkan dengan teknik pemodelan kebutuhan sistem dan juga pemodelan desain sistem, dengan menggunakan notasi Unified Modeling Language (UML). Materi akan mencakup Proses Model, Manajemen Proyek (Dasar), Analisis Kebutuhan Sistem, Desain Sistem, Strategi dan Teknik Pengujian Sistem.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						unlocks: [
							"Proyek Perangkat Lunak",
							"Penjaminan Mutu Perangkat Lunak",
							"Software Product Line Engineering",
						],
					},
				],
			},
			{
				semester: 6,
				courses: [
					{
						name: "Metodologi Penelitian dan Penulisan Ilmiah",
						code: "CSGE603091",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini berfokus pada metodologi penelitian dan penulisan ilmiah pada bidang Ilmu Komputer, Sistem Informasi, dan Teknologi Informasi (CS/SI/TI). Mata kuliah ini akan mengajarkan peserta untuk memiliki cara berpikir proses yang sistematis dan logis, secara ilmiah. Dalam mata kuliah ini peserta diminta untuk melakukan penelitian mini dan menulis karya ilmiah sebagai proses terintegrasi, di bidang CS/SI/TI. Secara garis besar, mata kuliah ini membahas bagaimana melakukan penelitian di bidang CS/SI/TI, sehingga “peneliti” dapat mengelola sumber dayanya secara optimal dan menulis laporan penelitian secara ilmiah. Selain itu, mata kuliah ini akan mengeksplorasi peran penelitian sebagai fungsi inti dalam mendorong pemahaman tentang pengetahuan, keterampilan, dan sikap baru di bidang pengembangan CS/SI/TI. Mata kuliah ini akan membahas topik-topik seperti alasan melakukan penelitian, memahami proses penelitian di bidang pengembangan CS/SI/TI, mengeksplorasi berbagai pendekatan untuk melakukan penelitian termasuk penggunaan berbagai pendekatan, teori, teknik dan metode. Mata kuliah ini juga akan membahas bagaimana menginterpretasikan hasil penelitian dengan pendekatan kualitatif dan kuantitatif serta menulis tinjauan kritis atas hasil penelitian tersebut. Mata kuliah ini akan membahas perbedaan dan persamaan antara penelitian dasar, penelitian terapan, karya pengembangan - (artistik / teknis), dan bentuk terkait lainnya. Beberapa paradigma sentral dan metodena terutama akan diperlukan dalam bidang CS/SI/TI. Evaluasi akan didasarkan pada partisipasi kelas, partisipasi online, penulisan paragraf ide, kuis, review kritis, review makalah, artikel penelitian yang dapat dipublikasikan, penulisan proyek penelitian, pelaksanaan penelitian mini, dan laporan penelitian.",
						prerequisites: [],
						unlocks: ["Tugas Akhir Individu", "Tugas Akhir Proyek Kelompok"],
					},
					{
						name: "Proyek Perangkat Lunak",
						code: "CSCM603228",
						sks: 6,
						category: "Wajib Program Studi",
						description:
							"Mata Kuliah ini memberikan pengalaman, keterampilan, dan pengetahuan pengembangan perangkat lunak dari awal hingga fase deployment dan bisa digunakan oleh pengguna, sebagai satu kesatuan kerja tim dengan menggunakan alat bantu pengembangan dan teknologi maupun metodologi terkini. Mata kuliah Proyek Perangkat Lunak (PPL) menggunakan metode pembelajaran kooperatif, mahasiswa akan dibagi ke dalam beberapa kelompok untuk mengerjakan pengembangan perangkat lunak bekerja sama dengan perwakilan dari industri IT sebagai pemilik produk. Pada mata kuliah ini mahasiswa dilatih untuk mengaplikasikan best practice techniques dan soft skill dari rekayasa perangkat lunak dan manajemen proyek IT, membuat produk berjalan yang berkualitas tinggi, dan menulis pengetahuan yang mereka dapatkan ke dalam blog. Beberapa metode pembelajaran yang diterapkan di Proyek Perangkat Lunak adalah: Scrum (kerangka kerja untuk proyek IT), Blog (menuliskan pengetahuan berdasarkan pengalaman), Konsultasi (klarifikasi pengetahuan untuk pengalaman mengerjakan proyek IT, disiplin implementasi best practices techniques), Kuliah Interaktif, Pitching & Exhibition.",
						prerequisites: [
							"Rekayasa Perangkat Lunak",
							"Basis Data",
							"Pemrograman Lanjut",
						],
						unlocks: [],
					},
				],
			},
			{
				semester: 7,
				courses: [
					{
						name: "Kerja Praktik",
						code: "CSGE604097",
						sks: 6,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini memberikan kesempatan kepada mahasiswa untuk memperoleh pengalaman dalam penyelesaian permasalahan yang terdapat pada sebuah organisasi menggunakan pengetahuan dan keterampilan di bidang Ilmu Komputer serta Teknologi Informasi dan Komunikasi (TIK) dengan cara terjun secara langsung ke dunia kerja.",
						prerequisites: ["100 SKS"],
						unlocks: [],
					},
					{
						name: "Komputer & Masyarakat",
						code: "CSGE614093",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini bertujuan untuk meningkatkan kesadaran dan kepekaan mahasiswa terhadap berbagai permasalahan sosial dan ekonomi yang terkait dengan implementasi teknologi komputer dalam kehidupan sehari-hari. Mahasiswa akan dihadapkan pada beberapa isu terkait IT dan dituntut untuk menganalisis isu tersebut serta merekomendasikan solusi dari sudut pandang mereka sebagai mahasiswa ilmu komputer. Kuliah ini disampaikan dalam Bahasa Inggris untuk mengasah kemampuan komunikasi Mahasiswa dalam bahasa lingua franca.",
						prerequisites: ["Mahasiswa sudah mengumpulkan 100 SKS"],
						unlocks: [],
					},
				],
			},
			{
				semester: 8,
				courses: [
					{
						name: "Tugas Akhir Individu",
						code: "CSGE604099",
						sks: 6,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini adalah mata kuliah wajib yang bertujuan melatih kemampuan mahasiswa untuk menerapkan pengetahuan dalam bidang ilmu komputer dan/atau sistem informasi pada satu kegiatan penelitian maupun penyelesaian masalah di suatu organisasi, industri dan masyarakat. Setelah mengikuti mata kuliah ini mahasiswa dapat menghasilkan tulisan ilmiah berbahasa Indonesia maupun Inggris dalam bentuk skripsi, makalah maupun technical report. Kegiatan dilakukan secara mandiri di bawah bimbingan oleh minimal seorang dosen.",
						prerequisites: ["Metodologi Penelitian dan Penulisan Ilmiah"],
						unlocks: [],
					},
					{
						name: "Tugas Akhir Proyek Kelompok",
						code: "CSGE604098",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini adalah mata kuliah wajib yang bertujuan melatih kemampuan mahasiswa untuk menerapkan pengetahuan dalam bidang ilmu komputer dan/atau sistem informasi pada satu kegiatan penelitian maupun penyelesaian masalah di suatu organisasi, industri dan masyarakat. Setelah mengikuti mata kuliah ini mahasiswa dapat menghasilkan tulisan ilmiah berbahasa Indonesia maupun Inggris dalam bentuk skripsi, makalah maupun technical report. Kegiatan dilakukan secara berkelompok dengan maksimal terdiri dari 3 mahasiswa di bawah bimbingan oleh minimal seorang dosen.",
						prerequisites: ["Metodologi Penelitian dan Penulisan Ilmiah"],
						unlocks: [],
					},
				],
			},
			{
				semester: "Pilihan",
				courses: [
					{
						name: "Administrasi Sistem",
						code: "CSIE604274",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Kuliah ini membahas administrasi jaringan dan sistem. Metode pengajaran diberikan melalui teori dan praktek di lab. Selain itu, untuk meningkatkan pemahaman dan keahlian, peserta kuliah akan mendapatkan beberapa tugas yang harus dikerjakan secara individu maupun kelompok.",
						prerequisites: ["Jaringan Komputer"],
						unlocks: [],
					},
					{
						name: "Arsitektur Aplikasi Web",
						code: "CSCE604271",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini memberikan pemahaman mendalam tentang arsitektur aplikasi web modern, dengan fokus pada gaya arsitektur yang mendukung pengembangan sistem yang skalabel, fleksibel, dan responsif. Mahasiswa akan mempelajari konsep dasar arsitektur aplikasi web, serta berbagai pola desain dan teknologi yang digunakan dalam membangun sistem yang kompleks.",
						prerequisites: [
							"Jaringan Komputer",
							"Pemrograman Berbasis Platform",
						],
						unlocks: [],
					},
					{
						name: "Basis Data Lanjut",
						code: "CSCE604174",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini memperkenalkan kepada mahasiswa tentang teknologi terkini dan metode yang digunakan dalam sistem dan manajemen basis data. Mahasiswa akan mempelajari lebih dalam terkait teknik-teknik yang digunakan oleh DBMS (Database Management System) untuk memproses, mengoptimasi, dan mengeksekusi query pada multi-user system. Topik umum yang diajarkan antara lain: storage and file structure; indexing, query planning and optimization; transaction processing and concurrency control; data recovery; data warehouse and data mining; distributed database; big data management; dan teori-teori manajemen basis data lainnya. Mata kuliah ini diajarkan melalui kuliah dan beberapa tutorial (praktikum).",
						prerequisites: ["Basis Data"],
						unlocks: [],
					},
					{
						name: "Bioinformatika",
						code: "CSCE604230",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Bioinformatika adalah mata kuliah yang bertujuan untuk memberikan pemahaman mendalam tentang algoritma dasar yang digunakan dalam bioinformatika. Kuliah ini akan membahas prinsip-prinsip algoritmik dan struktur data yang relevan dengan analisis data biologis, serta penerapannya dalam menjawab pertanyaan-pertanyaan biologis yang fundamental. Mahasiswa akan diajarkan untuk merancang, menganalisis, dan mengimplementasikan algoritma untuk menyelesaikan masalah-masalah bioinformatika yang kompleks. Fokus utama adalah pada pengembangan kemampuan berpikir komputasional dan pemecahan masalah dalam konteks biologi molekuler.",
						prerequisites: [
							"Statistika dan Probabilitas",
							"Struktur Data dan Algoritma",
						],
						unlocks: [],
					},
					{
						name: "Computer Vision",
						code: "CSCE604133",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini membahas penggunaan data citra 2 dimensi untuk memahami scene 3 dimensi yang terkandung di dalamnya. Computer vision atau penglihatan mesin berusaha mengadaptasi kemampuan mata manusia melihat persepsi dan memahami informasi yang terkandung di dalamnya melalui teknik matematika. Tugas computer vision ini dapat dibagi menjadi 3 jenis tugas, yaitu: Recognition, yang berusaha mengenali apa yang terkandung di dalam citra; Reconstruction, yang berusaha merekonstruksi citra ke bentuk lainnya; dan Reorganization, yang berusaha me-registrasi citra dari berbagai domain sesuai aslinya. Untuk mencapai hal ini, akan dipelajari konsep di balik penglihatan manusia (human vision) dan korelasinya di dalam penglihatan mesin (computer vision); berbagai teknik pengolahan citra dasar, baik di domain spasial maupun frekuensi. Selanjutnya akan dibahas beberapa aplikasi computer vision, dengan pendekatan solusi berupa teknik konvensional berbasis fitur maupun deep learning. Terakhir, akan disampaikan aplikasi state-of-the-art dalam bidang computer vision dalam beberapa studi kasus. Mahasiswa juga akan dilatih melalui hands-on session pemrograman menggunakan Python secara individu, dan mengerjakan proyek akhir secara berkelompok.",
						prerequisites: ["Kecerdasan Artifisial dan Sains Data Dasar"],
						unlocks: [],
					},
					{
						name: "Deep Learning",
						code: "CSCE604038",
						sks: 4,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Kuliah ini dirancang untuk memberikan pemahaman yang kuat tentang konsep-konsep dasar dan teknik-teknik mutakhir dalam bidang deep learning. Mata kuliah ini akan membahas mulai dari teori dasar probabilitas, informasi, dan optimasi hingga arsitektur jaringan saraf dalam dan aplikasinya pada berbagai jenis data. Mahasiswa akan diajarkan untuk memahami prinsip-prinsip kerja algoritma deep learning, serta mampu merancang, membangun, dan mengevaluasi model-model deep learning untuk menyelesaikan permasalahan dunia nyata. Kuliah ini juga akan menekankan pada pemahaman matematis dan algoritmik yang mendasari teknik-teknik deep learning, sehingga mahasiswa dapat mengembangkan kemampuan untuk melakukan penelitian dan inovasi di bidang ini.",
						prerequisites: ["Kecerdasan Artifisial dan Sains Data Dasar"],
						unlocks: [],
					},
					{
						name: "Ethical Hacking",
						code: "CSCE604258",
						sks: 4,
						category: "Pilihan",
						track: "Arsitektur & Infrastruktur",
						description:
							"Mata kuliah ini membahas tentang teknik-teknik eksploitasi program binary. Topik-topik yang akan dibahas adalah sebagai berikut: konsep dasar memori dan eksekusi program, bahasa assembly, C, debugger, disassembler, atau decompiler, stack overflow, heap-based overflow, teknik-teknik pertahanan dan contoh kerentanan di dunia nyata.",
						prerequisites: [
							"Pengantar Organisasi Komputer",
							"Dasar-Dasar Pemrograman 1",
						],
						unlocks: [],
					},
					{
						name: "Forensik Digital",
						code: "CSCE604156",
						sks: 4,
						category: "Pilihan",
						track: "Arsitektur & Infrastruktur",
						description:
							"Kuliah ini memberikan pemahaman tentang proses-proses dalam cyber forensic dan kaitannya dengan bidang forensic yang lain, menjelaskan tentang teknologi yang digunakan dalam bidang cyber forensic serta tantangannya, serta perancangan penggunaan forensic di korporasi maupun dalam pemerintahan. Selain itu, kuliah ini akan membahas mengenai pencegahan fraud, serta topik topik penelitian dalam bidang ini.",
						prerequisites: ["Jaringan Komputer"],
						unlocks: [],
					},
					{
						name: "Game Development",
						code: "CSCE604021",
						sks: 3,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini memberikan mahasiswa lingkungan kreatif untuk menghasilkan sebuah game serta memperkenalkan mereka pada praktik dan proses pengembangan game. Mata kuliah ini mencakup diskusi mengenai desain dan implementasi video game digital. Isu-isu relevan dalam desain game seperti elemen game, tema, mekanisme, keseimbangan, narasi, dunia, dan estetika dibahas dalam kuliah dan sesi tutorial. Aspek teknis seperti teknologi, platform, dan alat juga diperkenalkan. Sepanjang mata kuliah, mahasiswa akan mengerjakan proyek pengembangan game dengan mengikuti metodologi Agile dan menghasilkan 2 (dua) game sederhana.",
						prerequisites: ["Struktur Data dan Algoritma"],
						unlocks: [],
					},
					{
						name: "Geometri Komputasional",
						code: "CSCE604045",
						sks: 3,
						category: "Pilihan",
						track: "Komputasi & Algoritma",
						description:
							"Geometri Komputasional adalah bidang yang sedang berkembang pesat dalam ilmu komputer, berfokus pada penggunaan teknik komputasi untuk memecahkan masalah geometris. Kuliah ini memperkenalkan Anda pada perpaduan menarik antara matematika dan ilmu komputer. Materi yang akan dipelajari meliputi topik fundamental, seperti Convex hull (selubung cembung) - Mencari bentuk cembung terkecil yang memuat sekumpulan titik, Triangulasi Delaunay - Memecah objek menjadi segitiga yang saling terhubung, dan Voronoi diagrams - Membagi ruang menjadi wilayah-wilayah terdekat ke titik tertentu. Selain itu, kuliah ini juga menyentuk topik yang lebih baru, seperti Curve reconstruction - Merekonstruksi kurva dari kumpulan titik sampel. Melalui kuliah ini, Anda akan memahami konsep dasar geometri diskret dan komputasional, mempelajari algoritma untuk memecahkan berbagai masalah geometris, dan melihat bagaimana matematika dan ilmu komputer dapat bekerja sama untuk memecahkan masalah praktis.",
						prerequisites: ["Struktur Data dan Algoritma"],
						unlocks: [],
					},
					{
						name: "Graf Pengetahuan",
						code: "CSCE604131",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini memperkenalkan konsep Knowledge Graph (KG) dan penerapannya dalam pengelolaan data terstruktur. Anda akan mempelajari prinsip-prinsip KG, perbedaan antara Web tradisional dan Semantic Web, serta model untuk merepresentasikan data dalam bentuk graf.",
						prerequisites: ["Matematika Diskret 2", "Basis Data"],
						unlocks: [],
					},
					{
						name: "Internet of Things",
						code: "CSCE604078",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini memberikan pemahaman komprehensif tentang konsep, teknologi, dan aplikasi Internet of Things (IoT). Mahasiswa akan mempelajari tentang komponen-komponen utama IoT, mulai dari sensor dan aktuator hingga jaringan komunikasi dan platform. Selain itu, kuliah ini juga membahas aspek-aspek penting seperti keamanan, privasi, dan analisis data IoT. Melalui praktikum dan proyek, mahasiswa akan memperoleh pengalaman langsung dalam membangun dan menerapkan sistem IoT.",
						prerequisites: ["Jaringan Komputer"],
						unlocks: [],
					},
					{
						name: "Komputasi Awan",
						code: "CSCE604172",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Kuliah ini berisi konsep dan penerapan infrastruktur teknologi informasi berbasis Cloud Computing. Topik yang diajarkan dalam kuliah ini meliputi: IaaS (Infrastructure as a Service), PaaS (Platform as a Service), SaaS (Software as a Service) dan teknologi pendukung terselenggaranya infrastruktur Cloud Computing seperti hypervisor, virtual server dan container. Tujuan kuliah ini untuk memberikan pengetahuan bagi mahasiswa dalam proses perancangan dan penerapan teknologi berbasis cloud computing serta dapat membantu mahasiswa dalam menggabungkan berbagai macam tools dan teknologi dalam melakukan implementasi infrastruktur berbasis cloud computing.",
						prerequisites: ["Jaringan Komputer"],
						unlocks: [],
					},
					{
						name: "Kriptografi dan Keamanan Informasi",
						code: "CSCE604243",
						sks: 4,
						category: "Pilihan",
						track: "Komputasi & Algoritma",
						description:
							"Matakuliah ini mengajarkan kriptografi dan keamanan informasi yang meliputi dasar-dasar matematik, algoritma, protokol, security engineering, beserta aplikasi aplikasinya dalam berbagai aspek.",
						prerequisites: [
							"Matematika Diskret 1",
							"Matematika Diskret 2",
							"Statistika dan Probabilitas",
						],
						unlocks: [],
					},
					{
						name: "Pemelajaran Mesin",
						code: "CSCE604235",
						sks: 4,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Kuliah ini membahas dasar-dasar pemelajaran mesin (machine learning), yaitu teknik pengembangan perangkat lunak yang dapat menghasilkan model untuk menjelaskan suatu fenomena kompleks dengan cara mengamati sejumlah data. Metode-metode yang diajarkan berbasis pendekatan statistik untuk pengenalan pola, antara lain perceptron, support vector machines, hidden Markov models, expectation maximization, dan lain-lain.",
						prerequisites: ["Kecerdasan Artifisial dan Sains Data Dasar"],
						unlocks: [],
					},
					{
						name: "Pemrograman Fungsional",
						code: "CSCE604123",
						sks: 4,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini mengajarkan paradigma pemrograman Fungsional dan melatih ketrampilan pemrograman secara fungsional. Dengan pemahaman ini dan wawasan paradigma pemrograman yang lebih luas, seseorang dapat memberikan penyelesaian pemrograman yang lebih efektif dan efisien disesuaikan dengan karakter permasalahannya. Ruang lingkup bahan kajian meliput konsep-konsep dasar pemrograman fungsional yang memberikan dasar kompetensi untuk menyelesaikan permasalahan nyata dan juga beberapa konsep-konsep lanjutan bagi peserta yang berminat memperdalam software technology seperti membuat bahasa pemrograman baru dan penelitian dibidang bahasa pemrograman lebih khusus teori Pemrograman Fungsional. Mata kuliah ini disajikan dengan metode pembelajaran jarak jauh, baik dilakukan secara formal terjadwal atau secara mandiri informal. Materi akan disajikan melalui berbagai media video, teks dan forum diskusi serta alat bantu lain. Praktikum dilakukan menggunakan fasilitas online baik sinkronus atau asinkronus.",
						prerequisites: ["Struktur Data dan Algoritma"],
						unlocks: [],
					},
					{
						name: "Pemrograman Kompetitif",
						code: "CSCE604226",
						sks: 3,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini mempelajari berbagai algoritma dan struktur data tingkat lanjut. Algoritma dan struktur data ini diterapkan pada problem yang ditemukan dalam lomba-lomba pemrograman yang merupakan penerapan dalam problem nyata",
						prerequisites: ["Struktur Data dan Algoritma"],
						unlocks: [],
					},
					{
						name: "Pemrograman Logika",
						code: "CSCE604222",
						sks: 4,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini membahas paradigma pemrograman logika, yaitu pemrograman deklaratif yang berbasiskan logika formal. Pembahasan mencakup teori yang mendasari paradigma pemrograman logika dan keterampilan praktis pemrograman dengan menggunakan bahasa pemrograman Prolog untuk memecahkan permasalahan, khususnya yang membutuhkan representasi pengetahuan dan penalaran (knowledge representation and reasoning). Bahasa pengantar yang digunakan dalam pembelajaran adalah Bahasa Indonesia. Moda pembelajaran untuk mata kuliah ini adalah gabungan asinkron dan sinkron secara daring.",
						prerequisites: [
							"Matematika Diskret 1",
							"Dasar-Dasar Pemrograman 1",
						],
						unlocks: [],
					},
					{
						name: "Pemrograman Paralel",
						code: "CSCE604229",
						sks: 4,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Kuliah ini akan membahas konsep dan Teknik pemrograman parallel, yang mencakup arsitektur dan model pemrograman parallel. BAgaimana mengatasi pemecahan masalah komputasi data besar dengan infrastruktur komputasi kinerja tinggi (IKKT - High Performance Computing). Kuliah ini memberikan mahasiswa pemahaman konsep proses yang membutuhkan infrastruktur KKT, kompetensi untuk menganalisis masalah yang perlu diatasi dengan pendekatan parallel dengan pemrograman di lingkungan klister dan GPU.",
						prerequisites: [
							"Kalkulus 2",
							"Sistem Operasi",
							"Dasar-Dasar Pemrograman 2",
							"Aljabar Linier",
						],
						unlocks: [],
					},
					{
						name: "Pemrograman Sistem",
						code: "CSCE604227",
						sks: 3,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini akan mendalami konsep-konsep sebuah sistem operasi, khususnya GNU/Linux, dengan penekanan khusus pada kemampuan praktis untuk mengimplementasikan dan memodifikasi program di bawah lapisan aplikasi. Para peserta akan diperkenalkan pada berbagai lapisan implementasi dari sebuah sistem operasi, seperti pengelolaan proses, sistem berkas, IPC, soket jaringan, dan struktur kernel. Latihan dan tugas akan menggunakan bahasa C/C++, serta beberapa perangkat scripting untuk memanipulasi berkas.",
						prerequisites: ["Sistem Operasi", "Struktur Data dan Algoritma"],
						unlocks: [],
					},
					{
						name: "Pemrosesan Bahasa Lisan",
						code: "CSCE604032",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Pemrosesan Bahasa Lisan adalah bidang ilmu yang berfokus pada pengembangan sistem komputer yang dapat memahami dan menghasilkan bahasa manusia yang diucapkan. Mata kuliah ini akan membahas dasar-dasar teori bahasa lisan, teknik-teknik pengolahan sinyal audio, serta aplikasi-aplikasi praktis dalam bidang ini. Mahasiswa akan diajarkan untuk memahami bagaimana suara manusia diubah menjadi representasi digital, bagaimana komputer dapat mengenali dan menginterpretasikan ucapan manusia, serta bagaimana komputer dapat menghasilkan ucapan yang terdengar alami. Selain itu, mahasiswa juga akan mempelajari tentang sistem dialog berbasis suara yang memungkinkan interaksi manusia- komputer yang lebih natural.",
						prerequisites: ["Kecerdasan Artifisial dan Sains Data Dasar"],
						unlocks: [],
					},
					{
						name: "Penambangan Data",
						code: "CSCE604037",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini memperkenalkan konsep dan teknik fundamental untuk menambang atau menemukan pengetahuan dari data yang diberikan. Peserta akan dibekali pemahaman teoritis yang fundamental dan keterampilan praktis selama mengikuti perkuliahan.",
						prerequisites: [
							"Basis Data",
							"Kecerdasan Artifisial dan Sains Data Dasar",
						],
						unlocks: [],
					},
					{
						name: "Pengajaran Berbantuan Komputer",
						code: "CSCE604183",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Mata ajar ini membahas dasar-dasar pengajaran dan pembelajaran menggunakan teknologi komputer. Bahan kajian meliputi prinsip dasar pembelajaran, proses pembelajaran dan memori pada manusia, teori pembelajaran (behaviorism, cognitivism, constructivism), metakognisi, self-regulated learning dan berpikir kritis, rancangan pembelajaran daring, pembelajaran kolaboratif daring, konten multimedia pembelajaran, authoring tools, dan learning management system (LMS). Selain itu, dibahas pula isu-isu terkini dalam lingkungan pembelajaran berbasis komputer, seperti Massive Open Online Course (MOOC) dan personalized learning, agen pedagogis, Skydu Academy.",
						prerequisites: ["Pemrograman Berbasis Platform"],
						unlocks: [],
					},
					{
						name: "Pengolahan Bahasa Manusia",
						code: "CSCE604031",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini mempelajari berbagai teknik untuk membangun perangkat lunak yang mengolah bahasa manusia. Secara umum, struktur materi kuliah ini diatur sesuai dengan tingkat representasi bahasa, mulai dari (i) morfologi: finite state, two-level morphology, part of speech tagging, (ii) sintaks: context free grammars, probabilistic parsing, dependency parsing; (iii) semantik: rule-based semantic analysis; (iv) discourse: discourse structure, coreference resolution. Mata kuliah ini fokus pada Natural Language Understanding, tapi juga memperkenalkan secara singkat Natural Language Generation. Kuliah ini membahas pendekatan simbolik dan pendekatan statistik dalam menyelesaikan sejumlah permasalahan NLP. Ada beberapa tugas yang melatih peserta kuliah untuk memahami pemodelan bahasa dan peserta akan membangun sebuah sistem perangkat lunak yang mampu mengolah masukan berupa bahasa manusia. Tujuan tugas yang diberikan adalah untuk mendukung pemahaman konsep, melatih kemampuan praktikal, dan memberikan pengalaman bagi mahasiswa untuk mengenali tool dan resource NLP yang ada.",
						prerequisites: ["Teori Bahasa & Automata"],
						unlocks: [],
					},
					{
						name: "Penjaminan Mutu Perangkat Lunak",
						code: "CSCE604126",
						sks: 4,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini membahas isu-isu kualitas sepanjang proses pengembangan perangkat lunak, termasuk desain, implementasi, pengujian, dan pengiriman. Isu-isu terkait aktivitas pra-proyek dan pasca penutupan proyek juga akan dibahas. Standar kualitas yang relevan akan ditinjau. Metode spesifik untuk meningkatkan standar kualitas dalam pengembangan dan proses juga dibahas.",
						prerequisites: ["Rekayasa Perangkat Lunak"],
						unlocks: [],
					},
					{
						name: "Persamaan Differensial",
						code: "CSCE604212",
						sks: 3,
						category: "Pilihan",
						track: "Matematika & Komputasi Ilmiah",
						description:
							"Mata kuliah ini dirancang untuk memberikan pemahaman dan pengetahuan mengenai berbagai jenis persamaan diferensial yang ada, metode penyelesaiannya, serta penerapannya dalam berbagai bidang melalui pemodelan matematika dari persamaan diferensial tersebut. Mata kuliah ini menitikberatkan pemodelan matematika dari berbagai fenomena alam sesuai dengan kaidah hukum alam yang berlaku dengan menggunakan pendekatan persamaan diferensial terutama persamaan diferensial derajat satu atau dua. Peserta dianjurkan untuk terbiasa menggunakan aplikasi komputasi seperti MAPLE, MATLAB, MATHEMATICA, dan yang lain.",
						prerequisites: ["Kalkulus 2", "Aljabar Linier"],
						unlocks: [],
					},
					{
						name: "Praktikum Pemrograman Kompetitif",
						code: "CSCE604225",
						sks: 1,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata Kuliah ini memberikan aspek praktikal yang lebih banyak untuk mata kuliah CSCE604226 Pemrograman Kompetitif. Peserta akan mendapatkan pengalaman Latihan soal- soal pemrograman kompetitif yang lebih intensif.",
						prerequisites: ["Struktur Data dan Algoritma"],
						unlocks: [],
					},
					{
						name: "Representasi Pengetahuan dan Penalaran",
						code: "CSCE604036",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini memperkenalkan salah satu bidang AI yang berkaitan dengan bagaimana pengetahuan (knowledge) direpresentasikan secara simbolik sehingga dapat dimanipulasi secara otomatis oleh program yang melakukan penalaran (reasoning) terhadap pengetahuan tersebut. Peserta mata kuliah ini akan dibekali dengan konsep-konsep yang merupakan fondasi dasar dari knowledge representation and reasoning untuk dapat memahami topik-topik lanjut dan mengikuti perkembangan terkini, serta mengembangkan aplikasi AI di bidang ini.",
						prerequisites: ["Matematika Diskret 1", "Matematika Diskret 2"],
						unlocks: [],
					},
					{
						name: "Robotika",
						code: "CSCE604232",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata ajar Robotika memberikan pengantar tentang implementasi robot dari sudut pandang ilmu komputer. Topik yang dibahas pada kuliah ini meliputi pergerakan di tempat, perpindahan, penagkapan informasi dari luar, lokalisasi, pemetaan, dan navigasi. Pada kuliah ini, mahasiswa akan melakukan praktikum menggunakan simulasi. Robot tersebut dapat diprogram dengan menggunakan berbagai algoritma pembelajaran mesin maupun kecardasan buatan. Hal tersebut akan dapat membuat pemelajar memiliki ketangkasan maupun pemahaman menyeluruh tentang dunia robotika dalam riset maupun industri. Metode pengajaran yang digunakan berbasis blended learning, yang menggabungkan metode pembelajaran face-to-face antara fasilitator dan peserta kuliah (synchronous) dengan metode interaksi online yang menyediakan materi pembelajaran dan ruang diskusi secara online (asynchronous). Dikarenakan kondisi pandemi COVID-19, seluruh kegiatan synchronous diubah menjadi pembelajaran jarak jauh yang dilakukan secara daring, dan seluruh kegiatan praktikum akan menggunakan simulasi. Bahasa yang digunakan dalam kegiatan belajar mengajar adalah Bahasa Indonesia.",
						prerequisites: [
							"Pengantar Organisasi Komputer",
							"Kecerdasan Artifisial dan Sains Data Dasar",
						],
						unlocks: [],
					},
					{
						name: "Simulasi dan Pemodelan",
						code: "CSCE604111",
						sks: 3,
						category: "Pilihan",
						track: "Matematika & Komputasi Ilmiah",
						description:
							"Mata kuliah ini memperkenalkan dasar-dasar pemodelan sistem menggunakan simulasi komputer dan teknik matematik terutama dengan pendekatan memakai persamaan diferensial (pemahaman topik/pernah mengambil mata kuliah Persamaan Diferensial akan sangat membantu). Beberapa studi kasus akan dijabarkan baik dalam perkuliahan maupun dalam latihan dan tugas-tugas perkuliahan yang diberikan. Contoh-contoh pemodelan sistem yang didiskusikan akan mencakup berbagai bidang dengan penekanan pada analisa dan pemodelan sistem komputer dan komunikasi , sistem antrian, dan beberapa sistem lain dengan menggunakan beberapa paradigma pemodelan seperti, simulasi, teori antrian, dan pendekatan proses stochastic.",
						prerequisites: ["Statistika dan Probabilitas"],
						unlocks: [],
					},
					{
						name: "Sistem Terdistribusi",
						code: "CSCE604254",
						sks: 3,
						category: "Pilihan",
						track: "Arsitektur & Infrastruktur",
						description:
							"Mata kuliah ini memperkenalkan prinsip dan teknologi dasar dari sistem terdistribusi, membahas algoritma – algoritma yang menyelesaikan masalah dasar sistem terdistribusi termasuk model komunikasi, sinkronisasi waktu, urutan peristiwa, pesan broadcast, konsensus dan konsistensi, serta membekali mahasiswa dengan pemahaman terhadap aplikasi yang menggunakan sistem terdistribusi seperti message brokering system, streaming platform, collaboration tools berbasis CRDT, dan blockchain. Setelah menyelesaikan mata kuliah ini, mahasiswa mampu membangun aplikasi yang berbasis sistem terdistribusi dan merancang sistem terdistribusi yang efektif dan efisien. Topik – topik yang dibahas mencakup: pengenalan terhadap sistem terdistribusi, model sistem terdistribusi, waktu, jam, dan urutan peristiwa, replikasi, konsensus, konsistensi dan studi kasus teknologi terkini. Metode pembelajaran menggunakan pendekatan flipped classroom.",
						prerequisites: ["Jaringan Komputer"],
						unlocks: [],
					},
					{
						name: "Sistem Tertanam",
						code: "CSCE604151",
						sks: 3,
						category: "Pilihan",
						track: "Arsitektur & Infrastruktur",
						description:
							"Mata ajar Sistem Tertanam (Embedded Systems) memperkenalkan sistem berbasis microcontroller yang merupakan perpaduan antara hardware dan software untuk melakukan suatu fungsi tertentu. Sejak ditemukannya mikroprosesor pada awal tahun 70- an, teknologi dan aplikasi sistem tertanam berkembang sangat pesat dan merambah ke berbagai aspek kehidupan manusia seperti mobile devices (telepon genggam, MP3 player, dsb), medical systems, robotika, automation, dsb. Mata kuliah ini ditujukan untuk memberikan bekal untuk perancangan sistem tertanam, terutama dari aspek kemampuan menghasilkan software yang andal.",
						prerequisites: ["Pengantar Organisasi Komputer"],
						unlocks: [],
					},
					{
						name: "Software Product Line Engineering",
						code: "CSCE604028",
						sks: 3,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini memperkenalkan salah satu metode pengembangan perangkat lunak yang disebut dengan Software Product Line Engineering (SPLE). SPLE menekankan pada aspek variability management, reusability, dan juga product generation. Di tengah perkembangan teknologi yang meningkat pesat, suatu perangkat lunak dapat memiliki kemiripan fitur dengan perangkat lunak lain tetapi juga memiliki variasi tertentu. Dengan paradigma SPLE, developer dapat menghasilkan perangkat lunak yang bervariasi dalam satu kali development. Pada kuliah ini akan diperkenalkan konsep dasar SPLE yang meliputi fase domain engineering dan application engingering. Selain itu, praktik teknis juga akan diperkenalkan agar mahasiswa dapat memanfaatkan tools yang ada untuk perangkat lunak secara otomatis berdasarkan variasi fitur yang dipilih. Studi kasus terkait perangkat lunak yang memiliki variability akan digunakan untuk mengilustrasikan proses pengembangan. Setelah mengambil kuliah ini, mahasiswa diharapkan dapat terampil untuk memodelkan dan mengimplementasikan perangkat lunak yang memiliki variasi sesuai dengan paradigma SPLE.",
						prerequisites: ["Rekayasa Perangkat Lunak"],
						unlocks: [],
					},
					{
						name: "Technopreneurship",
						code: "CSIE604290",
						sks: 3,
						category: "Pilihan",
						track: "Kepribadian & Keterampilan Berkarya",
						description:
							"Mata ajar ini memperkenalkan dan memberikan wawasan tentang kewirausahaan di bidang teknologi (technology-entrepreneurship).",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Teknik Kompilator",
						code: "CSCE604128",
						sks: 4,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata ajar ini mempersiapkan mahasiswa untuk dapat menyelesaikan masalah yang terkait dengan perancangan bahasa pemrograman dan teknik teknik pembentuk kompilator – program pemroses bahasa pemrograman. Secara umum mahasiswa akan memahami komponen suatu kompilator, bagaimana interaksi antara komponen dan bagaimana pembuatan dan pengembangan serta integrasi seluruh komponen tersebut.",
						prerequisites: [
							"Teori Bahasa & Automata",
							"Struktur Data dan Algoritma",
						],
						unlocks: [],
					},
					{
						name: "Teknologi Mobile",
						code: "CSCE604179",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata ajar ini merupakan pengantar bidang komunikasi mobile yang ditujukan untuk memberikan gambaran umum tentang teknologi mobile dari sudut pandang ilmu komputer. Pada awal perkuliahan, diberikan beberapa dasar tentang teknologi transmisi nirkabel. Topik yang dibahas meliputi: frekuensi yang digunakan untuk komunikasi, sinyal, skema dasar multiplexing dan modulasi, protokol akses, serta persyaratan aplikasi. Berbagai teknologi mobile seperti CDMA, GSM, DECT, W-CDMA, CDMA2000, dan UMTS akan diperkenalkan sebagai bagian dari sistem komunikasi mobile. Dalam kuliah ini juga dibahas bagaimana memanfaatkan sensor dan layanan yang tersedia dalam perangkat komunikasi mobile untuk membangun aplikasi diatas platform mobile.",
						prerequisites: ["Jaringan Komputer"],
						unlocks: [],
					},
					{
						name: "Temu-balik Informasi",
						code: "CSCE604135",
						sks: 4,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Kuliah Information Retrieval (Temu-Balik Informasi) menyampaikan ilmu seputar sains dan teknologi pengembangan search engine. Pada bagian pertama, peserta akan mempelajari struktur data dan algoritme fundamental untuk sebuah text retrieval system. Pada bagian kedua, peserta akan mendalami topik-topik terkait data-driven retrieval model dan juga bagaimana melakukan evaluasi terhadap efektifitas dari sebuah search engine.",
						prerequisites: ["Kecerdasan Artifisial dan Sains Data Dasar"],
						unlocks: [],
					},
					{
						name: "Topik Khusus Ilmu Komputer",
						code: "CSCE604029",
						sks: 3,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini akan membahas perkembangan riset dan teknologi terkini pada bidang ilmu komputer. Isi materinya akan disesuaikan dengan isu-isu terkini pada saat mata kuliah ditawarkan.",
						prerequisites: ["100 SKS"],
						unlocks: [],
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
		courseMapUrl: "https://course.csui.dev/?prodi=IS",
		driveUrl: "https://course.csui.dev/?prodi=SI",
		semesters: [
			{
				semester: 1,
				courses: [
					{
						name: "MPK Agama",
						code: "UIGE600004",
						sks: 2,
						category: "Wajib Universitas",
						description:
							"Pemaparan materi oleh pengampu untuk menga online/offline; diskusi focus group dan home group; aktivitas diskusi dengan pengisian borang",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "MPK B. Inggris",
						code: "UIGE600003",
						sks: 2,
						category: "Wajib Universitas",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Kalkulus 1",
						code: "CSGE601012",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Kalkulus merupakan mata ajaran wajib di Fasilkom dengan materi utama Kalkulus Dasar. Ada dua masalah dasar dalam Kalkulus, yaitu masalah garis singgung dan luas. Masalah garis singgung adalah bagaimana menentukan gradien garis singgung di suatu titik pada kurva. Sedangkan masalah luas adalah bagaimana menentukan luas daerah bidang di antara suatu kurva sumbu-x pada interval [a, b]. Kedua masalah tersebut melibatkan grafik fungsi bernilai nyata y = f(x), dan jawabannya merupakan limit perubahan dan jumlahan, yang kemudian kita kenal sebagai turunan dan integral. Oleh karena itu, Kalkulus sering disebut sebagai ilmu yang mempelajari limit. Jawaban dua masalah geometris tersebut merupakan kunci dari berbagai masalah terapan dalam ilmu pengetahuan dan teknologi.",
						prerequisites: [],
						unlocks: ["Pengantar Statistika"],
					},
					{
						name: "Matematika Diskret 1",
						code: "CSGE601010",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata ajar ini memperkenalkan topik-topik dasar matematika diskrit, antara lain logika, struktur diskret dasar, dan analisis kombinatorik, yang menjadi dasar bagi topik-topik lanjutan dan aplikasinya pada ilmu komputer/sistem informasi.",
						prerequisites: [],
						unlocks: [
							"Pengantar Statistika",
							"Kriptografi dan Keamanan Informasi (Cryptography & Information Security)",
						],
					},
					{
						name: "Dasar-Dasar Pemrograman 1",
						code: "CSGE601020",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini bertujuan untuk mengajarkan konsep-konsep dasar serta teknik untuk membuat program komputer menggunakan Bahasa Pemrograman Python. Mata kuliah ini diajarkan melalui kombinasi kuliah tatap muka serta sesi latihan pemrograman dengan setiap peserta kuliah mengakses PC yang tersambung ke Internet. Mata kuliah ini mempraktekkan prinsip pemrograman yang tidak bisa diajarkan dalam cara yang sepenuhnya linier, namun topik-topik awal tetap dibahas lagi di belakang dengan tingkat kedalaman yang lebih canggih. Bahasa yang digunakan adalah Phyton.",
						prerequisites: [],
						unlocks: [
							"Dasar-Dasar Pemrograman 2",
							"Pemrograman Berbasis Platform",
							"Struktur Data & Algoritma",
							"Peretasan secara Etis (Ethical Hacking)",
						],
					},
					{
						name: "Manajemen Bisnis",
						code: "CSIM601190",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Kuliah ini bertujuan untuk meningkatkan pengetahuan dan kemampuan mahasiswa terkait aspek bisnis dan manajemen di dalam organisasi. Melalui contoh dan studi kasus, mahasiswa akan memahami konsep dasar organisasi bisnis serta membangun keterampilan analisis manajerial yang dibutuhkan lulusan sistem informasi. Bahasa yang akan digunakan pada mata kuliah ini adalah kombinasi antara Bahasa Indonesia dan Bahasa Inggris. Mayoritas bahan ajar dan ujian tertulis akan menggunakan Bahasa Inggris.",
						prerequisites: [],
						unlocks: [
							"Sistem Informasi Perusahaan dan Akuntansi",
							"Manajemen Proyek Teknologi Informasi",
						],
					},
					{
						name: "Komunikasi Bisnis dan Teknis",
						code: "CSIM601191",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini berfokus pada strategi dan keterampilan untuk menulis dan berbicara yang efektif dalam organisasi bisnis. Mata kuliah ini akan mengajarkan siswa teknik- teknik dasar komunikasi yang berguna dalam konteks sehari-hari organisasi/bisnis.",
						prerequisites: [],
						unlocks: [],
					},
				],
			},
			{
				semester: 2,
				courses: [
					{
						name: "MPKT (MPKT)",
						code: "UIGE600006",
						sks: 6,
						category: "Wajib Universitas",
						description:
							"Pemaparan materi oleh pengampu diruang kelas online/offline; diskusi focus group dan home group; aktivitas diskusi dengan pengisian borang",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Dasar-Dasar Pemrograman 2",
						code: "CSGE601021",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini merupakan lanjutan dari Dasar-Dasar Pemrograman 1, yang berfokus pada paradigma pengembangan perangkat lunak skala medium, terutama dengan paradigma pemrograman berorientasi objek. Bahasa pemrograman yang digunakan adalah Java.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: ["Pengantar Keamanan Perangkat Lunak", "Basis Data"],
					},
					{
						name: "Matematika Diskret 2",
						code: "CSGE601011",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini merupakan kelanjutan dari mata kuliah Matematika Diskrit 1 dan memberikan landasan teoritis untuk ilmu komputer.",
						prerequisites: [],
						unlocks: [
							"Kriptografi dan Keamanan Informasi (Cryptography & Information Security)",
						],
					},
					{
						name: "Dasar-Dasar Arsitektur Komputer",
						code: "CSIM601251",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Melalui kuliah ini mahasiswa diharapkan dapat mengerti komponen dasar dari suatu sistem komputer dan bagaimana komponen-komponen ini bekerja sama untuk menghasilkan fungsi yang diinginkan oleh pemakai komputer. Kuliah akan terbagi menjadi 2 bagian. Bagian pertama dari kuliah ini akan mempelajari tentang Sistem Digital, dan bagian kedua akan mempelajari tentang Arsitektur Komputer. Topik yang dicakup pada Sistem Digital adalah me-review representasi biner; merancang dan menganalisa rangkaian kombinasi; merancang dan menganalisa rangkaian sekuensial; komponen dasar lainnya seperti counter, register dan memori. Topik yang dibahas pada Arsitektur Komputer adalah: bahasa assembly, bagian-bagian dari suatu processor, siklus kerja processor, dan memory hierarchy.",
						prerequisites: [],
						unlocks: ["Pengantar Sistem Operasi"],
					},
					{
						name: "Prinsip-prinsip Sistem Informasi",
						code: "CSIM601280",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini mengajarkan mahasiswa terkait aspek dan pengetahuan dasar serta prinsip-prinsip sistem informasi.",
						prerequisites: [],
						unlocks: [
							"Manajemen Proyek Teknologi Informasi",
							"Analisis dan Perancangan Sistem Informasi",
							"Manajemen Sistem Informasi",
							"Pembangunan TIK untuk Negara Berkembang (ICT for Development)",
							"Dasar-dasar Audit SI (Introduction to IS Audit)",
						],
					},
				],
			},
			{
				semester: 3,
				courses: [
					{
						name: "Pemrograman Berbasis Platform",
						code: "CSGE602022",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini akan membahas pengembangan perangkat lunak pada berbagai macam platform. Materi yang dipelajari berhubungan dengan berbagai macam konsep dan peraturan pemrograman yang diterapkan pada suatu platform. Sebagai contoh pemrograman pada platform yang relevan saat ini adalah perangkat bergerak (mobile), web, robotik dan kecerdasan buatan, perangkat tertanam, dan gaming. Setiap platform memiliki karakteristik yang berbeda mulai dari keteraturan pola pemrograman, mekanisme pemrosesan, interaksi antar komponen/application programming interface (API)/hardware, dan interaksi dengan pengguna yang diterapkan pada pemrograman high-level.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: ["Sistem Interaksi"],
					},
					{
						name: "Struktur Data & Algoritma",
						code: "CSGE602040",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini mengajarkan teknik-teknik dasar untuk abstraksi struktur data, algoritma-algoritma akses dan manipulasi struktur-struktur abstraksi tersebut; serta pengantar analisis kompleksitas eksekusi algoritma-algoritma tersebut.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: [
							"Kecerdasan Artifisial & Sains Data Dasar",
							"Arsitektur dan Pemrograman Aplikasi Perusahaan",
						],
					},
					{
						name: "Aljabar Linier",
						code: "CSGE602012",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini membekali mahasiswa keterampilan pemecahan masalah terkait dengan aljabar vektor dan meningkatkan penalaran matematis (logis, konsisten, jelas, seksama) yang merupakan disposisi dan keterampilan berpikir kritis. Bahan kajian meliputi sistem persamaan linear, aljabar matriks, ruang vektor dan hasil kali dalam, nilai dan vektor eigen, serta transformasi linear.",
						prerequisites: [],
						unlocks: ["Kecerdasan Artifisial & Sains Data Dasar"],
					},
					{
						name: "Pengantar Sistem Operasi",
						code: "CSIM602155",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini membahas tentang konsep dan hal-hal yang berkaitan dengan Sistem Operasi (Operating System), dengan cakupan materi yang telah disesuaikan dengan kebutuhan program studi sistem informasi.",
						prerequisites: ["Dasar-Dasar Arsitektur Komputer"],
						unlocks: ["Jaringan Komunikasi dan Data"],
					},
					{
						name: "Pengantar Statistika",
						code: "CSIM102113",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Setelah lulus mata kuliah ini mahasiswa diharapkan mampu menerapkan konsep-konsep probabilitas dan statistik untuk menginterpretasikan data guna mendukung pemecahan masalah. Metode pembelajaran yang digunakan dalam mata kuliah ini adalah pembelajaran kooperatif. Ruang lingkup yang dibahas mencakup statistik deskriptif, teori probabilitas dasar, Teorema Bayes, variabel acak (Bernoulli, Binomial, Geometrik, Poisson, Uniform, Eksponensial, Normal), distribusi statistik sampel (central limit theorem), estimasi parameter (estimasi titik dan interval), dan uji hipotesis (mean dan varians). Mata kuliah ini juga berfokus untuk mengembangkan pengetahuan terkait teknik-teknik statistik lanjut yang diperlukan untuk mengolah data, sehingga bermanfaat dalam proses pengambilan keputusan. Mata kuliah ini mengembangkan keterampilan untuk memilih teknik statistik yang tepat untuk memecahkan kasus tertentu.",
						prerequisites: ["Kalkulus 1", "Matematika Diskret 1"],
						unlocks: ["Kecerdasan Artifisial & Sains Data Dasar"],
					},
				],
			},
			{
				semester: 4,
				courses: [
					{
						name: "Pengantar Keamanan Perangkat Lunak",
						code: "CSGE602023",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini membahas mengenai keamanan perangkat lunak. Topik yang dibahas mencakup antara lain: Manajemen keamanan (informasi, kebijakan, prosedur), Manajemen resiko, Model dan tingkat keamanan pada jaringan, peralatan, aplikasi, serta kontrol akses dan keamanan fisik.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						unlocks: [],
					},
					{
						name: "Sistem Interaksi",
						code: "CSGE602024",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah akan membekali mahasiswa dengan pengetahuan mengenai perancangan antarmuka untuk perangkat lunak. Capaian pembelajaran mata kuliah ini adalah mahasiswa mampu menerapkan prinsip-prinsip sistem interaksi dalam mengembangkan sebuah aplikasi atau menawarkan sebuah alternatif desain interaksi yang lebih baik. Mata kuliah disampaikan melalui metode pembelajaran aktif melalui diskusi kelompok kecil (small group discussion), pembelajaran berbasis proyek (Project-based Learning), dan penggunaan Learning Management System SC ELE. Ruang lingkup yang dibahas mencakup konteks historis dari human-computer interaction (HCI), interaction design, cognition, teknik-teknik dalam HCI, aspek sosial dalam HCI, pengumpulan dan analisis data, proses desain interaksi, prototyping, dan evaluasi.",
						prerequisites: ["Pemrograman Berbasis Platform"],
						unlocks: ["Proyek Pengembangan Sistem Informasi"],
					},
					{
						name: "Basis Data",
						code: "CSGE602070",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini membahas konsep dasar dari manajemen database yang mencakup aspek pemodelan dan desain, bahasa dan fasilitas, implementasi dan penggunaan database.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						unlocks: [
							"Analisis dan Perancangan Sistem Informasi",
							"Proyek Pengembangan Sistem Informasi",
							"Basis Data Lanjut (Advanced Databases)",
							"Manajemen Infrastruktur (Infrastructure Management)",
							"Inteligensi Bisnis (Business Intelligence)",
							"Dasar-dasar Audit SI (Introduction to IS Audit)",
						],
					},
					{
						name: "Sistem Informasi Perusahaan dan Akuntansi",
						code: "CSIM602263",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini bertujuan untuk memberikan pengetahuan terhadap solusi SI terintegrasi bagi perusahaan dan metode implementasinya. Mata kuliah ini akan mengajarkan mahasiswa proses bisnis utama dan proses bisnis pendukung dalam suatu organisasi dan bagaimana memodelkan proses bisnis tersebut, termasuk pencatatan keuangan di dalam perusahaan. Di samping itu, diberikan pula kebutuhan terhadap solusi SI (aplikasi) yang dapat digunakan untuk mengimplementasikan proses bisnis tersebut. Proses bisnis utama yang diberikan dalam mata ajar ini mengambil contoh di bidang manufacturing yaitu meliputi proses utama di 3 area yaitu di area sales and marketing, procurement, dan production. Selain itu, akan diperkenalkan juga proses bisnis pendukung terkait pengelolaan sumber daya manusia dan keuangan perusahaan. Untuk proses bisnis utama, pembahasan area sales and marketing juga mencakup pengenalan konsep customer relationship management sementara untuk area production and procurement akan juga diperkenalkan konsep supply chain management. Kuliah ini juga bertujuan untuk meningkatkan pengetahuan dan kemampuan mahasiswa terkait pencatatan keuangan di perusahaan. Untuk pencatatan keuangan, peserta kuliah akan diajarkan dari mulai dasar pencatatan, seperti pengenalan akun, debit-kredit, cara membaca laporan keuangan, serta membuat laporan keuangan terintegrasi. Selain itu. peserta akan diajarkan mengenai implementasi Sistem Informasi Akuntansi.",
						prerequisites: ["Manajemen Bisnis"],
						unlocks: [
							"Kesehatan Elektronik (E-health)",
							"Sistem Informasi Sumber Daya Manusia (Human Resource Information Systems)",
							"Manajemen Hubungan Pelanggan (Customer Relationship Management)",
							"Manajemen Rantai Suplai (Supply Chain Management)",
						],
					},
					{
						name: "Manajemen Proyek Teknologi Informasi",
						code: "CSIM602281",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini berfokus pada standar pengetahuan yang dibutuhkan oleh Project Management Institute (PMI), yang merupakan organisasi sertifikasi terdepan di dunia untuk para profesional di semua disiplin Manajemen Proyek. Mata kuliah ini juga akan memperluas pengetahuan dan keterampilan dalam manajemen proyek TI untuk sistem perusahaan, dan akan memberikan kesempatan bagi mahasiswa untuk belajar bagaimana praktik dan prosedur yang digunakan dalam organisasi. Fokus khusus dari mata kuliah ini adalah bagaimana seorang manajer proyek bisa mengendalikan semua batasan dalam pelaksanaan proyek, baik dalam hal kapasitas staf, jadwal pengembangan sistem, biaya, perkiraan upaya, dan kualitas, serta bagaimana batasan-batasan ini terkait dengan konsep PMI®, dan bagaimana pengelolaannya sebaik-baiknya dalam pelaksanaan proyek dari berbagai skala.",
						prerequisites: [
							"Prinsip-prinsip Sistem Informasi",
							"Manajemen Bisnis",
						],
						unlocks: [],
					},
				],
			},
			{
				semester: 5,
				courses: [
					{
						name: "Arsitektur dan Pemrograman Aplikasi Perusahaan",
						code: "CSIM603026",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini memperkenalkan teknologi pengembangan aplikasi enterprise terkini. Dimulai dari konsep pengembangan aplikasi, framework pengembangan terbaru, penggunaan database dan studi kasus yang dituangkan dalam tugas proyek berkelompok.",
						prerequisites: ["Struktur Data & Algoritma"],
						unlocks: ["Proyek Pengembangan Sistem Informasi"],
					},
					{
						name: "Analisis dan Perancangan Sistem Informasi",
						code: "CSIM603183",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini akan membahas konsep analisis dan perancangan sistem informasi (ANAPERANCIS), metodologi tentang bagaimana cara memperoleh kebutuhan pengguna sehingga rancangan SI dapat memenuhi kebutuhan organisasi. Berbagai pendekatan yang digunakan dalam metodologi ANAPERANCIS akan dibahas, termasuk penggunaan berbagai metode, teknik, proses, prosedur, dan alat untuk analisis dan perancangan. Selain itu, mata kuliah ini juga akan mengeksplorasi peran ANAPERANCIS yang telah beralih dari sekedar pendukung dalam pengembangan SI, menjadi fungsi inti (enabler) yang mendorong SI yang bersifat adaptif dan dapat diterima, melalui perbaikan kualitas informasi, perbaikan pengambilan keputusan dan perbaikan pembagian sumber daya, dan lain-lain. Perancangan SI harus dapat mencerminkan SI yang dapat membawa daya saing dan mempertahankan posisi strategis sebuah organisasi.",
						prerequisites: ["Basis Data", "Prinsip-prinsip Sistem Informasi"],
						unlocks: [
							"Proyek Pengembangan Sistem Informasi",
							"Manajemen Proses Bisnis (Business Process Management)",
						],
					},
					{
						name: "Manajemen Sistem Informasi",
						code: "CSIM603182",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini mengajarkan mahasiswa terkait aspek dan pengetahuan mengelola sistem informasi dalam suatu organisasi bisnis, baik dari aspek strategis maupun teknis. Mata kuliah ini merupakan jembatan antara dunia kampus dengan dunia kerja.",
						prerequisites: ["Prinsip-prinsip Sistem Informasi"],
						unlocks: [
							"Tata Kelola SI/TI (IT Governance)",
							"Arsitektur Perusahaan (Enterprise Architecture)",
							"Keamanan Siber Level Strategis Perusahaan (Strategic Cybersecurity)",
						],
					},
					{
						name: "Jaringan Komunikasi dan Data",
						code: "CSIM603154",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini memperkenalkan model referensi ISO/OSI dan TCP/IP untuk menganalisis, merancang, mengimplementasikan, dan mengelola jaringan komunikasi data.",
						prerequisites: ["Pengantar Sistem Operasi"],
						unlocks: [
							"Manajemen Layanan TI (IT Service Management)",
							"Manajemen Infrastruktur (Infrastructure Management)",
							"Teknologi Mobile",
							"Dasar-dasar Audit SI (Introduction to IS Audit)",
							"Administrasi Sistem (System Administration)",
							"Forensik Digital (Digital Forensics)",
							"Kriptografi dan Keamanan Informasi (Cryptography & Information Security)",
						],
					},
				],
			},
			{
				semester: 6,
				courses: [
					{
						name: "Metodologi Penelitian & Penulisan Ilmiah",
						code: "CSGE603091",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							'Mata kuliah ini berfokus pada metodologi penelitian dan penulisan ilmiah pada bidang Ilmu Komputer, Sistem Informasi, dan Teknologi Informasi (CS/SI/TI). Mata kuliah ini akan mengajarkan peserta untuk memiliki cara berpikir proses yang sistematis dan logis, secara ilmiah. Dalam mata kuliah ini peserta diminta untuk melakukan penelitian mini dan menulis karya ilmiah sebagai proses terintegrasi, di bidang CS/SI/TI. Secara garis besar, mata kuliah ini membahas bagaimana melakukan penelitian di bidang CS/SI/TI, sehingga "peneliti" dapat mengelola sumber dayanya secara optimal dan menulis laporan penelitian secara ilmiah. Selain itu, mata kuliah ini akan mengeksplorasi peran penelitian sebagai fungsi inti dalam mendorong pemahaman tentang pengetahuan, keterampilan, dan sikap baru di bidang pengembangan CS/SI/TI.',
						prerequisites: [],
						unlocks: ["Tugas Akhir Individu"],
					},
					{
						name: "Kecerdasan Artifisial & Sains Data Dasar",
						code: "CSGE603130",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini memperkenalkan konsep-konsep dasar kecerdasan artifisial (artificial intelligence) dan sains data (data science), serta berbagai pendekatan dan teknik-teknik dasar yang dapat dipergunakan untuk memecahkan berbagai permasalahan di bidang kecerdasan artifisial dan sains data. Mata kuliah ini memberikan eksposisi pertama kepada para peserta terhadap paradigma kecerdasan artifisial non-simbolik yang mencakup berbagai teknik pemelajaran mesin (machine learning) yang juga merupakan bagian inti dalam proses sains data untuk melakukan ekstraksi pengetahuan dari data yang tersedia. Cakupan mata kuliah ini berkisar pada pengertian dasar kecerdasan artifisial, pemelajaran mesin dan sains data, serta teknik-teknik klasifikasi, regresi, dan clustering tradisional.",
						prerequisites: [
							"Pengantar Statistika",
							"Aljabar Linier",
							"Struktur Data & Algoritma",
						],
						unlocks: ["Analitika Media Sosial (Social Media Analytics)"],
					},
					{
						name: "Proyek Pengembangan Sistem Informasi",
						code: "CSIM603229",
						sks: 6,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini mengajarkan mahasiswa terkait pengembangan suatu proyek sistem informasi. Proses pengembangan mencakup beberapa tahapan umum yaitu inisialisasi, perencanaan, analisis, desain, serta implementasi.",
						prerequisites: [
							"Sistem Interaksi",
							"Basis Data",
							"Analisis dan Perancangan Sistem Informasi",
							"Arsitektur dan Pemrograman Aplikasi Perusahaan",
						],
						unlocks: [],
					},
				],
			},
			{
				semester: 7,
				courses: [
					{
						name: "Komputer dan Masyarakat",
						code: "CSGE614093",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini menimbulkan kesadaran dan kepekaan mahasiswa terhadap berbagai persoalan etika, sosial, dan ekonomi terkait penerapan teknologi komputer dalam kehidupan sehari-hari. Mahasiswa diharapkan mampu merespon positif terhadap masalah-masalah sosial yang ada dalam konteks disiplin ilmu komputer. Mahasiswa akan dihadapkan pada isu-isu yang berkaitan dengan teknologi informasi dan komputer, dan diharapkan mampu menganalisa isu tersebut dan memberikan solusi dari sudut pandang mereka sebagai mahasiswa ilmu komputer.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Kerja Praktik",
						code: "CSGE604097",
						sks: 6,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini memberikan kesempatan kepada mahasiswa untuk memperoleh pengalaman dalam penyelesaian permasalahan yang terdapat pada sebuah organisasi menggunakan Teknologi Informasi dan Komunikasi (TIK) dengan cara terjun secara langsung ke dunia kerja.",
						prerequisites: [],
						unlocks: [],
					},
				],
			},
			{
				semester: 8,
				courses: [
					{
						name: "Tugas Akhir Individu",
						code: "CSGE604099",
						sks: 6,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini bertujuan melatih kemampuan mahasiswa untuk menerapkan pengetahuan dalam bidang ilmu komputer dan/atau sistem informasi pada satu kegiatan penelitian maupun penyelesaian masalah di suatu organisasi, industri dan masyarakat. Setelah mengikuti mata kuliah ini mahasiswa dapat menghasilkan tulisan ilmiah berbahasa Indonesia maupun Inggris dalam bentuk skripsi. Kegiatan dilakukan secara mandiri atau berkelompok dengan jumlah anggota maksimum 3 orang dibawah bimbingan oleh minimal seorang dosen dalam waktu maksimum dua semester.",
						prerequisites: ["Metodologi Penelitian & Penulisan Ilmiah"],
						unlocks: [],
					},
				],
			},
			{
				semester: "Pilihan",
				courses: [
					{
						name: "Administrasi Sistem (System Administration)",
						code: "CSIE604274",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini memperkenalkan prinsip-prinsip dan prosedur praktis dalam administrasi sistem. Setelah menyelesaikan mata kuliah ini, mahasiswa mampu melakukan instalasi, konfigurasi dan pengelolaan layanan sistem berbasis client-server yang umum digunakan oleh perusahaan. Metode pengajaran dimulai dengan paparan layanan sistem, kemudian dilanjutkan dengan praktik implementasi layanan.",
						prerequisites: ["Jaringan Komunikasi dan Data"],
						unlocks: [],
					},
					{
						name: "Analitika Media Sosial (Social Media Analytics)",
						code: "CSIE604284",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Media sosial telah mengubah cara manusia untuk berinteraksi satu sama lain dan mendorong perubahan dalam proses persebaran informasi. Media sosial, seperti microblogs, blogs, social networking sites, dan internet forum, sudah menjadi bagian dari kehidupan sehari-hari, dan sering digunakan untuk membangun jaringan pertemanan serta mempublikasikan konten yang sangat beragam, mulai dari berita, fakta, tanggapan, opini, dan pengalaman pribadi terhadap suatu topik. Dengan kekayaan informasi tersebut, media sosial menyediakan data yang sangat besar untuk dianalisis.",
						prerequisites: ["Kecerdasan Artifisial & Sains Data Dasar"],
						unlocks: [],
					},
					{
						name: "Arsitektur Perusahaan (Enterprise Architecture)",
						code: "CSIE604171",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini berfokus pada konsep dasar, struktur, metodologi, dan framework enterprise architecture yang bertujuan menyelaraskan teknologi informasi dan visi atau strategi organisasi.",
						prerequisites: ["Manajemen Sistem Informasi"],
						unlocks: [],
					},
					{
						name: "Aspek Legal Keamanan Informasi dan SI/TI (Legal Aspects of Information Security and Information Technology)",
						code: "CSIE604186",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Mata kuliah ini bertujuan untuk membekali mahasiswa dengan pemahaman komprehensif mengenai permasalahan hukum seputar SI/TI. Topiknya meliputi hak kekayaan intelektual, kejahatan dunia maya, perlindungan data, dan hukum kontrak dalam bidang SI/TI.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Basis Data Lanjut (Advanced Databases)",
						code: "CSCE604174",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini memperkenalkan kepada mahasiswa tentang teknologi terkini dan metode yang digunakan dalam sistem dan manajemen basis data. Mahasiswa akan mempelajari lebih dalam terkait teknik-teknik yang digunakan oleh DBMS (Database Management System) untuk memproses, mengoptimasi, dan mengeksekusi query pada multi-user system. Topik umum yang diajarkan antara lain: storage and file structure; indexing, query planning and optimization; transaction processing and concurrency control; data recovery; data warehouse and data mining; distributed database; big data management; dan teori-teori manajemen basis data lainnya.",
						prerequisites: ["Basis Data"],
						unlocks: [],
					},
					{
						name: "Dasar-dasar Audit SI (Introduction to IS Audit)",
						code: "CSIE604181",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Dalam mata kuliah ini, mahasiswa akan mempelajari siklus hidup audit TI, mulai dari pengumpulan informasi, perencanaan, pengujian, dan pelaporan. Mahasiswa juga akan mempelajari kerangka kerja dan metodologi untuk melakukan audit TI dan bagaimana audit TI sesuai dengan fungsi audit internal secara keseluruhan. Mahasiswa juga akan diperkenalkan berbagai tipe audit TI serta kontrol apa saja yang harus diperhatikan untuk setiap tipe audit TI tersebut untuk memastikan bahwa aset TI organisasi dikontrol, di monitor, dan dinilai secara memadai, dan diselaraskan dengan tujuan bisnisnya",
						prerequisites: [
							"Jaringan Komunikasi dan Data",
							"Prinsip-prinsip Sistem Informasi",
							"Basis Data",
						],
						unlocks: [],
					},
					{
						name: "E-dagang (E-commerce)",
						code: "CSIE604160",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Perusahaan",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Forensik Digital (Digital Forensics)",
						code: "CSCE604156",
						sks: 3,
						category: "Pilihan",
						track: "Arsitektur & Infrastruktur",
						description:
							"Memberikan pemahaman tentang proses proses dalam cyber forensic dan kaitannya dengan bidang forensic yang lain. Menjelaskan tentang teknologi yang digunakan dalam bidang ini serta tantangannya. Perancangan penggunaan forensik di korporasi maupun dalam pemerintahan. Selain itu akan dibahas juga mengenai pencegahan fraud, serta topik topik penelitian dalam bidang ini.",
						prerequisites: ["Jaringan Komunikasi dan Data"],
						unlocks: [],
					},
					{
						name: "Inteligensi Bisnis (Business Intelligence)",
						code: "CSIE604271",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini juga memperkenalkan teknologi-teknologi yang digunakan dalam pengolahan data di perusahaan sesuai dengan state of the art bisnis dan teknologi yang berkembang. Diharapkan, setelah mengambil mata kuliah ini, mahasiswa mampu melakukan pengambilan keputusan dengan berbagai sumber data, teknik, metodologi, dan teknologi di kondisi lingkungan yang dinamis. Mata kuliah ini juga bertujuan membekali mahasiswa kemampuan bekerja dengan data dalam skala besar dan menguasai berbagai teknik untuk menilai informasi bisnis yang terkandung dalam data tersebut.",
						prerequisites: ["Basis Data"],
						unlocks: [],
					},
					{
						name: "Keamanan Siber Level Strategis Perusahaan (Strategic Cybersecurity)",
						code: "CSIE604183",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Mata kuliah ini mengantarkan mahasiswa dalam memahami konsep keamanan siber dari perspektif yang lebih tinggi. Mata kuliah ini berfokus pada pengamanan siber di organisasi terutama pada sisi people dan process walaupun tidak melupakan unsur technology. Pada mata kuliah ini pula dikenalkan strategi-strategi yang dapat dilakukan di organisasi untuk meningkatkan keamanan sibernya.",
						prerequisites: ["Manajemen Sistem Informasi"],
						unlocks: [],
					},
					{
						name: "Kesehatan Elektronik (E-health)",
						code: "CSIE604161",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Perusahaan",
						description:
							"Mata kuliah ini mengantarkan mahasiswa dalam memahami konsep dan regulasi e-health yang dapat digunakan di organisasi kesehatan. Mata kuliah ini juga akan memperkenalkan mahasiswa terkait teknologi yang umum digunakan dalam mengimplementasi e-health seperti teknologi HL7, DICOM, dan lain sebagainya. Mata kuliah ini disiapkan untuk mahasiswa yang akan bekerja sebagai konsultan TI yang berperan sebagai arsitek sistem di organisasi.",
						prerequisites: ["Sistem Informasi Perusahaan dan Akuntansi"],
						unlocks: [],
					},
					{
						name: "Kewirausahaan SI/TI (Technopreneurship)",
						code: "CSIE604290",
						sks: 3,
						category: "Pilihan",
						track: "Kepribadian & Keterampilan Berkarya",
						description:
							"Mata kuliah ini memberikan dasar untuk kewirausahaan teknologi. Penekanan mata kuliah ini adalah pada pemahaman konsep dasar dan karakteristik yang mungkin mempengaruhi keberhasilan usaha teknologi.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Kriptografi dan Keamanan Informasi (Cryptography & Information Security)",
						code: "CSCE604243",
						sks: 3,
						category: "Pilihan",
						track: "Komputasi & Algoritma",
						description:
							"Mata kuliah ini mengajarkan dasar-dasar kriptografi dan memahami teknik-teknik kriptografi yang digunakan untuk mengamankan informasi.",
						prerequisites: [
							"Matematika Diskret 1",
							"Matematika Diskret 2",
							"Jaringan Komunikasi dan Data",
						],
						unlocks: [],
					},
					{
						name: "Manajemen Hubungan Pelanggan (Customer Relationship Management)",
						code: "CSIE604163",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Perusahaan",
						description:
							"Mata kuliah ini berfokus pada konsep dan teknologi informasi manajemen hubungan pelanggan sebagai solusi bisnis perusahaan yang lengkap. Kuliah ini akan mengajarkan mahasiswa prinsip-prinsip dasar, implementasi dan praktik dari Manajemen Hubungan Pelanggan untuk meningkatkan capaian dari pemasaran, penjualan, dan layanan yang mencakup fase-fase siklus hidup pelanggan yaitu customer acquisition, retention dan development, yang pada saat yang sama juga mendukung tujuan organisasi yang lebih besar/luas.",
						prerequisites: ["Sistem Informasi Perusahaan dan Akuntansi"],
						unlocks: [],
					},
					{
						name: "Manajemen Infrastruktur (Infrastructure Management)",
						code: "CSIE604276",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini memperkenalkan infrastruktur Teknologi Informasi (TI) modern dan aktivitas-aktivitas yang diperlukan untuk pengelolaan infrastruktur tersebut. Aktivitas pengelolaan software dan hardware akan dipelajari dalam mata kuliah ini. Pada akhir mata kuliah ini peserta memiliki kemampuan dapat merancang infrastruktur sesuai dengan kebutuhan organisasi.",
						prerequisites: ["Jaringan Komunikasi dan Data", "Basis Data"],
						unlocks: [],
					},
					{
						name: "Manajemen Layanan TI (IT Service Management)",
						code: "CSIE604378",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mahasiswa mempelajari serta menganalisis layanan Teknologi Informasi (TI) yang dapat diterapkan dan dimanfaatkan dalam organisasi. Mata kuliah ini berfokus pada penyampaian dan dukungan layanan TI yang sesuai dengan kebutuhan bisnis organisasi.",
						prerequisites: ["Jaringan Komunikasi dan Data"],
						unlocks: [],
					},
					{
						name: "Manajemen Pengetahuan (Knowledge Management)",
						code: "CSIE604180",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Mata kuliah ini berisi teori dan penerapan Manajemen Pengetahuan (Knowledge Management) yang mencakup teknologi dan alat (tools) yang digunakan dalam mengelola pengetahuan sesuai dengan kondisi dan kebutuhan organisasi secara efektif. Dalam mata kuliah ini juga dibahas tentang karakteristik, representasi komputer, akses, dan pemanfaatan informasi versus pengetahuan dalam konteks sumber daya manusia. Setelah menyelesaikan mata kuliah ini Mahasiswa mampu untuk menganalisis dan merancang KM solution pada organisasi berdasarkan contingency factor pada organisasi tersebut secara berkelompok.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Manajemen Proses Bisnis (Business Process Management)",
						code: "CSIE604262",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Perusahaan",
						description:
							"Mata kuliah ini mendalami cara-cara di mana proses bisnis dapat dianalisis, didesain ulang, dan ditingkatkan. Proses bisnis adalah serangkaian aktivitas yang bersama-sama mewujudkan tujuan bisnis dalam lingkungan organisasi dan teknis. Proses ini berlangsung dalam satu organisasi tetapi mungkin perlu berinteraksi dengan proses di organisasi lain. Manajemen proses bisnis atau business process management (BPM) berkaitan dengan konsep, metode, dan teknik yang mendukung desain, administrasi, konfigurasi, penetapan, dan analisis proses bisnis.",
						prerequisites: ["Analisis dan Perancangan Sistem Informasi"],
						unlocks: [],
					},
					{
						name: "Manajemen Rantai Suplai (Supply Chain Management)",
						code: "CSIE604165",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Perusahaan",
						description:
							"Mata kuliah ini berfokus pada metodologi dan praktik Manajemen Rantai Suplai perusahaan sebagai solusi bisnis yang lengkap. Rantai suplai terkait dengan integrasi yang efisien dari pemasok, pabrik, gudang dan toko sehingga produk didistribusikan ke pelanggan dalam jumlah yang tepat dan pada waktu yang tepat. Salah satu tujuan utama dari Manajemen Rantai Suplai adalah untuk meminimalkan biaya rantai suplai dalam memberikan berbagai layanan. Kuliah ini cocok bagi mahasiswa yang berencana untuk menjadi konsultan TI, perdagangan atau manufaktur perusahaan. Selain itu, kuliah ini akan mengajarkan mahasiswa konsep dasar dan implementasi Manajemen Rantai Suplai dengan menggambarkan kompleksitas perencanaan kolaboratif dalam rantai suplai.",
						prerequisites: ["Sistem Informasi Perusahaan dan Akuntansi"],
						unlocks: [],
					},
					{
						name: "Pemasaran Media Digital (Digital Media Marketing)",
						code: "CSCE604180",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Mata kuliah ini menggabungkan konsep teoritis dengan aplikasi praktis untuk memberikan pemahaman komprehensif tentang saluran pemasaran digital, strategi, dan analitik. Tujuannya adalah untuk membekali mahasiswa dengan keterampilan yang dibutuhkan untuk mengembangkan, menerapkan, dan mengevaluasi strategi pemasaran digital secara efektif.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Pembangunan TIK untuk Negara Berkembang (ICT for Development)",
						code: "CSIE604279",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini akan memperkenalkan siswa pada debat dan praktik seputar penggunaan Teknologi Informasi dan Komunikasi (TIK) dengan fokus pada negara-negara Global South. Mata kuliah ini akan memanfaatkan sumber daya dari Antropologi, Studi Pembangunan, Ekonomi, Geografi, dan Sejarah untuk memeriksa kerangka teoritis dan konseptual yang mendukung pembangunan - sebagai praktik, sebagai subjek penelitian, dan sebagai wacana. Mata kuliah ini juga akan banyak mengambil studi kasus untuk landasan teori dalam praktek dan akan memperkenalkan siswa ke berbagai proyek yang telah menggunakan TIK sebagai solusi untuk masalah di Afrika, Asia dan Amerika.",
						prerequisites: ["Prinsip-prinsip Sistem Informasi"],
						unlocks: [],
					},
					{
						name: "Pengelolaan Data Besar (Big Data Management)",
						code: "CSIE604273",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini adalah untuk memperkenalkan mahasiswa pada topik pengolahan data yang selain memiliki ukuran yang besar, juga memiliki struktur yang bervariasi. Kuliah ini akan membahas teknik penambangan data, penyimpanan, dan pengolahan data menggunakan model data non-relational (NoSQL), distributed file system, dan big data analytics.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Pengelolaan Produk Digital (Digital Product Management)",
						code: "CSCE6042780",
						sks: 3,
						category: "Pilihan",
						track: "Lainnya",
						description:
							"Mata kuliah ini mengeksplorasi dasar-dasar manajemen produk digital, menekankan tanggung jawab strategis dan taktis dari peran tersebut. Topiknya berkisar dari strategi dan visi produk hingga riset pengguna, perencanaan peta jalan, metodologi agile, dan analitik.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Peretasan secara Etis (Ethical Hacking)",
						code: "CSCE604258",
						sks: 3,
						category: "Pilihan",
						track: "Arsitektur & Infrastruktur",
						description:
							"Mata kuliah ini membahas tentang teknik-teknik eksploitasi program binary. Topik-topik yang akan dibahas adalah sebagai berikut: konsep dasar memori dan eksekusi program, bahasa assembly, C, debugger, disassembler, atau decompiler, stack overflow, heap-based overflow, teknik-teknik pertahanan dan contoh kerentanan di dunia nyata.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: [],
					},
					{
						name: "Sistem Informasi Sumber Daya Manusia (Human Resource Information Systems)",
						code: "CSIE604285",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Mata kuliah ini bertujuan untuk memberikan pengetahuan tentang manajemen sumber daya manusia di perusahaan, metode implementasi pada konteks riil serta regulasinya. Mata kuliah ini akan mengajarkan mahasiswa konsep manajemen sumber daya manusia dan mampu menjelaskan urgensi konsep tersebut untuk para manajer di perusahaan. Di samping itu, diberikan pula kebutuhan terhadap solusi SI (aplikasi) yang dapat digunakan untuk mengimplementasikan konsep tersebut. Pembahasan utama pada perkuliahan ini akan fokus kepada strategi manajemen sumber daya manusia, proses rekrutmen, tes & seleksi karyawan, pelatihan & pengembangan, proses penilaian kinerja, pengelolaan karir di perusahaan, kompensasi & financial incentive, benefit & service dan bagaimana mengelola relasi karyawan. Mahasiswa selanjutnya juga akan diberikan pengetahuan mengenai tantangan sumber daya manusia, serta menganalisis bagaimana meningkatkan efektifitas penerapan knowledge dan skill sumber daya manusia di dalam tantangan global.",
						prerequisites: ["Sistem Informasi Perusahaan dan Akuntansi"],
						unlocks: [],
					},
					{
						name: "Tata Kelola SI/TI (IT Governance)",
						code: "CSIE604182",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Kuliah ini memperkenalkan konsep dan kerangka kerja tata kelola teknologi informasi (IT governance) yang dibutuhkan suatu organisasi untuk memastikan bahwa penerapan teknologi informasi (TI) dapat: selaras dengan strategi bisnis/organisasi, memberikan manfaat bagi bisnis/organisasi, risikonya terkendali, kinerjanya disempurnakan berdasarkan pengukuran, dan sumber dayanya digunakan secara optimal. Setelah lulus dari kuliah ini mahasiswa diharapkan dapat mengevaluasi penerapan tata kelola TI di suatu organisasi dan dapat menyusun rencana penerapan/penyempurnaan tata kelola TI secara tepat sasaran.",
						prerequisites: ["Manajemen Sistem Informasi"],
						unlocks: [],
					},
					{
						name: "Teknologi Mobile",
						code: "CSCE604179",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini memberikan gambaran umum tentang teknologi mobile dari sudut pandang Ilmu Komputer dan Sistem Informasi. Teknologi mobile merupakan salah satu komponen dari terminologi Information and Communication Technology (ICT), yaitu pada domain Communication Technology (Telecom). Integrasi dan kolaborasi antara IT dan Communication (dalam hal ini teknologi mobile) sebetulnya sudah dilakukan sejak sekitar tahun 1990-an. Pada masa sekarang ini, perekat kedua teknologi tersebut ada pada agenda Digital Transformation dari hampir setiap pemain di industri. ICT sendiri sekarang sudah berkembang menjadi IOCT (Information, Operation and Communication Technology), yang mengharuskan pemahaman lebih jauh mengenai Operation Technology (OT) dari setiap industri, sehingga bisa memetakan solusi ICT apa yang bisa mengatasi tantangan pada OT. Pada praktiknya, IT banyak berperan pada sisi aplikasi, big data dan analytics, serta security, sedangkan CT dalam hal connectivity, infrastructure, dan services. Ditambah dengan adanya teknologi 5G sebagai perkembangan dari 4G LTE, semakin memperkuat peran CT dan memperkaya jenis aplikasi yang dapat di deliver.",
						prerequisites: ["Jaringan Komunikasi dan Data"],
						unlocks: [],
					},
					{
						name: "Topik Khusus SI (Special Topics on IS)",
						code: "CSIE604080",
						sks: 3,
						category: "Pilihan",
						track: "Sistem Informasi & Aplikasi",
						description:
							"Mata kuliah ini membahas topik-topik terbaru terkait perkembangan manajemen/tata kelola SI/TI beserta aspek teknologinya sehingga mahasiswa mempunyai pemahaman terhadap isu-isu terkini terkait tata kelola SI/TI dan mempunyai gambaran arah pengembangan tata kelola SI/TI lebih lanjut.",
						prerequisites: [],
						unlocks: [],
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
						name: "Dasar-Dasar Pemrograman 1",
						code: "CSGE601020",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini bertujuan untuk mengajarkan konsep dan teknik dasar dalam membuat program komputer dalam konteks pengantar ilmu komputer dan pemecahan masalah. Pilihan bahasa pemrograman bukanlah fokus utama dari mata kuliah ini, walaupun pada kurikulum ini, bahasa pemrograman yang digunakan untuk mata kuliah ini adalah Python.",
						prerequisites: [],
						unlocks: [
							"Dasar-Dasar Pemrograman 2",
							"Desain Produk Kecerdasan Artifisial",
							"Pengantar Arsitektur Komputer dan Sistem Operasi",
							"Struktur Data dan Algoritma",
							"Pemrograman Logika",
						],
					},
					{
						name: "Kalkulus Univariat",
						code: "CSAM601011",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini memberikan fondasi matematika kalkulus pendekatan berbasis infinitesimal. Intuisi matematika sekolah menengah dijembatani dengan ketepatan formal melalui pemanfaatan representasi hyperreal untuk mendefinisikan limit, kontinuitas, dan asimtot secara aljabar. Bahasan kalkulus diferensial disampaikan melalui visualisasi local linearity, aljabar turunan eksak menggunakan infinitesimal yang mendukung automatic differentiation yang mendasari mekanisme optimisasi model AI, akumulasi nilai dan perubahan neto melalui hyperfinite sums, serta analisis asimtotik dan deret takhingga. Dengan berfokus pada intuisi visual dan aljabar eksak, mata kuliah ini membekali mahasiswa dengan penalaran matematis formal yang selaras dengan logika komputasi tanpa memerlukan prasyarat komputasi atau aplikasi fisika 3D yang rumit.",
						prerequisites: [],
						unlocks: ["Kalkulus Multivariat", "Probabilitas dan Statistika"],
					},
					{
						name: "Logika dan Struktur Diskret",
						code: "CSAM601010",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini membahas logika formal dasar (logika proposisi dan logika predikat) dimulai dari sintaks, semantik, sifat suatu formula logika, aturan inferensi dan penerapannya untuk memformulasikan suatu pernyataan dan membangun argumentasi valid dalam memecahkan permasalahan. Mata kuliah ini juga membahas berbagai metode pembuktian untuk dapat digunakan secara tepat dalam membuktikan kebenaran suatu pernyataan. Formula logika dan metode pembuktian ini menjadi dasar dalam memahami berbagai struktur diskret dan operasi pada struktur-struktur diskret, seperti himpunan, fungsi, barisan, dan graf, sifat, dan operasinya, serta penerapannya dalam pemecahan masalah.",
						prerequisites: [],
						unlocks: [
							"Probabilitas dan Statistika",
							"Representasi Pengetahuan dan Penalaran",
						],
					},
					{
						name: "MPK Agama",
						code: "UIGE600004",
						sks: 2,
						category: "Wajib Universitas",
						description:
							"Setelah selesai mengikuti perkuliahan MPK Agama, mahasiswa mampu menganalisis berbagai permasalahan yang terjadi di masyarakat berdasarkan ajaran agama. Mata kuliah ini disajikan dengan pendekatan Active Learning dengan materi pembelajarannya meliputi sejarah dan makna agama, pokok-pokok ajaran agama, agama dan budaya, serta analisis kasus-kasus nyata yang terjadi di masyarakat. Proses pembelajaran dilakukan dengan menggunakan bahasa Indonesia.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "MPK Bahasa Inggris",
						code: "UIGE600003",
						sks: 2,
						category: "Wajib Universitas",
						description:
							"Catatan: Mahasiswa tidak perlu mengambil mata kuliah ini dalam bentuk kelas formal apabila memiliki setifikat TOEFL atau IELTS atau yang setara dengan standar skor tertentu, yang ditentukan UI. Jika tidak memenuhi syarat, baru mahasiswa mengambil dalam bentuk kelas formal sesuai perincian di bawah. Capaian pembelajaran dalam mata kuliah ini adalah mahasiswa mampu menerapkan penggunaan Bahasa Inggris secara efektif dalam lingkup akademik dengan penekanan pada keenam nilai luhur karakter. Ruang lingkup dibahas dan dilatihkan dengan menggunakan metode pembelajaran aktif secara mandiri dan berkelompok yang diintegrasikan dalam empat komponen pengajaran bahasa, yaitu: menyimak, berbicara, membaca, dan menulis. Bahasa pengantar yang digunakan dalam kuliah ini adalah bahasa Inggris.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Struktur Linear",
						code: "CSAM601012",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah Struktur Linear membekali mahasiswa dengan kemampuan untuk merepresentasikan dan mentransformasikan data dalam ruang berdimensi tinggi menggunakan pendekatan berbasis ruang vektor (vector-space-first). Berbeda dari metode tradisional, fokus utama bergeser dari prosedur kalkulasi rutin menuju penguasaan abstraksi aritmetika dan intuisi geometris, yang membentuk fondasi dari arsitektur AI. Materi pembelajaran disusun secara sistematis, dimulai dari aksioma ruang vektor (vector spaces) dan pemetaan linier (linear mappings) sebagai logika pemrosesan informasi, diikuti oleh penggunaan matriks sebagai alat untuk menyandikan fungsi-fungsi tersebut. Topik-topik utama mencakup basis dan dimensi, penerapan sistem linier sebagai alat untuk penyederhanaan struktural, eigensystems, dan singular value decomposition (SVD) untuk kompresi data, serta determinan yang dipandang sebagai skala volume geometris. Mata kuliah ini dirancang untuk membangun kematangan matematis yang krusial bagi mahasiswa dalam memahami dan merancang model AI di semester-semester berikutnya. Dengan memprioritaskan penalaran bebas koordinat (coordinate-free reasoning) dan sifat-sifat struktural dibandingkan sekadar aritmetika sederhana, mahasiswa mengembangkan kedalaman analitis yang diperlukan untuk aplikasi machine learning dan deep learning tingkat lanjut.",
						prerequisites: [],
						unlocks: [
							"Kalkulus Multivariat",
							"Sains Data dan Pemelajaran Mesin",
						],
					},
				],
			},
			{
				semester: 2,
				courses: [
					{
						name: "Dasar-Dasar Pemrograman 2",
						code: "CSGE601021",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini merupakan bagian kedua dari seri “Dasar-Dasar Pemrograman” dan dirancang untuk mengembangkan pengetahuan serta pengalaman yang telah diperoleh dari Dasar-Dasar Pemrograman 1 guna meningkatkan kemampuan pemrograman mahasiswa. Mata kuliah ini secara khusus berfokus pada paradigma Pemrograman Berorientasi Objek (Object-Oriented Programming atau OOP) dan menekankan penggunaannya dalam pemecahan masalah. Bahasa pemrograman apa pun dapat digunakan selama mendukung paradigma pemrograman berorientasi objek tersebut.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: ["Basis Data"],
					},
					{
						name: "Desain Produk Kecerdasan Artifisial",
						code: "CSAM601022",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini memberikan pengantar Kecerdasan Buatan (Artificial Intelligence atau AI) bagi mahasiswa dari perspektif solusi produk untuk masalah-masalah spesifik. Pembahasannya memberikan gambaran umum tentang konsep dan teknologi yang mendasari pengembangan produk berbasis AI, mencakup dasar-dasar pengembangan produk secara umum serta konsep dan aplikasi AI yang relevan. Dari sisi pengembangan produk, mata kuliah ini mencakup pengantar siklus hidup pengembangan produk, riset pengguna, desain pengalaman pengguna (user experience atau UX), pembuatan prototype, integrasi, dan validasi produk. Dari sisi AI, mata kuliah ini mencakup gambaran umum tingkat dasar tentang teknologi AI modern dengan penekanan pada aplikasi pemelajaran mesin (machine learning), jaringan saraf tiruan (neural networks), dan model bahasa generatif (generative language models). Sepanjang semester, mahasiswa dihadapkan pada beberapa praktik langsung dalam mengembangkan prototype produk berbasis AI menggunakan komponen pustaka perangkat lunak (software library) yang sudah ada.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: [
							"Rekayasa dan Operasi Sistem Kecerdasan Artifisial",
							"Visualisasi Data dan Informasi",
						],
					},
					{
						name: "MPK Terintegrasi",
						code: "UIGE600007",
						sks: 6,
						category: "Wajib Universitas",
						description:
							"Mata Kuliah Pengembangan Kepribadian Terintegrasi (MPKT) adalah bagian dari Penyelenggaraan Kuliah Pengembangan Kepribadian Pendidikan Tinggi (PKPT) yang diselenggarakan bagi mahasiswa yang mengandung unsur internalisasi nilai dasar kehidupan, keterampilan interaksi/berelasi, berbangsa dan keterampilan akademik sebagai dasar kepribadian mahasiswa menjalankan pembelajaran sesuai disiplin ilmu. MPKT adalah komponen Mata Kuliah Wajib Universitas untuk membantu mahasiswa dalam mengembangkan kepribadian agar secara konsisten mampu mewujudkan nilai-nilai dasar keagamaan, rasa kebangsaan dan cinta tanah air dalam menguasai, menerapkan dan mengembangkan ilmu pengetahuan, teknologi, seni dan budaya yang dimilikinya dengan rasa tanggung jawab sehingga dapat diterapkan sepanjang hayat. Materi yang diberikan pada MPKT bertujuan untuk membentuk pola berpikir manusia dengan nilai dan moral untuk mewujudkan manusia yang berkepribadian dengan memiliki cara berpikir kritis, logis, kreatif, inovatif, serta memiliki keingintahuan intelektual dan jiwa kewirausahaan. Materi yang diberikan meliputi 9 nilai UI, nilai-nilai kebangsaan, negara, dan warga negara berdasarkan Pancasila. Pemecahan masalah dalam sains, teknologi, kesehatan, dan manusia sebagai manajer alam dengan menggunakan penalaran dan memanfaatkan Teknologi Informasi dan Komunikasi (TIK) untuk mencapai tujuan akhir modul ini. Kegiatan perkuliahan dilakukan dengan pendekatan student centered learning (SCL) menggunakan metode: experiential learning (EL), collaborative learning (CL) dan project based learning. Penggunaan berbagai metode tersebut dilakukan melalui kegiatan diskusi kelompok, latihan tugas mandiri, presentasi, pembuatan makalah dengan Bahasa Indonesia dan diskusi interaktif. Bahasa pengantar dalam perkuliahan ini menggunakan Bahasa Indonesia.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Probabilitas dan Statistika",
						code: "CSAM601014",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini memberikan pengenalan matematis dan komputasional yang ketat tentang probabilitas dan inferensi statistik, yang dirancang secara khusus untuk mempersiapkan mahasiswa sarjana menuju penelitian tingkat lanjut dalam machine learning dan sistem otonom (autonomous systems). Mahasiswa akan berkembang mulai dari pencacahan dasar (counting) dan probabilitas aksiomatis hingga pemodelan sistem acak serta kuantifikasi ketidakpastian. Berbeda dengan mata kuliah statistik tradisional, kerangka kerja ini menekankan pendekatan “probability-as-an-experimental-science”, yang menggunakan simulasi berbasis Python untuk validasi konsep teoritis. Sepertiga bagian terakhir dari mata kuliah ini berfokus pada penalaran inferensial (inferential reasoning), yang mencakup paradigma Frequensial (Frequentist) dan Bayesian untuk membekali mahasiswa dengan alat yang dibutuhkan untuk mengestimasi parameter model, menurunkan batas performa algoritmik (algorithmic performance bounds), serta melakukan eksperimen komparatif yang ketat.",
						prerequisites: [
							"Logika dan Struktur Diskret",
							"Kalkulus Univariat",
						],
						unlocks: ["Sains Data dan Pemelajaran Mesin"],
					},
					{
						name: "Struktur Data dan Algoritma",
						code: "CSGE602040",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini membahas teknik-teknik dasar untuk abstraksi data (data abstraction) dan manipulasi struktur abstrak tersebut melalui algoritma yang tepat. Mata kuliah ini juga mencakup analisis kompleksitas (complexity analysis) dari alokasi ruang dan waktu dalam implementasi algoritma.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: [
							"Pemelajaran Dalam",
							"Pencarian dan Optimisasi",
							"Penglihatan Komputer",
							"Sains Data dan Pemelajaran Mesin",
							"Bioinformatika",
						],
					},
				],
			},
			{
				semester: 3,
				courses: [
					{
						name: "Basis Data",
						code: "CSGE602070",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini membahas konsep-konsep dasar manajemen basis data, yang mencakup aspek pemodelan dan perancangan, bahasa, serta implementasi. Topik-topik yang diajarkan meliputi arsitektur dan konsep sistem manajemen basis data (database management system atau DBMS), struktur dan organisasi berkas (file), pengindeksan (indexing), pemodelan data menggunakan model entity-relationship (ER), bahasa kueri formal, basis data berorientasi objek, Structured Query Language (SQL), Query by Example (QBE), dependensi fungsional (functional dependency), normalisasi basis data relasional, serta algoritma dan proses perancangan basis data relasional.",
						prerequisites: ["Dasar-Dasar Pemrograman 2"],
						unlocks: [
							"Rekayasa Data",
							"Basis Data Kecerdasan Artifisial",
							"Graf Pengetahuan",
							"Penambangan Data",
						],
					},
					{
						name: "Kalkulus Multivariat",
						code: "CSAM602013",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini memberikan landasan analitis kalkulus peubah banyak yang dirancang secara khusus untuk kebutuhan kecerdasan buatan (AI) dan machine learning (ML), yang berfungsi sebagai prasyarat utama untuk topik-topik optimisasi pada mata kuliah tingkat lanjut. Fokus utamanya bergeser dari kalkulus tradisional berbasis fisika menuju pemahaman tentang kondisi analitis yang mengatur bagaimana model AI belajar dalam ruang berdimensi tinggi. Topik-topik utama mencakup geometri peubah banyak dan visualisasi loss landscapes, turunan terhadap vektor dan matriks (matrix calculus), serta penggunaan matriks Jacobian dalam komposisi fungsi atau lapisan model. Mahasiswa akan mempelajari kondisi optimalitas tingkat pertama dan kedua secara analitis menggunakan matriks Hessian untuk menganalisis kelengkungan dan titik pelana (saddle points). Selain itu, mata kuliah ini mencakup deret Taylor, metode pengali Lagrange untuk optimisasi bersyarat, serta pengantar prinsip-prinsip konveksitas sebagai penentu keberhasilan optimisasi global. Bagian akhir dari mata kuliah ini menekankan pada mekanisme matematis Automatic Differentiation (mode Forward dan Reverse) sebagai realisasi dari mekanisme backpropagation pada model deep learning, serta penerapan integral peubah banyak dalam konteks probabilitas dan statistik untuk ML.",
						prerequisites: ["Kalkulus Univariat", "Struktur Linear"],
						unlocks: ["Pencarian dan Optimisasi"],
					},
					{
						name: "Pengantar Arsitektur Komputer dan Sistem Operasi",
						code: "CSAM602150",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"C.19.2. DeskripsiMata kuliah ini mengajarkan konsep-konsep fundamental dari computer architecture, operating systems, dan teknik parallel programming, dengan fokus khusus pada infrastruktur accelerator yang mendukung komputasi AI. Mahasiswa akan memahami prinsip kerja dari komponen komputer, struktur operating system, memory management, serta mendapatkan pengenalan tentang pemograman CUDA GPU. Pengetahuan ini berfungsi sebagai fondasi penting untuk mengimplementasikan kecerdasan buatan dalam sistem high-performance computing.",
						prerequisites: ["Dasar-Dasar Pemrograman 1"],
						unlocks: [
							"Jaringan Sistem Komputer",
							"Rekayasa dan Operasi Sistem Kecerdasan Artifisial",
							"Robotika",
						],
					},
					{
						name: "Representasi Pengetahuan dan Penalaran",
						code: "CSAM602131",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini mengeksplorasi bidang Artificial Intelligence yang berfokus pada bagaimana pengetahuan direpresentasikan secara simbolis sehingga dapat dimanipulasi secara otomatis oleh prosedur yang melakukan penalaran (reasoning). Mahasiswa akan dibekali dengan konsep- konsep dasar knowledge representation and reasoning (KRR), yang menjadi landasan untuk memahami topik-topik lanjutan dan perkembangan terkini di bidang tersebut. Mata kuliah ini bertujuan agar mahasiswa dapat mengembangkan aplikasi AI yang memanfaatkan metode AI simbolik. Dengan menguasai cara mengagihkan informasi ke dalam sistem formal, mahasiswa akan belajar membangun agen yang mampu melakukan deduksi logis dan pengambilan keputusan yang kompleks berdasarkan pengetahuan yang telah ditetapkan.",
						prerequisites: ["Logika dan Struktur Diskret"],
						unlocks: ["Graf Pengetahuan", "Pemrograman Logika"],
					},
					{
						name: "Sains Data dan Pemelajaran Mesin",
						code: "CSAM602130",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini memberikan pengenalan matematis yang ketat terhadap fondasi data science dan machine learning, dengan merumuskan kembali algorithmic heuristics sebagai masalah statistical inference dan probabilistic estimation. Mahasiswa akan bertransisi dari prasyarat matematis tahun pertama menuju applied modeling yang diperlukan untuk spesialisasi AI tingkat lanjut. Mata kuliah ini menekankan pada “tiga bahan” utama dari pemelajaran mesin: hypothesis classes, loss functions, dan prosedur optimasi (optimization procedures). Topik-topik utama mencakup penurunan generalized linear models (GLMs) dari exponential family, induksi teori informasi (information-theoretic induction) dari decision trees, serta ensemble methods yang dirumuskan melalui sampling theory dan functional gradient descent. Dengan memperlakukan model sebagai estimator dari conditional probability distributions, mata kuliah ini membekali mahasiswa dengan kematangan matematis untuk menalar tentang ketidakpastian, bias, dan generalisasi, serta memberikan jalur teoretis langsung menuju multi- layer neural architectures.",
						prerequisites: [
							"Struktur Linear",
							"Probabilitas dan Statistika",
							"Struktur Data dan Algoritma",
						],
						unlocks: [
							"Pemelajaran Dalam",
							"Penglihatan Komputer",
							"Rekayasa dan Operasi Sistem Kecerdasan Artifisial",
							"Rekayasa Data",
							"Bioinformatika",
							"Pemelajaran Mesin Klasik",
							"Pemelajaran Penguatan",
							"Penambangan Data",
							"Peramalan Kuantitatif",
							"Robotika",
							"Visualisasi Data dan Informasi",
						],
					},
				],
			},
			{
				semester: 4,
				courses: [
					{
						name: "Pemelajaran Dalam",
						code: "CSAM602232",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini menyajikan pembahasan yang mendalam dan berfokus pada implementasi mengenai teori serta praktik deep neural networks. Dirancang khusus untuk mahasiswa jurusan AI, kurikulum ini diawali dengan merumuskan kembali supervised learning melalui Bayesian decision theory, serta menurunkan jaringan single-layer fundamental untuk regression dan classification. Mahasiswa akan mempelajari transisi matematis dari fixed basis functions menuju penemuan hierarchical representations dari raw data. Mata kuliah ini menelusuri evolusi arsitektur saraf mulai dari multilayer perceptron hingga spatial hierarchies (CNNs), temporal dependencies (RNNs dan Transformers), serta generative modeling (VAEs), berdampingan dengan skala Large Language Model (LLM) dan perancangan sistem otonom menggunakan kerangka kerja multi-arm bandit.",
						prerequisites: [
							"Sains Data dan Pemelajaran Mesin",
							"Struktur Data dan Algoritma",
						],
						unlocks: [
							"Kecerdasan Artifisial Generatif",
							"Pengolahan Bahasa Manusia",
							"Bioinformatika",
							"Pemelajaran Penguatan",
							"Pemrosesan Bahasa Lisan",
							"Pemelajaran Mesin Graf",
							"Temu-Balik Informasi",
						],
					},
					{
						name: "Pencarian dan Optimisasi",
						code: "CSAM602241",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini dirancang untuk memberikan fondasi algoritmik yang kuat bagi mahasiswa dalam memahami bagaimana agen cerdas membuat keputusan yang optimal. Pada fase pertama, fokus ditempatkan pada discrete optimization dan heuristics, yang mencakup uninformed dan informed search, metode local search, serta adversarial search. Mahasiswa kemudian bertransisi untuk memodelkan masalah AI dalam kerangka formal seperti linear programming (LP) dan integer programming (IP), yang berfungsi sebagai jembatan menuju pemodelan matematis optimization. Fase kedua mengalihkan fokus ke arah continuous optimization, dengan memanfaatkan fondasi kalkulus peubah banyak (multivariate calculus). Mata kuliah ini mencakup metode tingkat pertama (first-order methods) seperti gradient descent dan pengoptimal adaptif (adaptive optimizers) seperti Adam, berdampingan dengan fondasi teknik tingkat kedua (second-order techniques) seperti Newton’s method. Mahasiswa juga akan mempelajari constrained optimization menggunakan pengali Lagrange (Lagrange multipliers) dan kondisi Karush-Kuhn-Tucker (KKT). Mata kuliah ini diakhiri dengan pengenalan metode berbasis populasi (population-based methods) seperti evolutionary algorithms dan Bayesian optimization untuk menangani tantangan black-box optimization yang kompleks. Melalui pendekatan komprehensif ini, mahasiswa tidak hanya menggunakan alat optimization sebagai sekadar black box. Sebaliknya, mereka akan dibekali kemampuan untuk merumuskan masalah AI secara matematis, memilih algoritma yang paling tepat untuk konteks tertentu, serta melakukan evaluasi performa yang ketat.",
						prerequisites: [
							"Kalkulus Multivariat",
							"Struktur Data dan Algoritma",
						],
						unlocks: [
							"Pemelajaran Mesin Klasik",
							"Pemelajaran Penguatan",
							"Pemelajaran Mesin Graf",
						],
					},
					{
						name: "Penglihatan Komputer",
						code: "CSAM602233",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini membahas penggunaan data citra 2D untuk memahami adegan 3D (3D scenes) yang terkandung di dalamnya. Computer vision berupaya mengadaptasi kemampuan mata manusia untuk memahami informasi dalam citra melalui pendekatan matematis. Tugas-tugas computer vision dapat dibagi menjadi tiga kategori: recognition, yang berupaya mengidentifikasi apa yang terkandung dalam citra; reconstruction, yang berupaya merekonstruksi citra ke dalam bentuk lain; dan reorganization, yang berupaya menyelaraskan (register) citra dari berbagai domain ke keadaan aslinya. Untuk mencapai hal ini, mahasiswa akan mempelajari konsep-konsep di balik penglihatan manusia (human vision) dan korelasinya dengan penglihatan mesin (machine vision atau computer vision); berbagai teknik dasar pengolahan citra (image processing) baik dalam domain spasial maupun frekuensi; ekstraksi fitur (feature extraction) dan pencocokan fitur (feature matching); serta penerapannya dalam tugas-tugas computer vision. Terakhir, aplikasi terkini di bidang computer vision akan dipaparkan melalui beberapa studi kasus. Mahasiswa juga akan dilatih melalui sesi praktis berupa praktikum laboratorium pemrograman Python individu dan proyek kelompok.",
						prerequisites: [
							"Sains Data dan Pemelajaran Mesin",
							"Struktur Data dan Algoritma",
						],
						unlocks: [],
					},
					{
						name: "Rekayasa dan Operasi Sistem Kecerdasan Artifisial",
						code: "CSAM602251",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini mencakup konsep-konsep rekayasa dan operasional untuk sistem Artificial Intelligence (AI). Materi yang dibahas meliputi prinsip-prinsip dasar rekayasa perangkat lunak (software engineering), pengelolaan alur pipa data (data pipeline management), pengembangan dan pengelolaan model AI, serta penyebaran (deployment) aplikasi AI dalam skala besar. Fokus utamanya adalah membekali mahasiswa dengan pengetahuan dan keterampilan yang diperlukan untuk mengelola seluruh siklus hidup (lifecycle) aplikasi AI. Hal ini mencakup integrasi alat-alat modern seperti Docker, Kubernetes, dan MLflow. Melalui mata kuliah ini, mahasiswa akan mampu merancang dan mengoperasikan aplikasi AI secara efisien dan andal.",
						prerequisites: [
							"Desain Produk Kecerdasan Artifisial",
							"Pengantar Arsitektur Komputer dan Sistem Operasi",
							"Sains Data dan Pemelajaran Mesin",
						],
						unlocks: [
							"Etika Kecerdasan Artifisial",
							"Kecerdasan Artifisial Generatif",
							"Proyek Pengembangan Produk Kecerdasan Artifisial",
							"Kecerdasan Artifisial Tepi",
						],
					},
					{
						name: "Rekayasa Data",
						code: "CSAM602271",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini membekali mahasiswa dengan keterampilan praktis untuk membangun, mengelola, dan mengotomatiskan alur pipa data (data pipelines) ujung ke ujung (end-to-end) yang efisien. Mahasiswa akan mengeksplorasi seluruh siklus hidup data (data lifecycle), dimulai dari teknik akuisisi data terstruktur dan tidak terstruktur melalui RDBMS, API, dan web scraping, diikuti oleh proses validasi dan profiling menggunakan perangkat lunak modern untuk memastikan integritas data. Pembelajaran ini juga mencakup metode pembersihan data (data cleaning) yang kompleks untuk berbagai jenis data, mulai dari teks dan data numerik hingga jenis spesifik seperti data temporal dan spasial (geospatial). Selain aspek pemrosesan, mata kuliah ini menekankan pada implementasi transformasi dan pengayaan data (data transformation and enrichment) menggunakan teknologi cloud-native seperti Spark, dbt, dan Airbyte, serta optimasi performa melalui pemilihan format penyimpanan seperti Parquet dan Avro. Mahasiswa juga akan mempelajari cara mengorkestrasikan alur kerja data berbasis DAG (DAG-based data workflows) menggunakan kerangka kerja alur kerja data seperti Airflow atau Dagster, mengelola sistem berbasis peristiwa (event-driven systems) menggunakan kerangka kerja seperti Kafka atau Flink, serta menyediakan data yang siap pakai melalui pengembangan API ringan seperti memanfaatkan FastAPI atau Flask. Melalui proyek kelompok yang intensif, mahasiswa diharapkan mampu mengintegrasikan semua komponen ini ke dalam sistem rekayasa data (data engineering system) yang modular dan tangguh untuk mendukung kebutuhan analitikal skala besar.",
						prerequisites: ["Basis Data", "Sains Data dan Pemelajaran Mesin"],
						unlocks: [
							"Proyek Pengembangan Produk Kecerdasan Artifisial",
							"Basis Data Kecerdasan Artifisial",
						],
					},
				],
			},
			{
				semester: 5,
				courses: [
					{
						name: "Etika Kecerdasan Artifisial",
						code: "CSAM603090",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini membahas perspektif etis dalam pengembangan dan penerapan teknologi AI di dunia nyata serta mengeksplorasi berbagai potensi solusi, baik secara teknis maupun non- teknis. Secara khusus, mahasiswa mempelajari solusi teknis untuk isu-isu etis dalam AI melalui studi model explainable AI, baik secara teoritis maupun praktis dalam bentuk implementasi berbasis proyek.",
						prerequisites: [
							"Rekayasa dan Operasi Sistem Kecerdasan Artifisial",
						],
						unlocks: ["Proyek Pengembangan Produk Kecerdasan Artifisial"],
					},
					{
						name: "Jaringan Sistem Komputer",
						code: "CSAM603152",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini memperkenalkan jaringan komputer dan internet, membahas bagaimana protokol berfungsi dalam lapisan jaringan komputer berdasarkan standar OSI atau TCP/ IP, serta memberikan pemahaman kepada mahasiswa mengenai aplikasi yang memanfaatkan jaringan komputer. Setelah menyelesaikan mata kuliah ini, mahasiswa akan mampu membangun aplikasi yang menggunakan jaringan komputer dan merancang jaringan komputer berdasarkan berbagai konsep dan protokol jaringan sesuai dengan standar OSI atau TCP/ IP. Topik yang dicakup meliputi: pengantar jaringan komputer dan internet, lapisan aplikasi (application layer), lapisan transpor (transport layer), lapisan jaringan (network layer), lapisan tautan (link layer) dan LAN, serta keamanan jaringan komputer. Metode pembelajaran menggunakan pendekatan flipped classroom.",
						prerequisites: ["Pengantar Arsitektur Komputer dan Sistem Operasi"],
						unlocks: [
							"Proyek Pengembangan Produk Kecerdasan Artifisial",
							"Kecerdasan Artifisial Tepi",
						],
					},
					{
						name: "Kecerdasan Artifisial Generatif",
						code: "CSAM603135",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini membahas dasar-dasar Generative Artificial Intelligence (AI), yang dibangun di atas fondasi deep learning yang telah diperoleh pada mata kuliah prasyarat Deep Learning. Fokus dari mata kuliah ini terletak pada teori dasar dan teknik software development untuk membuat model AI generatif, serta strategi untuk memanfaatkan model-model tersebut guna menyelesaikan masalah spesifik. Topik-topik utama meliputi metode pre-training dan fine-tuning, prompt engineering, reinforcement learning untuk model generatif, serta aspek-aspek inference dan deployment yang efisien pada infrastruktur high-performance computing. Model-model yang dibahas meliputi GPT, Diffusion, Variational Autoencoders (VAE), Generative Adversarial Networks (GAN), dan lainnya.",
						prerequisites: [
							"Pemelajaran Dalam",
							"Rekayasa dan Operasi Sistem Kecerdasan Artifisial",
						],
						unlocks: ["Proyek Pengembangan Produk Kecerdasan Artifisial"],
					},
					{
						name: "Metodologi Penelitian dan Penulisan Ilmiah",
						code: "CSGE603091",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini mencakup bahasan pada metodologi penelitian dan penulisan ilmiah pada bidang Ilmu Komputer, Kecerdasan Artifisial, Sistem Informasi, dan Teknologi Informasi (CS/AI/SI/TI). Di dalamnya, mahasiswa diajarkan cara berpikir yang sistematis, logis, dan ilmiah, lalu menuangkannya dalam bentuk tulisan ilmiah yang baik. Pokok-pokok bahasannya mencakup definisi penelitian dan paradigmanya (kuantitatif dan kualitatif, dasar dan terapan), tipe-tipe tulisan ilmiah, teknik studi literatur, identifikasi celah penelitian dan formulasi pertanyaan penelitian, teknik dan gaya penulisan ilmiah yang baik, etika dalam penulisan, penulisan ulasan literatur serta tinjauan kritis atasnya, teknik berpikir logis dan kritis, perancangan penelitian, serta penulisan metodologi penelitian. Dalam mata kuliah ini peserta diminta untuk melakukan penelitian mini dan menulis karya ilmiah sebagai proses terintegrasi, di bidang CS/AI/SI/TI. Secara garis besar, mata kuliah ini membahas bagaimana melakukan penelitian di bidang CS/AI/SI/TI, sehingga “peneliti” dapat mengelola sumber dayanya secara optimal dan menulis laporan penelitian secara ilmiah. Selain itu, mata kuliah ini akan mengeksplorasi peran penelitian sebagai fungsi inti dalam mendorong pemahaman tentang pengetahuan, keterampilan, dan sikap baru dalam pengembangan keilmuan CS/AI/SI/TI.",
						prerequisites: ["Semester 5"],
						unlocks: ["Tugas Akhir Individu", "Tugas Akhir Proyek Kelompok"],
					},
					{
						name: "Pengolahan Bahasa Manusia",
						code: "CSAM603134",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini mengeksplorasi berbagai teknik untuk membangun perangkat lunak yang mampu memproses bahasa manusia. Materi disusun secara sistematis sesuai dengan tingkatan representasi linguistik, dimulai dari morfologi (morphology), yang mencakup finite-state methods, two-level morphology, dan Part-of-Speech tagging. Pembahasan kemudian berlanjut ke sintaksis (syntax) melalui studi tentang Context-Free Grammars, probabilistic parsing, dan dependency parsing. Bahasan lebih lanjut meluas ke semantik (semantics) melalui analisis semantik berbasis aturan (rule-based semantic analysis) dan wacana (discourse), yang berfokus pada struktur wacana dan resolusi koreferensi (coreference resolution). Meskipun penekanan utama dari mata kuliah ini adalah pada Natural Language Understanding (NLU), mata kuliah ini juga memberikan pengenalan singkat tentang Natural Language Generation (NLG). Baik pendekatan simbolis (symbolic) maupun statistik (statistical) dibahas untuk memberikan pandangan yang komprehensif tentang bagaimana berbagai tantangan NLP ditangani.",
						prerequisites: ["Pemelajaran Dalam"],
						unlocks: ["Analitika Data Sosial", "Pemrosesan Bahasa Lisan"],
					},
				],
			},
			{
				semester: 6,
				courses: [
					{
						name: "Proyek Pengembangan Produk Kecerdasan Artifisial",
						code: "CSAM603223",
						sks: 6,
						category: "Wajib Program Studi",
						description:
							"Mata kuliah ini bertujuan untuk memberikan pengalaman dalam mengembangkan produk AI mulai dari perancangan hingga penyebaran (deployment) di lingkungan produksi. Mahasiswa mempelajari dan mempraktikkan secara langsung proses AI product lifecycle untuk menyelesaikan masalah dunia nyata bagi pengguna atau pemangku kepentingan, yang mencakup penyiapan data, pemodelan, parallel training, deployment, pemantauan (monitoring), dan pelatihan ulang (retraining). Mata kuliah ini menggunakan pembelajaran berbasis proyek (project-based learning) dengan hanya beberapa sesi kuliah tatap muka untuk memfasilitasi praktik di lingkungan produksi yang sebenarnya. Dalam kerangka kerja ini, mahasiswa mengintegrasikan keterampilan pemodelan AI, perancangan produk (product design), product deployment, dan operasional MLOps dalam konteks pengembangan AI yang berkelanjutan, aman, dan beretika. Mahasiswa diharapkan dapat menghasilkan produk AI yang berpusat pada pengguna (user-centric), siap disebarkan (deployment-ready), serta memiliki kemampuan untuk mempresentasikan produk mereka secara profesional.",
						prerequisites: [
							"Rekayasa dan Operasi Sistem Kecerdasan Artifisial",
							"Jaringan Sistem Komputer",
							"Etika Kecerdasan Artifisial",
							"Kecerdasan Artifisial Generatif",
							"Rekayasa Data",
						],
						unlocks: [],
					},
				],
			},
			{
				semester: 7,
				courses: [
					{
						name: "Kerja Praktik",
						code: "CSGE604097",
						sks: 6,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini memberikan kesempatan kepada mahasiswa untuk memperoleh pengalaman dalam penyelesaian permasalahan yang terdapat pada sebuah organisasi menggunakan Teknologi Informasi dan Komunikasi (TIK) dengan cara terjun secara langsung ke dunia kerja.",
						prerequisites: ["97 SKS"],
						unlocks: [],
					},
					{
						name: "Komputer dan Masyarakat",
						code: "CSGE614093",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini bertujuan untuk meningkatkan kesadaran dan kepekaan mahasiswa terhadap berbagai permasalahan sosial dan ekonomi yang terkait dengan implementasi teknologi komputer dalam kehidupan sehari-hari. Mahasiswa akan dihadapkan pada beberapa isu terkait teknologi informasi dan dituntut untuk menganalisis isu tersebut serta merekomendasikan solusi dari sudut pandang mereka sebagai mahasiswa kecerdasan artificial. Kuliah ini disampaikan dalam Bahasa Inggris untuk mengasah kemampuan komunikasi Mahasiswa dalam bahasa lingua franca.",
						prerequisites: ["Semester 7"],
						unlocks: [],
					},
				],
			},
			{
				semester: 8,
				courses: [
					{
						name: "Tugas Akhir Individu",
						code: "CSGE604099",
						sks: 6,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini adalah mata kuliah wajib yang bertujuan melatih kemampuan mahasiswa untuk menerapkan pengetahuan dalam bidang ilmu komputer dan/atau sistem informasi pada satu kegiatan penelitian maupun penyelesaian masalah di suatu organisasi, industri dan masyarakat. Setelah mengikuti mata kuliah ini mahasiswa dapat menghasilkan tulisan ilmiah berbahasa Indonesia maupun Inggris dalam bentuk skripsi, makalah maupun technical report. Kegiatan dilakukan secara mandiri atau berkelompok dengan jumlah anggota maksimum 3 orang dibawah bimbingan oleh minimal seorang dosen dalam waktu maksimum dua semester.",
						prerequisites: ["Metodologi Penelitian dan Penulisan Ilmiah"],
						unlocks: [],
					},
					{
						name: "Tugas Akhir Proyek Kelompok",
						code: "CSGE604098",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"Mata kuliah ini adalah mata kuliah wajib yang bertujuan melatih kemampuan mahasiswa untuk menerapkan pengetahuan dalam bidang ilmu komputer dan/atau sistem informasi pada satu kegiatan penelitian maupun penyelesaian masalah di suatu organisasi, industri dan masyarakat. Setelah mengikuti mata kuliah ini mahasiswa dapat menghasilkan tulisan ilmiah berbahasa Indonesia maupun Inggris dalam bentuk skripsi, makalah maupun technical report. Kegiatan dilakukan secara mandiri atau berkelompok dengan jumlah anggota maksimum 3 orang dibawah bimbingan oleh minimal seorang dosen dalam waktu maksimum dua semester.",
						prerequisites: ["Metodologi Penelitian dan Penulisan Ilmiah"],
						unlocks: [],
					},
				],
			},
			{
				semester: "Pilihan",
				courses: [
					{
						name: "Analitika Data Sosial",
						code: "CSAE604236",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Analitika Data Sosial membahas pendekatan komputasional end-to-end untuk memahami perilaku sosial manusia dari data digital, termasuk media sosial, data terbuka, dan jejak digital lainnya. Mata kuliah ini mencakup pengumpulan data yang bertanggung jawab, penilaian dan persiapan kualitas data, analitika konten (pemrosesan bahasa alami, analisis sentimen, pemodelan topik), analitika jejaring (representasi graf, sentralitas, deteksi komunitas), serta penerapan metode machine learning prediktif. Mata kuliah ini menekankan penguasaan teknik komputasional dan evaluasi kritis terhadap hasilnya, untuk mendukung pengambilan keputusan berbasis data pada konteks bisnis, pemerintahan, maupun kemasyarakatan.",
						prerequisites: ["Pengolahan Bahasa Manusia"],
						unlocks: [],
					},
					{
						name: "Basis Data Kecerdasan Artifisial",
						code: "CSAE604070",
						sks: 3,
						category: "Pilihan",
						track: "Teknologi Informasi",
						description:
							"Mata kuliah ini membahas prinsip perancangan dan pengelolaan infrastruktur data untuk aplikasi berbasis Kecerdasan Artifisial dari sudut pandang rekayasa sistem, mencakup vector database dan pengindeksan kemiripan, basis data graf sebagai backend penyimpanan, penyimpanan data multimodal, feature store, serta arsitektur lapisan data untuk sistem seperti Retrieval-Augmented Generation (RAG) dan rekomendasi. Mahasiswa akan mempelajari bagaimana fondasi basis data relasional dan rekayasa data yang telah dikuasai dapat diperlukan untuk melayani beban kerja Kecerdasan Artifisial modern yang berskala besar, berlatensi rendah, dan beragam bentuk data (vektor, graf, dan multimodal).",
						prerequisites: ["Basis Data", "Rekayasa Data"],
						unlocks: [],
					},
					{
						name: "Bioinformatika",
						code: "CSAE604240",
						sks: 3,
						category: "Pilihan",
						track: "Komputasi & Algoritma",
						description:
							"Mata kuliah ini membahas prinsip dan algoritma komputasional untuk menganalisis data biologis molekuler, mencakup dasar biologi molekuler yang diperlukan, algoritma penjajaran sekuens, perakitan genom, filogenetika, penerapan pemelajaran mesin klasik, serta pemelajaran dalam modern (protein language model, model bahasa genomik, dan AlphaFold) untuk analisis data beromik dan prediksi struktur protein. Mahasiswa memanfaatkan penguasaan struktur data, algoritma, pemelajaran mesin, dan pemelajaran dalam yang telah dimiliki untuk memecahkan permasalahan biologi komputasional secara mendalam, termasuk praktik langsung memprediksi struktur protein menggunakan ColabFold.",
						prerequisites: [
							"Sains Data dan Pemelajaran Mesin",
							"Struktur Data dan Algoritma",
							"Pemelajaran Dalam",
						],
						unlocks: [],
					},
					{
						name: "Graf Pengetahuan",
						code: "CSAE604131",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini memperkenalkan teknologi representasi data dan pengetahuan berbasis graf pengetahuan (knowledge graph), mencakup dua model data graf yang paling banyak dipakai saat ini, RDF dan property graph, beserta bahasa kueri, bahasa ontologi/skema, dan mekanisme validasinya masing-masing. Mata kuliah ini juga mencakup teknik konstruksi graf pengetahuan dari data teks, termasuk pemanfaatan Large Language Model (LLM), serta metode penilaian kualitas dan perbaikan (refinement) suatu graf pengetahuan, untuk mendukung integrasi data/ pengetahuan yang berasal dari sumber-sumber yang terpisah.",
						prerequisites: [
							"Basis Data",
							"Representasi Pengetahuan dan Penalaran",
						],
						unlocks: [],
					},
					{
						name: "Kecerdasan Artifisial Tepi",
						code: "CSAE604034",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini membahas prinsip dan teknik perancangan sistem Kecerdasan Artifisial yang berjalan pada perangkat dengan sumber daya terbatas (edge devices), mencakup kompresi model, kuantisasi, kompilasi dan runtime inferensi, hingga strategi penyebaran dan pemantauan model pada arsitektur edge-cloud. Mahasiswa akan mempelajari bagaimana prinsip jaringan komputer dan praktik operasi sistem Kecerdasan Artifisial (MLOps) yang telah dipelajari sebelumnya diperlukan untuk konteks edge computing, termasuk pertimbangan latensi, bandwidth, privasi melalui pemelajaran terdistribusi (federated learning), dan keterbatasan daya serta memori perangkat, dengan praktik langsung menggunakan mikrokontroler (Arduino/ STM32).",
						prerequisites: [
							"Jaringan Sistem Komputer",
							"Rekayasa dan Operasi Sistem Kecerdasan Artifisial",
						],
						unlocks: [],
					},
					{
						name: "Pemelajaran Mesin Graf",
						code: "CSEA604031",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini membahas metode pemelajaran mesin pada data berstruktur graf, mencakup embedding graf, arsitektur graph neural network (GCN, GraphSAGE, GAT), graf transformer, pemelajaran mandiri (self-supervised learning), serta teknik skalabilitas untuk graf berukuran besar. Mahasiswa membangun kemampuan ini di atas fondasi pemelajaran dalam yang telah dikuasai untuk merancang, melatih, dan mengevaluasi model graf pada aplikasi seperti sistem rekomendasi dan prediksi properti molekul.",
						prerequisites: ["Pemelajaran Dalam", "Pencarian dan Optimisasi"],
						unlocks: [],
					},
					{
						name: "Pemelajaran Mesin Klasik",
						code: "CSAE604030",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini membahas metode pemelajaran mesin klasik secara mendalam dan rigorous, mencakup teori pemelajaran statistik, Support Vector Machine dan metode kernel, metode ensemble (bagging dan boosting), serta model grafis probabilistik dan pemelajaran Bayesian. Mahasiswa akan memperdalam pemahaman teoretis atas trade-off bias-variance, regularisasi, dan generalisasi model dengan memanfaatkan fondasi optimisasi yang telah dikuasai, sebagai pelengkap topik pemelajaran mendalam yang dibahas pada mata kuliah lain.",
						prerequisites: [
							"Pencarian dan Optimisasi",
							"Sains Data dan Pemelajaran Mesin",
						],
						unlocks: [],
					},
					{
						name: "Pemelajaran Penguatan",
						code: "CSAE604233",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini membahas prinsip dan algoritma pemelajaran penguatan (reinforcement learning), mulai dari formalisasi Proses Keputusan Markov (Markov Decision Process) dan persamaan Bellman, metode tabular seperti dynamic programming, Monte Carlo, dan temporal difference learning, hingga pendekatan fungsi dan pemelajaran penguatan mendalam (deep reinforcement learning) seperti DQN, policy gradient, dan actor-critic. Mahasiswa memanfaatkan bekal jaringan saraf dari Pemelajaran Dalam serta teknik pencarian dan optimisasi yang telah dipelajari sebelumnya untuk menyelesaikan masalah pengambilan keputusan sekuensial di bawah ketidakpastian, serta merancang dan mengevaluasi agen yang belajar melalui interaksi dengan lingkungan.",
						prerequisites: [
							"Sains Data dan Pemelajaran Mesin",
							"Pencarian dan Optimisasi",
							"Pemelajaran Dalam",
						],
						unlocks: [],
					},
					{
						name: "Pemrograman Logika",
						code: "CSAE604222",
						sks: 4,
						category: "Pilihan",
						track: "Pemrograman & Rekayasa Perangkat Lunak",
						description:
							"Mata kuliah ini memperkenalkan paradigmam perogroman logika sebagai cara baru merepresentasikan dan menyelesaikan masalah komputasi, dengan Prolog sebagai bahasa utama, mencakup unifikasi, resolusi SLD, backtracking, serta teknik pemrograman deklaratif tingkat lanjut. Mahasiswa akan menghubungkan fondasi logika predikat yang telah dipelajari pada mata kuliah Representasi Pengetahuan dan Penalaran dengan implementasi komputasionalnya melalui studi kasus pencarian, sistem berbasis aturan, dan constraint logic programming.",
						prerequisites: [
							"Dasar-Dasar Pemrograman 1",
							"Representasi Pengetahuan dan Penalaran",
						],
						unlocks: [],
					},
					{
						name: "Pemrosesan Bahasa Lisan",
						code: "CSAE604032",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Pemrosesan Bahasa Lisan (Spoken Language Processing) merupakan bagian dari cabang ilmu natural language processing (NLP) yang secara khusus mempelajari bagaimana komputer melakukan pemrosesan suara (speech processing) sebagai sarana komunikasi verbal yang paling alami dan mudah dipahami manusia. Mata kuliah ini mempelajari teori pemrosesan sinyal suara serta berbagai teknik untuk membangun perangkat lunak yang mengolah bahasa lisan dalam bentuk suara. Secara umum, materi mata kuliah meliputi (i) teori sinyal suara, (ii) pengenalan suara (automatic speech recognition atau ASR), (iii) sintesis suara (speech synthesis atau text- to-speech/TTS), dan (iv) sistem dialog (spoken language dialogue system atau SLDS), dengan pendekatan machine learning untuk menyelesaikan permasalahan pengolahan bahasa lisan. Mahasiswa mengerjakan sejumlah tugas dan praktikum untuk memahami pemodelan bahasa lisan, termasuk membangun sistem ASR dan TTS, serta menyelesaikan sebuah tugas akhir bertopik bebas untuk mengeksplorasi lebih lanjut permasalahan dan teknik pemecahannya dalam pengolahan bahasa lisan.",
						prerequisites: ["Pemelajaran Dalam", "Pengolahan Bahasa Manusia"],
						unlocks: [],
					},
					{
						name: "Penambangan Data",
						code: "CSAE604037",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Penambangan Data mempelajari metodologi dan teknik untuk menemukan pola, aturan, dan pengetahuan yang tersembunyi pada kumpulan data berukuran besar, mengikuti kerangka proses CRISP-DM (Cross-Industry Standard Process for Data Mining) serta memperhatikan aspek etika data. Mata kuliah ini mencakup teknik penambangan pada data tabular, klastering lanjut dan deteksi outlier/anomali, penambangan aturan asosiasi, analisis deret waktu dan data graf, serta penambangan pada berbagai modalitas data seperti teks, web, citra, video, audio, dan data multimodal.",
						prerequisites: ["Basis Data", "Sains Data dan Pemelajaran Mesin"],
						unlocks: [],
					},
					{
						name: "Peramalan Kuantitatif",
						code: "CSAE604033",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini membahas peramalan kuantitatif atas data deret waktu, dimulai dari fondasi statistik klasik (dekomposisi, pemulusan eksponensial, model ARIMA/SARIMA) menuju pendekatan berbasis pembelajaran mesin dan pembelajaran mendalam (peramalan berbasis fitur, gradient-boosted trees, serta pengantar model neural dan model fondasi deret waktu). Mahasiswa akan mempelajari cara memilih, membangun, mengevaluasi, dan mengomunikasikan hasil model peramalan pada konteks aplikasi bisnis seperti peramalan permintaan dan peramalan finansial.",
						prerequisites: ["Sains Data dan Pemelajaran Mesin"],
						unlocks: [],
					},
					{
						name: "Robotika",
						code: "CSAE604232",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Robotika mempelajari dasar-dasar perancangan, pemodelan, dan pemrograman robot bergerak, mencakup wheeled mobile robot maupun quadcopter/drone, dengan Robot Operating System (ROS) sebagai kerangka kerja pengembangan utama. Mata kuliah ini mencakup lokomosi, kinematika, persepsi menggunakan sensor, navigasi dan lokalisasi probabilistik (Bayes filter, Kalman filter, particle filter), perencanaan (path planning), serta kendali umpan balik (feedback control) untuk mengeksekusi lintasan gerak robot, yang diintegrasikan pada sebuah proyek akhir pengembangan robot dalam simulasi.",
						prerequisites: [
							"Sains Data dan Pemelajaran Mesin",
							"Pengantar Arsitektur Komputer dan Sistem Operasi",
						],
						unlocks: [],
					},
					{
						name: "Temu-Balik Informasi",
						code: "CSAE604135",
						sks: 4,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini membahas prinsip dan teknik temu-balik informasi (information retrieval), mulai dari pengindeksan dan model klasik berbasis statistik teks hingga pendekatan neural modern seperti dense retrieval, learned sparse retrieval, dan retrieval-augmented generation (RAG). Mahasiswa akan memanfaatkan fondasi Pemelajaran Dalam yang telah dikuasai untuk merancang, mengimplementasikan, dan mengevaluasi sistem pencarian informasi berskala besar pada studi kasus nyata.",
						prerequisites: ["Pemelajaran Dalam"],
						unlocks: [],
					},
					{
						name: "Visualisasi Data dan Informasi",
						code: "CSAE604035",
						sks: 3,
						category: "Pilihan",
						track: "Pengolahan Informasi Cerdas",
						description:
							"Mata kuliah ini membahas prinsip persepsi dan kognisi, tata bahasa grafik (Grammar of Graphics), serta teknik visualisasi interaktif dan dashboard untuk mengomunikasikan data dan informasi secara efektif, dengan menekankan konteks khusus Kecerdasan Artifisial seperti visualisasi embedding, interpretabilitas model, dan ketidakpastian prediksi. Mahasiswa akan membangun kemampuan ini di atas fondasi desain-berpusat-pengguna dan sains data yang telah diperoleh pada mata kuliah prasyarat, tanpa mengulang materi dasar UX atau statistika deskriptif.",
						prerequisites: [
							"Desain Produk Kecerdasan Artifisial",
							"Sains Data dan Pemelajaran Mesin",
						],
						unlocks: [],
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
		courseMapUrl: "https://course.csui.dev/?prodi=CS_KKI",
		driveUrl: "https://course.csui.dev/?prodi=KKI",
		semesters: [
			{
				semester: 1,
				courses: [
					{
						name: "Calculus 1",
						code: "CSGE601012",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"This course discusses basic concepts of calculus and emphasize its importance for solving scientific problems and providing the basis of many computational techniques.",
						prerequisites: [],
						unlocks: ["Calculus 2", "Statistics & Probability"],
					},
					{
						name: "Discrete Mathematics 1",
						code: "CSGE601010",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"This course discusses various topics on Discrete Mathematics that provide theoretical foundations to support advanced study in computer science. Applications of each topic in computer science are also discussed.",
						prerequisites: [],
						unlocks: [
							"Automata & Theory of Languages",
							"Statistics & Probability",
						],
					},
					{
						name: "Foundations of Programming 1",
						code: "CSGE601020",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"This course aims to teach the fundamental concepts and techniques of computer programming as an introduction to computer science. This module is taught using a combination of lectures and hands- on programming exercises.",
						prerequisites: [],
						unlocks: [
							"Computer Networks & Security",
							"Data Structures & Algorithms",
							"Foundations of Programming 2",
							"Platform-based Development",
						],
					},
					{
						name: "Introduction to Digital Systems",
						code: "CSCM601150",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"This course provides a basic understanding and practical aspects in designing digital systems using high- level programming language. such as VHDL. The students will learn basic concepts in designing digital circuits, such as binary representation, Boolean algebra, finite- state- machine and instruction- set processors. They also learn basic components for design on different levels of abstractions such as transistors, gates, flip flops, adders, multipliers, registers, memories and processors.",
						prerequisites: [],
						unlocks: ["Introduction to Computer Organization"],
					},
					{
						name: "Linear Algebra",
						code: "CSGE602012",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"This course prepares the students to be able to solve problems about matrix algebra and vector spaces. It also discusses the application of linear algebra in computer science.",
						prerequisites: [],
						unlocks: [
							"Introduction to Artificial Intelligence and Data Science",
							"Numerical Analysis",
						],
					},
				],
			},
			{
				semester: 2,
				courses: [
					{
						name: "Calculus 2",
						code: "CSCM601213",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"The course covers the advanced topics of calculus and builds upon the basic concepts of calculus introduced in the first part of the course.",
						prerequisites: ["Calculus 1"],
						unlocks: ["Numerical Analysis"],
					},
					{
						name: "Data Structures & Algorithms",
						code: "CSGE602040",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"The course discusses basic techniques for data abstractions and manipulation of such abstract structures through appropriate algorithms. It also introduces complexity analysis of space and time allocation in implementing algorithms.",
						prerequisites: ["Foundations of Programming 1"],
						unlocks: [
							"Algorithm Design & Analysis",
							"Introduction to Artificial Intelligence and Data Science",
						],
					},
					{
						name: "Discrete Mathematics 2",
						code: "CSGE601011",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"This course is a continuation of Discrete Mathematics 1 that provides further theoretical foundations for Computer Science.",
						prerequisites: [],
						unlocks: ["Automata & Theory of Languages"],
					},
					{
						name: "Foundations of Programming 2",
						code: "CSGE601021",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"This course is the second part of the two- course Programming Foundations. It is built upon the knowledge and experience from the first part of Programming Foundations to enhance the programming skill. It specifically focuses on the object- oriented programming paradigm (using Java) and emphasizes the use of this paradigm in problem solving.",
						prerequisites: ["Foundations of Programming 1"],
						unlocks: [
							"Advanced Programming",
							"Databases",
							"Software Engineering",
						],
					},
					{
						name: "Introduction to Computer Organization",
						code: "CSCM601252",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"This course provides the foundations of sequential computer organization consisting of input, output, memory, and processor (control and data path). The understanding of these concepts will also be supported with some programming exercises using low- level languages, e.g., assembly languages.",
						prerequisites: ["Introduction to Digital Systems"],
						unlocks: ["Operating Systems"],
					},
				],
			},
			{
				semester: 3,
				courses: [
					{
						name: "Automata & Theory of Languages",
						code: "CSCM602241",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"This course discusses theoretical models of computation and formal languages. It covers the underlying concept of theory of computation, several abstract machines as models of computation, including Turing Machines, formal languages such as context- free languages, and the limitation of computation.",
						prerequisites: ["Discrete Mathematics 1", "Discrete Mathematics 2"],
						unlocks: [],
					},
					{
						name: "Databases",
						code: "CSGE602070",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"This course discusses the basic concept of database management including the aspect of modeling and design, language and facility, implementation and the application of databases.",
						prerequisites: ["Foundations of Programming 2"],
						unlocks: ["Software Engineering Projects"],
					},
					{
						name: "Operating Systems",
						code: "CSCM602055",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"This course discusses the organization, structure and concepts of computer operating systems. The trade- off between the performance and the functionality in designing and implementing an operating system is discussed, with the emphasis on processes management, interprocess communication, memory management, I/O management, file system management, implementation examples (GNU/Linux and MS Windows), and the support provided by operating systems for distributed systems.",
						prerequisites: ["Introduction to Computer Organization"],
						unlocks: ["Computer Networks & Security"],
					},
					{
						name: "Platform-based Development",
						code: "CSGE602022",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"This course discusses software development process on various platforms. The material studied in this course are related to various programming concepts and rules that are applied to a platform. Examples of platforms that are relevant today are web and mobile devices. Each platform has different characteristics, ranging from programming patterns, processing mechanisms, interaction between components / API / hardware, and interactions with users which are applied to high- level programming.",
						prerequisites: ["Foundations of Programming 1"],
						unlocks: ["Advanced Programming", "Human Computer Interaction"],
					},
					{
						name: "Statistics & Probability",
						code: "CSCM602013",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"This course provides basics of statistics and probability for data interpretation in order to support problem solving and decision making.",
						prerequisites: ["Calculus 1", "Discrete Mathematics 1"],
						unlocks: [
							"Introduction to Artificial Intelligence and Data Science",
						],
					},
				],
			},
			{
				semester: 4,
				courses: [
					{
						name: "Advanced Programming",
						code: "CSCM602223",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"This advanced programming course will introduce students to the latest and most up- to- date programming techniques used in the industry. In addition to theory, the course will also teach students how to adapt to using enterprise- scale programming techniques to help them design, implement, and maintain complex systems. With the help of Agile software development methodology, students will learn about the software development lifecycle. The scope of this course includes Object Oriented Analysis & Design, Applying OO Principles, Test- driven Development, Software Packaging and Deployment, Scaling up Software, Design Patterns, Continuous Integration, Concurrency, High- level Networking, Familiarity with Cloud Deployment, and Web Services. The regular class will be conducted in Indonesian, while the international class will be conducted in English.",
						prerequisites: [
							"Foundations of Programming 2",
							"Platform-based Development",
						],
						unlocks: ["Software Engineering Projects"],
					},
					{
						name: "Algorithm Design & Analysis",
						code: "CSCM603142",
						sks: 4,
						category: "Wajib Program Studi",
						description:
							"This course discusses how to design and analyze algorithms for solving given problems. It focuses on two main issues, i.e., the correctness and the complexity of the algorithms. Several techniques and approaches will be discussed, including dynamic programming, greedy algorithms, graph algorithms, approximation algorithms, and NP- completeness.",
						prerequisites: ["Data Structures & Algorithms"],
						unlocks: [],
					},
					{
						name: "Computer Networks & Security",
						code: "CSCM603154",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"This course discusses fundamental concepts in computer networks, the Internet, and security. It emphasizes the top- down approach of the computer network and Internet model, starting from the application layer at the top and discusses all layers, starting from the application layer, transport layer, network layer, data link layer, and physical layer. Towards the end, it also discusses security topics.",
						prerequisites: [
							"Foundations of Programming 1",
							"Operating Systems",
						],
						unlocks: [],
					},
					{
						name: "Introduction to Artificial Intelligence and Data Science",
						code: "CSGE603130",
						sks: 4,
						category: "Wajib Fakultas",
						description:
							"This course introduces the concepts and basic techniques of artificial intelligence (AI) and data science. Participants in this course will be equipped with basic theoretical understanding and practical skills to solve artificial intelligence and data science problems. In addition, they will also be equipped with an understanding of how data science makes artificial intelligence as the principle for processing knowledge from data.",
						prerequisites: [
							"Statistics & Probability",
							"Data Structures & Algorithms",
							"Linear Algebra",
						],
						unlocks: [],
					},
					{
						name: "Software Engineering",
						code: "CSCM603125",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"This course discusses software engineering methodologies and life cycles, from requirements gathering, planning, analysis, design, implementation, and testing.",
						prerequisites: ["Foundations of Programming 2"],
						unlocks: ["Software Engineering Projects"],
					},
				],
			},
			{
				semester: 5,
				courses: [
					{
						name: "Computer & Society",
						code: "CSGE614093",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"This course aims to raise the students' awareness and sensibility to various social and economic problems regarding the implementation of computer technologies in daily lives. The students will be exposed to some issues related to IT and are required to analyze the issues and to recommend some solutions from their point of view as a student of computer science.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Human Computer Interaction",
						code: "CSGE602024",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"This course focuses on the interface design concepts for a software. In this course, students are taught how to apply the principles of human- computer interaction in developing an application, and offer a better alternative interaction design. Materials are delivered through active learning methods, such as: small group discussions, project- based learning, and the use of e- learning management system. The scope discussed in this course includes the historical context of human - computer interaction (HCI), interaction design, cognition, techniques in HCI, social aspects of HCI, data collection and analysis, interaction design process, prototyping, and evaluation.",
						prerequisites: ["Platform-based Development"],
						unlocks: [],
					},
					{
						name: "Numerical Analysis",
						code: "CSCM603117",
						sks: 3,
						category: "Wajib Program Studi",
						description:
							"The course provides the basic knowledge of numerical methods to solve scientific and engineering problem s. The students are trained to solve problems that require numerical analysis, e.g., using Matlab (or any other Programming Language for scientific computation) as the programming environment. Practical issues in implementing numerical methods, such as software reliability and hardware performance are also discussed.",
						prerequisites: ["Linear Algebra", "Calculus 2"],
						unlocks: [],
					},
					{
						name: "Scientific Writing & Research Methodology",
						code: "CSGE603091",
						sks: 3,
						category: "Wajib Fakultas",
						description:
							"This course focuses on methodology for doing research in computer science and develops students' scientific and critical thinking. It is also intended to enrich students' comprehension of the structure and execution of the written academic papers in reporting their research results. It involves the understanding of the process of writing, the techniques used in writing, and the writing itself. The development of writing should be an integrated approach of human- data- information- knowledge- tool interaction which may result in a sound and readable academic writing.",
						prerequisites: [],
						unlocks: [],
					},
					{
						name: "Software Engineering Projects",
						code: "CSCM603228",
						sks: 6,
						category: "Wajib Program Studi",
						description:
							"The course provides the students with the experience to be actively involved in one semester software engineering project by running a complete software development lifecycle, from ideation until deployment. Practical issues related to development methodology and technology used will be discussed.",
						prerequisites: [
							"Software Engineering",
							"Databases",
							"Advanced Programming",
						],
						unlocks: [],
					},
				],
			},
		],
	},
];
