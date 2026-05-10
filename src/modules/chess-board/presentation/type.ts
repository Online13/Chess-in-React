import type { ReactNode, RefObject } from "react";
import type { PieceData, SquareSelectData } from "../domain/value_objects";
import type { GameState, Variant } from "../domain/constants";

export type PieceRender = (
	data: Pick<PieceData, "type" | "color">,
) => ReactNode;

export type SelectRender = (
	data: Omit<SquareSelectData, "from"> & { theme: BoardTheme },
) => ReactNode;

export interface ChessEngine {
	gameState: GameState;
	selectedPiece: PieceData | null;
	squareSelectData: SquareSelectData[];
	reset: () => void;
	selectPiece: (piece: PieceData) => void;
	selectSquare: (position: number) => void;
	setSelectedPiece: (piece: PieceData | null) => void;
}

export interface DataStore extends ChessEngine {
	seed: number;
	variant: Variant;
	data: PieceData[];
	setData: (data: PieceData[]) => void;
}

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

export interface BoardInstance {
	variant: Variant;
	seed: number;
	ref: RefObject<BoardHandler | null>;
	reset: () => void;
	defaultData: () => PieceData[];
}

export interface Presets {
	theme: BoardTheme;
	renderSelect: SelectRender;
}
