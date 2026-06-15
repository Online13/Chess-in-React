import { createDefaultPiecePositions } from "./create-default-position";
import { createGameService } from "../base-game";

export const CrazyHouseGameService = createGameService({
	createDefaultPiecePositions,
});
