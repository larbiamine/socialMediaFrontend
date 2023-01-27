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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
	UseMutationResult,
	notifyManager,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { getNotifications, seeNotifications } from "../../utilities/fetchApi";
import { NotificationProps } from "../../types";
import { notificationClick } from "../../utilities/buttonsOnclick";

function Notification(notification: NotificationProps) {
	const avatar = notification.user.avatar;
	const username = notification.user.username;
	const postbody = notification.postbody;
	const type = notification.content.type;
	const content = notification.content.content;
	const seen = notification.seen;

	return (
		<>
			<Avatar sx={{ mr: 0.5 }} src={avatar} />
			{!seen && (
				<FiberManualRecordIcon
					sx={{ mr: 0.5 }}
					color="mySecondary"
					fontSize="small"
				/>
			)}
			<span
				style={{
					display: "block",
					width: "250px",
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
				}}
			>
				{`${username} ${type} your ${content} : ${postbody}`}
			</span>
		</>
	);
}

function Notifications() {
	const { data, isLoading, status } = useQuery(
		["notifications"],
		getNotifications
	);
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

	// const { data, isLoading, status } = useQuery({
	// 	queryKey: ["notifications"],
	// 	queryFn: getNotifications,
	// });

	const mutationKey = ["notifications"];
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

	return (
		<div>
			<Tooltip title="Open notifications">
				<IconButton
					onClick={handleOpenNotifications}
					sx={{ ml: 1, mr: 1 }}
					color="inherit"
				>
					{status === "success" && (
						<Badge
							badgeContent={data.reduce((acc: number, n: NotificationProps) => {
								if (!n.seen) {
									acc++;
								}
								return acc;
							}, 0)}
							color="myDanger"
						>
							<NotificationsIcon color="mySecondary" fontSize="large" />
						</Badge>
						// <Badge badgeContent={data.length} color="myDanger">
						// 	<NotificationsIcon color="mySecondary" fontSize="large" />
						// </Badge>
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
					data != "undefined" &&
					data.map((notification) => (
						<MenuItem
							key={notification._id}
							onClick={() =>
								notificationClick(
									mutation,
									notification,
									setAnchorNotifications
								)
							}
						>
							{status === "success" && <Notification {...notification} />}{" "}
						</MenuItem>
					))}
			</Menu>
		</div>
	);
}

export default Notifications;
