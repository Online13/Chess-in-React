import { useCallback, useState } from "react";
import type { PieceData, SquareSelectData } from "../../domain/value_objects";
import { game_state, turn_state, type GameState } from "../../domain/constants";
import { selectPieceUseCase } from "../../application/use-cases/select-piece-use-case";
import { selectSquareUseCase } from "../../application/use-cases/select-square-use-case";
import type { ChessEngine } from "../type";

// ----------------------------------------------------------

interface Args {
	data: PieceData[];
	setData: (data: PieceData[]) => void;
	showModal?: (gameState: GameState) => void;
}

export function useChessEngine(args: Args): ChessEngine {
	const [turn, setTurn] = useState(turn_state.WHITE);
	const [gameState, setGameState] = useState<GameState>(game_state.ONGOING);
	const [selectedPiece, setSelectedPiece] = useState<PieceData | null>(null);
	const [enPassantTarget, setEnPassantTarget] = useState<number | null>(null);
	const [squareSelectData, setSquareSelectData] = useState<
		SquareSelectData[]
	>([]);

	const selectPiece = useCallback(
		(piece: PieceData) => {
			const execute = selectPieceUseCase({
				updateSelectSquares: setSquareSelectData,
				updateSelectedPiece: setSelectedPiece,
			});
			execute({ turn, piece, data: args.data, enPassantTarget });
		},
		[args, enPassantTarget, turn],
	);

	const selectSquare = useCallback(
		(position: number) => {
			if (!selectedPiece) return;
			const execute = selectSquareUseCase({
				updatePieces: args.setData,
				updateSelectSquares: setSquareSelectData,
				updateEnPassantTarget: setEnPassantTarget,
				updateSelectedPiece: setSelectedPiece,
				updateGameState: setGameState,
				nextTurn: () => setTurn((prev) => (prev + 1) % 2),
				showModal: args.showModal ?? (() => {}),
			});
			execute({
				position,
				selectedPiece,
				data: args.data,
				enPassantTarget,
			});
		},
		[args, enPassantTarget, selectedPiece],
	);

	const reset = useCallback(() => {
		setTurn(turn_state.WHITE);
		setGameState(game_state.ONGOING);
		setSelectedPiece(null);
		setSquareSelectData([]);
		setEnPassantTarget(null);
	}, []);

	return {
		reset,
		selectPiece,
		selectSquare,
		gameState,
		squareSelectData,
		selectedPiece,
		setSelectedPiece,
	};
}
