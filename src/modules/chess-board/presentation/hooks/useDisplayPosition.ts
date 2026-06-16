import { useMemo } from "react";
import { getPosition } from "../../domain/services/position";
import { useBoardStore } from "../stores/board-store/hook";

export function useDisplayPosition(position: number) {
	const flipped = useBoardStore((s) => s.flipped);
	return useMemo(() => {
		const { x, y } = getPosition(position);
		return flipped ? { x: 7 - x, y: 7 - y } : { x, y };
	}, [flipped, position]);
}
