import { Avatar, Grid, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

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
							fullWidth
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={handleSubmitComment} edge="end">
										<SendIcon />
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
