import { useImperativeHandle, type PropsWithChildren, type Ref } from "react";
import type { BoardHandler } from "../type";
import { ChessControl } from "./control/ChessControl";
import { useBoardStore } from "../stores/board-store/hook";
import { BoardProvider } from "../stores/board-store/provider";
import {
	Coordinates,
	FileCoordinates,
	RankCoordinates,
} from "./board/Coordinates";
import { BoardPiece, BoardSelect, BoardSquare } from "./board/Elements";
import { PieceList, SelectList, SquareList } from "./board/Lists";
import { DndProvider } from "./board/Dnd";
import { PromotionForm } from "./board/Promotion";
// import { BoardDebug } from "./board/Debug";

// ----------------------------------------------------------

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

	return (
		<DndProvider>
			{/* <BoardDebug /> */}
			<div className="w-full h-full relative">{children}</div>
		</DndProvider>
	);
}

Board.Provider = BoardProvider;

Board.SquareList = SquareList;
Board.PieceList = PieceList;
Board.SelectList = SelectList;

Board.Square = BoardSquare;
Board.Piece = BoardPiece;
Board.Select = BoardSelect;

Board.RowCoordinates = RankCoordinates;
Board.ColumnCoordinates = FileCoordinates;
Board.Coordinates = Coordinates;

Board.Control = ChessControl;

Board.PromotionForm = PromotionForm;
