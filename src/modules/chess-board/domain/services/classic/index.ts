import { computePosssibleMoveOfPiece } from "./rules-calculate-possible-moves";
import { computeEnPassantTarget } from "./rules-compute-en-passant-target";
import { createDefaultPiecePositions } from "./create-default-position";
import { getGameStatus } from "./get-game-status";
import { selectSquare } from "./select-target";

export const ClassicGameService = {
	createDefaultPiecePositions,
	computeEnPassantTarget,
	computePosssibleMoveOfPiece,
	selectSquare,
	getGameStatus,
};
