import { Box } from "@mui/system";
import ProfilePosts from "../components/profile/ProfilePosts";

import ProfileHead from "../components/profile/ProfileHead";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

import { getUser } from "../utilities/fetchApi";
import { useQuery } from "@tanstack/react-query";
import PrivateProfile from "../components/profile/PrivateProfile";

const profileBox = {
	marginTop: "70px",
	paddingTop: "50px",
	paddingLeft: "170px",
	paddingRight: "170px",
	backgroundColor: "myPrimary",
};

function Profile() {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const { currentUser } = useSelector((state: IRootState) => state);
	// console.log(currentUser);

	const { data, status } = useQuery([`user ${id}`], () => getUser(id));

	const myProfile = () => {
		if (status === "success") {
			return data._id === currentUser?._id;
		}
	};
	const isPublic = () => {
		if (status === "success") {
			return data.privacy === "public";
		}
	};
	const isPrivate = () => {
		if (status === "success") {
			return data.privacy === "private";
		}
	};
	const isFollowing = () => {
		if (status === "success") {
			return currentUser.following.includes(data._id);
		}
	};

	if (status === "success") {
		document.title = data.username;
	}

	return (
		status === "success" && (
			<Box sx={profileBox}>
				<ProfileHead user={data} currentUser={currentUser} />
				{myProfile() || isPublic() || (isPrivate() && isFollowing()) ? (
					<ProfilePosts id={data._id.toString()} />
				) : (
					<PrivateProfile />
				)}
			</Box>
		)
	);
}

export default Profile;
