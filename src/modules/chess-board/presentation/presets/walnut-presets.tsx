import { case_type } from "../../domain/constants";
import type { BoardTheme, Presets, SelectRender } from "../type";

const theme: BoardTheme = {
	coordinates: {
		foreground_black: "#F0CFA0",
		foreground_white: "#8B4513",
		foreground_outside: "#47331FB3",
	},
	square: {
		white: "#F0CFA0",
		black: "#8B4513",
		path: "#FFD700",
		threat: "#C0392B",
		piece: "#FAE5C0",
	},
};

const renderSelect: SelectRender = ({ type }) => {
	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				opacity: type === case_type.PIECE ? 0.45 : 1,
				backgroundColor:
					type === case_type.PIECE ? "#FFD700" : undefined,
			}}
		>
			{type === case_type.SQUARE && (
				<div
					className="w-10 h-10 rounded-full"
					style={{ backgroundColor: "rgba(139, 69, 19, 0.22)" }}
				/>
			)}
			{type === case_type.THREAT && (
				<div
					className="w-[80%] h-[80%] border-4 rounded-full"
					style={{ borderColor: "rgba(139, 69, 19, 0.35)" }}
				/>
			)}
		</div>
	);
};

export const walnutPresets: Presets = {
	theme,
	renderSelect,
};
