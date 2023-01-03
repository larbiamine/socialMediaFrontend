import { Box } from "@mui/system";
import ProfilePosts from "../components/profile/ProfilePosts";
import { User } from "../types";
import ProfileHead from "../components/profile/ProfileHead";

const profileBox = {
	marginTop: "70px",
	paddingTop: "50px",
	paddingLeft: "170px",
	paddingRight: "170px",
	backgroundColor: "myPrimary",
};

function Profile(user: User) {
	return (
		<Box sx={profileBox}>
			<ProfileHead {...user} />

			<ProfilePosts id={user._id.toString()} />
		</Box>
	);
}

export default Profile;
