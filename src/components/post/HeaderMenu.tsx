import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface HeaderMenu {
	anchor: null | HTMLElement;
	setAnchor: Function;
}

function HeaderMenu({ anchor, setAnchor }: HeaderMenu) {
	return (
		<Menu
			//Settings DropDown Menu
			sx={{ mt: "45px" }}
			id="menu-appbar"
			anchorEl={anchor}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={Boolean(anchor)}
			onClose={() => setAnchor(null)}
		>
			<MenuItem key={"profile"} onClick={() => setAnchor(null)}>
				<Link
					sx={{
						textDecoration: "none",
						color: "black",
					}}
					href={""}
				>
					Delete
				</Link>
			</MenuItem>
			<MenuItem key={"Account"} onClick={() => setAnchor(null)}>
				<Link
					sx={{
						textDecoration: "none",
						color: "black",
					}}
				>
					Edit
				</Link>
			</MenuItem>
		</Menu>
	);
}

export default HeaderMenu;
