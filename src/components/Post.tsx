import React from "react";

import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../utilities/fetchApi";
import PostCard from "./post/PostCard";
interface post {
	id: String;
}
function Post({ id }: post) {
	const queryKey = [`post ${id}`];
	const { currentUser } = useSelector((state: IRootState) => state);

	const { data, isLoading, status } = useQuery(queryKey, () => getPost(id));

	status === "success" && console.log("🆘 || file: Post.tsx:18 || data", data);
	return status === "success" && <PostCard {...data} />;
}

export default Post;
