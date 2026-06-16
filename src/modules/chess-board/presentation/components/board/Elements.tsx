import { memo, useCallback, useMemo, type ReactNode } from "react";
import type { BoardTheme, PieceRender, SelectRender } from "../../type";
import { renderSquare } from "../render/renderSquare";
import { useBoardStore } from "../../stores/board-store/hook";
import { getPosition } from "@/modules/chess-board/domain/services/position";
import { SquareView } from "../SquareView";
import { case_type, metadata } from "@/modules/chess-board/domain/constants";
import type {
	PieceData,
	SquareSelectData,
} from "@/modules/chess-board/domain/value_objects";
import { renderPiece } from "../render/renderPiece";
import { useSelectPiece } from "../../hooks/useSelectPiece";
import { renderSelect } from "../render/renderSelect";
import { useSelectSquare } from "../../hooks/useSelectSquare";
import clsx from "clsx";
import { useSquareDraggable } from "../../hooks/useSquareDraggable";

type SquareviewRender = (data: {
	theme: BoardTheme;
	black: boolean;
	x: number;
	y: number;
}) => ReactNode;

interface SquareProps {
	position: number;
	render?: SquareviewRender;
}

export const BoardSquare = memo(function Square({
	position,
	render = renderSquare,
}: SquareProps) {
	const props = useSquareDraggable({
		id: `square-${position}`,
		draggable: false,
	});
	const theme = useBoardStore((state) => state.theme);
	const Render = useMemo(() => {
		const { x, y } = getPosition(position);
		const black = (x + y) % 2 !== 0;
		return render({ x, y, black, theme });
	}, [position, render, theme]);
	return (
		<SquareView
			{...props}
			zIndex={10}
			position={position}
			metadata={metadata.SQUARE}
		>
			{/* <span className="text-xl absolute top-0 left-0">{position}</span> */}
			{Render}
		</SquareView>
	);
});

interface PieceProps extends PieceData {
	render?: PieceRender;
}

export const BoardPiece = memo(function Piece({
	render = renderPiece,
	...piece
}: PieceProps) {
	const selectPiece = useSelectPiece();
	const props = useSquareDraggable({
		id: `piece-${piece.id}`,
		draggable: true,
	});
	const handleSelectPiece = useCallback(() => {
		selectPiece(piece);
	}, [selectPiece, piece]);
	const Render = useMemo(() => render(piece), [piece, render]);
	return (
		<SquareView
			{...props}
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

export const BoardSelect = memo(function Select({
	type,
	position,
	render = renderSelect,
}: SquareSelectData & { render?: SelectRender }) {
	const selectSquare = useSelectSquare();
	const props = useSquareDraggable({
		id: `select-${position}`,
		draggable: false,
	});
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
			{...props}
			position={position}
			onClick={handleSelectSquare}
			metadata={metadata.SELECT}
			zIndex={type === case_type.THREAT ? 40 : 20}
		>
			{Render}
		</SquareView>
	);
});
