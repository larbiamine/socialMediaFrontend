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
import { FC } from "react";

import styled from "@emotion/styled";

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { timeAgo } from "../../utilities/time";
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
	body: string;
	createdAt: string;
	likes: Array<string>;
	postId: string;
}
const Comment: FC<Comment> = (props): ReactJSXElement => {
	const agoDate = timeAgo.format(new Date(props.createdAt));

	return (
		<div>
			<Paper
				style={{ marginBottom: "10px", padding: "10px 10px" }}
				elevation={3}
			>
				<Grid container wrap="nowrap" spacing={2}>
					<Grid item>
						<Avatar src={props.user?.avatar} />
					</Grid>
					<Grid justifyContent={"left"} item xs zeroMinWidth>
						<Typography style={{ textAlign: "left" }}>
							{props.user?.username}
						</Typography>
						<Typography>{props.body}</Typography>
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
										badgeContent={props.likes.length}
										color="mySecondary"
									>
										<FavoriteIcon fontSize="small" />
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
