import Sidebar from "../components/feed/Sidebar";
import Grid from "@mui/material/Grid/Grid";
import Suggestions from "../components/feed/Suggestions";
import FeedPosts from "../components/feed/FeedPosts";
import AddPost from "../components/post/AddPost";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router-dom";
import "../styles/feed.css";
import Post from "../components/Post";
function Feed() {
	const location = useLocation();
	const url = location.pathname.split("/");

	const postPage = url[1] === "post" && url[2].length === 24;

	const { currentUser } = useSelector((state: IRootState) => state);
	const min700 = useMediaQuery("(max-width:700px)");
	document.title = "Home";
	return (
		<div className="feed">
			<Grid container columns={10}>
				{!min700 && (
					<Grid item xs={min700 ? 0 : 2}>
						<Sidebar {...currentUser} />
					</Grid>
				)}

				<Grid sx={{ marginTop: "80px" }} item xs={min700 ? 10 : 6}>
					{postPage ? (
						<Post id={url[2]} />
					) : (
						<>
							<AddPost />
							<FeedPosts {...currentUser?.following} />)
						</>
					)}
				</Grid>

				{!min700 && (
					<Grid item xs={min700 ? 0 : 2}>
						<Suggestions />
					</Grid>
				)}
			</Grid>
		</div>
	);
}

export default Feed;
