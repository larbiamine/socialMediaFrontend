import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getPosts } from "../../utilities/fetchApi";
import { useState } from "react";

function ProfilePosts(id: string) {
	const request = {
		userId: id,
		userFollowing: [],
	};
	const config = {
		params: request,
	};

	const { data, status } = useQuery(["posts"], () => getPosts(config));
	status === "success" && console.log(data);

	return (
		status === "success" && (
			<Grid container rowSpacing={3}>
				{data.map((post) => (
					<Grid key={post.message} item xs={12}>
						<PostCard {...post} />
					</Grid>
				))}
			</Grid>
		)
	);
}

export default ProfilePosts;
