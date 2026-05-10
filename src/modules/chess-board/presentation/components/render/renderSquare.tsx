import clsx from "clsx";
import type { BoardTheme } from "../../type";

interface Props {
	black: boolean;
	theme: BoardTheme;
}

export function renderSquare({ black, theme }: Props) {
	return (
		<div
			className={clsx(["w-full h-full"])}
			style={{
				backgroundColor: black
					? theme.square.black
					: theme.square.white,
			}}
		/>
	);
}
