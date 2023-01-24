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
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../utilities/fetchApi";
import { NotificationProps } from "../../types";

function Notification(notification: NotificationProps) {
	console.log(notification);

	const avatar = notification.user.avatar;
	const username = notification.user.username;
	const postbody = notification.postbody;
	const type = notification.content.type;
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
				{`${username} liked your ${type} : ${postbody}`}
			</span>
		</>
	);
}

function Notifications() {
	const [anchorNotifications, setAnchorNotifications] =
		React.useState<null | HTMLElement>(null);

	const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorNotifications(event.currentTarget);
	};
	const handleCloseNotifications = () => {
		setAnchorNotifications(null);
	};

	const { data, isLoading, status } = useQuery(
		["notifications"],
		getNotifications
	);
	status === "success" &&
		console.log("🆘 || file: Notifications.tsx:51 || data", data);

	return (
		<div>
			<Tooltip title="Open notifications">
				<IconButton
					onClick={handleOpenNotifications}
					sx={{ ml: 1, mr: 1 }}
					color="inherit"
				>
					{status === "success" && (
						<Badge badgeContent={data.length} color="myDanger">
							<NotificationsIcon color="mySecondary" fontSize="large" />
						</Badge>
					)}
				</IconButton>
			</Tooltip>

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
				{status === "success" &&
					data.map((notification) => (
						<MenuItem key={notification._id} onClick={handleCloseNotifications}>
							{/* <Link
							sx={{
								textDecoration: "none",
								color: "black",
							}}
						> */}
							{status === "success" && <Notification {...notification} />}{" "}
							{/* </Link> */}
						</MenuItem>
					))}
			</Menu>
		</div>
	);
}

export default Notifications;
