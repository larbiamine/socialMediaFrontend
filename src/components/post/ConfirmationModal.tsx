import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Post } from "../../types";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { deletePost } from "../../utilities/fetchApi";
import AlertToast from "../AlertToast";
import { useQueryClient } from "@tanstack/react-query";
import { deleteImage, getIdFromUrl } from "../../utilities/image";

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
	setMessage: Function;
	setType: Function;
	setOpenToast: Function;
	post: Post;
}

function ConfirmationModal({
	open,
	setOpen,
	post,
	setOpenToast,
	setMessage,
	setType,
}: ConfirmationModalProps) {
	const queryClient = useQueryClient();

	const OnDeletePost = async () => {
		try {
			const res = await deletePost(post);
			console.log(res);
			if (res === "error") {
				setMessage("Something Went Wrong");
				setType("myDanger");
			} else {
				setMessage("Post Deleted");
				setType("info");
				queryClient.invalidateQueries(["posts"]);
			}
			setOpenToast(true);
			setOpen(false);

			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
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
							onClick={OnDeletePost}
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
		</>
	);
}

export default ConfirmationModal;
