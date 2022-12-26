// import "./App.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from "./theme";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

function App() {
	return (
		<ThemeProvider theme={myTheme}>
			<Navbar />
			{/* <Feed /> */}
			<Profile />
		</ThemeProvider>
	);
}

export default App;
