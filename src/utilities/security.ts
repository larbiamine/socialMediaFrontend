import { logout } from "../redux/userRedux";
import { isRedirectData } from "../types";

export function checkRedirect(
	dispatch: Function,
	navigate: Function,
	data: unknown
): Boolean {
	if (isRedirectData(data)) {
		dispatch(logout());
		navigate(data.redirectURL);
		return true;
	}
	return false;
}
