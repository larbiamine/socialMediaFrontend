// import "./App.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from "./theme";

function App() {
	return (
		<ThemeProvider theme={myTheme}>
			<Feed />
		</ThemeProvider>
	);
}

export default App;
