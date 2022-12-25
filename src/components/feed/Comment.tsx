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
import React from "react";
import styled from "@emotion/styled";

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
}

interface Comment {
	user: User;
	comment: string;
	date: string;
	reactions: number;
}

function Comment(comment: Comment) {
	return (
		<div>
			<Paper
				style={{ marginBottom: "10px", padding: "10px 10px" }}
				elevation={3}
			>
				<Grid container wrap="nowrap" spacing={2}>
					<Grid item>
						<Avatar src={comment.user.avatar} />
					</Grid>
					<Grid justifyContent={"left"} item xs zeroMinWidth>
						<Typography style={{ textAlign: "left" }}>
							{comment.user.username}
						</Typography>
						<Typography>{comment.comment}</Typography>
						<Grid container spacing={2}>
							<Grid item xs={2}>
								<IconButton
									style={{ marginRight: 0 }}
									aria-label="add to favorites"
								>
									<StyledBadge
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "right",
										}}
										badgeContent={comment.reactions}
										color="mySecondary"
									>
										<FavoriteIcon fontSize="small" />
									</StyledBadge>
								</IconButton>
							</Grid>
							<Grid item xs={10}>
								<Typography style={{ textAlign: "right", color: "gray" }}>
									{comment.date}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

export default Comment;
