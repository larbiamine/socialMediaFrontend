// import "./App.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from "./theme";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
//react Query
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

//Router
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
	Navigate,
} from "react-router-dom";

const loggedIn = false;

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={loggedIn ? <Feed /> : <Login />} />
			<Route
				path="/login"
				element={loggedIn ? <Navigate to="/profile" /> : <Login />}
			/>
			<Route
				path="/register"
				element={loggedIn ? <Navigate to="/profile" /> : <Register />}
			/>
			<Route
				path="/profile"
				element={loggedIn ? <Profile /> : <Navigate to="/login" />}
			/>
		</>
	)
);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={myTheme}>
				{loggedIn && <Navbar />}
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
