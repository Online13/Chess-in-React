import { piece_color, piece_type } from "../../constants";
import type { PieceData } from "../../value_objects";

/**
 * Compute the en passant target square produced by a pawn's double-step advance.
 * Returns `null` for any other piece or move that does not qualify.
 *
 * @param from - The pawn that just moved, including its previous position.
 * @param toPosition - The flat position index (0–63) the pawn moved to.
 * @returns The flat position index of the en passant capture square (the square the pawn skipped over), or `null` if the move does not create an en passant opportunity.
 */
export function computeEnPassantTarget(
	from: PieceData,
	toPosition: number,
): number | null {
	if (from.type !== piece_type.PAWN) return null;
	const fromY = Math.floor(from.position / 8);
	const toY = Math.floor(toPosition / 8);
	if (Math.abs(toY - fromY) !== 2) return null;
	const direction = from.color === piece_color.WHITE ? -1 : 1;
	const epX = toPosition % 8;
	const epY = toY - direction;
	return epY * 8 + epX;
}
