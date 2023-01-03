import { userRequest } from "./requestMethodes";

interface Post {
	body: string;
	photos: Array<string>;
	privacy: string;
}

export async function createPost(variables: Post) {
	const res = await userRequest.post("post/create", variables);
	return res.data;
}

interface Data {
	userId: string;
	userFollowing: Array<string>;
}

interface Config {
	params: Data;
}

export async function getPosts(data: Config) {
	console.log(data);

	if (typeof data !== "undefined") {
		const res = await userRequest.get("post/getposts/", data);
		return res.data;
	}

	const res = await userRequest.get("post/getposts/");

	return res.data;
}
