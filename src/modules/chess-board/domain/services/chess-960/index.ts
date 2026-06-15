import { createGameService } from "../base-game";
import type { ChessGameService } from "../type";
import { createDefaultPiecePositions } from "./create-default-position";

export const Chess960GameService: ChessGameService = createGameService({
	createDefaultPiecePositions,
});
