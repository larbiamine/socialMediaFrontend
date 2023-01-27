import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import AlertToast from "../components/AlertToast";
import { login } from "../authApi";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { confirmEmail, sendCode } from "../utilities/fetchApi";
import { confirmActive, sendEmail } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";
import Timer from "../components/verifyEmail/Timer";
function VerifyEmail() {
	const [codeError, setCodeError] = useState(false);
	const [code, setCode] = useState("");
	const dispatch = useDispatch();
	const { emailSent } = useSelector((state: IRootState) => state);
	const navigate = useNavigate();
	const [openToastAlert, setOpenToastAlert] = useState(false);

	const [time, setTime] = useState(30);
	const [fetching, setFetching] = useState(false);
	const [confirmed, setConfirmed] = useState(false);

	const handleSendingCode = async () => {
		if (!emailSent) {
			const res = await sendCode();
			console.log(res);

			res === "email verification code sent" && dispatch(sendEmail());
		}
	};
	useEffect(() => {
		handleSendingCode();
	}, []);

	const submitCode = async () => {
		if (code === "") {
			setCodeError(true);
		} else {
			setFetching(true);
			const res = await confirmEmail(code);
			if (res === "Email verified") {
				setOpenToastAlert(true);
				setFetching(false);
				setConfirmed(true);
				dispatch(confirmActive());
				setTimeout(() => {
					navigate("/");
				}, 3000);
			} else {
				setCodeError(true);
				setFetching(false);
			}

			console.log(res);
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 18,
				}}
			>
				<Typography sx={{ mb: 5 }} component="h1" variant="h4">
					Confirm email
				</Typography>
				<Typography variant="body1">
					A code has been sent to your email
				</Typography>
				<Box
					component={"form"}
					// onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						error={codeError}
						margin="normal"
						sx={{ mb: 2 }}
						label="Code"
						id="Code"
						name="Code"
						type="text"
						variant="outlined"
						helperText={codeError ? "invalid code" : ""}
						fullWidth
						onChange={(e) => {
							setCodeError(false);
							setCode(e.target.value);
						}}
					/>

					<LoadingButton
						loading={fetching}
						fullWidth
						sx={{ mt: 0.5, mb: 1 }}
						// loadingPosition="start"
						variant="contained"
						onClick={submitCode}
						color="mySecondary"
						color={confirmed ? "mySuccess" : "mySecondary"}
					>
						{confirmed ? "confirmed. Redirecting ... " : "Confirm"}
					</LoadingButton>
					{/* {isLoginError && (
                <FormHelperText style={{ color: "red" }}>
                    Wrong Credendials !
                </FormHelperText>
            )} */}

					<Grid sx={{ mt: 1 }} container>
						<Grid item xs>
							<Timer />
						</Grid>
						<Grid item>
							<Link sx={{ m: 1 }} href="/register" variant="body2">
								{"Don't have access to email? "}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<AlertToast
				type={"success"}
				message={"Email verified"}
				setOpen={setOpenToastAlert}
				open={openToastAlert}
			/>
		</Container>
	);
}

export default VerifyEmail;
