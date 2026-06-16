import { useBoardStore } from "../../stores/board-store/hook";

export function BoardDebug() {
	const store = useBoardStore((state) => state);
	return (
		<pre className="fixed top-0 left-0 w-80 h-full bg-white overflow-auto">
			{JSON.stringify(store, null, 2)}
		</pre>
	);
}
