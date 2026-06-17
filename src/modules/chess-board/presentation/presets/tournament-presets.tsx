import { case_type } from "../../domain/constants";
import type { BoardTheme, Presets, SelectRender } from "../type";

const theme: BoardTheme = {
	coordinates: {
		foreground_black: "#F0ECD0",
		foreground_white: "#4A7A4E",
		foreground_outside: "#33333399",
	},
	square: {
		white: "#F0ECD0",
		black: "#4A7A4E",
		path: "#E8D44D",
		threat: "#D32F2F",
		piece: "#C8E6C9",
	},
};

const renderSelect: SelectRender = ({ type }) => {
	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				opacity: type === case_type.PIECE ? 0.45 : 1,
				backgroundColor:
					type === case_type.PIECE ? "#E8D44D" : undefined,
			}}
		>
			{type === case_type.SQUARE && (
				<div
					className="w-10 h-10 rounded-full"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.18)" }}
				/>
			)}
			{type === case_type.THREAT && (
				<div
					className="w-[80%] h-[80%] border-4 rounded-full"
					style={{ borderColor: "rgba(0, 0, 0, 0.18)" }}
				/>
			)}
		</div>
	);
};

export const tournamentPresets: Presets = {
	theme,
	renderSelect,
};
