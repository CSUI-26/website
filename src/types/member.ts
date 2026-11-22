export interface MemberConfig {
	x: number;
	y: number;
	zoom: number;
	aspect: string;
}

export interface MemberPhoto {
	url: string;
	config: MemberConfig;
}

export interface Member {
	npm: string;
	email: string;
	name: string;
	nama_panggilan: string;
	major: string;
	instagram: string;
	line: string;
	github: string;
	linkedin: string;
	deskripsi: string;
	niche: string;
	quotes: string;
	foto: MemberPhoto;
}
