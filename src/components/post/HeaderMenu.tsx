import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { Post } from "../../types";

interface HeaderMenu {
	anchor: null | HTMLElement;
	setAnchor: Function;
	post: Post;
}

function HeaderMenu({ anchor, setAnchor, post }: HeaderMenu) {
	const [openModal, setOpenModal] = React.useState(false);

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
			<ConfirmationModal open={openModal} setOpen={setOpenModal} post={post} />
			<MenuItem key={"profile"} onClick={() => setAnchor(null)}>
				<Link
					style={{
						textDecoration: "none",
						color: "black",
					}}
					href={""}
					onClick={() => {
						console.log("ondelete");
						setOpenModal(true);
					}}
				>
					Delete
				</Link>
			</MenuItem>
			<MenuItem key={"Account"} onClick={() => setAnchor(null)}>
				<Link
					style={{
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
