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
	gender: string;
	bio: string;
	privacy: string;
	avatar: string;
	email: string;
	followers: Array<string>;
	following: Array<string>;
	posts: Array<string>;
	active: boolean;
	createdAt: string;
	updatedAt: string;
	accessToken: string;
}

export interface initialState {
	currentUser: LoginResponse | null;
	isFetching: boolean;
	isRegisterError: boolean;
	isLoginError: boolean;
	registerError: string;
	emailSent: boolean;
}
