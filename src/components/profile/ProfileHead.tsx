import { Avatar, Button, Grid, Typography } from "@mui/material";
import { HeadProps } from "../../types";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FollowersList from "./FollowersList";
import Link from "@mui/material/Link";
import { followButton } from "../../utilities/buttonsOnclick";
import FollowingList from "./FollowingList";

const ProfileHead: FC<HeadProps> = ({ user, currentUser }): JSX.Element => {
	const avatar = {
		marginTop: 4,
		width: 200,
		height: 200,
	};
	const [isFollowing, setIsFolowing] = useState(false);

	const [followersOpen, setFollowersOpen] = useState(false);
	const [followingOpen, setFollowingOpen] = useState(false);

	const [loaded, setLoaded] = useState(true);

	const myProfile = user._id === currentUser._id;

	if (loaded && currentUser?.following.includes(user._id)) {
		setIsFolowing(true);
		setLoaded(false);
	}

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const FollowButton = () => {
		if (myProfile) {
			return (
				<>
					<Button
						onClick={() => {
							navigate("/editprofile");
						}}
						size="small"
						color="mySecondary"
						variant="contained"
					>
						{"Edit Profile "}
					</Button>
					<Button size="small" color="mySecondary" variant="outlined">
						{"Account Settings"}
					</Button>
				</>
			);
		} else {
			if (!isFollowing) {
				return (
					<Button
						onClick={() => {
							followButton(dispatch, user._id, "follow");
						}}
						size="small"
						color="mySecondary"
						variant="contained"
					>
						{"Follow "}
					</Button>
				);
			} else {
				return (
					<Button
						onClick={() => {
							followButton(dispatch, user._id, "unfollow");
						}}
						size="small"
						color="mySecondary"
						variant="outlined"
					>
						{"UnFollow "}
					</Button>
				);
			}
		}
	};

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

					<FollowButton />
				</Grid>
				<Grid
					style={{ marginTop: 10, marginBottom: 10 }}
					container
					spacing={-20}
				>
					<Grid item xs={4}>
						<Typography fontSize={16} color="initial">
							Posts
							<br />
							<Link
								component="button"
								variant="body1"
								onClick={() => setFollowersOpen(true)}
								style={{ color: "black", textDecoration: "none" }}
							>
								{user.posts.length}
							</Link>
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography fontSize={16} color="initial">
							Followers
							<br />
							<Link
								component="button"
								variant="body1"
								onClick={() => setFollowersOpen(true)}
								style={{ color: "black", textDecoration: "none" }}
							>
								{user.followers.length}
							</Link>
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography fontSize={16} color="initial">
							Following
							<br />{" "}
							<Link
								component="button"
								variant="body1"
								onClick={() => setFollowingOpen(true)}
								style={{ color: "black", textDecoration: "none" }}
							>
								{user.following.length}
							</Link>
						</Typography>
					</Grid>
				</Grid>
				<Typography fontSize={18} fontWeight={"bold"} color="initial">
					{user.firstname ? user.firstname + " " + user.lastname : ""}
				</Typography>
				<Typography fontSize={16} color="initial">
					{user.bio}
				</Typography>
			</Grid>
			<FollowersList
				currentUser={currentUser}
				setOpen={setFollowersOpen}
				open={followersOpen}
				userFollowers={user.followers}
			/>
			<FollowingList
				currentUser={currentUser}
				setOpen={setFollowingOpen}
				open={followingOpen}
				userFollowing={user.following}
			/>
		</Grid>
	);
};
export default ProfileHead;
