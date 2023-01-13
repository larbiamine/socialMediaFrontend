import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getFeedPosts } from "../../utilities/fetchApi";

function FeedPosts({ userFollowing }: Array) {
	console.log(userFollowing);

	const req = {
		userFollowing: userFollowing,
	};

	const config = {
		params: req,
	};
	console.log(config.params.userFollowing);

	const { data, status } = useQuery(["feedposts"], () => getFeedPosts(config));

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
