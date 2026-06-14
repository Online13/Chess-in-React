import clsx from "clsx";
import {
	Children,
	Fragment,
	isValidElement,
	useImperativeHandle,
	useMemo,
	type PropsWithChildren,
	type ReactNode,
} from "react";
import { SquareView } from "./SquareView";
import { useChessEngine } from "../hooks/useChessEngine";
import { renderSelect } from "./render/renderSelect";
import { renderPiece } from "./render/renderPiece";
import { renderSquare } from "./render/renderSquare";
import type {
	BoardInstance,
	PieceRender,
	SelectRender,
	DataStore,
	BoardTheme,
} from "../type";
import { case_type, type GameState } from "../../domain/constants";
import {
	BoardProvider,
	BoardThemeProvider,
	useBoardData,
	useBoardTheme,
} from "../provider";
import type { PieceData, SquareSelectData } from "../../domain/value_objects";
import { ChessControl } from "./control/ChessControl";

// ----------------------------------------------------------

const squares = Array.from({ length: 8 * 8 }, (_, i) => i);

interface BoardProps
	extends PropsWithChildren, Pick<DataStore, "data" | "setData"> {
	onShowModal?: (gameState: GameState) => void;
	board: BoardInstance;
	theme?: BoardTheme;
}

export function Board({ children, board, theme, ...props }: BoardProps) {
	const chessEngine = useChessEngine({
		data: props.data,
		setData: props.setData,
		showModal: props.onShowModal,
	});
	const state = useMemo((): DataStore => {
		return {
			...props,
			...board,
			...chessEngine,
		};
	}, [props, chessEngine, board]);

	useImperativeHandle(
		board.ref,
		() => ({
			reset() {
				chessEngine.reset();
			},
		}),
		[chessEngine],
	);

	return (
		<BoardProvider state={state}>
			<BoardThemeProvider state={theme}>
				<div className="w-full h-full relative">
					<BoardContent>{children}</BoardContent>
				</div>
			</BoardThemeProvider>
		</BoardProvider>
	);
}

/**
 * Handle missing children
 *
 */
function BoardContent({ children }: PropsWithChildren) {
	const has = useMemo(() => {
		const childrenArray = Children.toArray(children);
		let hasSelectList = false,
			hasPieceList = false,
			hasPieceSquareList = false;
		for (const child of childrenArray) {
			if (!isValidElement(child)) continue;
			switch (child.type) {
				case SelectList:
					hasSelectList = true;
					break;
				case PieceList:
					hasPieceList = true;
					break;
				case SquareList:
					hasPieceSquareList = true;
					break;
			}
		}

		return {
			pieceList: hasPieceList,
			selectList: hasSelectList,
			pieceSquareList: hasPieceSquareList,
		};
	}, [children]);

	return (
		<Fragment>
			{children}
			{!has.pieceList && <Board.PieceList />}
			{!has.selectList && <Board.SelectList />}
			{!has.pieceSquareList && <Board.SquareList />}
		</Fragment>
	);
}

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
	const board = useBoardData();
	return board.data.map((piece) => (
		<Board.Piece key={piece.id} {...piece} render={props.render} />
	));
}
interface SelectListProps {
	render?: SelectRender;
}
function SelectList({ render }: SelectListProps) {
	const board = useBoardData();
	return board.squareSelectData.map((select) => (
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

Board.Square = function Square({
	position,
	render = renderSquare,
}: SquareProps) {
	const theme = useBoardTheme();
	const { x, y } = SquareView.getPosition(position);
	const black = (x + y) % 2 !== 0;
	return (
		<SquareView
			zIndex={10}
			position={position}
			metadata={{ type: "square" }}
		>
			{render({ x, y, black, theme })}
		</SquareView>
	);
};

interface PieceProps extends PieceData {
	render?: PieceRender;
}

Board.Piece = function Piece({ render = renderPiece, ...piece }: PieceProps) {
	const board = useBoardData();
	return (
		<SquareView
			zIndex={30}
			position={piece.position}
			metadata={{ type: "piece" }}
			className={clsx(["flex justify-center items-center text-4xl"])}
			onClick={() => board.selectPiece(piece)}
		>
			{render(piece)}
		</SquareView>
	);
};

Board.Select = function Select({
	type,
	position,
	render = renderSelect,
}: SquareSelectData & { render?: SelectRender }) {
	const board = useBoardData();
	const theme = useBoardTheme();
	return (
		<SquareView
			zIndex={type === case_type.THREAT ? 40 : 20}
			position={position}
			metadata={{ type: "select" }}
			onClick={() => board.selectSquare(position)}
		>
			{render({ position, type, theme })}
		</SquareView>
	);
};

// -----------------------------------------------------------------

Board.Control = ChessControl;

interface CoordinatesProps {
	inside?: boolean;
}

Board.RowCoordinates = function RowCoordinates({
	inside = false,
}: CoordinatesProps) {
	const theme = useBoardTheme();
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
	const theme = useBoardTheme();
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
