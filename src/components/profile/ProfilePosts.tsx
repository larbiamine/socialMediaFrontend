import { Grid } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "../post/PostCard";
import { getPosts } from "../../utilities/fetchApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkRedirect } from "../../utilities/security";

function ProfilePosts(id: string) {
	const [myError, setMyError] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const request = {
		userId: id,
		userFollowing: [],
	};
	const config = {
		params: request,
	};

	const queryKey = [`user_${id.id}_posts`];

	// const { data, status } = useQuery([`user_${id.id}_posts`], () =>
	// 	getPosts(config)
	// );

	const { isLoading, data, fetchNextPage } = useInfiniteQuery(
		queryKey,
		({ pageParam = 0 }) => getPosts(config, pageParam),
		{
			getNextPageParam: (page) => {
				const currentPage = parseInt(page.page);
				const numberOfPages = parseInt(page.numberOfPages);

				if (currentPage + 1 >= numberOfPages) {
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

	return (
		!isLoading &&
		!myError && (
			<Grid sx={{ marginTop: 5 }} container rowSpacing={3}>
				<Grid container rowSpacing={3}>
					{data?.pages.map((page) =>
						page.posts.map((post) => (
							<Grid key={post._id} item xs={12}>
								<PostCard {...post} />
							</Grid>
						))
					)}
				</Grid>
			</Grid>
		)
	);
}

export default ProfilePosts;
