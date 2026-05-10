import type { CaseType, PieceColor, PieceType } from "./constants";

export interface PieceData {
	id: number;
	type: PieceType;
	position: number;
	color: PieceColor;
	hasMoved?: boolean;
}

export interface SquareSelectData {
	type: CaseType;
	position: number;
	from: PieceData;
}
