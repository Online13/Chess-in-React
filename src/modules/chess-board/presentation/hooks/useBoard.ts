import { useCallback, useMemo, useRef } from "react";
import type { BoardHandler } from "../type";
import { GameService } from "../../domain/services/game-service";
import type { VariantOption } from "../../domain/type";

const defaultOption: VariantOption = { variant: "classic" };

export function useBoard(option: VariantOption = defaultOption) {
	const variant = option.variant;
	const seed = option.seed ?? 0;
	const ref = useRef<BoardHandler>(null);
	const reset = useCallback(() => {
		ref.current?.reset();
	}, []);
	const data = useMemo(() => {
		const service = GameService[option.variant];
		if (!service) {
			throw new Error(`Game variant ${option.variant} is not supported.`);
		}

		return service.createDefaultPiecePositions(option.seed);
	}, [option]);

	return useMemo(
		() => ({
			ref,
			seed,
			reset,
			variant,
			data,
		}),
		[data, reset, seed, variant],
	);
}
