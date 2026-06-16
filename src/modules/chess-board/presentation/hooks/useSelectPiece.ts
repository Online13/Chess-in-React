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
	const updatePromotionPiece = useBoardStore(
		(state) => state.setPromotionPiece,
	);

	return useCallback(
		(piece: PieceData) => {
			const currentState = getSelectPieceState();
			const execute = selectPieceUseCase({
				updateSelectSquares,
				updateSelectedPiece,
				updatePromotionPiece,
			});
			const result = execute({
				piece,
				turn: currentState.turn,
				data: currentState.data,
				variant: currentState.variant,
				enPassantTarget: currentState.enPassantTarget,
			});
			if (result.isFailure()) {
				return result.getError();
			}
		},
		[
			getSelectPieceState,
			updatePromotionPiece,
			updateSelectSquares,
			updateSelectedPiece,
		],
	);
}
