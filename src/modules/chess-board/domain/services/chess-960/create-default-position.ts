import { piece_color, piece_type, type PieceType } from "../../constants";
import type { PieceData } from "../../value_objects";

const KNIGHT_COMBINATIONS: [number, number][] = [
	[0, 1],
	[0, 2],
	[0, 3],
	[0, 4],
	[1, 2],
	[1, 3],
	[1, 4],
	[2, 3],
	[2, 4],
	[3, 4],
];

function getEmptyIndices(board: (PieceType | null)[]): number[] {
	return board.reduce<number[]>((acc, cell, i) => {
		if (cell === null) acc.push(i);
		return acc;
	}, []);
}

function generateBackRank(n: number): PieceType[] {
	const board: (PieceType | null)[] = Array(8).fill(null);

	// Step 1: Dark-square bishop (files 1, 3, 5, 7)
	board[[1, 3, 5, 7][n % 4]] = piece_type.BISHOP;
	n = Math.floor(n / 4);

	// Step 2: Light-square bishop (files 0, 2, 4, 6)
	board[[0, 2, 4, 6][n % 4]] = piece_type.BISHOP;
	n = Math.floor(n / 4);

	// Step 3: Queen on nth empty square
	const emptyForQueen = getEmptyIndices(board);
	board[emptyForQueen[n % 6]] = piece_type.QUEEN;
	n = Math.floor(n / 6);

	// Step 4: Knights using N5 combination table
	const emptyForKnights = getEmptyIndices(board);
	const [k1, k2] = KNIGHT_COMBINATIONS[n % 10];
	board[emptyForKnights[k1]] = piece_type.KNIGHT;
	board[emptyForKnights[k2]] = piece_type.KNIGHT;

	// Step 5: Rook, King, Rook on remaining 3 squares
	const remaining = getEmptyIndices(board);
	board[remaining[0]] = piece_type.ROOK;
	board[remaining[1]] = piece_type.KING;
	board[remaining[2]] = piece_type.ROOK;

	return board as PieceType[];
}

export function createDefaultPiecePositions(n: number = 1): PieceData[] {
	const backRank = generateBackRank(n);
	const pieces: Omit<PieceData, "id">[] = [];

	// Black back rank (positions 0–7)
	backRank.forEach((type, file) => {
		pieces.push({ type, position: file, color: piece_color.BLACK });
	});

	// Black pawns (positions 8–15)
	for (let file = 0; file < 8; file++) {
		pieces.push({
			type: piece_type.PAWN,
			position: 8 + file,
			color: piece_color.BLACK,
		});
	}

	// White pawns (positions 48–55)
	for (let file = 0; file < 8; file++) {
		pieces.push({
			type: piece_type.PAWN,
			position: 48 + file,
			color: piece_color.WHITE,
		});
	}

	// White back rank (positions 56–63)
	backRank.forEach((type, file) => {
		pieces.push({ type, position: 56 + file, color: piece_color.WHITE });
	});

	return pieces.map((piece, id) => ({ ...piece, id }));
}
