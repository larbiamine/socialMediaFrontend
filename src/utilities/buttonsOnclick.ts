import { follow, unfollow } from "../redux/userRedux";
import { followUser } from "./fetchApi";

export async function followButton(
	dispatch: Function,
	userId: string,
	option: string
) {
	option === "follow" ? dispatch(follow(userId)) : dispatch(unfollow(userId));
	try {
		console.info(`started ${option}ing`);
		const res = await followUser(option, userId);
		if (res === "success") {
			console.info(`ended ${option}ing`);
		} else {
			if (option === "follow") {
				dispatch(unfollow(userId));
			} else {
				dispatch(follow(userId));
			}
			console.log("error following/unfollowing");
		}
	} catch (error) {
		if (option === "follow") {
			dispatch(unfollow(userId));
		} else {
			dispatch(follow(userId));
		}
		console.log(error);
	}
}
