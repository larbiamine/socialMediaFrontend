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

interface Query {
	userId: string;
}

interface Request {
	query: Query;
	userFollowing: Array<string>;
}

export async function getPosts(request: Request) {
	if (typeof request !== "undefined") {
		const res = await userRequest.get("post/getposts/", request);
		return res.data;
	}

	const res = await userRequest.get("post/getposts/");

	return res.data;
}
