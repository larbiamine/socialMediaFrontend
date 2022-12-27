import { Box, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
function Register() {
	const [passwordError, setPasswordError] = useState(false);
	const [cpasswordError, setCpasswordError] = useState(false);
	const [usernameError, setUsernameError] = useState(false);
	const [emailError, setEmailError] = useState(false);

	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");

	const [loading, setLoading] = useState(false);

	const handlePwdChange = (e: React.FormEvent<HTMLFormElement>) => {
		setCpassword(e.target.value);
		setCpasswordError(!(e.target.value === password));
	};

	const clearErrors = () => {
		setPasswordError(false);
		setUsernameError(false);
		setCpasswordError(false);
		setEmailError(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		clearErrors();
		const data = new FormData(e.currentTarget);
		const username = data.get("username");
		const password = data.get("password");
		const cpassword = data.get("cpassword");
		const email = data.get("email");

		console.log(data);

		password === "" && setPasswordError(true);
		username === "" && setUsernameError(true);
		cpassword === "" && setCpasswordError(true);
		email === "" && setEmailError(true);

		password != cpassword && setCpasswordError(true);

		const validation =
			password != "" && username != "" && cpassword != "" && email != "";

		if (validation) {
			console.log("good");
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
					Register
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
						error={emailError}
						margin="normal"
						sx={{ mb: 2 }}
						label="Email"
						id="email"
						name="email"
						type="email"
						variant="outlined"
						helperText={emailError ? "Email is required" : ""}
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
						onChange={(e) => {
							setPassword(e.target.value);
							setCpasswordError(!(e.target.value === cpassword));
						}}
					/>
					<TextField
						error={cpasswordError}
						margin="normal"
						name="cpassword"
						label="Confirm Password"
						id="cpassword"
						type="password"
						variant="outlined"
						helperText={cpasswordError ? "Passwords don't match" : ""}
						fullWidth
						required
						onChange={(e) => {
							handlePwdChange(e);
						}}
					/>

					<LoadingButton
						loading={loading}
						fullWidth
						sx={{ mt: 3, mb: 1 }}
						loadingPosition="start"
						variant="outlined"
						type="submit"
						onClick={(e) => handleSubmit(e)}
					>
						Register
					</LoadingButton>
					<Grid sx={{ mt: 1 }} container>
						<Grid item xs>
							<Link sx={{ m: 1 }} href="/login" variant="body2">
								{"Already have an account? Login"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default Register;
