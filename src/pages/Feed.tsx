import Sidebar from "../components/feed/Sidebar";
import Grid from "@mui/material/Grid/Grid";
import Suggestions from "../components/feed/Suggestions";
import FeedPosts from "../components/feed/FeedPosts";

function Feed() {
	return (
		<>
			<Grid container columns={25} justifyContent="space-evenly" spacing={0}>
				<Grid item xs={5}>
					<Sidebar />
				</Grid>
				<Grid sx={{ marginTop: "80px" }} item xs={15}>
					<FeedPosts />
				</Grid>
				<Grid item xs={5}>
					<Suggestions />
				</Grid>
			</Grid>
		</>
	);
}

export default Feed;
