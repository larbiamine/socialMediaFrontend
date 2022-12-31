import Sidebar from "../components/feed/Sidebar";
import Grid from "@mui/material/Grid/Grid";
import Suggestions from "../components/feed/Suggestions";
import FeedPosts from "../components/feed/FeedPosts";

function Feed() {
	return (
		<>
			<Grid container columns={5}>
				<Grid item xs={1}>
					<Sidebar />
				</Grid>
				<Grid sx={{ marginTop: "80px" }} item xs={3}>
					<FeedPosts />
				</Grid>
				<Grid item xs={1}>
					<Suggestions />
				</Grid>
			</Grid>
		</>
	);
}

export default Feed;
