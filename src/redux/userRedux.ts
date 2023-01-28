import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../authTypes";

const iState: initialState = {
	currentUser: null,
	isFetching: false,
	isRegisterError: false,
	isLoginError: false,
	registerError: "",
	emailSent: false,
};

const userSlice = createSlice({
	name: "user",
	initialState: iState,
	reducers: {
		initState: (state) => {
			state.isFetching = false;
			state.registerError = "";
			state.isLoginError = false;
			state.isRegisterError = false;
		},
		loginStart: (state) => {
			state.isFetching = true;
		},
		sendEmail: (state) => {
			state.emailSent = true;
		},
		unSendEmail: (state) => {
			state.emailSent = false;
		},
		confirmActive: (state) => {
			state.currentUser!.active = true;
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.isLoginError = false;
			state.currentUser = action.payload;
		},
		editSuccess: (state, action) => {
			state.isFetching = false;
			state.isLoginError = false;
			state.currentUser!.bio = action.payload.bio;
			state.currentUser!.gender = action.payload.gender;
			state.currentUser!.firstname = action.payload.firstname;
			state.currentUser!.lastname = action.payload.lastname;
			state.currentUser!.privacy = action.payload.privacy;
			state.currentUser!.avatar = action.payload.avatar;
		},
		logout: (state) => {
			state.currentUser = null;
			state.isLoginError = false;

			state.isFetching = false;
			state.registerError = "";
			state.isLoginError = false;
			state.isRegisterError = false;
		},
		loginFailed: (state) => {
			state.isLoginError = true;
			state.isFetching = false;
		},
		registerStart: (state) => {
			state.isFetching = true;
		},
		registerSuccess: (state) => {
			state.isFetching = false;
			state.isRegisterError = false;
		},

		registerFailed: (state, action) => {
			state.registerError = action.payload;
			state.isRegisterError = true;
			state.isFetching = false;
		},

		addPost: (state, action) => {
			state.currentUser?.posts.push(action.payload);
		},

		follow: (state, action) => {
			state.currentUser?.following.push(action.payload);
		},
		unfollow: (state, action) => {
			const index = state.currentUser?.following.indexOf(action.payload);
			if (index! > -1) {
				// only splice array when item is found
				state.currentUser?.following.splice(index!, 1); // 2nd parameter means remove one item only
			}
		},
	},
});

export const {
	registerStart,
	registerSuccess,
	registerFailed,
	loginFailed,
	logout,
	loginSuccess,
	loginStart,
	initState,
	sendEmail,
	confirmActive,
	unSendEmail,
	follow,
	unfollow,
	editSuccess,
	addPost,
} = userSlice.actions;

export default userSlice.reducer;
