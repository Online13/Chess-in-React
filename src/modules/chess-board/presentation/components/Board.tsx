import clsx from "clsx";
import {
	Fragment,
	memo,
	useCallback,
	useImperativeHandle,
	useMemo,
	type PropsWithChildren,
	type ReactNode,
	type Ref,
} from "react";
import { SquareView } from "./SquareView";
import { renderSelect } from "./render/renderSelect";
import { renderPiece } from "./render/renderPiece";
import { renderSquare } from "./render/renderSquare";
import type {
	PieceRender,
	SelectRender,
	BoardTheme,
	BoardHandler,
} from "../type";
import { case_type, metadata } from "../../domain/constants";
import type { PieceData, SquareSelectData } from "../../domain/value_objects";
import { ChessControl } from "./control/ChessControl";
import { getPosition } from "../../domain/services/position";
import { useBoardStore } from "../stores/board-store/hook";
import { BoardProvider } from "../stores/board-store/provider";
import { useSelectPiece } from "../hooks/useSelectPiece";
import { useSelectSquare } from "../hooks/useSelectSquare";

// ----------------------------------------------------------

const squares = Array.from({ length: 8 * 8 }, (_, i) => i);

export function Board({
	ref,
	children,
}: PropsWithChildren<{ ref: Ref<BoardHandler> }>) {
	const reset = useBoardStore((state) => state.reset);
	useImperativeHandle(
		ref,
		() => ({
			reset() {
				reset();
			},
		}),
		[reset],
	);

	return <div className="w-full h-full relative">{children}</div>;
}

Board.Provider = BoardProvider;

// -----------------------------------------------------------------

type SquareviewRender = (data: {
	theme: BoardTheme;
	black: boolean;
	x: number;
	y: number;
}) => ReactNode;

interface SquareListProps {
	render?: SquareviewRender;
}
function SquareList({ render }: SquareListProps) {
	return squares.map((i) => (
		<Board.Square key={i} position={i} render={render} />
	));
}

interface PieceListProps {
	render?: PieceRender;
}
function PieceList(props: PieceListProps) {
	const boardData = useBoardStore((state) => state.data);
	return boardData.map((piece) => (
		<Board.Piece key={piece.id} {...piece} render={props.render} />
	));
}
interface SelectListProps {
	render?: SelectRender;
}
function SelectList({ render }: SelectListProps) {
	const squareSelectData = useBoardStore((state) => state.squareSelectData);
	return squareSelectData.map((select) => (
		<Board.Select key={select.position} {...select} render={render} />
	));
}

Board.SquareList = SquareList;
Board.PieceList = PieceList;
Board.SelectList = SelectList;

// -----------------------------------------------------------------

interface SquareProps {
	position: number;
	render?: SquareviewRender;
}

Board.Square = memo(function Square({
	position,
	render = renderSquare,
}: SquareProps) {
	const theme = useBoardStore((state) => state.theme);
	const { x, y } = getPosition(position);
	const black = (x + y) % 2 !== 0;
	const Render = useMemo(
		() => render({ x, y, black, theme }),
		[x, y, black, theme, render],
	);
	return (
		<SquareView zIndex={10} position={position} metadata={metadata.SQUARE}>
			{Render}
		</SquareView>
	);
});

interface PieceProps extends PieceData {
	render?: PieceRender;
}

Board.Piece = memo(function Piece({
	render = renderPiece,
	...piece
}: PieceProps) {
	const selectPiece = useSelectPiece();
	const handleSelectPiece = useCallback(() => {
		selectPiece(piece);
	}, [selectPiece, piece]);
	const Render = useMemo(() => render(piece), [piece, render]);
	return (
		<SquareView
			zIndex={30}
			onClick={handleSelectPiece}
			position={piece.position}
			metadata={metadata.PIECE}
			className={clsx(["flex justify-center items-center text-4xl"])}
		>
			{Render}
		</SquareView>
	);
});

Board.Select = memo(function Select({
	type,
	position,
	render = renderSelect,
}: SquareSelectData & { render?: SelectRender }) {
	const selectSquare = useSelectSquare();
	const theme = useBoardStore((state) => state.theme);
	const handleSelectSquare = useCallback(() => {
		selectSquare(position);
	}, [selectSquare, position]);
	const Render = useMemo(
		() => render({ position, type, theme }),
		[position, type, theme, render],
	);
	return (
		<SquareView
			position={position}
			onClick={handleSelectSquare}
			metadata={metadata.SELECT}
			zIndex={type === case_type.THREAT ? 40 : 20}
		>
			{Render}
		</SquareView>
	);
});

// -----------------------------------------------------------------

Board.Control = ChessControl;

interface CoordinatesProps {
	inside?: boolean;
}

Board.RowCoordinates = function RowCoordinates({
	inside = false,
}: CoordinatesProps) {
	const theme = useBoardStore((state) => state.theme);
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
					{8 - i}
				</div>
			))}
		</div>
	);
};

Board.ColumnCoordinates = function ColumnCoordinates({
	inside = false,
}: CoordinatesProps) {
	const theme = useBoardStore((state) => state.theme);
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
					{String.fromCharCode(65 + i)}
				</div>
			))}
		</div>
	);
};

/**
 * Explanation: https://www.chess.com/article/view/chess-notation
 */
Board.RankCoordinates = Board.RowCoordinates;
Board.FileCoordinates = Board.ColumnCoordinates;

Board.Coordinates = function Coordinates(props: CoordinatesProps) {
	return (
		<Fragment>
			<Board.RowCoordinates {...props} />
			<Board.ColumnCoordinates {...props} />
		</Fragment>
	);
};
