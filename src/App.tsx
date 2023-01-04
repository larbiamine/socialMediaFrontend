// import "./App.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import { ThemeProvider } from "@mui/material/styles";
import { myTheme } from "./theme";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
//react Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

//Router
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
	Navigate,
} from "react-router-dom";
import { IRootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { initState } from "./redux/userRedux";

function App() {
	const { currentUser } = useSelector((state: IRootState) => state);
	const dispatch = useDispatch();

	const loggedIn = currentUser ? true : false;
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
					element={
						loggedIn ? <Profile {...currentUser} /> : <Navigate to="/login" />
					}
				/>
			</>
		)
	);
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={myTheme}>
				{loggedIn && <Navbar />}
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
