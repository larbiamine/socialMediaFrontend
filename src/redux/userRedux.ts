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
		isError: false,
		error: "",
	},
	reducers: {
		loginStart: (state) => {
			state.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.isError = false;
			state.currentUser = action.payload;
		},
		logout: (state) => {
			state.currentUser = null;
			state.isError = false;
		},
		loginFailed: (state) => {
			state.isError = true;
			state.isFetching = false;
		},
		registerStart: (state) => {
			state.isFetching = true;
		},
		registerSuccess: (state, action) => {
			state.isFetching = false;
			state.isError = false;
		},

		registerFailed: (state, action) => {
			state.error = action.payload;
			state.isError = true;
			state.isFetching = false;
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
} = userSlice.actions;

export default userSlice.reducer;
