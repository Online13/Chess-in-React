import {
	case_type,
	game_state,
	piece_color,
	type GameState,
	type PieceColor,
} from "../../constants";
import type { PieceData } from "../../value_objects";
import { computePosssibleMoveOfPiece } from "./rules-calculate-possible-moves";
import { isKingInCheck } from "./rules-detect-check";
import { getKingPosition } from "./selector";

/**
 * Evaluate the current game state after a move has been applied.
 * Detects checkmate, stalemate, check, win conditions, and the ongoing state.
 *
 * @param args.data - The array of all pieces currently on the board.
 * @param args.enPassantTarget - The flat position index of the active en passant capture square, or `null`/`undefined` if none.
 * @returns A `GameState` value indicating the result: `"ongoing"`, `"check"`, `"checkmate"`, `"stalemate"`, `"white_win"`, or `"black_win"`.
 */
export function getGameStatus(args: {
	data: PieceData[];
	enPassantTarget?: number | null;
}): GameState {
	const hasLegalMoves = (color: PieceColor) => {
		for (const piece of args.data) {
			if (piece.color !== color) continue;
			const moves = computePosssibleMoveOfPiece({
				position: piece.position,
				data: args.data,
				enPassantTarget: args.enPassantTarget,
			});
			if (
				moves.some(
					(m) =>
						m.type === case_type.SQUARE ||
						m.type === case_type.THREAT,
				)
			)
				return true;
		}
		return false;
	};

	const whiteKing = getKingPosition(args.data, piece_color.WHITE);
	const blackKing = getKingPosition(args.data, piece_color.BLACK);
	if (whiteKing === null && blackKing === null) return game_state.STALE;
	if (whiteKing === null) return game_state.BLACK_WIN;
	if (blackKing === null) return game_state.WHITE_WIN;

	const whiteInCheck = isKingInCheck(args.data, piece_color.WHITE);
	const blackInCheck = isKingInCheck(args.data, piece_color.BLACK);
	const whiteHasMoves = hasLegalMoves(piece_color.WHITE);
	const blackHasMoves = hasLegalMoves(piece_color.BLACK);

	if (!whiteHasMoves && whiteInCheck) return game_state.BLACK_WIN;
	if (!blackHasMoves && blackInCheck) return game_state.WHITE_WIN;
	if (!whiteHasMoves && !whiteInCheck) return game_state.STALE;
	if (!blackHasMoves && !blackInCheck) return game_state.STALE;

	if (whiteInCheck || blackInCheck) return game_state.CHECK;

	return game_state.ONGOING;
}
