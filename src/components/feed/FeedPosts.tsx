import { CircularProgress, Grid } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getFeedPosts } from "../../utilities/fetchApi";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { checkRedirect } from "../../utilities/security";

function FeedPosts(userFollowing: Array<String>) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [myError, setMyError] = useState(false);
	const queryKey = ["feedposts"];

	const { isFetchingNextPage, isLoading, data, fetchNextPage, isError } =
		useInfiniteQuery(
			queryKey,
			({ pageParam = 1 }) => getFeedPosts(userFollowing, pageParam),
			{
				getNextPageParam: (page) => {
					const currentPage = parseInt(page.page);
					const numberOfPages = parseInt(page.numberOfPages);

					if (currentPage + 1 > numberOfPages) {
						return undefined;
					}
					return currentPage + 1;
				},
				onSuccess: (data) => {
					if (checkRedirect(dispatch, navigate, data?.pages[0])) {
						setMyError(true);
					}
				},
			}
		);

	const handleScroll = () => {
		let fetching = false;
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;

		if (bottom) {
			if (!fetching) {
				fetching = true;

				fetchNextPage();
				fetching = false;
			}
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justify="center"
			spacing={3}
		>
			<Grid width={"100%"} item>
				{!isLoading &&
					!isError &&
					!myError &&
					data?.pages.map((page) =>
						page.posts.map((post) => (
							<Grid key={post._id} item xs={12}>
								<PostCard {...post} />
							</Grid>
						))
					)}
			</Grid>
			<Grid item xs={3}>
				{(isLoading || isFetchingNextPage) && (
					<CircularProgress
						style={{
							marginTop: "10px",
						}}
					/>
				)}
			</Grid>
		</Grid>
	);
}

export default FeedPosts;
