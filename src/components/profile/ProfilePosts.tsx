import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getPosts } from "../../utilities/fetchApi";

function ProfilePosts(id: string) {
	const request = {
		userId: id,
		userFollowing: [],
	};
	const config = {
		params: request,
	};

	const { data, status } = useQuery([`user_${id.id}_posts`], () =>
		getPosts(config)
	);

	return (
		status === "success" && (
			<Grid sx={{ marginTop: 5 }} container rowSpacing={3}>
				<Grid container rowSpacing={3}>
					{data.map((post) => (
						<Grid key={post._id} item xs={12}>
							<PostCard {...post} />
						</Grid>
					))}
				</Grid>
			</Grid>
		)
	);
}

export default ProfilePosts;
