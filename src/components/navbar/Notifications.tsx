import React from "react";
import { IconButton, Menu, MenuItem, Badge, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, seeNotifications } from "../../utilities/fetchApi";
import { notificationClick } from "../../utilities/buttonsOnclick";
import { NotificationProps } from "../../types";
import { Notification } from "./Notification";

function Notifications({ color }) {
	const mutationKey = ["notifications"];
	const { data, status } = useQuery(["notifications"], getNotifications);

	const [anchorNotifications, setAnchorNotifications] =
		React.useState<null | HTMLElement>(null);

	const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
		if (data.length > 0) {
			setAnchorNotifications(event.currentTarget);
		}
	};
	const handleCloseNotifications = () => {
		setAnchorNotifications(null);
	};
	const notificationStyle = { color: "black", textDecoration: "none" };

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: seeNotifications,
		mutationKey: mutationKey,
		onSuccess: (variables) => {
			queryClient.setQueryData(mutationKey, (oldData) =>
				oldData.map((n: NotificationProps) => {
					if (n._id === variables._id) {
						return { ...n, seen: true };
					} else {
						return n;
					}
				})
			);
			queryClient.invalidateQueries([mutationKey]);
		},
	});

	const notificationsCount =
		status === "success"
			? data.reduce((acc: number, n: NotificationProps) => {
					if (!n.seen) {
						acc++;
					}
					return acc;
			  }, 0)
			: 0;

	return (
		<div>
			<Tooltip title="Open notifications">
				<IconButton
					onClick={handleOpenNotifications}
					sx={{ ml: 1, mr: 1 }}
					color="inherit"
					style={{ margin: "10px" }}
				>
					{status === "success" && (
						<Badge badgeContent={notificationsCount} color="myDanger">
							<NotificationsIcon color={color} fontSize="medium" />
						</Badge>
					)}
				</IconButton>
			</Tooltip>

			<Menu
				//Notifications DropDown Menu
				sx={{ mt: "45px", width: "600px" }}
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
					data.map((notification: NotificationProps) =>
						notification.content.type === "Followed You" ? (
							<a
								style={notificationStyle}
								href={`/profile/${notification.liker}`}
								key={notification._id}
							>
								<MenuItem
									onClick={() =>
										notificationClick(
											mutation,
											notification,
											setAnchorNotifications
										)
									}
								>
									<Notification {...notification} />
								</MenuItem>
							</a>
						) : (
							<a
								style={notificationStyle}
								href={`/post/${notification.content.id}`}
								key={notification._id}
							>
								<MenuItem
									onClick={() =>
										notificationClick(
											mutation,
											notification,
											setAnchorNotifications
										)
									}
								>
									<Notification {...notification} />
								</MenuItem>
							</a>
						)
					)}
			</Menu>
		</div>
	);
}

export default Notifications;
