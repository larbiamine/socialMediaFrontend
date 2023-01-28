import React, { useState, useRef } from "react";
import { User } from "../../types";
import { userRequest } from "../../utilities/requestMethodes";
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Avatar, IconButton, Link, Menu } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Searchh = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: "15px",
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	marginRight: "-140px",
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchResults = (results: Array<User>) => {
	return (
		<Box style={{ minWidth: 200 }} component="div">
			<List>
				{results &&
					results.map((item) => (
						<ListItem key={item._id}>
							<Link
								style={{
									textDecoration: "none",
									color: "black",
								}}
								href={`/profile/${item._id}`}
							>
								<ListItemIcon>
									<Avatar style={{ marginRight: "13px" }} src={item.avatar} />
									<ListItemText primary={item.username} />
								</ListItemIcon>
							</Link>
						</ListItem>
					))}
			</List>
		</Box>
	);
};

const StyledInputBase = styled(InputBase)(() => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		paddingTop: 15,

		paddingLeft: 50,
		width: "100%",
		height: "100%",
	},
}));

function Search() {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState<Array<User>>([]);
	const [fetchedSearch, setFetchedSearch] = useState(false);
	const searchRef = useRef(null);
	const [anchorSearch, setAnchorSearch] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorSearchTemp, setAnchorSearchTemp] =
		React.useState<null | HTMLElement>(null);

	const handleOpenSearchTemp = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorSearchTemp(event.currentTarget);
	};
	const handleOpenSearch = () => {
		setAnchorSearch(anchorSearchTemp);
	};

	const handleCloseSearch = () => {
		setAnchorSearch(null);
	};
	const handleSubmit = async () => {
		try {
			const result = await userRequest.get(`user/search/${search}`);
			setResults(result.data);
			setFetchedSearch(true);

			handleOpenSearch();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{" "}
			<Searchh>
				{/* <SearchIconWrapper>
        <SearchIcon />
    </SearchIconWrapper> */}
				<StyledInputBase
					onClick={handleOpenSearchTemp}
					placeholder="Search…"
					inputProps={{ "aria-label": "search" }}
					// value={search}
					ref={searchRef}
					endAdornment={
						<IconButton onClick={handleSubmit}>
							<SearchIcon />
						</IconButton>
					}
					onChange={(event) => {
						setSearch(event.target.value);
					}}
				/>
				<button style={{ display: "none" }} type="submit">
					😀
				</button>
			</Searchh>{" "}
			<Menu
				//search DropDown Menu
				sx={{ mt: "45px" }}
				id="menu-appbar"
				anchorEl={anchorSearch}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorSearch)}
				onClose={handleCloseSearch}
			>
				{fetchedSearch && <SearchResults {...results} />}
			</Menu>
		</div>
	);
}

export default Search;
