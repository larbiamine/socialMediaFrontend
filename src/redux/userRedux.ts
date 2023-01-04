import { createSlice } from "@reduxjs/toolkit";
import { LoginResponse } from "../authTypes";

export interface initialState {
	currentUser: LoginResponse;
	isFetching: boolean;
	isError: boolean;
	error: string;
}

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		isRegisterError: false,
		isLoginError: false,
		registerError: "",
	},
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
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.isLoginError = false;
			state.currentUser = action.payload;
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
		registerSuccess: (state, action) => {
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
	addPost,
} = userSlice.actions;

export default userSlice.reducer;
