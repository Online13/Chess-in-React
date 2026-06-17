import { case_type } from "../../domain/constants";
import type { BoardTheme, Presets, SelectRender } from "../type";

const theme: BoardTheme = {
	coordinates: {
		foreground_black: "#EBECD0",
		foreground_white: "#739552",
		foreground_outside: "#FFFFFF80",
	},
	square: {
		white: "#F0D9B5",
		black: "#B58863",
		path: "#F7EC5B",
		threat: "#FF0000",
		piece: "#CDD26A",
	},
};

const renderSelect: SelectRender = ({ type }) => {
	return (
		<div
			className="w-full h-full flex items-center justify-center"
			style={{
				opacity: type === case_type.PIECE ? 0.5 : 1,
				backgroundColor:
					type === case_type.PIECE ? "#CDD26A" : undefined,
			}}
		>
			{type === case_type.SQUARE && (
				<div
					className="w-12 h-12 rounded-full"
					style={{
						background:
							"radial-gradient(rgba(20, 85, 30, 0.5) 19%, rgba(0, 0, 0, 0) calc(20% + 1px))",
					}}
				></div>
			)}
			{type === case_type.THREAT && (
				<div
					className="w-full h-full"
					style={{
						background:
							"radial-gradient(transparent 0%, transparent 79%, rgba(20, 85, 0, 0.3) calc(80% + 1px))",
					}}
				></div>
			)}
		</div>
	);
};

export const lichessPresets: Presets = {
	theme,
	renderSelect,
};
