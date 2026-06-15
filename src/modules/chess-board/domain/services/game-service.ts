import type { Variant } from "../type";
import { AntiChessGameService } from "./anti-chess";
import { BugHouseGameService } from "./bug-house";
import { Chess960GameService } from "./chess-960";
import { ClassicGameService } from "./classic";
import { CrazyHouseGameService } from "./crazy-house";
import { KingOfTheHillGameService } from "./king-of-the-hill";
import { ThreeCheckGameService } from "./three-check";
import type { ChessGameService } from "./type";

export const GameService: Record<Variant, ChessGameService | null> = {
	classic: ClassicGameService,
	chess960: Chess960GameService,
	crazyhouse: CrazyHouseGameService,
	bughouse: BugHouseGameService,
	kingofthehill: KingOfTheHillGameService,
	threecheck: ThreeCheckGameService,
	antichess: AntiChessGameService,
};

export function getGameService(variant: Variant): ChessGameService {
	const service = GameService[variant];
	if (!service) {
		throw new Error(`Game variant ${variant} is not supported.`);
	}
	return service;
}
