export interface LatestAchievement {
	id: string;
	title: string;
	award: string;
	image: string;
	teamName: string;
	members: string[];
	description: string;
	showOverlay?: boolean;
}

export interface YearlyAchievement {
	id: string;
	title: string;
	award?: string;
	year: number;
}

export interface YearGroup {
	year: number;
	items: YearlyAchievement[];
}

export const latestAchievements: LatestAchievement[] = [
	{
		id: "ioai-2024",
		title: "Lomba Lorem Ipsum",
		award: "JUARA 1",
		image: "/images/achievements/ioai-winner.png",
		teamName: "Team Lorem Ipsum",
		members: [
			"Lorem IK'26",
			"Ipsum IK KKI'26",
			"Dolor SI'26",
			"Sit Amet AI'26",
		],
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		showOverlay: false, // ioai-winner.png already incorporates the Figma artwork typography
	},
	{
		id: "icpc-2024",
		title: "ICPC Regional Asia",
		award: "JUARA 1",
		image: "/images/achievements/ioai-winner.png",
		teamName: "Team Lorem Ipsum 2",
		members: [
			"Alpha IK'26",
			"Beta IK'26",
			"Gamma SI'26",
			"Delta AI'26",
		],
		description:
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		showOverlay: true,
	},
	{
		id: "gemastik-2024",
		title: "Gemastik Divisi UX",
		award: "JUARA 1",
		image: "/images/achievements/ioai-winner.png",
		teamName: "Team Lorem Ipsum 3",
		members: [
			"Prada SI'26",
			"Sigma IK'26",
			"Omega AI'26",
			"Zeta KKI'26",
		],
		description:
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		showOverlay: true,
	},
];

export const yearlyAchievementsByYear: YearGroup[] = [
	{
		year: 2030,
		items: Array.from({ length: 15 }, (_, i) => ({
			id: `2030-${i + 1}`,
			title: "Lomba Lorem Ipsum",
			year: 2030,
		})),
	},
	{
		year: 2029,
		items: Array.from({ length: 10 }, (_, i) => ({
			id: `2029-${i + 1}`,
			title: "Lomba Lorem Ipsum",
			year: 2029,
		})),
	},
	{
		year: 2028,
		items: Array.from({ length: 10 }, (_, i) => ({
			id: `2028-${i + 1}`,
			title: "Lomba Lorem Ipsum",
			year: 2028,
		})),
	},
	{
		year: 2027,
		items: Array.from({ length: 5 }, (_, i) => ({
			id: `2027-${i + 1}`,
			title: "Lomba Lorem Ipsum",
			year: 2027,
		})),
	},
	{
		year: 2026,
		items: Array.from({ length: 5 }, (_, i) => ({
			id: `2026-${i + 1}`,
			title: "Lomba Lorem Ipsum",
			year: 2026,
		})),
	},
];
