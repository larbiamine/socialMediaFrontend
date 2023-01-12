import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface alertProp {
	setOpen: Function;
	open: Boolean;
	message: String;
	type: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertToast({ setOpen, open, message, type }: alertProp) {
	// const [open, setOpen] = React.useState(false);

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
}
export default AlertToast;
