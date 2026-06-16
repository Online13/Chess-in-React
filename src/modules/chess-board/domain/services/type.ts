import type { GameState } from "../constants";
import type { PieceData, SquareSelectData } from "../value_objects";
import type { Result } from "./result-type";

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
	}) =>
		| Result<never, "MOVING_PIECE_NOT_FOUND">
		| Result<never,"CANNOT_MOVE_TO_SAME_SQUARE">
		| Result<never,"MOVE_NOT_ALLOWED">
		| Result<never,"CANNOT_CAPTURE_OWN_PIECE">
		| Result<PieceData[], never>;
	getGameStatus: (args: {
		data: PieceData[];
		enPassantTarget?: number | null;
	}) => GameState;
}
