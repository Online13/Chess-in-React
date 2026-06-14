import type { Variant } from "../type";
import { Chess960GameService } from "./chess-960";
import { ClassicGameService } from "./classic";
import type { ChessGameService } from "./type";

export const GameService: Record<Variant, ChessGameService | null> = {
	classic: ClassicGameService,
	chess960: Chess960GameService,
	crazyhouse: null,
	bughouse: null,
	kingofthehill: null,
	threecheck: null,
	antichess: null,
};
