import type { ReactNode } from "react";
import type { PieceData, SquareSelectData } from "../domain/value_objects";

export type PieceRender = (
	data: Pick<PieceData, "type" | "color">,
) => ReactNode;

export type SelectRender = (
	data: Omit<SquareSelectData, "from"> & { theme: BoardTheme },
) => ReactNode;

export interface BoardTheme {
	coordinates: {
		foreground_black: string;
		foreground_white: string;
		foreground_outside: string;
	};
	square: {
		white: string;
		black: string;
		path: string;
		threat: string;
		piece: string;
	};
}

export interface BoardHandler {
	reset: () => void;
}

export interface Presets {
	theme: BoardTheme;
	renderSelect: SelectRender;
}
