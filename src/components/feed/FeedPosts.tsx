import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getPosts } from "../../utilities/fetchApi";

function FeedPosts(id: string) {
	const request = {
		userId: id,
		userFollowing: [],
	};
	const config = {
		params: request,
	};

	const { data, status } = useQuery(["posts"], () => getPosts(config));

	return (
		status === "success" && (
			<Grid container rowSpacing={3}>
				{data.map((post) => (
					<Grid key={post._id} item xs={12}>
						<PostCard {...post} />
					</Grid>
				))}
			</Grid>
		)
	);
}

export default FeedPosts;
