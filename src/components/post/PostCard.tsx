import * as React from "react";
import { useState, useEffect } from "react";
import { IRootState } from "./redux/store";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Comment from "./Comment";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Image from "mui-image";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

import AddComment from "./AddComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { Badge, Box, Link, Grid } from "@mui/material";
import { publicRequest } from "../../utilities/requestMethodes";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getComments, likePost, unlikePost } from "../../utilities/fetchApi";
import { timeAgo } from "../../utilities/time";
import HeaderMenu from "./HeaderMenu";
import { Post } from "../../types";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { typography } from "@mui/system";

interface User {
	userId: string;
	username: string;
	avatar: string;
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(360deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function PostCard({
	photos,
	userId,
	body,
	_id,
	createdAt,
	likes,
	comments,
}: Post) {
	const imgsStyle =
		photos.length > 1
			? { height: photos.length > 2 ? 450 : 200, overflowY: "scroll" }
			: {};

	const ListOfImages = () => {
		var listimgs: any[] = [];
		const asyncfetch = async () => {
			for (const key in photos) {
				if (Object.prototype.hasOwnProperty.call(photos, key)) {
					const element = photos[key];

					listimgs.push(
						<ImageListItem key={element}>
							<Image
								src={element}
								easing="ease-in-out"
								duration={1000}
								height={photos.length === 1 ? "300px" : "100%"}
								showLoading={true}
								fit={"cover"}
							/>
						</ImageListItem>
					);
				}
			}
		};
		asyncfetch();

		return (
			<Box sx={imgsStyle}>
				<ImageList
					style={{
						margin: 10,
					}}
					variant="quilted"
					cols={listimgs.length % 3}
					gap={8}
				>
					{listimgs}
				</ImageList>
			</Box>
		);
	};

	const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
	const [expanded, setExpanded] = React.useState(false);
	const { currentUser } = useSelector((state: IRootState) => state);
	const [user, setUser] = useState<User>();

	const [liked, setliked] = useState(likes.includes(userId));
	const [nbLikes, setNbLikes] = useState(likes.length);
	const [nbComments, setNbComments] = useState(comments.length);
	// var liked = likes.includes(userId);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await publicRequest.get(`user/find/${userId}`);
				const { avatar, username } = res.data;
				setUser({
					userId: userId,
					username: username,
					avatar: avatar,
				});
			} catch (error) {
				console.log(error);
			}
		};
		if (userId === currentUser._id) {
			setUser({
				userId: currentUser._id,
				username: currentUser.username,
				avatar: currentUser.avatar,
			});
		} else {
			getUser();
		}
	}, []);

	// getting post comments
	const queryKey = [`postcomments ${_id}`];

	const {
		isFetchingNextPage,
		isLoading,
		data,
		fetchNextPage,
		refetch,
		hasNextPage,
	} = useInfiniteQuery(
		queryKey,
		({ pageParam = 1 }) => getComments(_id, pageParam),
		{
			getNextPageParam: (page) => {
				const currentPage = parseInt(page.page);
				const numberOfPages = parseInt(page.numberOfPages);

				if (currentPage + 1 > numberOfPages) {
					return undefined;
				}
				return currentPage + 1;
			},
			enabled: false,
		}
	);

	const handleExpandClick = () => {
		refetch();
		setExpanded(!expanded);
	};

	const comment = {
		user: {
			avatar: currentUser.avatar,
			username: currentUser.username,
			id: currentUser._id,
		},
		postId: _id,
		setNbComments: setNbComments,
	};
	const agoDate = timeAgo.format(new Date(createdAt));

	const handlelikePost = () => {
		if (liked) {
			setliked(false);
			setNbLikes((old) => old - 1);
			unlikePost(_id)
				.then(() => {
					console.log("unliked");
					// queryClient.invalidateQueries(["posts"]);
				})
				.catch((err) => {
					console.log("ERRRROR");

					setliked(true);
					setNbLikes((old) => old + 1);
				});
		} else {
			setliked(true);
			setNbLikes((old) => old + 1);
			likePost(_id)
				.then(() => {
					console.log("liked");
					// queryClient.invalidateQueries(["posts"]);
				})
				.catch((errr) => {
					console.log("ERRRROR");
					setliked(false);
					setNbLikes((old) => old - 1);
				});
		}
	};

	return (
		<Card
			sx={{
				marginLeft: "auto",
				marginRight: "auto",
				marginBottom: "20px",
				maxWidth: "70%",
			}}
		>
			<CardHeader
				avatar={
					<Link
						style={{
							textDecoration: "none",
							color: "black",
						}}
						href={`/profile/${userId}`}
					>
						<Avatar
							src={user?.avatar}
							sx={{ bgcolor: red[500] }}
							aria-label="recipe"
						/>
					</Link>
				}
				action={
					currentUser.posts.includes(_id) && (
						<IconButton
							onClick={(event: React.MouseEvent<HTMLElement>) =>
								setAnchor(event.currentTarget)
							}
							aria-label="settings"
						>
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={
					<Link
						style={{
							textDecoration: "none",
							color: "black",
						}}
						href={`/profile/${userId}`}
					>
						{user?.username}
					</Link>
				}
				subheader={agoDate}
			/>

			<ListOfImages />

			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{body}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton onClick={handlelikePost} aria-label="add to favorites">
					<Badge color="mySecondary" badgeContent={nbLikes}>
						<FavoriteIcon color={liked ? "mySecondary" : ""} />
					</Badge>
				</IconButton>

				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show comments"
				>
					<Badge color="mySecondary" badgeContent={nbComments}>
						<CommentIcon />
					</Badge>
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center"
					>
						<Grid width={"100%"} item>
							<AddComment {...comment} />
						</Grid>
						{isLoading && <CircularProgress />}
						<Grid width={"100%"} item>
							{!isLoading &&
								data?.pages.map((page) =>
									page.comments.map((comment) => (
										<Comment key={comment._id} {...comment} />
									))
								)}
						</Grid>

						{!isFetchingNextPage && hasNextPage && (
							<Typography
								style={{
									marginTop: "10px",
									textDecoration: "underline",
									color: "black",
									cursor: "pointer",
								}}
								variant="body1"
								color="initial"
							>
								<a onClick={() => fetchNextPage()}>Load More</a>
							</Typography>
						)}
						{isFetchingNextPage && (
							<CircularProgress
								style={{
									marginTop: "10px",
								}}
							/>
						)}
					</Grid>
				</CardContent>
			</Collapse>
			{currentUser.posts.includes(_id) && (
				<HeaderMenu
					anchor={anchor}
					setAnchor={setAnchor}
					post={{
						photos,
						userId,
						body,
						_id,
						createdAt,
						likes,
						comments,
					}}
				/>
			)}
		</Card>
	);
}
