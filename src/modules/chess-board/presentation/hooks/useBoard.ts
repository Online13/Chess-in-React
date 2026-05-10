import { useCallback, useRef } from "react";
import type { BoardHandler, BoardInstance } from "../type";
import type { PieceData } from "../../domain/value_objects";
import { variant, type Variant } from "../../domain/constants";
import { GameService } from "../../domain/services/game-service";

interface BoardOption {
	game: Variant;
	seed: number;
}

const defaultOption: BoardOption = { game: variant.CLASSIC, seed: 0 };

export function useBoard(option: BoardOption = defaultOption): BoardInstance {
	const ref = useRef<BoardHandler>(null);
	const reset = useCallback(() => {
		ref.current?.reset();
	}, []);

	const createData = useCallback((): PieceData[] => {
		const service = GameService[option.game];
		if (!service) {
			throw new Error(`Game variant ${option.game} is not supported.`);
		}

		return service.createDefaultPiecePositions(option.seed);
	}, [option]);

	return {
		ref,
		reset,
		defaultData: createData,
		variant: option.game,
		seed: option.seed,
	};
}
