import { useCallback } from "react";
import { selectSquareUseCase } from "../../application/use-cases/select-square-use-case";
import { useBoardStore } from "../stores/board-store/hook";
import { Result } from "../../domain/services/result-type";

export function useSelectSquare() {
	const setData = useBoardStore((state) => state.setData);
	const setGameState = useBoardStore((state) => state.setGameState);
	const setSelectedPiece = useBoardStore((state) => state.setSelectedPiece);
	const setSelectSquares = useBoardStore((state) => state.setSelectSquares);
	const setEnPassantTarget = useBoardStore(
		(state) => state.setEnPassantTarget,
	);
	const setPromotionPiece = useBoardStore((state) => state.setPromotionPiece);
	const nextTurn = useBoardStore((state) => state.nextTurn);
	const onGameStateChange = useBoardStore((state) => state.onGameStateChange);
	const getSelectSquareState = useBoardStore(
		(state) => state.getSelectSquareState,
	);
	return useCallback(
		(position: number) => {
			const currentState = getSelectSquareState();
			if (!currentState.selectedPiece)
				return Result.error({ code: "NO_PIECE_SELECTED" });
			const execute = selectSquareUseCase({
				showModal: onGameStateChange ?? (() => {}),
				updatePieces: setData,
				updateGameState: setGameState,
				updateSelectedPiece: setSelectedPiece,
				updateSelectSquares: setSelectSquares,
				updateEnPassantTarget: setEnPassantTarget,
				updatePromotionPiece: setPromotionPiece,
				nextTurn: nextTurn,
			});
			const result = execute({
				position,
				data: currentState.data,
				variant: currentState.variant,
				selectedPiece: currentState.selectedPiece,
				enPassantTarget: currentState.enPassantTarget,
				promotionPiece: currentState.promotionPiece,
			});
			if (result && result.isFailure()) {
				return result;
			}

			return Result.success(undefined);
		},
		[
			getSelectSquareState,
			nextTurn,
			onGameStateChange,
			setData,
			setEnPassantTarget,
			setGameState,
			setPromotionPiece,
			setSelectSquares,
			setSelectedPiece,
		],
	);
}
