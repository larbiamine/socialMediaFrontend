import React from "react";
import {
	Avatar,
	IconButton,
	Link,
	Menu,
	MenuItem,
	Badge,
	Tooltip,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
interface MessageProps {
	message: string;
	avatar: string;
}
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

function Messages({ color }) {
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

	const [anchorMessages, setAnchorMessages] =
		React.useState<null | HTMLElement>(null);

	const handleOpenMessages = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorMessages(event.currentTarget);
	};
	const handleCloseMessages = () => {
		setAnchorMessages(null);
	};

	return (
		<div>
			<Tooltip sx={{}} title="Open Messages">
				<IconButton
					style={{ margin: "10px" }}
					color="inherit"
					onClick={handleOpenMessages}
					sx={{ mt: 0 }}
				>
					<Badge badgeContent={messages.length} color="myDanger">
						<MailIcon color={color} />
					</Badge>
				</IconButton>
			</Tooltip>

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
				{messages.map(({ message, avatar }) => (
					<MenuItem key={message} onClick={handleCloseMessages}>
						<Message message={message} avatar={avatar} />
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
		</div>
	);
}

export default Messages;
