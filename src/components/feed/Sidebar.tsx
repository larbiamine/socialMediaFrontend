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
import { useNavigate } from "react-router-dom";
import { User } from "../../types";

function Sidebar({ currentUser }: User) {
	const navigate = useNavigate();
	const listItems = [
		{
			listIcon: <Avatar src={currentUser.avatar} />,
			listText: currentUser.username,
			link: `/profile/${currentUser._id}`,
		},
		{
			listIcon: <HomeIcon color="mySecondary" />,
			listText: "Home",
			link: "",
		},
		{
			listIcon: <ForumIcon color="mySecondary" />,
			listText: "Messages",
			link: "",
		},
		{
			listIcon: <ExploreIcon color="mySecondary" />,
			listText: "Explore",
			link: "",
		},
		{
			listIcon: <GroupIcon color="mySecondary" />,
			listText: "Friends",
			link: "",
		},
		{
			listIcon: <Diversity1Icon color="mySecondary" />,
			listText: "Groups",
			link: "",
		},
		{
			listIcon: <BookmarksIcon color="mySecondary" />,
			listText: "Saved",
			link: "",
		},
	];
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
							<ListItemButton
								onClick={() => {
									navigate(listItem.link);
								}}
								selected={false}
							>
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
