import { game_state, type GameState } from "../domain/constants";

// Petit helper pour rendre le texte joli
export const getStatusMessage = (state: GameState) => {
	switch (state) {
		case game_state.WHITE_WIN:
			return "Victoire des Blancs ! ⚪";
		case game_state.BLACK_WIN:
			return "Victoire des Noirs ! ⚫";
		case game_state.STALE:
			return "Pat ! Match nul. 🤝";
		case game_state.CHECK:
			return "Échec ! ⚠️";
		case game_state.ONGOING:
			return "Partie en cours... ♟️";
		case game_state.CHECKMATE:
			return "Échec et mat ! 🏁";
		default:
			return "Partie terminée";
	}
};
