import * as React from "react";
import { styled } from "@mui/material/styles";

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

interface User {
	username: string;
	avatar: string;
}

interface Post {
	user: User;
	message: string;
	date: string;
	img: string;
	reactions: number;
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}
const currentUser = {
	username: "user name 1",
	avatar: "https://www.w3schools.com/howto/img_avatar.png",
};

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

const comments = [
	{
		user: {
			username: "user name 1",
			avatar:
				"https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
		},
		date: "September 14, 2016",
		comment: "Loum dolor sitng le pelpellendus 1 💥💢",
		reactions: 4,
	},
	{
		user: {
			username: "user name 4",
			avatar: "https://cdn-icons-png.flaticon.com/512/168/168882.png",
		},
		date: "September 24, 2016",
		comment: "Lorem ipng elit. Crem impedi 💥💢",
		avatar: "https://cdn-icons-png.flaticon.com/512/168/168882.png",
		reactions: 3,
	},
	{
		user: {
			username: "user name 4",
			avatar: "https://cdn-icons-png.flaticon.com/512/168/168882.png",
		},
		date: "September 24, 2016",
		comment: "whats up negro ☢ ⬛",
		avatar: "https://cdn-icons-png.flaticon.com/512/168/168882.png",
		reactions: 47,
	},
];

export default function PostCard({
	img,
	user,
	message,
	date,
	reactions,
}: Post) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: "100%" }}>
			<CardHeader
				avatar={
					<Avatar
						src={user.avatar}
						sx={{ bgcolor: red[500] }}
						aria-label="recipe"
					/>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={user.username}
				subheader={date}
			/>
			<CardMedia component="img" height="194" image={img} alt="Paella dish" />
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{message}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<Badge color="mySecondary" badgeContent={reactions}>
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
					<AddComment {...currentUser} />
					{comments.map((comment) => (
						<Comment {...comment} />
					))}
				</CardContent>
			</Collapse>
		</Card>
	);
}
