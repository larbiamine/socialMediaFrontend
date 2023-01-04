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
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import AddComment from "./AddComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { Badge } from "@mui/material";
import { publicRequest } from "../../utilities/requestMethodes";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../utilities/fetchApi";
import { timeAgo } from "../../utilities/time";

interface User {
	userId: string;
	username: string;
	avatar: string;
}

interface Post {
	userId: string;
	body: string;
	createdAt: string;
	photos: Array<string>;
	comments: Array<string>;
	likes: Array<string>;
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
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
}: Post) {
	const ListOfImages = () => {
		var listimgs: any[] = [];
		const asyncfetch = async () => {
			for (const key in photos) {
				if (Object.prototype.hasOwnProperty.call(photos, key)) {
					const element = photos[key];

					listimgs.push(
						<ImageListItem key={element}>
							<img src={element} />
						</ImageListItem>
					);
				}
			}
		};
		asyncfetch();

		return (
			<ImageList
				style={{
					margin: 10,
				}}
				variant="masonry"
				cols={3}
				gap={8}
			>
				{listimgs}
			</ImageList>
		);
	};

	const [expanded, setExpanded] = React.useState(false);
	const { currentUser } = useSelector((state: IRootState) => state);
	const [user, setUser] = useState<User>();

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
	const queryKey = `postcomments ${_id}`;
	const request = {
		postId: _id,
	};
	const config = {
		params: request,
	};
	const { data, status } = useQuery([queryKey], () => getComments(config));
	// status === "success" && console.log(data);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const comment = {
		user: {
			avatar: currentUser.avatar,
			username: currentUser.username,
		},
		postId: _id,
	};
	const agoDate = timeAgo.format(new Date(createdAt));

	return (
		<Card sx={{ marginLeft: "auto", marginRight: "auto", maxWidth: "70%" }}>
			<CardHeader
				avatar={
					<Avatar
						src={user?.avatar}
						sx={{ bgcolor: red[500] }}
						aria-label="recipe"
					/>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={user?.username}
				subheader={agoDate}
			/>

			<ListOfImages />

			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{body}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<Badge color="mySecondary" badgeContent={2}>
						<FavoriteIcon />
					</Badge>
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show comments"
				>
					<CommentIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					{/* <AddComment {...currentUser} /> */}
					<AddComment {...comment} />
					{status === "loading" ? (
						<p>LOADING</p>
					) : (
						data.map((comment) => <Comment key={comment._id} {...comment} />)
					)}
				</CardContent>
			</Collapse>
		</Card>
	);
}
