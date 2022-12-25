import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ExploreIcon from "@mui/icons-material/Explore";
import ForumIcon from "@mui/icons-material/Forum";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar/Avatar";
import Typography from "@mui/material/Typography";
import { Button, Paper, Grid, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
const listItems = [
	{
		listIcon: <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />,
		listText: "User Name",
	},
	{
		listIcon: <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />,
		listText: "User Name",
	},
	{
		listIcon: <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />,
		listText: "User Name",
	},
	{
		listIcon: <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />,
		listText: "User Name",
	},
];

function Suggestions() {
	const theme = useTheme();
	const styles = {
		menuSliderContainer: {
			width: "100%",
			background: theme.palette.myPrimary.main,
			height: "100vh",
			marginTop: "15px",
		},
		listItem: {
			color: theme.palette.myPrimary.contrastText,
		},
	};

	return (
		<div style={{ marginTop: "60px", position: "fixed" }}>
			<Box style={styles.menuSliderContainer} component="div">
				<Paper
					style={{ marginBottom: "0px", padding: "15px 10px" }}
					elevation={3}
				>
					<Typography variant="h6" color="initial">
						{"People You May Know"}
					</Typography>
					<Grid style={{ marginTop: 4 }} container wrap="nowrap" spacing={2}>
						<List>
							{listItems.map((listItem, index) => (
								<ListItem key={listItem.listText}>
									<Grid style={{ margin: 5 }} xs item>
										{listItem.listIcon}
									</Grid>
									<Grid justifyContent={"left"} item xs={8} zeroMinWidth>
										<Typography style={{ textAlign: "left" }}>
											{listItem.listText}
										</Typography>
										<Typography color={"grey"}>Nice User</Typography>
									</Grid>
									<Grid xs={1} justifyContent={"right"}>
										<IconButton
											style={{ marginRight: 0 }}
											aria-label="add to favorites"
										>
											<AddCircleIcon color="mySecondary" />
										</IconButton>
									</Grid>
								</ListItem>
							))}
						</List>
					</Grid>
				</Paper>
			</Box>
		</div>
	);
	// return (
	// 	<div style={{ marginTop: "60px", position: "fixed" }}>
	// 		<Box style={styles.menuSliderContainer} component="div">
	// 			<Paper
	// 				style={{ marginBottom: "0px", padding: "15px 10px" }}
	// 				elevation={3}
	// 			>
	// 				<Typography variant="h6" color="initial">
	// 					{"People You May Know"}
	// 				</Typography>
	// 				<List>
	// 					{listItems.map((listItem, index) => (
	// 						<ListItem style={styles.listItem} key={index}>
	// 							<Grid container spacing={2}>
	// 								<Grid item xs={6}>
	// 									<ListItemIcon sx={styles.listItem}>
	// 										{listItem.listIcon}
	// 									</ListItemIcon>
	// 									<ListItemText primary={listItem.listText} />
	// 								</Grid>
	// 								<Grid item xs={6}>
	// 									<Button size="small" variant="outlined">
	// 										Follow
	// 									</Button>
	// 								</Grid>
	// 							</Grid>
	// 						</ListItem>
	// 					))}
	// 				</List>
	// 			</Paper>
	// 		</Box>
	// 	</div>
	// );
}

export default Suggestions;
