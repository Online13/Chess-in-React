import { case_type, piece_color, piece_type, type PieceColor } from "../../constants";
import type { PieceData, SquareSelectData } from "../../value_objects";
import { isKingInCheck } from "./rules-detect-check";
import { getAt } from "./selector";
import { inBounds, toPosition } from "./utils";

/**
 * Produce a new board state by moving a piece to a target position, removing any piece already there.
 *
 * @param data - The current array of all pieces on the board.
 * @param moving - The piece being moved.
 * @param position - The destination flat position index (0–63).
 * @returns A new `PieceData` array reflecting the move; the original array is not mutated.
 */
function applyMove(
    data: PieceData[],
    moving: PieceData,
    position: number,
): PieceData[] {
    return data.reduce<PieceData[]>((acc, item) => {
        if (item.position === position) return acc;
        if (item.position === moving.position) {
            acc.push({ ...item, position });
            return acc;
        }
        acc.push(item);
        return acc;
    }, []);
}

/**
 * Compute all legal destination squares for the piece at the given position,
 * including normal moves, captures, en passant, and castling.
 * Moves that would leave the player's own king in check are filtered out.
 *
 * @param args.position - The flat position index (0–63) of the piece to move.
 * @param args.data - The array of all pieces currently on the board.
 * @param args.enPassantTarget - The flat position index of the en passant capture square, or `null`/`undefined` if none is available.
 * @returns An array of `SquareSelectData` entries — one `"piece"` entry for the selected piece itself, followed by `"square"` (empty landing) and `"threat"` (capture) entries for each legal destination.
 */
export function computePosssibleMoveOfPiece(args: {
    position: number;
    data: PieceData[];
    enPassantTarget?: number | null;
}): SquareSelectData[] {
    const piece = args.data.find((item) => item.position === args.position);
    if (!piece) return [];

    const results: SquareSelectData[] = [
        { type: case_type.PIECE, position: piece.position, from: piece },
    ];
    const x = piece.position % 8;
    const y = Math.floor(piece.position / 8);

    const getAtLocal = (position: number) => getAt(args.data, position);
    const addSquare = (position: number) => {
        results.push({ type: case_type.SQUARE, position, from: piece });
    };
    const addThreat = (position: number) => {
        results.push({ type: case_type.THREAT, position, from: piece });
    };

    const addLineMoves = (dx: number, dy: number) => {
        let nextX = x + dx;
        let nextY = y + dy;
        while (inBounds(nextX, nextY)) {
            const position = toPosition(nextX, nextY);
            const target = getAtLocal(position);
            if (!target) {
                addSquare(position);
            } else {
                if (target.color !== piece.color) {
                    addThreat(position);
                }
                break;
            }
            nextX += dx;
            nextY += dy;
        }
    };

    switch (piece.type) {
        case piece_type.PAWN: {
            const direction = piece.color === piece_color.WHITE ? -1 : 1;
            const startRow = piece.color === piece_color.WHITE ? 6 : 1;
            const oneStepY = y + direction;
            if (inBounds(x, oneStepY)) {
                const oneStepPos = toPosition(x, oneStepY);
                if (!getAtLocal(oneStepPos)) {
                    addSquare(oneStepPos);
                    const twoStepY = y + direction * 2;
                    if (y === startRow && inBounds(x, twoStepY)) {
                        const twoStepPos = toPosition(x, twoStepY);
                        if (!getAtLocal(twoStepPos)) {
                            addSquare(twoStepPos);
                        }
                    }
                }
            }

            const captureX = [x - 1, x + 1];
            for (const nextX of captureX) {
                const nextY = y + direction;
                if (!inBounds(nextX, nextY)) continue;
                const position = toPosition(nextX, nextY);
                const target = getAtLocal(position);
                if (target && target.color !== piece.color) {
                    addThreat(position);
                } else if (
                    !target &&
                    args.enPassantTarget != null &&
                    position === args.enPassantTarget
                ) {
                    // En passant capture
                    addThreat(position);
                }
            }
            break;
        }
        case piece_type.ROOK: {
            addLineMoves(1, 0);
            addLineMoves(-1, 0);
            addLineMoves(0, 1);
            addLineMoves(0, -1);
            break;
        }
        case piece_type.BISHOP: {
            addLineMoves(1, 1);
            addLineMoves(1, -1);
            addLineMoves(-1, 1);
            addLineMoves(-1, -1);
            break;
        }
        case piece_type.QUEEN: {
            addLineMoves(1, 0);
            addLineMoves(-1, 0);
            addLineMoves(0, 1);
            addLineMoves(0, -1);
            addLineMoves(1, 1);
            addLineMoves(1, -1);
            addLineMoves(-1, 1);
            addLineMoves(-1, -1);
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
                const position = toPosition(nextX, nextY);
                const target = getAtLocal(position);
                if (!target) addSquare(position);
                else if (target.color !== piece.color) addThreat(position);
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
                    const position = toPosition(nextX, nextY);
                    const target = getAtLocal(position);
                    if (!target) addSquare(position);
                    else if (target.color !== piece.color) addThreat(position);
                }
            }

            // Castling: king must not have moved and must not be in check
            if (
                !piece.hasMoved &&
                !isKingInCheck(args.data, piece.color as PieceColor)
            ) {
                // Kingside (petit roque): rook at x=7, same row
                const kingsideRookPos = toPosition(7, y);
                const kingsideRook = getAt(args.data, kingsideRookPos);
                if (
                    kingsideRook?.type === piece_type.ROOK &&
                    kingsideRook.color === piece.color &&
                    !kingsideRook.hasMoved
                ) {
                    const f = toPosition(x + 1, y);
                    const g = toPosition(x + 2, y);
                    if (!getAtLocal(f) && !getAtLocal(g)) {
                        // King must not pass through check on f-file
                        const dataAfterF = applyMove(args.data, piece, f);
                        if (
                            !isKingInCheck(
                                dataAfterF,
                                piece.color as PieceColor,
                            )
                        ) {
                            addSquare(g);
                        }
                    }
                }

                // Queenside (grand roque): rook at x=0, same row
                const queensideRookPos = toPosition(0, y);
                const queensideRook = getAt(args.data, queensideRookPos);
                if (
                    queensideRook?.type === piece_type.ROOK &&
                    queensideRook.color === piece.color &&
                    !queensideRook.hasMoved
                ) {
                    const d = toPosition(x - 1, y);
                    const c = toPosition(x - 2, y);
                    const b = toPosition(x - 3, y);
                    if (!getAtLocal(d) && !getAtLocal(c) && !getAtLocal(b)) {
                        // King must not pass through check on d-file
                        const dataAfterD = applyMove(args.data, piece, d);
                        if (
                            !isKingInCheck(
                                dataAfterD,
                                piece.color as PieceColor,
                            )
                        ) {
                            addSquare(c);
                        }
                    }
                }
            }
            break;
        }
        default:
            break;
    }

    const filtered = results.filter((move) => {
        if (move.type === case_type.PIECE) return true;
        let nextData = applyMove(args.data, piece, move.position);

        // For en passant simulation: also remove the captured pawn
        if (
            piece.type === piece_type.PAWN &&
            args.enPassantTarget != null &&
            move.position === args.enPassantTarget
        ) {
            const capturedX = args.enPassantTarget % 8;
            const capturedY = Math.floor(piece.position / 8);
            const capturedPos = capturedY * 8 + capturedX;
            nextData = nextData.filter((p) => p.position !== capturedPos);
        }

        return !isKingInCheck(nextData, piece.color as PieceColor);
    });

    return filtered;
}
