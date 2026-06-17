import { case_type } from "../../domain/constants";
import type { BoardTheme, Presets, SelectRender } from "../type";

const theme: BoardTheme = {
	coordinates: {
		foreground_black: "#E8D7F5",
		foreground_white: "#7B4FA6",
		foreground_outside: "#FFFFFF80",
	},
	square: {
		white: "#E8D7F5",
		black: "#7B4FA6",
		path: "#F7D070",
		threat: "#F06292",
		piece: "#F3E5F5",
	},
};

const renderSelect: SelectRender = ({ type }) => {
	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				opacity: type === case_type.PIECE ? 0.45 : 1,
				backgroundColor:
					type === case_type.PIECE ? "#F7D070" : undefined,
			}}
		>
			{type === case_type.SQUARE && (
				<div
					className="w-10 h-10 rounded-full"
					style={{ backgroundColor: "rgba(123, 79, 166, 0.25)" }}
				/>
			)}
			{type === case_type.THREAT && (
				<div
					className="w-[80%] h-[80%] border-4 rounded-full"
					style={{ borderColor: "rgba(123, 79, 166, 0.4)" }}
				/>
			)}
		</div>
	);
};

export const purplePresets: Presets = {
	theme,
	renderSelect,
};
