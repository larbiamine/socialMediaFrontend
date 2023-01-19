import { Box } from "@mui/system";
import ProfilePosts from "../components/profile/ProfilePosts";
import { User } from "../types";
import ProfileHead from "../components/profile/ProfileHead";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getUser } from "../utilities/fetchApi";
import { useQuery } from "@tanstack/react-query";

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

	if (status === "success") {
		document.title = data.username;
	}
	// useEffect(() => {
	// 	const findUser = async (id: string) => {
	// 		try {
	// 			const resUser = await getUser(id);

	// 			// const resUser = await userRequest.get(`user/find/${id}`);
	// 			setLoading(false);
	// 			setUser(resUser);
	// 			document.title = resUser.username;
	// 		} catch (error) {
	// 			console.log(error);
	// 			setError("user Not Found");
	// 		}
	// 	};

	// 	findUser(id);
	// }, []);

	return (
		status === "success" && (
			<Box sx={profileBox}>
				<ProfileHead user={data} currentUser={currentUser} />

				<ProfilePosts id={data._id.toString()} />
			</Box>
		)
	);
}

export default Profile;
