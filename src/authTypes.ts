export interface loginUser {
	username: any;
	password: any;
}

export interface registerUser {
	username: any;
	password: any;
	email: any;
	imgFile: any;
	// username: string;
	// password: string;
	// email: string;
}

export interface LoginResponse {
	_id: string;
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	followers: Array<string>;
	following: Array<string>;
	posts: Array<string>;
	active: boolean;
	createdAt: string;
	updatedAt: string;
	accessToken: string;
}
