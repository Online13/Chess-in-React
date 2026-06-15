import { useContext } from "react";
import { useStore } from "zustand";
import type { BoardState } from "./store";
import { BoardStoreContext } from "./context";

export function useBoardStore<T>(selector: (state: BoardState) => T) {
	const store = useContext(BoardStoreContext);
	if (!store) {
		throw new Error("BoardStoreContext is not available");
	}

	return useStore(store, selector);
}
