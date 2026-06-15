import {
	case_type,
	game_state,
	type GameState,
	type Variant,
} from "../../domain/constants";
import { getGameService } from "../../domain/services/game-service";
import type { PieceData, SquareSelectData } from "../../domain/value_objects";

interface View {
	updatePieces: (data: PieceData[]) => void;
	updateSelectSquares: (data: SquareSelectData[]) => void;
	updateEnPassantTarget: (target: number | null) => void;
	updateSelectedPiece: (piece: PieceData | null) => void;
	updateGameState: (state: GameState) => void;
	nextTurn: () => void;
	showModal: (gameState: GameState) => void;
}

interface State {
	variant: Variant;
	position: number;
	selectedPiece: PieceData;
	data: PieceData[];
	enPassantTarget: number | null;
}

/**
 * Handle a destination square click: execute the move, update en passant state,
 * evaluate the new game status, and advance the turn.
 *
 * @param state.position - The flat position index (0–63) of the clicked square.
 * @param state.selectedPiece - The piece currently selected by the active player.
 * @param state.data - The array of all pieces currently on the board.
 * @param state.enPassantTarget - The active en passant capture square, or `null`.
 * @param view.updatePieces - Replaces the board piece array after the move.
 * @param view.updateSelectSquares - Clears the highlighted-squares list.
 * @param view.updateEnPassantTarget - Sets the new en passant target (or clears it).
 * @param view.updateSelectedPiece - Clears the active piece selection.
 * @param view.updateGameState - Updates the displayed game state.
 * @param view.nextTurn - Advances to the next player's turn.
 * @param view.showModal - Displays the end-game modal for terminal states.
 */
export const selectSquareUseCase = (view: View) => (state: State) => {
	const service = getGameService(state.variant);
	const selectData: SquareSelectData = {
		type: case_type.SQUARE,
		position: state.position,
		from: state.selectedPiece,
	};


	const newData = service.selectSquare({
		selectData,
		data: state.data,
		enPassantTarget: state.enPassantTarget,
	});
	view.updatePieces(newData);
	view.updateSelectSquares([]);

	const newEnPassantTarget = service.computeEnPassantTarget(
		state.selectedPiece,
		state.position,
	);
	view.updateEnPassantTarget(newEnPassantTarget);

	const newGameState = service.getGameStatus({
		data: newData,
		enPassantTarget: newEnPassantTarget,
	});

	if (state.position === state.selectedPiece.position) return;

	if (
		newGameState !== game_state.ONGOING &&
		newGameState !== game_state.CHECK
	) {
		view.showModal(newGameState);
	}

	view.updateSelectedPiece(null);
	view.updateGameState(newGameState);
	view.nextTurn();
};
