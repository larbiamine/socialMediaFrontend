const BASE_URL = import.meta.env.VITE_BASE_URL;

import { loginUser, LoginResponse } from "./authTypes";
import axios from "axios";

export const authApi = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});
authApi.defaults.headers.common["Content-Type"] = "application/json";

export const loginUserFn = async (user: loginUser) => {
	return user;
};
// export const loginUserFn = async (user: loginUser) => {
// 	const response = await authApi.post<LoginResponse>("auth/login", user);
// 	return response.data;
// };
