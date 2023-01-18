import { FC, useState, useEffect } from "react";
import { getUser } from "../../utilities/fetchApi";
import { User } from "../../types";
import Typography from "@mui/material/Typography/Typography";

import AddCircleIcon from "@mui/icons-material/AddCircleOutline";

import { Avatar, IconButton, Link, Grid } from "@mui/material";
import { followButton } from "../../utilities/buttonsOnclick";
import { useDispatch } from "react-redux";
interface UserWithAvatarProps {
	userId: string;
	currentUser: Array<User>;
}

const UserWithAvatar: FC<UserWithAvatarProps> = ({
	userId,
	currentUser,
}): JSX.Element => {
	const [user, setUser] = useState<null | User>(null);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		const findUser = async (id: string) => {
			try {
				const resUser = await getUser(id);

				// const resUser = await userRequest.get(`user/find/${id}`);
				setLoading(false);
				setUser(resUser);
				document.title = resUser.username;
			} catch (error) {
				console.log(error);
			}
		};

		findUser(userId);
	}, []);

	return (
		!loading && (
			<>
				<Grid style={{ margin: 5 }} xs item>
					<Link
						style={{
							textDecoration: "none",
							color: "black",
						}}
						href={`/profile/${userId}`}
					>
						<Avatar src={user.avatar} />
					</Link>
				</Grid>
				<Grid justifyContent={"center"} item xs={8} zeroMinWidth>
					<Link
						style={{
							textDecoration: "none",
							color: "black",
						}}
						href={`/profile/${userId}`}
					>
						<Typography style={{ textAlign: "left" }}>
							{user.username}
						</Typography>
					</Link>
				</Grid>
				<Grid xs={1} item justifyContent={"right"}>
					<IconButton
						style={{ marginRight: 0 }}
						aria-label="add to favorites"
						onClick={() => followButton(dispatch, userId, "follow")}
					>
						{/* <CheckCircleIcon color="mySecondary" /> */}

						{!currentUser.following.includes(user._id) &&
							userId !== currentUser._id && (
								<AddCircleIcon color="mySecondary" />
							)}
					</IconButton>
				</Grid>
			</>
		)
	);
};

export default UserWithAvatar;
