import type { GameState } from "../constants";
import type { PieceData, SquareSelectData } from "../value_objects";

export interface ChessGameService {
	createDefaultPiecePositions: (seed?: number) => PieceData[];
	computeEnPassantTarget: (
		from: PieceData,
		toPosition: number,
	) => number | null;
	computePosssibleMoveOfPiece: (args: {
		position: number;
		data: PieceData[];
		enPassantTarget?: number | null;
	}) => SquareSelectData[];
	selectSquare: (args: {
		selectData: SquareSelectData;
		data: PieceData[];
		enPassantTarget?: number | null;
	}) => PieceData[];
	getGameStatus: (args: {
		data: PieceData[];
		enPassantTarget?: number | null;
	}) => GameState;
}
