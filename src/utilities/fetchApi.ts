import { userRequest } from "./requestMethodes";

interface Post {
	body: string;
	photos: Array<File>;
	privacy: string;
}

interface vars {
	post: Post;
}

export async function createPost(variables: vars) {
	const res = await userRequest.post("post/create", variables.post);
	return res.data;
}
