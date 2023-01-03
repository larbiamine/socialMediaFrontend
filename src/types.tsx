export interface User {
	_id: string;
	avatar: string;
	username: string;
	bio: string;
	lastname: string;
	firstname: string;
	posts: Array<string>;
	followers: Array<string>;
	following: Array<string>;
	active: boolean;
	accessToken: string;
	createdAt: string;
	email: string;
	updatedAt: string;
}
