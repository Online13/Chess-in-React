import { case_type } from "../../domain/constants";
import type { BoardTheme, Presets, SelectRender } from "../type";

const theme: BoardTheme = {
	coordinates: {
		foreground_black: "#B0BEC5",
		foreground_white: "#546E7A",
		foreground_outside: "#FFFFFF66",
	},
	square: {
		white: "#B0BEC5",
		black: "#37474F",
		path: "#00BCD4",
		threat: "#EF5350",
		piece: "#00BCD4",
	},
};

const renderSelect: SelectRender = ({ type }) => {
	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				opacity: type === case_type.PIECE ? 0.4 : 1,
				backgroundColor:
					type === case_type.PIECE ? "#00BCD4" : undefined,
			}}
		>
			{type === case_type.SQUARE && (
				<div
					className="w-10 h-10 rounded-full"
					style={{ backgroundColor: "rgba(0, 188, 212, 0.35)" }}
				/>
			)}
			{type === case_type.THREAT && (
				<div
					className="w-[80%] h-[80%] border-4 rounded-full"
					style={{ borderColor: "rgba(0, 188, 212, 0.5)" }}
				/>
			)}
		</div>
	);
};

export const nightPresets: Presets = {
	theme,
	renderSelect,
};
