import type { PieceData } from "../value_objects";

export interface ChessGameService {
	createDefaultPiecePositions: (seed?: number) => PieceData[];
	[key: string]: unknown;
}
