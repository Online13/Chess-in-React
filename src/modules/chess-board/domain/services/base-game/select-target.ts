import { case_type, piece_type } from "../../constants";
import type { PieceData, SquareSelectData } from "../../value_objects";
import { Result } from "../result-type";
import { computePosssibleMoveOfPiece } from "./rules-calculate-possible-moves";
import { toPosition } from "./utils";

/**
 * Apply a player's square selection to the board, executing the corresponding move.
 * Handles normal moves, captures, castling (kingside and queenside), and en passant.
 * Returns the unchanged board if the move is illegal or targets the piece's own square.
 *
 * @param args.selectData - The selection descriptor produced by the UI, containing the destination position and the piece being moved.
 * @param args.data - The array of all pieces currently on the board.
 * @param args.enPassantTarget - The flat position index of the active en passant capture square, or `null`/`undefined` if none.
 * @returns A new `PieceData` array representing the board after the move; returns the original array unchanged if the move is not allowed.
 */
export function selectSquare(args: {
	selectData: SquareSelectData;
	data: PieceData[];
	enPassantTarget?: number | null;
}) {
	const moving = args.data.find(
		(item) => item.position === args.selectData.from.position,
	);
	if (!moving)
		return Result.error({
			code: "MOVING_PIECE_NOT_FOUND",
		});
	if (moving.position === args.selectData.position)
		return Result.error({
			code: "CANNOT_MOVE_TO_SAME_SQUARE",
		});

	const possibleMoves = computePosssibleMoveOfPiece({
		position: moving.position,
		data: args.data,
		enPassantTarget: args.enPassantTarget,
	});
	const isAllowed = possibleMoves.some(
		(move) =>
			move.position === args.selectData.position &&
			(move.type === case_type.SQUARE || move.type === case_type.THREAT),
	);
	if (!isAllowed)
		return Result.error({
			code: "MOVE_NOT_ALLOWED",
		});

	const target = args.data.find(
		(item) => item.position === args.selectData.position,
	);
	if (target && target.color === moving.color)
		return Result.error({
			code: "CANNOT_CAPTURE_OWN_PIECE",
		});

	let newData = args.data
		.filter((item) => item.position !== args.selectData.position)
		.map((item) =>
			item.position === moving.position
				? {
						...item,
						position: args.selectData.position,
						hasMoved: true,
					}
				: item,
		);

	// Castling: when king moves 2 squares, also move the rook
	if (moving.type === piece_type.KING) {
		const fromX = moving.position % 8;
		const toX = args.selectData.position % 8;
		const dx = toX - fromX;
		if (Math.abs(dx) === 2) {
			const row = Math.floor(moving.position / 8);
			if (dx === 2) {
				// Kingside: rook from h-file (x=7) to f-file (x=5)
				const rookFrom = toPosition(7, row);
				const rookTo = toPosition(5, row);
				newData = newData.map((item) =>
					item.position === rookFrom
						? { ...item, position: rookTo, hasMoved: true }
						: item,
				);
			} else {
				// Queenside: rook from a-file (x=0) to d-file (x=3)
				const rookFrom = toPosition(0, row);
				const rookTo = toPosition(3, row);
				newData = newData.map((item) =>
					item.position === rookFrom
						? { ...item, position: rookTo, hasMoved: true }
						: item,
				);
			}
		}
	}

	// En passant: when pawn captures to the en passant target, remove the captured pawn
	if (
		moving.type === piece_type.PAWN &&
		args.enPassantTarget != null &&
		args.selectData.position === args.enPassantTarget
	) {
		const capturedX = args.enPassantTarget % 8;
		const capturedY = Math.floor(moving.position / 8);
		const capturedPos = capturedY * 8 + capturedX;
		newData = newData.filter((item) => item.position !== capturedPos);
	}

	return Result.success(newData);
}
