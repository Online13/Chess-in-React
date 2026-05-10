import { computePosssibleMoveOfPiece } from "./rules-calculate-possible-moves";
import { computeEnPassantTarget } from "./rules-compute-en-passant-target";
import { createDefaultPiecePositions } from "./create-default-position";
import { getGameStatus } from "./get-game-status";
import { selectSquare } from "./select-target";
import type { ChessGameService } from "../type";

export const ClassicGameService: ChessGameService = {
	createDefaultPiecePositions,
	computeEnPassantTarget,
	computePosssibleMoveOfPiece,
	selectSquare,
	getGameStatus,
};
