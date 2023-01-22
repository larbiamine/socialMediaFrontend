import { Grid, Typography } from "@mui/material";
import React from "react";
import LockPersonIcon from "@mui/icons-material/LockPerson";

const iconStyle = {
	height: "150px",
	width: "150px",
	marginBottom: "20px",
};

function PrivateProfile() {
	return (
		<Grid
			sx={{ marginTop: 5 }}
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justify="center"
		>
			<LockPersonIcon style={iconStyle} />
			<Typography variant="h4" color="initial">
				Private Profile
			</Typography>
		</Grid>
	);
}

export default PrivateProfile;
