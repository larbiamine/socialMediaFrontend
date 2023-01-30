import React, { useState, useRef } from "react";
import { SearchUser } from "../../types";
import { userRequest } from "../../utilities/requestMethodes";
import { styled, alpha } from "@mui/material/styles";
import { Avatar, IconButton, Link, Menu } from "@mui/material";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { SearchResults } from "./SearchResults";

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
	console.log("🆘 || file: Search.tsx:93 || results STATE", results);
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
				{fetchedSearch && <SearchResults results={results} />}
			</Menu>
		</div>
	);
}

export default Search;
