import { Avatar, Button, Grid, Typography } from "@mui/material";
import { HeadProps } from "../../types";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { follow, unfollow } from "../../redux/userRedux";

const topBottomSpacing = { marginTop: 15, marginBottom: 15 };

interface HeadProps {
	min700: boolean;
	user: User;
	currentUser: User;
	isFollowing: boolean;
}

import { useNavigate } from "react-router-dom";
import FollowersList from "./FollowersList";
import Link from "@mui/material/Link";
import { followButton } from "../../utilities/buttonsOnclick";
import FollowingList from "./FollowingList";

import { useQueryClient } from "@tanstack/react-query";

const ProfileHead: FC<HeadProps> = ({
	min700,
	user,
	currentUser,
}): JSX.Element => {
	const avatar = {
		marginLeft: min700 ? 2 : 0,
		marginTop: min700 ? 0 : 4,

		width: min700 ? 75 : 200,
		height: min700 ? 75 : 200,
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

	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const FollowButton700 = () => {
		if (myProfile) {
			return (
				<Grid
					style={{ ...topBottomSpacing, marginLeft: 15, marginRight: 15 }}
					container
					spacing={0}
					columns={5}
				>
					<Grid item xs={2}>
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
					</Grid>
					<Grid item xs={3}>
						<Button
							fullWidth
							size="small"
							color="mySecondary"
							variant="outlined"
						>
							{"Account Settings"}
						</Button>
					</Grid>
				</Grid>
			);
		} else {
			if (!isFollowing) {
				return (
					<Button
						onClick={() => {
							followButton(dispatch, user._id, "follow").then(() => {
								setIsFolowing(true);
								queryClient.invalidateQueries([`user ${user._id}`]);
							});
						}}
						size="small"
						color="mySecondary"
						variant="contained"
						fullWidth
						style={{ ...topBottomSpacing, marginLeft: 10, marginRight: 10 }}
					>
						{"Follow "}
					</Button>
				);
			} else {
				return (
					<Button
						onClick={() => {
							followButton(dispatch, user._id, "unfollow").then(() => {
								setIsFolowing(false);
								queryClient.invalidateQueries([`user ${user._id}`]);
							});
						}}
						size="small"
						color="mySecondary"
						variant="outlined"
						fullWidth
						style={{ ...topBottomSpacing, marginLeft: 10, marginRight: 10 }}
					>
						{"UnFollow "}
					</Button>
				);
			}
		}
	};
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
							followButton(dispatch, user._id, "follow").then(() => {
								setIsFolowing(true);
								queryClient.invalidateQueries([`user ${user._id}`]);
							});
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
							followButton(dispatch, user._id, "unfollow").then(() => {
								setIsFolowing(false);
								queryClient.invalidateQueries([`user ${user._id}`]);
							});
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
		<>
			{min700 ? (
				<Typography
					style={{
						marginTop: -35,
						marginBottom: 10,
						marginLeft: 15,
					}}
					fontWeight={"bold"}
					variant="h6"
					color="initial"
				>
					{user.username}
				</Typography>
			) : (
				<></>
			)}

			<Grid container spacing={min700 ? 0 : 2}>
				<Grid item xs={4}>
					<Avatar sx={avatar} src={user.avatar} />
				</Grid>
				<Grid sx={{ marginTop: min700 ? 0 : 5 }} item xs={8}>
					<Grid style={{ display: "flex", gap: "1rem" }}>
						{!min700 && (
							<Typography fontWeight={"bold"} variant="h5" color="initial">
								{user.username}
							</Typography>
						)}

						{!min700 && <FollowButton />}
					</Grid>
					<Grid style={topBottomSpacing} container spacing={min700 ? 0 : -20}>
						<Grid item xs={4}>
							<Typography fontSize={16} color="initial">
								Posts
								<br />
								{user.posts.length}
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
					{!min700 && (
						<div>
							<Typography fontSize={18} fontWeight={"bold"} color="initial">
								{user.firstname ? user.firstname + " " + user.lastname : ""}
							</Typography>
							<Typography fontSize={16} color="initial">
								{user.bio}
							</Typography>
						</div>
					)}
				</Grid>
				{min700 && (
					<div style={{ marginBottom: 10, marginLeft: 15, marginTop: 15 }}>
						<Typography fontSize={18} fontWeight={"bold"} color="initial">
							{user.firstname ? user.firstname + " " + user.lastname : ""}
						</Typography>
						<Typography fontSize={16} color="initial">
							{user.bio}
						</Typography>
					</div>
				)}
				{min700 && <FollowButton700 />}
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
		</>
	);
};
export default ProfileHead;
