import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
	reducers: {
		loginStart: (state) => {
			state.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.error = false;
			state.currentUser = action.payload;
		},
		logout: (state) => {
			state.currentUser = null;
			state.error = false;
		},
		loginFailed: (state) => {
			state.error = true;
			state.isFetching = false;
		},
	},
});

export const { loginFailed, logout, loginSuccess, loginStart } =
	userSlice.actions;

export default userSlice.reducer;
