import type { BoardTheme } from "./type";

export const defaultTheme: BoardTheme = {
	coordinates: {
		foreground_black: "#FFFFFF",
		foreground_white: "#000000",
		foreground_outside: "#FFFFFF",
	},
	square: {
		white: "#F0D9B5",
		black: "#B58863",
		path: "#F7EC5B",
		threat: "#FF0000",
		piece: "#000000",
	},
};
