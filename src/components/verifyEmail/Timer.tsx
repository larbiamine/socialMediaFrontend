import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail, unSendEmail } from "../../redux/userRedux";
import { IRootState } from "../../redux/store";
import { sendCode } from "../../utilities/fetchApi";

function Timer() {
	const [seconds, setSeconds] = useState(90);
	const { emailSent } = useSelector((state: IRootState) => state);

	const handleSendingCode = async () => {
		if (!emailSent) {
			const res = await sendCode();
			console.log(res);

			res === "email verification code sent" && dispatch(sendEmail());
			setSeconds(30);
		}
	};

	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(() => {
			if (seconds >= 0) {
				setSeconds((old) => old - 1);
			} else {
				dispatch(unSendEmail());
			}
			console.log(seconds);
		}, 1000);
	}, [seconds]);

	if (seconds >= 0) {
		return (
			<Link
				sx={{ m: 1 }}
				component="button"
				variant="body2"
			>{`wait ${seconds} seconds`}</Link>
		);
	} else {
		return (
			<Link
				component="button"
				onClick={() => sendCode()}
				sx={{ m: 1 }}
				variant="body2"
			>
				Send Code again
			</Link>
		);
	}
}

export default Timer;
