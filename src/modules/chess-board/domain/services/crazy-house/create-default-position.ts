import { piece_color, piece_type } from "../../constants";
import type { PieceData } from "../../value_objects";

export function createDefaultPiecePositions(): PieceData[] {
	return [
		// Black pieces (top of board)
		{ type: piece_type.ROOK, position: 0, color: piece_color.BLACK },
		{ type: piece_type.KNIGHT, position: 1, color: piece_color.BLACK },
		{ type: piece_type.BISHOP, position: 2, color: piece_color.BLACK },
		{ type: piece_type.QUEEN, position: 3, color: piece_color.BLACK },
		{ type: piece_type.KING, position: 4, color: piece_color.BLACK },
		{ type: piece_type.BISHOP, position: 5, color: piece_color.BLACK },
		{ type: piece_type.KNIGHT, position: 6, color: piece_color.BLACK },
		{ type: piece_type.ROOK, position: 7, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: 8, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: 9, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: 10, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: 11, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: 12, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: 13, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: 14, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: 15, color: piece_color.BLACK },

		// White pieces (bottom of board)
		{ type: piece_type.PAWN, position: 48, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: 49, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: 50, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: 51, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: 52, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: 53, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: 54, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: 55, color: piece_color.WHITE },
		{ type: piece_type.ROOK, position: 56, color: piece_color.WHITE },
		{ type: piece_type.KNIGHT, position: 57, color: piece_color.WHITE },
		{ type: piece_type.BISHOP, position: 58, color: piece_color.WHITE },
		{ type: piece_type.QUEEN, position: 59, color: piece_color.WHITE },
		{ type: piece_type.KING, position: 60, color: piece_color.WHITE },
		{ type: piece_type.BISHOP, position: 61, color: piece_color.WHITE },
		{ type: piece_type.KNIGHT, position: 62, color: piece_color.WHITE },
		{ type: piece_type.ROOK, position: 63, color: piece_color.WHITE },
	].map((piece, id) => ({
		...piece,
		id,
	}));
}
