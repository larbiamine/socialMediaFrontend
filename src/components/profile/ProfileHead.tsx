import { Avatar, Button, Grid, Typography } from "@mui/material";
import { User } from "../../types";
import { FC, useState } from "react";
import { followUser } from "../../utilities/fetchApi";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/userRedux";

interface HeadProps {
	user: User;
	currentUser: User;
	isFollowing: boolean;
}

const ProfileHead: FC<HeadProps> = ({ user, currentUser }): JSX.Element => {
	const avatar = {
		marginTop: 4,
		width: 200,
		height: 200,
	};
	const [isFollowing, setIsFolowing] = useState(false);

	const [loaded, setLoaded] = useState(true);

	const myProfile = user._id === currentUser._id;

	if (loaded && currentUser?.following.includes(user._id)) {
		setIsFolowing(true);
		setLoaded(false);
	}

	const dispatch = useDispatch();

	const followButton = async (option: string) => {
		option === "follow"
			? dispatch(follow(user._id))
			: dispatch(unfollow(user._id));
		try {
			console.info(`started ${option}ing`);
			const res = await followUser(option, user._id);
			if (res === "success") {
				console.info(`ended ${option}ing`);
			} else {
				if (option === "follow") {
					dispatch(unfollow(user._id));
				} else {
					dispatch(follow(user._id));
				}
				console.log("error following/unfollowing");
			}
		} catch (error) {
			if (option === "follow") {
				dispatch(unfollow(user._id));
			} else {
				dispatch(follow(user._id));
			}
			console.log(error);
		}
	};

	const FollowButton = () => {
		if (myProfile) {
			return (
				<>
					<Button size="small" color="mySecondary" variant="contained">
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
							followButton("follow");
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
							followButton("unfollow");
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
					{user.firstname ? user.firstname + " " + user.lastname : ""}
				</Typography>
				<Typography fontSize={16} color="initial">
					{user.bio}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default ProfileHead;
