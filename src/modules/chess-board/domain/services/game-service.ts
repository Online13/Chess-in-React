import { variant, type Variant } from "../constants";
import { Chess960GameService } from "./chess-960";
import { ClassicGameService } from "./classic";
import type { ChessGameService } from "./type";

export const GameService: Record<Variant, ChessGameService | null> = {
	[variant.CLASSIC]: ClassicGameService,
	[variant.CHESS960]: Chess960GameService,
	2: null,
	3: null,
	4: null,
	5: null,
	6: null,
};
