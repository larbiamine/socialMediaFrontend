import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Post } from "../../types";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

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
};

interface ConfirmationModalProps {
	open: boolean;
	setOpen: Function;
	post: Post;
}

function ConfirmationModal({ open, setOpen, post }: ConfirmationModalProps) {
	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Delete Post
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Do you really want to delete this post ?
				</Typography>

				<Grid
					style={{
						marginTop: "15px",
						display: "flex",
						gap: "1rem",
					}}
				>
					<Button
						onClick={() => {
							console.log("/editprofile");
						}}
						size="small"
						color="myDanger"
						variant="contained"
					>
						{"Delete "}
					</Button>
					<Button
						onClick={() => {
							setOpen(false);
						}}
						size="small"
						color="mySecondary"
						variant="outlined"
					>
						{"Cancel "}
					</Button>
				</Grid>
			</Box>
		</Modal>
	);
}

export default ConfirmationModal;
