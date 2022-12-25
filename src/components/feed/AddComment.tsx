import {
	Avatar,
	Badge,
	BadgeProps,
	Grid,
	IconButton,
	Paper,
	Typography,
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import styled from "@emotion/styled";
import AddCommentIcon from "@mui/icons-material/AddComment";
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

function AddComment(user: User) {
	const handleSubmitComment = () => {};
	return (
		<div>
			<Paper
				style={{ marginBottom: "10px", padding: "10px 10px" }}
				elevation={3}
			>
				<Grid style={{}} container wrap="nowrap" spacing={2}>
					<Grid item>
						<Avatar src={user.avatar} />
					</Grid>
					<Grid justifyContent={"left"} item xs zeroMinWidth>
						<OutlinedInput
							id="outlined-adornment-password"
							type="text"
							size="small"
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={handleSubmitComment} edge="end">
										<AddCommentIcon />
									</IconButton>
								</InputAdornment>
							}
						/>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

export default AddComment;
