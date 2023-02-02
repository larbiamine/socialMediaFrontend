import Typography from "@mui/material/Typography";

function Welcome({ min900 }) {
	return (
		<div>
			<Typography
				align={min900 ? "center" : ""}
				fontWeight="bold"
				variant="h2"
				color="myDanger"
			>
				LOGO
			</Typography>
			<Typography
				align={min900 ? "center" : ""}
				fontWeight="bold"
				variant="h6"
				color="initial"
			>
				Connect with friends and the world around you on LOGO.
			</Typography>
		</div>
	);
}

export default Welcome;
