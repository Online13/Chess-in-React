import { case_type } from "../../domain/constants";
import type { BoardTheme, Presets, SelectRender } from "../type";

const theme: BoardTheme = {
	coordinates: {
		foreground_black: "#EBECD0",
		foreground_white: "#739552",
		foreground_outside: "hsla(0,0%,100%,.5)",
	},
	square: {
		white: "#EBECD0",
		black: "#739552",
		path: "#F7EC5B",
		threat: "#FF0000",
		piece: "#000000",
	},
};

const renderSelect: SelectRender = ({ type }) => {
	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				opacity: type === case_type.PIECE ? 0.5 : 1,
				backgroundColor:
					type === case_type.PIECE ? "rgb(255, 255, 51)" : undefined,
			}}
		>
			{type === case_type.SQUARE && (
				<div
					className="w-8 h-8 rounded-full"
					style={{
						backgroundColor: "rgba(0,0,0,.14)",
					}}
				></div>
			)}
			{type === case_type.THREAT && (
				<div
					className="w-[80%] h-[80%] border-8 rounded-full"
					style={{
						borderColor: "rgba(0,0,0,.14)",
					}}
				></div>
			)}
		</div>
	);
};

export const chessComPresets: Presets = {
	theme,
	renderSelect,
};
