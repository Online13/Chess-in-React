import clsx from "clsx";
import { useBoardStore } from "../../stores/board-store/hook";
import { Fragment } from "react/jsx-runtime";

interface CoordinatesProps {
	inside?: boolean;
}

/**
 * Explanation: https://www.chess.com/article/view/chess-notation
 */
export function RankCoordinates({ inside = false }: CoordinatesProps) {
	const theme = useBoardStore((state) => state.theme);
	const flipped = useBoardStore((state) => state.flipped);
	return (
		<div
			className={clsx([
				"h-full w-8 absolute top-0 left-0 z-40 pointer-events-none",
				!inside && "-translate-x-full",
			])}
		>
			{Array.from({ length: 8 }, (_, i) => (
				<div
					key={i}
					className={clsx([
						"w-full h-[12.5%] flex text-sm text-gray-500",
						!inside && "items-center justify-center",
					])}
					style={
						theme && {
							color: inside
								? i % 2 === 0
									? theme.coordinates.foreground_white
									: theme.coordinates.foreground_black
								: theme.coordinates.foreground_outside,
						}
					}
				>
					{flipped ? i + 1 : 8 - i}
				</div>
			))}
		</div>
	);
}

export function FileCoordinates({ inside = false }: CoordinatesProps) {
	const theme = useBoardStore((state) => state.theme);
	const flipped = useBoardStore((state) => state.flipped);
	return (
		<div
			className={clsx([
				"h-8 w-full absolute bottom-0 left-0 z-40 pointer-events-none flex items-center",
				!inside && "translate-y-full",
			])}
		>
			{Array.from({ length: 8 }, (_, i) => (
				<div
					key={i}
					className={clsx([
						"h-full w-[12.5%] flex text-sm text-gray-500",
						!inside && "items-center justify-center",
						inside && "justify-end items-end pr-1",
					])}
					style={
						theme && {
							color: inside
								? i % 2 === 0
									? theme.coordinates.foreground_black
									: theme.coordinates.foreground_white
								: theme.coordinates.foreground_outside,
						}
					}
				>
					{String.fromCharCode(flipped ? 72 - i : 65 + i)}
				</div>
			))}
		</div>
	);
}

export function Coordinates(props: CoordinatesProps) {
	return (
		<Fragment>
			<RankCoordinates {...props} />
			<FileCoordinates {...props} />
		</Fragment>
	);
}
