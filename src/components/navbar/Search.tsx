import React, { useState, useRef } from "react";
import { SearchUser } from "../../types";
import { userRequest } from "../../utilities/requestMethodes";
import { styled, alpha } from "@mui/material/styles";
import { IconButton, Menu } from "@mui/material";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { SearchResults } from "./SearchResults";

const Searchh = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

function Search() {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState<Array<SearchUser>>([]);
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
				<StyledInputBase
					onClick={handleOpenSearchTemp}
					placeholder="Search…"
					inputProps={{ "aria-label": "search" }}
					// value={search}
					ref={searchRef}
					endAdornment={
						<IconButton onClick={handleSubmit}>
							<SearchIcon color="myPrimary" />
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
				{fetchedSearch && <SearchResults results={results} />}
			</Menu>
		</div>
	);
}

export default Search;
