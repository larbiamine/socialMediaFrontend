import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { NotificationProps } from "../../types";
import { Avatar, Badge } from "@mui/material";

export function Notification(notification: NotificationProps) {
	const { type, content } = notification.content;
	const { seen, postbody } = notification;
	const { username, avatar } = notification.user;

	return (
		<>
			{seen ? (
				<Avatar sx={{ mr: 1 }} src={avatar} />
			) : (
				<Badge
					overlap="circular"
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					badgeContent={"🌐"}
				>
					<Avatar sx={{ mr: 1 }} src={avatar} />
				</Badge>
			)}
			{type === "Followed You" ? (
				<span
					style={{
						display: "block",
						width: "250px",
						overflow: "hidden",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
					}}
				>
					{`${username} Followed You`}
				</span>
			) : (
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
			)}
		</>
	);
}
