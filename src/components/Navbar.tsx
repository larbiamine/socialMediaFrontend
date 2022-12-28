import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PublicIcon from "@mui/icons-material/Public";
import {
	Avatar,
	IconButton,
	Link,
	Menu,
	MenuItem,
	Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box } from "@mui/system";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import Badge from "@mui/material/Badge";
import { logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: "15px",
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	marginRight: "-140px",
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(() => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		paddingTop: 15,

		paddingLeft: 50,
		width: "100%",
		height: "100%",
	},
}));

type MessageProps = {
	message: string;
	avatar: string;
};
type NotificationProps = {
	message: string;
};

function Message({ message, avatar }: MessageProps) {
	return (
		<>
			<Avatar sx={{ mr: 2 }} src={avatar} />
			<span
				style={{
					display: "block",
					width: "250px",
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
				}}
			>
				{message}
			</span>
		</>
	);
}
function Notification({ message }: NotificationProps) {
	return (
		<span
			style={{
				display: "block",
				width: "250px",
				overflow: "hidden",
				whiteSpace: "nowrap",
				textOverflow: "ellipsis",
			}}
		>
			{message}
		</span>
	);
}

function Navbar() {
	const dispatch = useDispatch();
	const notifications = [
		"Notification 1",
		"Notification 2 Tempore ullam magni labor",
		"Mor sit, am Notification 3",
	];
	const messages = [
		{
			message: "message 1 💥💢 Tempore ullam magni labor ",

			avatar:
				"https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
		},
		{
			message: "message 3 💚 Lorem ipsum dolor sit, amet crillo,",
			avatar: "https://cdn-icons-png.flaticon.com/512/168/168882.png",
		},
		{
			message: "message 5 asperiores earum harum delectusrum",
			avatar:
				"https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png",
		},
		{
			message: "message 4 💤💦",
			avatar:
				"https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png",
		},
	];

	const [search, setSearch] = useState("");

	const handleChange = () => {};
	const handleOpenNavMenu = () => {};

	const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorNotifications(event.currentTarget);
	};
	const handleCloseNotifications = () => {
		setAnchorNotifications(null);
	};
	const [anchorNotifications, setAnchorNotifications] =
		React.useState<null | HTMLElement>(null);

	const handleOpenMessages = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorMessages(event.currentTarget);
	};
	const handleCloseMessages = () => {
		setAnchorMessages(null);
	};
	const [anchorMessages, setAnchorMessages] =
		React.useState<null | HTMLElement>(null);

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleSubmit = () => {
		console.log(search);
	};

	useEffect(() => {
		const keyDownHandler = (e: any) => {
			if (e.key === "Enter") {
				e.preventDefault();
				handleSubmit();
			}
		};
		document.addEventListener("keydown", keyDownHandler);
		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, []);

	return (
		<AppBar sx={{ width: "100%" }} position="fixed" color="myPrimary">
			<Container maxWidth="xl">
				<Toolbar>
					<div style={{ width: "100%" }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
								<PublicIcon
									fontSize="large"
									sx={{ display: { xs: "none", md: "flex" }, mt: 1, ml: 0 }}
									color="mySecondary"
								/>
								<Typography
									variant="h6"
									noWrap
									component="a"
									href="/"
									sx={{
										m: 1,

										display: { xs: "none", md: "flex" },
										fontFamily: "monospace",
										fontWeight: 700,
										letterSpacing: "0.1rem",
										color: "inherit",
										textDecoration: "none",
									}}
								>
									LOGO☢
								</Typography>
								<Search>
									<SearchIconWrapper>
										<SearchIcon />
									</SearchIconWrapper>
									<StyledInputBase
										placeholder="Search…"
										inputProps={{ "aria-label": "search" }}
										value={search}
										onChange={(event) => setSearch(event.target.value)}
									/>
									<button style={{ display: "none" }} type="submit">
										😀
									</button>
								</Search>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
								<IconButton color="inherit">
									<HomeIcon color="mySecondary" fontSize="large" />
								</IconButton>
								<IconButton color="inherit" sx={{ ml: 1, mr: 1 }}>
									<Diversity1Icon color="mySecondary" fontSize="large" />
								</IconButton>
								<IconButton color="inherit">
									<GroupIcon color="mySecondary" fontSize="large" />
								</IconButton>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
								<Tooltip sx={{}} title="Open Messages">
									<IconButton
										color="inherit"
										onClick={handleOpenMessages}
										sx={{ mt: 0 }}
									>
										<Badge badgeContent={messages.length} color="myDanger">
											<ForumIcon color="mySecondary" fontSize="large" />
										</Badge>
									</IconButton>
								</Tooltip>
								<Tooltip title="Open notifications">
									<IconButton
										onClick={handleOpenNotifications}
										sx={{ ml: 1, mr: 1 }}
										color="inherit"
									>
										<Badge badgeContent={notifications.length} color="myDanger">
											<NotificationsIcon color="mySecondary" fontSize="large" />
										</Badge>
									</IconButton>
								</Tooltip>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ ml: 0, p: 0 }}>
										<Avatar src="https://www.w3schools.com/howto/img_avatar.png" />
									</IconButton>
								</Tooltip>

								<Menu
									//Settings DropDown Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem key={"profile"} onClick={handleCloseUserMenu}>
										<Link
											sx={{
												textDecoration: "none",
												color: "black",
											}}
										>
											profile
										</Link>
									</MenuItem>
									<MenuItem key={"Account"} onClick={handleCloseUserMenu}>
										<Link
											sx={{
												textDecoration: "none",
												color: "black",
											}}
										>
											Account
										</Link>
									</MenuItem>

									<MenuItem key={"Logout"} onClick={handleCloseUserMenu}>
										<Link
											sx={{
												textDecoration: "none",
												color: "black",
											}}
											onClick={() => dispatch(logout())}
										>
											Logout
										</Link>
									</MenuItem>
								</Menu>
								<Menu
									//Notifications DropDown Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorNotifications}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorNotifications)}
									onClose={handleCloseNotifications}
								>
									{notifications.map((notification) => (
										<MenuItem
											key={notification}
											onClick={handleCloseNotifications}
										>
											<Link
												sx={{
													textDecoration: "none",
													color: "black",
												}}
											>
												<Notification message={notification} />
											</Link>
										</MenuItem>
									))}
								</Menu>
								<Menu
									//Messages DropDown Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorMessages}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorMessages)}
									onClose={handleCloseMessages}
								>
									{messages.map((message) => (
										<MenuItem
											key={message.message}
											onClick={handleCloseMessages}
										>
											<Message
												message={message.message}
												avatar={message.avatar}
											/>
										</MenuItem>
									))}
									<MenuItem key="close" onClick={handleCloseMessages}>
										<Link
											sx={{
												textDecoration: "none",
												color: "black",
											}}
										>
											<span>{"See All"}</span>
										</Link>
									</MenuItem>
								</Menu>
							</Box>
						</Box>
					</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
