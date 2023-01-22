import { editSuccess, loginFailed, loginStart } from "../redux/userRedux";
import { Post, Profile } from "../types";
import { deleteImage, uploadImage } from "./image";
import { userRequest } from "./requestMethodes";
import { checkRedirect } from "./security";

interface PPost {
	body: string;
	photos: Array<string>;
	privacy: string;
}

export async function createPost(variables: PPost) {
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

// export async function getPosts(data: postConfig) {
// 	const res = await userRequest.get("post/getposts/", data);

// 	return res.data;
// }
export async function getPosts(data: postConfig, page: number) {
	const res = await userRequest.get(`post/getposts?page=${page}`, data);

	return res.data;
}
// export async function getFeedPosts(data: postConfig) {
// 	const res = await userRequest.get("post/getfeedposts/", data);

// 	return res.data;
// }
export async function getFeedPosts(
	userFollowing: Array<string>,
	pageParam: number
) {
	const res = await userRequest.get("post/getfeedposts", {
		params: {
			page: pageParam,
			userFollowing: userFollowing,
		},
	});

	return res.data;
}

export async function getUserPosts(id: string) {
	const res = await userRequest.get(`post//getposts/${id}`);
	return res.data;
}

export async function getComments(postId: string, pageParam: number) {
	const res = await userRequest.get("comment/getcomments", {
		params: {
			page: pageParam,
			postId: postId,
		},
	});
	// console.log(res.data);

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

export async function followUser(option: string, id: string) {
	try {
		await userRequest.post(`user/${option}/${id}`);
		return "success";
	} catch (error) {
		return "error";
	}
}

export async function getUser(userId: string) {
	try {
		const res = await userRequest.get(`user/find/${userId}`);
		return res.data;
	} catch (error) {
		return "error";
	}
}

export async function searchUser(query: string) {
	try {
		console.log(query);
		const res = await userRequest.get(`user/search/${query}`);
		return res.data;
	} catch (error) {
		return "error";
	}
}

export const editProfile = async (
	dispatch: Function,
	imgFile: File,
	profile: Profile,
	oldImgId: String
) => {
	dispatch(loginStart());
	var imgId: string[] = [];
	try {
		if (imgFile) {
			if (oldImgId && oldImgId != "")
				await deleteImage("userAvatars", oldImgId);
			var imgArr: File[] = [];
			imgArr.push(imgFile);
			imgId = await uploadImage("userAvatars", imgArr);
			const newProfile = {
				avatar: imgId[0],
				lastname: profile.lastname,
				firstname: profile.firstname,
				bio: profile.bio,
				gender: profile.gender,
				privacy: profile.privacy,
			};
			const res = await userRequest.put("/user/editprofile", newProfile);
			dispatch(editSuccess(res.data));
		} else {
			const newProfile = {
				avatar: oldImgId,
				lastname: profile.lastname,
				firstname: profile.firstname,
				bio: profile.bio,
				gender: profile.gender,
				privacy: profile.privacy,
			};
			const res = await userRequest.put("/user/editprofile", newProfile);
			dispatch(editSuccess(res.data));
		}
	} catch (error) {
		dispatch(loginFailed());
	}
};

export const deletePost = async (post: Post) => {
	try {
		const res = await userRequest.delete(`/post/${post._id}`);
		if (post.photos.length > 0) {
			for (const image of post.photos) {
				await deleteImage("postImages", image);
			}
		}
		return res.data;
	} catch (error) {
		console.log(error);
		return "error";
	}
};

interface SuggestionUser {
	_id: string;
	username: string;
	lastname: string;
	firstname: string;
	avatar: string;
}

export const getSuggestions = async () => {
	try {
		const res = await userRequest.get("user/suggestions");
		return res.data;
	} catch (error) {
		return [];
	}
};
