import Sidebar from "../components/feed/Sidebar";
import Grid from "@mui/material/Grid/Grid";
import Suggestions from "../components/feed/Suggestions";
import FeedPosts from "../components/feed/FeedPosts";
import AddPost from "../components/post/AddPost";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../styles/feed.css";
function Feed() {
	const { currentUser } = useSelector((state: IRootState) => state);

	const min600 = useMediaQuery("(max-width:600px)");

	document.title = "Home";
	return (
		<div className="feed">
			<Grid container columns={10}>
				{!min600 && (
					<Grid item xs={min600 ? 0 : 2}>
						<Sidebar {...currentUser} />
					</Grid>
				)}
				<Grid sx={{ marginTop: "80px" }} item xs={min600 ? 10 : 6}>
					<AddPost />
					<FeedPosts {...currentUser?.following} />
				</Grid>
				{!min600 && (
					<Grid item xs={min600 ? 0 : 2}>
						<Suggestions />
					</Grid>
				)}
			</Grid>
		</div>
	);
}

export default Feed;
