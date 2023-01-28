import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Theme {
		status: {
			danger: React.CSSProperties["color"];
		};
	}

	interface Palette {
		neutral: Palette["primary"];
		myPrimary: Palette["primary"];
		myDanger: Palette["primary"];
		mySecondary: Palette["primary"];
		mySuccess: Palette["primary"];
		mySuccess2: Palette["primary"];
	}

	interface PaletteOptions {
		neutral: PaletteOptions["primary"];
		myPrimary: PaletteOptions["primary"];
		myDanger: PaletteOptions["primary"];
		mySecondary: PaletteOptions["primary"];
		mySuccess: PaletteOptions["primary"];
		mySuccess2: PaletteOptions["primary"];
	}

	interface ThemeOptions {
		status: {
			danger: React.CSSProperties["color"];
		};
	}
}

const myThemeOptions = {
	status: {
		danger: "#e53e3e",
	},
	palette: {
		neutral: {
			main: "#c3cbd6",
		},
		myPrimary: {
			main: "#FFFFFF",
			contrastText: "#000",
		},

		mySuccess: {
			main: "#7DCFB6",
			contrastText: "#fff",
		},
		mySuccess2: {
			main: "#1EA896",
			contrastText: "#fff",
		},
		mySecondary: {
			main: "#00B2CA",
			contrastText: "#fff",
		},
		myDanger: {
			main: "#FF715B",
			contrastText: "#fff",
		},
	},
};

export const themeOptions = {
	status: {
		danger: "#e53e3e",
	},
	palette: {
		type: "dark",
		primary: {
			main: "#5893df",
		},
		secondary: {
			main: "#2ec5d3",
		},
		background: {
			default: "#192231",
			paper: "#24344d",
		},
	},
};
export const myTheme = createTheme(myThemeOptions);
