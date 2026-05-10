import { piece_color, piece_type, type PieceColor } from "../../constants";
import type { PieceData } from "../../value_objects";
import { getAt, getKingPosition } from "./selector";
import { inBounds, toPosition } from "./utils";

/**
 * Compute every square attacked (threatened) by a given piece, ignoring check legality.
 * Used internally to detect whether a king is in check, not to enumerate legal moves.
 *
 * @param piece - The piece whose attack pattern is computed.
 * @param data - The array of all pieces currently on the board, used to detect blockers for sliding pieces.
 * @returns An array of flat position indices (0–63) that the piece attacks.
 */
function getAttackSquares(piece: PieceData, data: PieceData[]): number[] {
	const squares: number[] = [];
	const x = piece.position % 8;
	const y = Math.floor(piece.position / 8);

	const addLineAttacks = (dx: number, dy: number) => {
		let nextX = x + dx;
		let nextY = y + dy;
		while (inBounds(nextX, nextY)) {
			const position = toPosition(nextX, nextY);
			squares.push(position);
			if (getAt(data, position)) break;
			nextX += dx;
			nextY += dy;
		}
	};

	switch (piece.type) {
		case piece_type.PAWN: {
			const direction = piece.color === piece_color.WHITE ? -1 : 1;
			const targets = [
				[x - 1, y + direction],
				[x + 1, y + direction],
			];
			for (const [tx, ty] of targets) {
				if (!inBounds(tx, ty)) continue;
				squares.push(toPosition(tx, ty));
			}
			break;
		}
		case piece_type.ROOK: {
			addLineAttacks(1, 0);
			addLineAttacks(-1, 0);
			addLineAttacks(0, 1);
			addLineAttacks(0, -1);
			break;
		}
		case piece_type.BISHOP: {
			addLineAttacks(1, 1);
			addLineAttacks(1, -1);
			addLineAttacks(-1, 1);
			addLineAttacks(-1, -1);
			break;
		}
		case piece_type.QUEEN: {
			addLineAttacks(1, 0);
			addLineAttacks(-1, 0);
			addLineAttacks(0, 1);
			addLineAttacks(0, -1);
			addLineAttacks(1, 1);
			addLineAttacks(1, -1);
			addLineAttacks(-1, 1);
			addLineAttacks(-1, -1);
			break;
		}
		case piece_type.KNIGHT: {
			const offsets = [
				[1, 2],
				[2, 1],
				[-1, 2],
				[-2, 1],
				[1, -2],
				[2, -1],
				[-1, -2],
				[-2, -1],
			] as const;
			for (const [dx, dy] of offsets) {
				const nextX = x + dx;
				const nextY = y + dy;
				if (!inBounds(nextX, nextY)) continue;
				squares.push(toPosition(nextX, nextY));
			}
			break;
		}
		case piece_type.KING: {
			for (let dx = -1; dx <= 1; dx += 1) {
				for (let dy = -1; dy <= 1; dy += 1) {
					if (dx === 0 && dy === 0) continue;
					const nextX = x + dx;
					const nextY = y + dy;
					if (!inBounds(nextX, nextY)) continue;
					squares.push(toPosition(nextX, nextY));
				}
			}
			break;
		}
		default:
			break;
	}

	return squares;
}

/**
 * Determine whether the king of the given color is currently in check.
 *
 * @param data - The array of all pieces currently on the board.
 * @param color - The color of the king to test (`"white"` or `"black"`).
 * @returns `true` if at least one enemy piece attacks the king's square, `false` otherwise.
 */
export function isKingInCheck(data: PieceData[], color: PieceColor): boolean {
	const kingPosition = getKingPosition(data, color);
	if (kingPosition === null) return false;
	for (const piece of data) {
		if (piece.color === color) continue;
		const attacks = getAttackSquares(piece, data);
		if (attacks.includes(kingPosition)) return true;
	}
	return false;
}
