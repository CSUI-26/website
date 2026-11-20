export interface LatestAchievement {
	id: string;
	title: string;
	award: string;
	image: string;
	teamName: string;
	members: string[];
	description: string;
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

export const latestAchievements: LatestAchievement[] = [];

export const yearlyAchievementsByYear: YearGroup[] = [];
