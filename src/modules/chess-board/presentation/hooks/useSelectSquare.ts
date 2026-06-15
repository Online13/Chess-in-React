import { useCallback } from "react";
import { selectSquareUseCase } from "../../application/use-cases/select-square-use-case";
import { useBoardStore } from "../stores/board-store/hook";

export function useSelectSquare() {
	const setData = useBoardStore((state) => state.setData);
	const setGameState = useBoardStore((state) => state.setGameState);
	const setSelectedPiece = useBoardStore((state) => state.setSelectedPiece);
	const setSelectSquares = useBoardStore((state) => state.setSelectSquares);
	const setEnPassantTarget = useBoardStore(
		(state) => state.setEnPassantTarget,
	);
	const nextTurn = useBoardStore((state) => state.nextTurn);
	const onGameStateChange = useBoardStore((state) => state.onGameStateChange);
	const getSelectSquareState = useBoardStore(
		(state) => state.getSelectSquareState,
	);
	return useCallback(
		(position: number) => {
			const currentState = getSelectSquareState();
			if (!currentState.selectedPiece) return;
			const execute = selectSquareUseCase({
				showModal: onGameStateChange ?? (() => {}),
				updatePieces: setData,
				updateGameState: setGameState,
				updateSelectedPiece: setSelectedPiece,
				updateSelectSquares: setSelectSquares,
				updateEnPassantTarget: setEnPassantTarget,
				nextTurn: nextTurn,
			});
			execute({
				position,
				data: currentState.data,
				variant: currentState.variant,
				selectedPiece: currentState.selectedPiece,
				enPassantTarget: currentState.enPassantTarget,
			});
		},
		[
			getSelectSquareState,
			nextTurn,
			onGameStateChange,
			setData,
			setEnPassantTarget,
			setGameState,
			setSelectSquares,
			setSelectedPiece,
		],
	);
}
