import { Avatar, Button, Grid, Typography } from "@mui/material";
import { User } from "../../types";
import { FC } from "react";

interface HeadProps {
	user: User;
	currentUser: User;
}

const ProfileHead: FC<HeadProps> = ({ user, currentUser }): JSX.Element => {
	const avatar = {
		marginTop: 4,
		width: 200,
		height: 200,
	};

	const myProfile = user._id === currentUser._id;
	console.log(user._id);
	console.log(currentUser._id);

	return (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<Avatar sx={avatar} src={user.avatar} />
			</Grid>
			<Grid sx={{ marginTop: 5 }} item xs={8}>
				<Grid style={{ display: "flex", gap: "1rem" }}>
					<Typography fontWeight={"bold"} variant="h5" color="initial">
						{user.username}
					</Typography>
					{myProfile ? (
						<>
							<Button size="small" color="mySecondary" variant="contained">
								{"Edit Profile "}
							</Button>
							<Button size="small" color="mySecondary" variant="outlined">
								{"Account Settings"}
							</Button>
						</>
					) : (
						<Button size="small" color="mySecondary" variant="contained">
							{"Follow "}
						</Button>
					)}
				</Grid>
				<Grid
					style={{ marginTop: 10, marginBottom: 10 }}
					container
					spacing={-20}
				>
					<Grid item xs={4}>
						<Typography fontSize={16} color="initial">
							Posts
							<br /> {user.posts.length}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography fontSize={16} color="initial">
							Followers
							<br /> {user.followers.length}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography fontSize={16} color="initial">
							Following
							<br /> {user.following.length}
						</Typography>
					</Grid>
				</Grid>
				<Typography fontSize={18} fontWeight={"bold"} color="initial">
					{user.firstname + " " + user.lastname}
				</Typography>
				<Typography fontSize={16} color="initial">
					{user.bio}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default ProfileHead;
