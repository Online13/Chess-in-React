import type { PieceData } from "../../value_objects";
import type { ChessGameService } from "../type";
import { getGameStatus } from "./get-game-status";
import { computePosssibleMoveOfPiece } from "./rules-calculate-possible-moves";
import { computeEnPassantTarget } from "./rules-compute-en-passant-target";
import { selectSquare } from "./select-target";

export function createGameService<
	T extends object & { createDefaultPiecePositions: () => PieceData[] },
>(methods: T): ChessGameService {
	return {
		...methods,
		computeEnPassantTarget,
		computePosssibleMoveOfPiece,
		selectSquare,
		getGameStatus,
	};
}
