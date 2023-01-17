import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getFeedPosts } from "../../utilities/fetchApi";

import { isRedirectData } from "../../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";

function FeedPosts({ userFollowing }: Array) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const req = {
		userFollowing: userFollowing,
	};

	const config = {
		params: req,
	};

	const { data, status, isLoading } = useQuery(["feedposts"], () =>
		getFeedPosts(config)
	);

	if (isRedirectData(data)) {
		dispatch(logout());
		navigate(data.redirectURL);
	}

	return (
		status === "success" && (
			<Grid container rowSpacing={3}>
				{!isLoading &&
					data.map((post) => (
						<Grid key={post._id} item xs={12}>
							<PostCard {...post} />
						</Grid>
					))}
			</Grid>
		)
	);
}
export default FeedPosts;
