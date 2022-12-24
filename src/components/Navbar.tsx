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

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: "15px",
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	marginRight: "-100px",
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

function Message({ message, avatar }: MessageProps) {
	return (
		<>
			<Avatar sx={{ mr: 2 }} src={avatar} />
			<span>{message}</span>
		</>
	);
}

function Navbar() {
	const settings = ["Profile", "Account", "Dashboard", "Logout"];
	const notifications = ["Notification 1", "Notification 2", "Notification 3"];
	const messages = [
		{
			message: "message 1",
			avatar:
				"https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
		},
		{
			message: "message 3",
			avatar: "https://cdn-icons-png.flaticon.com/512/168/168882.png",
		},
		{
			message: "message 5",
			avatar:
				"https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png",
		},
		{
			message: "message 4",
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

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);

	return (
		<AppBar sx={{ borderRadius: "15px" }} position="static" color="primary">
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
									sx={{ display: { xs: "none", md: "flex" }, mt: 1 }}
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
									LOGO
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
									<button style={{ display: "none" }} type="submit"></button>
								</Search>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
								<HomeIcon sx={{ mt: 1 }} fontSize="large" />
								<Diversity1Icon sx={{ mt: 1, ml: 3 }} fontSize="large" />
								<GroupIcon sx={{ mt: 1, ml: 3 }} fontSize="large" />
							</Box>
							<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
								<Tooltip sx={{}} title="Open Messages">
									<IconButton onClick={handleOpenMessages} sx={{ mt: 0 }}>
										<ForumIcon sx={{}} fontSize="large" />
									</IconButton>
								</Tooltip>
								<Tooltip sx={{}} title="Open notifications">
									<IconButton
										onClick={handleOpenNotifications}
										sx={{ mt: 0, ml: 0 }}
									>
										<NotificationsIcon sx={{}} fontSize="large" />
									</IconButton>
								</Tooltip>
								<Tooltip sx={{}} title="Open settings">
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
									{settings.map((setting) => (
										<MenuItem key={setting} onClick={handleCloseUserMenu}>
											<Link
												sx={{
													textDecoration: "none",
													color: "black",
												}}
											>
												{setting}
											</Link>
										</MenuItem>
									))}
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
												{notification}
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
										<MenuItem key={message} onClick={handleCloseMessages}>
											{/* <Link
												sx={{
													textDecoration: "none",
													color: "black",
												}}
											>
												{message}
											</Link> */}
											<Message
												message={message.message}
												avatar={message.avatar}
											/>
										</MenuItem>
									))}
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
