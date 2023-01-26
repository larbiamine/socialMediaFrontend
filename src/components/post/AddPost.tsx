import { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CardContent from "@mui/material/CardContent";
import { IRootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";

import { uploadImage } from "../../utilities/image";

import { LoadingButton } from "@mui/lab";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "../../utilities/fetchApi";
import { addPost } from "../../redux/userRedux";
import AlertToast from "../AlertToast";
//w
export default function AddPost() {
	const queryClient = useQueryClient();
	const { currentUser } = useSelector((state: IRootState) => state);
	const dispatch = useDispatch();

	const mutation = useMutation({
		mutationFn: createPost,
		mutationKey: "feedposts",
		onSuccess: (newPost) => {
			queryClient.setQueryData(["feedposts"], (oldData) => [
				...(oldData ?? []),
				newPost,
			]);
			queryClient.invalidateQueries(["feedposts"]);
			dispatch(addPost(newPost._id));
		},
	});

	const imgFileRef = useRef(null);
	const [postBody, setPostBody] = useState("");
	const [photos, setPhotos] = useState<File[]>([]);
	const [privacy, setPrivacy] = useState("friends");
	const [isPosting, setIsPosting] = useState(false);

	const [openToastAlert, setOpenToastAlert] = useState(false);

	const onSubmit = async () => {
		var photoIds: string[] = [];
		setIsPosting(true);
		if (photos.length > 0 || postBody != "") {
			if (photos.length > 0) {
				photoIds = await uploadImage("postImages", photos);
			}

			const post = {
				body: postBody,
				photos: photoIds,
				privacy: privacy,
			};
			try {
				mutation.mutate(post);

				setPhotos([]);
				setPostBody("");
			} catch (error) {
				console.log(error);
			}
		}
		setIsPosting(false);
		setOpenToastAlert(true);
	};

	const PostButton = () => {
		return (
			<LoadingButton
				loading={isPosting}
				style={{ margin: 10 }}
				variant="contained"
				color="mySecondary"
				onClick={onSubmit}
			>
				Post
			</LoadingButton>
		);
	};

	const EndEndorcement = () => {
		return (
			<>
				<IconButton component="label" aria-label="add to favorites">
					<AddPhotoAlternateIcon />
					<input
						type="file"
						id="file-input"
						style={{ display: "none" }}
						accept="image/*"
						ref={imgFileRef}
						hidden
						disabled={isPosting}
						multiple
						onChange={(e: FormEvent<HTMLInputElement>) => {
							const filesList = e.target.files;
							var files: File[] = [];
							Array.from(filesList).forEach((f) => files.push(f));
							setPhotos((old) => files.concat(old));
						}}
					/>
				</IconButton>
				<PostButton />
			</>
		);
	};

	const ListOfImages = () => {
		return (
			<ImageList
				style={{
					margin: 10,
				}}
				variant="masonry"
				cols={3}
				gap={8}
			>
				{photos.map((item) => (
					<ImageListItem key={URL.createObjectURL(item)}>
						<img src={URL.createObjectURL(item)} />
					</ImageListItem>
				))}
			</ImageList>
		);
	};

	const Privacy = () => {
		return (
			<>
				<FormControl style={{ marginLeft: 20, marginTop: 1 }}>
					<Typography
						variant="body1"
						style={{ marginTop: "auto", marginBottom: "10px" }}
					>
						{currentUser.username}
					</Typography>
					<Select
						sx={{ height: "30px" }}
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						value={privacy}
						size="small"
						onChange={(e: SelectChangeEvent) => {
							setPrivacy(e.target.value);
						}}
					>
						<MenuItem value={"public"}>Public</MenuItem>
						<MenuItem value={"friends"}>Friends</MenuItem>
						<MenuItem value={"private"}>Private</MenuItem>
					</Select>
					<FormHelperText>Privacy</FormHelperText>
					<AlertToast
						open={openToastAlert}
						setOpen={setOpenToastAlert}
						message="Post Added"
						type="success"
					/>
				</FormControl>
			</>
		);
	};

	const MyAvatar = () => {
		return (
			<Avatar
				style={{
					marginTop: 4,
					width: 70,
					height: 70,
				}}
				src={currentUser.avatar}
				sx={{ bgcolor: red[500] }}
			/>
		);
	};

	return (
		<Card
			sx={{
				marginBottom: "30px",
				marginLeft: "auto",
				marginRight: "auto",
				maxWidth: "70%",
			}}
		>
			<CardHeader
				avatar={<MyAvatar />}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={<Privacy />}
			/>

			<CardContent>
				<TextField
					multiline
					fullWidth
					disabled={isPosting}
					id="post-body"
					placeholder="What's on your mind"
					value={postBody}
					maxRows={6}
					onChange={(e) => {
						setPostBody(e.target.value);
					}}
					InputProps={{ endAdornment: <EndEndorcement /> }}
				/>
			</CardContent>

			<ListOfImages />
		</Card>
	);
}
