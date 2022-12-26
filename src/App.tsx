// import "./App.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from "./theme";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

//Router
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
	Navigate,
} from "react-router-dom";

const loggedIn = true;

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={loggedIn ? <Feed /> : <Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/profile" element={loggedIn ? <Profile /> : <Login />} />
		</>
	)
);

function App() {
	return (
		<ThemeProvider theme={myTheme}>
			{loggedIn && <Navbar />}
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
