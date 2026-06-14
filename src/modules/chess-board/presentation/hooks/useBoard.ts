import { useCallback, useRef } from "react";
import type { BoardHandler, BoardInstance } from "../type";
import type { PieceData } from "../../domain/value_objects";
import { GameService } from "../../domain/services/game-service";
import type { VariantOption } from "../../domain/type";


const defaultOption: VariantOption = { variant: "classic" };

export function useBoard(option: VariantOption = defaultOption): BoardInstance {
	const ref = useRef<BoardHandler>(null);
	const reset = useCallback(() => {
		ref.current?.reset();
	}, []);

	const createData = useCallback((): PieceData[] => {
		const service = GameService[option.variant];
		if (!service) {
			throw new Error(`Game variant ${option.variant} is not supported.`);
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
