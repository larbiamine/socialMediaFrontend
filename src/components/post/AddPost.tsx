import { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CardContent from "@mui/material/CardContent";

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
import { Button, MenuItem } from "@mui/material";

import { uploadImage, getRandomId } from "../../utilities/image";

interface User {
	username: string;
	avatar: string;
}

const currentUser = {
	username: "user name 1",
	avatar: "https://www.w3schools.com/howto/img_avatar.png",
};

export default function AddPost() {
	// ["public", "friends", "private"]

	const imgFileRef = useRef(null);
	const [postBody, setPostBody] = useState("");
	const [photos, setPhotos] = useState<File[]>([]);
	const [privacy, setPrivacy] = useState("friends");

	const onSubmit = async () => {
		var photoIds: string[] = [];

		if (photos.length > 0) {
			for (const file of photos) {
				const id = getRandomId();
				photoIds.push(id);
				await uploadImage(id, file);
			}
		}
	};

	const PostButton = () => {
		return (
			<Button
				onClick={onSubmit}
				style={{ margin: 10 }}
				color="mySecondary"
				variant="outlined"
			>
				{"Post"}
			</Button>
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
					id="post-body"
					placeholder="What's on your mind"
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
