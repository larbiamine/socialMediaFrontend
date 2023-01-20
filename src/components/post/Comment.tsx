import {
	Avatar,
	Badge,
	BadgeProps,
	Grid,
	IconButton,
	Paper,
	Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC, useState } from "react";

import styled from "@emotion/styled";

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { timeAgo } from "../../utilities/time";
import { likeComment, unlikeComment } from "../../utilities/fetchApi";
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	"& .MuiBadge-badge": {
		fontSize: 10,
		height: 15,
		width: 10,
	},
}));

interface User {
	username: string;
	avatar: string;
	id: string;
}

interface Comment {
	user: User;
	body: string;
	createdAt: string;
	likes: Array<string>;
	postId: string;
	_id: string;
}

const Comment: FC<Comment> = ({
	user,
	body,
	createdAt,
	likes,
	postId,
	_id,
}): ReactJSXElement => {
	const agoDate = timeAgo.format(new Date(createdAt));

	const [nbLikes, setNbLikes] = useState(likes.length);
	const [liked, setLiked] = useState(likes.includes(user?.id));

	const handleLikeComment = () => {
		if (liked) {
			setLiked(false);
			setNbLikes((old) => old - 1);
			unlikeComment(_id)
				.then(() => {
					console.log("unliked");
					// queryClient.invalidateQueries(["posts"]);
				})
				.catch((err) => {
					console.log("ERRRROR");

					setLiked(true);
					setNbLikes((old) => old + 1);
				});
		} else {
			setLiked(true);
			setNbLikes((old) => old + 1);
			likeComment(_id)
				.then(() => {
					console.log("liked");
					// queryClient.invalidateQueries(["posts"]);
				})
				.catch((errr) => {
					console.log("ERRRROR");
					setLiked(false);
					setNbLikes((old) => old - 1);
				});
		}
	};

	return (
		<div>
			<Paper
				style={{ marginBottom: "10px", padding: "10px 10px" }}
				elevation={3}
			>
				<Grid container wrap="nowrap" spacing={2}>
					<Grid item>
						<Avatar src={user?.avatar} />
					</Grid>
					<Grid justifyContent={"left"} item xs zeroMinWidth>
						<Typography style={{ textAlign: "left" }}>
							{user?.username}
						</Typography>
						<Typography>{body}</Typography>
						<Grid container spacing={2}>
							<Grid item xs={2}>
								<IconButton
									style={{ marginRight: 0 }}
									aria-label="add to favorites"
									onClick={() => {
										handleLikeComment();
									}}
								>
									<StyledBadge
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "right",
										}}
										badgeContent={nbLikes}
										color="mySecondary"
									>
										<FavoriteIcon
											color={liked ? "mySecondary" : ""}
											fontSize="small"
										/>
									</StyledBadge>
								</IconButton>
							</Grid>
							<Grid item xs={10}>
								<Typography style={{ textAlign: "right", color: "gray" }}>
									{agoDate}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default Comment;
