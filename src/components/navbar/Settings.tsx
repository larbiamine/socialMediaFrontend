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
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";

function Settings() {
	const { currentUser } = useSelector((state: IRootState) => state);

	const dispatch = useDispatch();

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<div>
			{" "}
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ ml: 0, p: 0 }}>
					<Avatar src={currentUser.avatar} />
				</IconButton>
			</Tooltip>{" "}
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
						href={`/profile/${currentUser._id}`}
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
		</div>
	);
}

export default Settings;
