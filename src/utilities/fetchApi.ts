import { userRequest } from "./requestMethodes";

interface Post {
	body: string;
	photos: Array<string>;
	privacy: string;
}

export async function createPost(variables: Post) {
	console.log(variables);

	const res = await userRequest.post("post/create", variables);
	return res.data;
}
