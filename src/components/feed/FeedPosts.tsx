import { Grid } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getFeedPosts } from "../../utilities/fetchApi";

import { isRedirectData } from "../../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useEffect } from "react";

function FeedPosts({ userFollowing }: Array) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const queryKey = ["feedposts"];
	const req = {
		userFollowing: userFollowing,
	};

	const config = {
		params: req,
	};

	// const { data, status, isLoading } = useQuery(queryKey, () =>
	// 	getFeedPosts(config)
	// );

	// const { data, status, isLoading } = useQuery(
	// 	queryKey,
	// 	() => getFeedPosts2(config, page),
	// 	{ keepPreviousData: true }
	// );

	const { isLoading, data, fetchNextPage } = useInfiniteQuery(
		queryKey,
		({ pageParam = 0 }) => getFeedPosts(config, pageParam),
		{
			getNextPageParam: (page) => {
				const currentPage = parseInt(page.page);
				const numberOfPages = parseInt(page.numberOfPages);

				if (currentPage + 1 >= numberOfPages) {
					return undefined;
				}
				return currentPage + 1;
			},
		}
	);

	// if (isRedirectData(data)) {
	// 	dispatch(logout());
	// 	navigate(data.redirectURL);
	// }

	const handleScroll = () => {
		let fetching = false;
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;

		if (bottom) {
			if (!fetching) {
				fetching = true;
				console.log("at the bottom and gon fetch next");
				fetchNextPage();
				fetching = false;
			}
			console.log("at the bottom");
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

	// return (
	// 	status === "success" && (
	// 		<Grid container rowSpacing={3}>
	// 			{data?.map((post) => (
	// 				<Grid key={post._id} item xs={12}>
	// 					<PostCard {...post} />
	// 				</Grid>
	// 			))}
	// 		</Grid>
	// 	)
	// );
	return (
		<Grid container rowSpacing={3}>
			{!isLoading &&
				data?.pages.map((page) =>
					page.posts.map((post) => (
						<Grid key={post._id} item xs={12}>
							<PostCard {...post} />
						</Grid>
					))
				)}
		</Grid>
	);
}
export default FeedPosts;
