import { useState, type PropsWithChildren } from "react";
import { createBoardStore, type CreateBoardStoreArgs } from "./store";
import { BoardStoreContext } from "./context";

export function BoardProvider({
	children,
	...args
}: PropsWithChildren<CreateBoardStoreArgs>) {
	const [store] = useState(() => createBoardStore(args));
	return (
		<BoardStoreContext.Provider value={store}>
			{children}
		</BoardStoreContext.Provider>
	);
}
