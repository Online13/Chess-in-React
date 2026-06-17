import { case_type } from "../../domain/constants";
import type { BoardTheme, Presets, SelectRender } from "../type";

const theme: BoardTheme = {
	coordinates: {
		foreground_black: "#DEE3E6",
		foreground_white: "#8CA2AD",
		foreground_outside: "#FFFFFF80",
	},
	square: {
		white: "#DEE3E6",
		black: "#8CA2AD",
		path: "#90CDF4",
		threat: "#FC8181",
		piece: "#BEE3F8",
	},
};

const renderSelect: SelectRender = ({ type }) => {
	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				opacity: type === case_type.PIECE ? 0.45 : 1,
				backgroundColor:
					type === case_type.PIECE ? "#90CDF4" : undefined,
			}}
		>
			{type === case_type.SQUARE && (
				<div
					className="w-10 h-10 rounded-full"
					style={{ backgroundColor: "rgba(66, 153, 225, 0.3)" }}
				/>
			)}
			{type === case_type.THREAT && (
				<div
					className="w-[80%] h-[80%] border-4 rounded-full"
					style={{ borderColor: "rgba(66, 153, 225, 0.4)" }}
				/>
			)}
		</div>
	);
};

export const chess24Presets: Presets = {
	theme,
	renderSelect,
};
