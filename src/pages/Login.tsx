import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { login } from "../authApi";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import Welcome from "../components/login/Welcome";

function Login() {
	const [passwordError, setPasswordError] = useState(false);
	const [usernameError, setUsernameError] = useState(false);
	const dispatch = useDispatch();

	const { isFetching, isLoginError } = useSelector(
		(state: IRootState) => state
	);

	const [checked, setChecked] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const dataa = new FormData(e.currentTarget);
		const username = dataa.get("username");
		const password = dataa.get("password");

		password === "" && setPasswordError(true);
		username === "" && setUsernameError(true);

		const validation = password != "" && username != "";

		if (validation) {
			login(dispatch, { username: username, password: password });
		} else {
			console.log("not good");
		}
	};
	const min900 = useMediaQuery("(max-width:900px)");
	return (
		//
		<Grid container direction={min900 ? "column" : "row"} spacing={-4}>
			<Grid
				style={{
					display: "flex",
					alignItems: "center",
					marginTop: min900 ? 40 : 0,
				}}
				item
				xs={6}
			>
				<Container maxWidth="xs">
					<Welcome min900={min900} />
				</Container>
			</Grid>
			<Grid item xs={6}>
				<Container maxWidth="xs">
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							mt: min900 ? 8 : 16,
						}}
					>
						{!min900 && (
							<Typography sx={{ mb: 5 }} component="h1" variant="h4">
								Sign in
							</Typography>
						)}
						<Box
							component={"form"}
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								error={usernameError}
								margin="normal"
								sx={{ mb: 2 }}
								label="Username"
								id="username"
								name="username"
								type="text"
								variant="outlined"
								helperText={usernameError ? "Username is required" : ""}
								fullWidth
							/>
							<TextField
								error={passwordError}
								margin="normal"
								name="password"
								label="Password"
								id="password"
								type="password"
								variant="outlined"
								helperText={passwordError ? "Password is required" : ""}
								fullWidth
								required
							/>

							<FormControlLabel
								sx={{ mb: 1, mt: 0.5 }}
								control={
									<Checkbox
										checked={checked}
										name="stayloggedin"
										id="stayloggedin"
										onChange={(e) => {
											setChecked(e.target.checked);
										}}
									/>
								}
								label="Stay Logged in"
							/>

							<LoadingButton
								loading={isFetching}
								fullWidth
								sx={{ mt: 0.5, mb: 1 }}
								// loadingPosition="start"
								variant="contained"
								type="submit"
								color="mySecondary"
							>
								Login
							</LoadingButton>
							{isLoginError && (
								<FormHelperText style={{ color: "red" }}>
									Wrong Credendials !
								</FormHelperText>
							)}

							<Grid sx={{ mt: 1 }} container>
								<Grid item xs>
									<Link sx={{ m: 1 }} href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link sx={{ m: 1 }} href="/register" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</Grid>
		</Grid>
	);
}

export default Login;
