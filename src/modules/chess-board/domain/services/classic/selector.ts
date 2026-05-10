import { piece_type, type PieceColor } from "../../constants";
import type { PieceData } from "../../value_objects";

/**
 * Find the piece located at the given position on the board.
 *
 * @param data - The array of all pieces currently on the board.
 * @param position - The flat position index (0–63) to look up.
 * @returns The `PieceData` at that position, or `undefined` if the square is empty.
 */
export function getAt(data: PieceData[], position: number): PieceData | undefined {
    return data.find((item) => item.position === position);
}

/**
 * Find the position of the king belonging to the given color.
 *
 * @param data - The array of all pieces currently on the board.
 * @param color - The color of the king to locate (`"white"` or `"black"`).
 * @returns The flat position index (0–63) of the king, or `null` if it is not found.
 */
export function getKingPosition(data: PieceData[], color: PieceColor): number | null {
    const king = data.find(
        (piece) => piece.type === piece_type.KING && piece.color === color,
    );
    return king ? king.position : null;
}
