import { useCallback, useRef, useState } from "react";
import { useBoard } from "../hooks/useBoard";
import {
	game_state,
	variant,
	type GameState,
	type Variant,
} from "../../domain/constants";
import type { PieceData } from "../../domain/value_objects";
import { Board } from "../components/Board";
import { BoardGameStateDialog } from "@/components/ResultDialog";

export function LabScreen() {
	return (
		<div className="w-full h-full bg-[#252525] flex justify-center items-center">
			<CustomBoard />
		</div>
	);
}

function CustomBoard() {
	const board = useBoard({ variant: "classic" });
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [gameState, setGameState] = useState<GameState>(game_state.STALE);
	const [data, setData] = useState<PieceData[]>(board.defaultData);
	const handleReset = useCallback(() => {
		board.reset();
		setData(board.defaultData);
		dialogRef.current?.close();
	}, [board]);

	return (
		<div className="">
			<div className="h-[70vh] aspect-square relative z-10">
				<Board
					data={data}
					board={board}
					setData={setData}
					onShowModal={(state) => {
						setGameState(state);
						dialogRef.current?.showModal();
					}}
				>
					<Board.PieceList />
					<Board.SelectList />
					<Board.SquareList />
					<Board.Coordinates />
					<Board.Control
						onApply={() => {
							handleReset();
						}}
					>
						<Board.Control.VariantForm />
						<Board.Control.SeedForm />
					</Board.Control>
				</Board>
			</div>
			<BoardGameStateDialog
				ref={dialogRef}
				gameState={gameState}
				onReset={handleReset}
			/>
		</div>
	);
}
