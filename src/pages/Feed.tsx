import Sidebar from "../components/feed/Sidebar";
import Grid from "@mui/material/Grid/Grid";
import Suggestions from "../components/feed/Suggestions";
import FeedPosts from "../components/feed/FeedPosts";
import AddPost from "../components/post/AddPost";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

function Feed() {
	const { currentUser } = useSelector((state: IRootState) => state);

	document.title = "Home";
	return (
		<>
			<Grid container columns={5}>
				<Grid item xs={1}>
					<Sidebar currentUser={currentUser} />
				</Grid>
				<Grid sx={{ marginTop: "80px" }} item xs={3}>
					<AddPost />
					<FeedPosts userFollowing={currentUser.following} />
				</Grid>
				<Grid item xs={1}>
					<Suggestions />
				</Grid>
			</Grid>
		</>
	);
}

export default Feed;
