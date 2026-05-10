import { case_type } from "@/modules/chess-board/domain/constants";
import type { SquareSelectData } from "@/modules/chess-board/domain/value_objects";
import clsx from "clsx";
import type { BoardTheme } from "../../type";

const titleSelect = {
	[case_type.PIECE]: "Selected piece",
	[case_type.THREAT]: "Threatened square",
	[case_type.SQUARE]: "Selected square",
};

interface Props extends Omit<SquareSelectData, "from"> {
	theme: BoardTheme;
}

export function renderSelect({ position, type, theme }: Props) {
	const className = "w-full h-full";
	let backgroundColor = "",
		opacity = 1;
	if (type === case_type.PIECE) {
		opacity = 0.3;
		backgroundColor = theme.square.piece;
	} else if (type === case_type.THREAT) {
		opacity = 0.2;
		backgroundColor = theme.square.threat;
	} else if (type === case_type.SQUARE) {
		opacity = 0.3;
		backgroundColor = theme.square.path;
	}

	return (
		<div
			style={{ backgroundColor, opacity }}
			title={`${titleSelect[type]} at position ${position}`}
			className={clsx([className])}
		/>
	);
}
