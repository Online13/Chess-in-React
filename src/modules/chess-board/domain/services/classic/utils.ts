/**
 * Check if the given (x, y) coordinates are within the bounds of the 8×8 chessboard.
 *
 * @param x - The column index (0–7, left to right).
 * @param y - The row index (0–7, top to bottom).
 * @returns `true` if the coordinates are inside the board, `false` otherwise.
 */
export function inBounds(x: number, y: number): boolean {
	return x >= 0 && x < 8 && y >= 0 && y < 8;
}

/**
 * Convert (x, y) board coordinates to a flat position index in the range 0–63.
 *
 * @param x - The column index (0–7).
 * @param y - The row index (0–7).
 * @returns The corresponding linear position index (`y * 8 + x`).
 */
export function toPosition(x: number, y: number): number {
	return y * 8 + x;
}
