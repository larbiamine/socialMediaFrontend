import { Avatar, Grid, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, FC } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../utilities/fetchApi";
import { Comment } from "../../types";

function AddComment({ user, postId, setNbComments }: Comment) {
	const [commentBody, setCommentBody] = useState<String>("");
	const [isPosting, setIsPosting] = useState(false);
	const queryClient = useQueryClient();
	const mutationKey = `postcomments ${postId}`;

	const mutation = useMutation({
		mutationFn: createComment,
		mutationKey: mutationKey,
		onSuccess: () => {
			queryClient.invalidateQueries([mutationKey]);
			setNbComments((old) => old + 1);
		},
	});

	const handleSubmitComment = () => {
		setIsPosting(true);
		console.log("posting Coment");

		if (commentBody != "") {
			const comment = {
				body: commentBody,
				postId: postId,
			};

			try {
				mutation.mutate(comment);
				setCommentBody("");
			} catch (error) {
				console.log(error);
			}
		}
		setIsPosting(false);
		console.log("done posting Coment");
	};

	return (
		<div>
			<Paper
				style={{ marginBottom: "10px", padding: "10px 10px" }}
				elevation={3}
			>
				<Grid style={{}} container wrap="nowrap" spacing={2}>
					<Grid item>
						<Avatar src={user?.avatar} />
					</Grid>
					<Grid justifyContent={"left"} item xs zeroMinWidth>
						<OutlinedInput
							id="outlined-adornment-password"
							type="text"
							size="small"
							fullWidth
							value={commentBody}
							onChange={(e) => {
								setCommentBody(e.target.value);
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										disabled={isPosting}
										onClick={handleSubmitComment}
										edge="end"
									>
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
