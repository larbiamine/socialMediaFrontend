import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { loginUserFn } from "../authApi";

import { loginUser, LoginResponse } from "../authTypes";

function Login() {
	const [passwordError, setPasswordError] = useState(false);
	const [usernameError, setUsernameError] = useState(false);

	const [password, setPassword] = useState<string | FormDataEntryValue | null>(
		""
	);
	const [username, setUsername] = useState<string | FormDataEntryValue | null>(
		""
	);

	const [checked, setChecked] = useState(false);

	const { isLoading, error, data, refetch } = useQuery(
		"user",
		() => loginUserFn({ username, password }),
		{
			refetchOnWindowFocus: false,
			enabled: false, // disable this query from automatically running
		}
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const dataa = new FormData(e.currentTarget);
		const username = dataa.get("username");
		const password = dataa.get("password");

		password === "" && setPasswordError(true);
		username === "" && setUsernameError(true);

		const validation = password != "" && username != "";

		if (validation) {
			setPassword(password);
			setUsername(username);
			refetch();

			console.log(data);
		} else {
			console.log("not good");
		}
	};
	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 8,
				}}
			>
				<Typography sx={{ mb: 5 }} component="h1" variant="h4">
					Sign in
				</Typography>
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

					{/* <Button
						fullWidth
						sx={{ mt: 0.5, mb: 1 }}
						variant="contained"
						color="primary"
						type="submit"
					>
						Login
					</Button> */}
					<LoadingButton
						loading={false}
						fullWidth
						sx={{ mt: 0.5, mb: 1 }}
						loadingPosition="start"
						variant="contained"
						type="submit"
					>
						Login
					</LoadingButton>
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
	);
}

export default Login;
