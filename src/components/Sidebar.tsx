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

const listItems = [
	{
		listIcon: <Avatar src="https://www.w3schools.com/howto/img_avatar.png" />,
		listText: "User Name",
	},
	{
		listIcon: <HomeIcon color="mySecondary" />,
		listText: "Home",
	},
	{
		listIcon: <ForumIcon color="mySecondary" />,
		listText: "Messages",
	},
	{
		listIcon: <ExploreIcon color="mySecondary" />,
		listText: "Explore",
	},
	{
		listIcon: <GroupIcon color="mySecondary" />,
		listText: "Friends",
	},
	{
		listIcon: <Diversity1Icon color="mySecondary" />,
		listText: "Groups",
	},
	{
		listIcon: <BookmarksIcon color="mySecondary" />,
		listText: "Saved",
	},
];

function Sidebar() {
	const theme = useTheme();
	const styles = {
		menuSliderContainer: {
			width: 250,
			background: theme.palette.myPrimary.main,
			height: "100vh",
		},
		listItem: {
			color: theme.palette.myPrimary.contrastText,
		},
	};

	return (
		<div style={{ marginTop: "60px", position: "fixed" }}>
			<Box style={styles.menuSliderContainer} component="div">
				<Divider />
				<List>
					{listItems.map((listItem, index) => (
						<ListItem style={styles.listItem} key={index}>
							<ListItemButton selected={false}>
								<ListItemIcon sx={styles.listItem}>
									{listItem.listIcon}
								</ListItemIcon>
								<ListItemText primary={listItem.listText} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</div>
	);
}

export default Sidebar;
