import { User } from "./types";

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

export interface initialState {
	currentUser: User | null;
	isFetching: boolean;
	isRegisterError: boolean;
	isLoginError: boolean;
	registerError: string;
	emailSent: boolean;
}
