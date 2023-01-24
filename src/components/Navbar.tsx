import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PublicIcon from "@mui/icons-material/Public";
import { IconButton } from "@mui/material";

import { Box } from "@mui/system";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";

import Notifications from "./navbar/Notifications";
import Messages from "./navbar/Messages";
import Settings from "./navbar/Settings";
import Search from "./navbar/Search";

function Navbar() {
	const logoStyle = {
		m: 1,
		display: { xs: "none", md: "flex" },
		fontFamily: "monospace",
		fontWeight: 700,
		letterSpacing: "0.1rem",
		color: "inherit",
		textDecoration: "none",
	};
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
									sx={logoStyle}
								>
									LOGO☢
								</Typography>
								<Search />
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
								<Messages />
								<Notifications />
								<Settings />
							</Box>
						</Box>
					</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
