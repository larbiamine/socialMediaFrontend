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

interface Comment {
	body: string;
	postId: string;
}
export async function createComment(variables: Comment) {
	const res = await userRequest.post("comment/create", variables);
	return res.data;
}

interface postData {
	userId: string;
	userFollowing: Array<string>;
}

interface postConfig {
	params: postData;
}

interface commentData {
	postId: String;
}

interface commentConfig {
	params: commentData;
}

export async function getPosts(data: postConfig) {
	if (typeof data !== "undefined") {
		const res = await userRequest.get("post/getposts/", data);
		return res.data;
	}

	const res = await userRequest.get("post/getposts/");

	return res.data;
}

export async function getComments(data: commentConfig) {
	const res = await userRequest.get("comment/getcomments/", data);
	return res.data;
}

export async function likePost(postId: string) {
	try {
		const res = await userRequest.put(`post/like/${postId}`);
		return "success";
	} catch (error) {
		return "error";
	}
}
export async function unlikePost(postId: string) {
	try {
		const res = await userRequest.put(`post/unlike/${postId}`);
		return "success";
	} catch (error) {
		return "error";
	}
}

export async function likeComment(commentId: string) {
	try {
		const res = await userRequest.put(`comment/like/${commentId}`);
		return "success";
	} catch (error) {
		return "error";
	}
}
export async function unlikeComment(commentId: string) {
	try {
		const res = await userRequest.put(`comment/unlike/${commentId}`);
		return "success";
	} catch (error) {
		return "error";
	}
}
