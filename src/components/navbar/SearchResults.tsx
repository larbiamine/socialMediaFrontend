import Box from "@mui/material/Box/Box";
import { SearchUser } from "../../types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Link } from "@mui/material";

interface SearchResultsProps {
	results: Array<SearchUser>;
}

export function SearchResults({ results }: SearchResultsProps) {
	console.log("🆘 || file: Search.tsx:32 ||typeof results", typeof results);
	console.log("🆘 || file: Search.tsx:32 ||  results IN COMP", results);

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
}

export default SearchResults;
