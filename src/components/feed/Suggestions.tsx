import ListItem from "@mui/material/ListItem";

import List from "@mui/material/List";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar/Avatar";
import Typography from "@mui/material/Typography";
import { Paper, Grid, IconButton, Link } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../../utilities/fetchApi";
import { followButton } from "../../utilities/buttonsOnclick";
import { useDispatch } from "react-redux";

function Suggestions() {
	const [checked, setChecked] = useState([false, false, false, false]);

	const { data, status } = useQuery({
		queryKey: ["suggestions"],
		queryFn: getSuggestions,
		refetchOnWindowFocus: false,
	});

	const dispatch = useDispatch();

	const handleFollow = (userId: string, index: number) => {
		followButton(dispatch, userId, "follow");
		const oldState = checked;
		oldState[index] = !oldState[index];
		setChecked(oldState);
	};

	const theme = useTheme();
	const styles = {
		menuSliderContainer: {
			width: "100%",
			background: theme.palette.myPrimary.main,
			height: "100vh",
			marginTop: "15px",
		},
		listItem: {
			color: theme.palette.myPrimary.contrastText,
		},
	};

	return (
		<div
			className="suggestions"
			style={{ marginTop: "60px", position: "fixed" }}
		>
			<Box style={styles.menuSliderContainer} component="div">
				<Paper style={{ padding: "15px 10px" }} elevation={3}>
					<Typography variant="h6" color="initial">
						{"People You May Know"}
					</Typography>
					<Grid style={{ marginTop: 4 }} container wrap="nowrap" spacing={2}>
						<List>
							{status === "success" &&
								data.map((user, index) => (
									<ListItem key={user._id}>
										<Grid style={{ margin: 5 }} xs item>
											<Link
												style={{
													textDecoration: "none",
													color: "black",
												}}
												href={`/profile/${user._id}`}
											>
												<Avatar src={user.avatar} />
											</Link>
										</Grid>
										<Grid justifyContent={"left"} item xs={8} zeroMinWidth>
											<Typography style={{ textAlign: "left" }}>
												<Link
													style={{
														textDecoration: "none",
														color: "black",
													}}
													href={`/profile/${user._id}`}
												>
													{user.firstname + " " + user.lastname}
												</Link>
											</Typography>
											<Typography color={"grey"}>{user.username}</Typography>
										</Grid>
										<Grid xs={1} item justifyContent={"right"}>
											<IconButton
												style={{ marginRight: 0 }}
												aria-label="add to favorites"
												onClick={() => handleFollow(user._id, index)}
											>
												{checked[index] ? (
													<CheckCircleIcon color="mySecondary" />
												) : (
													<AddCircleIcon color="mySecondary" />
												)}
											</IconButton>
										</Grid>
									</ListItem>
								))}
						</List>
					</Grid>
				</Paper>
			</Box>
		</div>
	);
}

export default Suggestions;
