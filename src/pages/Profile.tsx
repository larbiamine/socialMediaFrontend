import { Box } from "@mui/system";
import ProfilePosts from "../components/profile/ProfilePosts";
import { User } from "../types";
import ProfileHead from "../components/profile/ProfileHead";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getUser } from "../utilities/fetchApi";

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

	const [error, setError] = useState("");
	const [user, setUser] = useState<null | User>(null);
	const [loading, setLoading] = useState(true);

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
				setError("user Not Found");
			}
		};

		findUser(id);
	}, []);

	return (
		!loading &&
		!error && (
			<Box sx={profileBox}>
				<ProfileHead user={user} currentUser={currentUser} />

				<ProfilePosts id={user._id.toString()} />
			</Box>
		)
	);
}

export default Profile;
