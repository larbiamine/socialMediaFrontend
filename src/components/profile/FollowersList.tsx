import Box from "@mui/material/Box";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { FollowersListProps } from "../../types";
import UserWithAvatar from "./UserWithAvatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	borderRadius: "10px",
	border: "2px",
};

const FollowersList: FC<FollowersListProps> = ({
	currentUser,
	open,
	setOpen,
	userFollowers,
}): JSX.Element => {
	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Followers
				</Typography>
				{/* <Grid style={{ marginTop: 4 }} container wrap="nowrap" spacing={2}> */}
				<List>
					{userFollowers.map((user) => (
						<ListItem key={user}>
							<UserWithAvatar userId={user} currentUser={currentUser} />
						</ListItem>
					))}
				</List>
				{/* </Grid> */}
			</Box>
		</Modal>
	);
};

export default FollowersList;
