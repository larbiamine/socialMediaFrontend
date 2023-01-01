import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

var TOKEN = "";

if (localStorage.getItem("persist:root")) {
	TOKEN = JSON.parse(
		JSON.parse(localStorage.getItem("persist:root")).currentUser
	).accessToken;
}

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
