import { useCallback } from "react";
import type { PieceData } from "../../domain/value_objects";
import { selectPieceUseCase } from "../../application/use-cases/select-piece-use-case";
import { useBoardStore } from "../stores/board-store/hook";

export function useSelectPiece() {
	const getSelectPieceState = useBoardStore(
		(state) => state.getSelectPieceState,
	);
	const updateSelectSquares = useBoardStore(
		(state) => state.setSelectSquares,
	);
	const updateSelectedPiece = useBoardStore(
		(state) => state.setSelectedPiece,
	);

	return useCallback(
		(piece: PieceData) => {
			const currentState = getSelectPieceState();
			const execute = selectPieceUseCase({
				updateSelectSquares,
				updateSelectedPiece,
			});
			execute({
				piece,
				turn: currentState.turn,
				data: currentState.data,
				variant: currentState.variant,
				enPassantTarget: currentState.enPassantTarget,
			});
		},
		[getSelectPieceState, updateSelectSquares, updateSelectedPiece],
	);
}
