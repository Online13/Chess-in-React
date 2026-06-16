import { piece_color, piece_type, position } from "../../constants";
import type { PieceData } from "../../value_objects";

export function createDefaultPiecePositions(): PieceData[] {
	return [
		// Black pieces (top of board)
		{ type: piece_type.ROOK, position: position.A8, color: piece_color.BLACK },
		{ type: piece_type.KNIGHT, position: position.B8, color: piece_color.BLACK },
		{ type: piece_type.BISHOP, position: position.C8, color: piece_color.BLACK },
		{ type: piece_type.QUEEN, position: position.D8, color: piece_color.BLACK },
		{ type: piece_type.KING, position: position.E8, color: piece_color.BLACK },
		{ type: piece_type.BISHOP, position: position.F8, color: piece_color.BLACK },
		{ type: piece_type.KNIGHT, position: position.G8, color: piece_color.BLACK },
		{ type: piece_type.ROOK, position: position.H8, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: position.A7, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: position.B7, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: position.C7, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: position.D7, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: position.E7, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: position.F7, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: position.G7, color: piece_color.BLACK },
		{ type: piece_type.PAWN, position: position.H7, color: piece_color.BLACK },

		// White pieces (bottom of board)
		{ type: piece_type.PAWN, position: position.A2, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: position.B2, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: position.C2, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: position.D2, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: position.E2, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: position.F2, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: position.G2, color: piece_color.WHITE },
		{ type: piece_type.PAWN, position: position.H2, color: piece_color.WHITE },
		{ type: piece_type.ROOK, position: position.A1, color: piece_color.WHITE },
		{ type: piece_type.KNIGHT, position: position.B1, color: piece_color.WHITE },
		{ type: piece_type.BISHOP, position: position.C1, color: piece_color.WHITE },
		{ type: piece_type.QUEEN, position: position.D1, color: piece_color.WHITE },
		{ type: piece_type.KING, position: position.E1, color: piece_color.WHITE },
		{ type: piece_type.BISHOP, position: position.F1, color: piece_color.WHITE },
		{ type: piece_type.KNIGHT, position: position.G1, color: piece_color.WHITE },
		{ type: piece_type.ROOK, position: position.H1, color: piece_color.WHITE },
	].map((piece, id) => ({
		...piece,
		id,
	}));
}
