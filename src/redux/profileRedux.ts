import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

export interface initialState {
	User: User;
}

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		User: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.User = action.payload;
		},

		follow: (state, action) => {
			state.User?.followers.push(action.payload);
		},
		unfollow: (state, action) => {
			const index = state.User?.followers.indexOf(action.payload);
			if (index > -1) {
				// only splice array when item is found
				state.User?.followers.splice(index, 1); // 2nd parameter means remove one item only
			}
		},
	},
});

export const { follow, unfollow, setUser } = profileSlice.actions;

export default profileSlice.reducer;
