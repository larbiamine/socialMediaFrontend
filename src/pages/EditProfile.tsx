import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { Box, Container } from "@mui/system";
import {
	Avatar,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { editProfile } from "../utilities/fetchApi";
import AlertToast from "../components/AlertToast";
const avatar = {
	marginTop: 4,
	width: 200,
	height: 200,
};

function EditProfile() {
	const { currentUser } = useSelector((state: IRootState) => state);
	const { isFetching } = useSelector((state: IRootState) => state);
	const { isLoginError } = useSelector((state: IRootState) => state);
	const [imgSrc, setImgSrc] = useState(currentUser.avatar);
	const dispatch = useDispatch();
	const [imgFile, setImgFile] = useState<File>();
	const [gender, setGender] = useState(
		currentUser.gender ? currentUser.gender : ""
	);
	const [bio, setBio] = useState(currentUser.bio ? currentUser.bio : "");
	const [firstname, setFirstname] = useState(
		currentUser.firstname ? currentUser.firstname : ""
	);
	const [lastname, setLastname] = useState(
		currentUser.lastname ? currentUser.lastname : ""
	);

	const [openToastAlert, setOpenToastAlert] = useState(false);

	const [privacy, setPrivacy] = useState(currentUser.privacy);

	const handleGenderChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};
	const handlePrivacyChange = (event: SelectChangeEvent) => {
		setPrivacy(event.target.value as string);
	};

	const handleSubmit = async () => {
		try {
			await editProfile(
				dispatch,
				imgFile,
				{
					lastname,
					firstname,
					bio,
					gender,
					privacy,
				},
				currentUser.avatar
			);
			setOpenToastAlert(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container maxWidth="md">
			<Typography sx={{ mb: 5 }} component="h1" variant="h4">
				Edit Profile
			</Typography>

			<Box
				component={"form"}
				// onSubmit={handleSubmit}
				noValidate
				sx={{ mt: 1 }}
			>
				<Grid container spacing={2}>
					<Grid sx={{ marginTop: 5 }} item xs={4}>
						<div>
							<label htmlFor="file-input">
								<Avatar style={avatar} src={imgSrc} />
							</label>
							<input
								type="file"
								id="file-input"
								style={{ display: "none" }}
								accept="image/*"
								// ref={imgFileRef}
								onChange={(e) => {
									setImgFile(e.target.files[0]);
									setImgSrc(URL.createObjectURL(e.target.files[0]));
								}}
							/>
						</div>
					</Grid>
					<Grid sx={{ marginTop: 5 }} item xs={8}>
						<Grid style={{ display: "flex", gap: "1rem" }}>
							<TextField
								// error={isLoginError}
								margin="normal"
								sx={{ mb: 2 }}
								label="First Name"
								id="firstname"
								name="firstname"
								defaultValue={firstname}
								type="text"
								onChange={(e) => {
									setFirstname(e.target.value);
								}}
								variant="outlined"
								// helperText={usernameError ? "Username is required" : ""}
								fullWidth
							/>
							<TextField
								// error={usernameError}
								margin="normal"
								sx={{ mb: 2 }}
								label="Last Name"
								id="lastname"
								defaultValue={lastname}
								name="lastname"
								onChange={(e) => {
									setLastname(e.target.value);
								}}
								type="text"
								variant="outlined"
								// helperText={usernameError ? "Username is required" : ""}
								fullWidth
							/>
						</Grid>
						<Grid style={{ display: "flex", gap: "1rem" }}>
							<FormControl fullWidth>
								<InputLabel id="gender">Gender</InputLabel>
								<Select
									labelId="gender"
									id="gender"
									value={gender}
									label="Age"
									onChange={handleGenderChange}
								>
									<MenuItem value={"male"}>Male</MenuItem>
									<MenuItem value={"female"}>Female</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid style={{ display: "flex", gap: "1rem" }}>
							<TextField
								// error={usernameError}
								margin="normal"
								sx={{ mb: 2 }}
								label="Bio"
								id="bio"
								onChange={(e) => {
									setBio(e.target.value);
								}}
								name="bio"
								type="text"
								defaultValue={bio}
								variant="outlined"
								// helperText={usernameError ? "Username is required" : ""}
								fullWidth
							/>
						</Grid>

						<Grid style={{ display: "flex", gap: "1rem" }}>
							<FormControl fullWidth>
								<InputLabel id="gender">Gender</InputLabel>
								<Select
									labelId="privacy"
									id="privacy"
									value={privacy}
									label="Privacy"
									onChange={handlePrivacyChange}
								>
									<MenuItem value={"public"}>Public</MenuItem>
									<MenuItem value={"private"}>Private</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid style={{ display: "flex", gap: "1rem" }}>
							<LoadingButton
								loading={isFetching}
								fullWidth
								sx={{ mt: 3, mb: 1 }}
								// loadingPosition="start"
								variant="outlined"
								onClick={handleSubmit}
								size="large"
							>
								Save
							</LoadingButton>
						</Grid>
						{isLoginError && (
							<FormHelperText style={{ fontSize: 16, color: "red" }}>
								An Error has occured
							</FormHelperText>
						)}
					</Grid>
				</Grid>
			</Box>
			<AlertToast
				type={"success"}
				message={"profile saved"}
				setOpen={setOpenToastAlert}
				open={openToastAlert}
			/>
		</Container>
	);
}

export default EditProfile;
