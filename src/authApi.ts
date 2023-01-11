const BASE_URL = import.meta.env.VITE_BASE_URL;

import { loginUser, LoginResponse, registerUser } from "./authTypes";
import axios from "axios";
import {
	initState,
	loginFailed,
	loginStart,
	loginSuccess,
	registerFailed,
	registerStart,
	registerSuccess,
} from "./redux/userRedux";
import { uploadImage } from "./utilities/image";
import { Profile } from "./types";

export const authApi = axios.create({
	baseURL: BASE_URL,
	// withCredentials: true,
});
authApi.defaults.headers.common["Content-Type"] = "application/json";

export const loginUserFn = async (user: loginUser) => {
	const response = await authApi.post<LoginResponse>("auth/login", user);
	return response.data;
};
// export const loginUserFn = async (user: loginUser) => {
// 	const response = await authApi.post<LoginResponse>("auth/login", user);
// 	return response.data;
// };

export const login = async (dispatch: Function, user: loginUser) => {
	dispatch(loginStart());

	try {
		const res = await authApi.post("/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailed());
	}
};

export const register = async (dispatch: Function, user: registerUser) => {
	dispatch(registerStart());
	var imgId: string[] = [];
	console.log(user.imgFile);

	try {
		if (user.imgFile) {
			var imgArr: File[] = [];
			imgArr.push(user.imgFile);
			console.log(imgArr);
			imgId = await uploadImage("userAvatars", imgArr);
			const newUser = {
				avatar: imgId[0],
				username: user.username,
				email: user.email,
				password: user.password,
			};
			const res = await authApi.post("/auth/register", newUser);
			dispatch(registerSuccess(res.data));
		} else {
			const res = await authApi.post("/auth/register", user);
			dispatch(registerSuccess(res.data));
		}
	} catch (error) {
		console.log("EERRRROR LOG =====================");

		console.log(error.response.data);

		dispatch(registerFailed(error.response.data));
	}
};
