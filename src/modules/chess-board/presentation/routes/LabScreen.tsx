import { useCallback, useRef, useState } from "react";
import { game_state, variant, type GameState } from "../../domain/constants";
import { Board } from "../components/Board";
import { BoardGameStateDialog } from "@/components/ResultDialog";
import { chessComPresets } from "../presets/chess-com-presets";
import type { BoardHandler } from "../type";

export function LabScreen() {
	return (
		<div className="w-full h-full bg-[#252525] flex justify-center items-center">
			<CustomBoard />
		</div>
	);
}

const BoardControl = Board.Control;

function CustomBoard() {
	const ref = useRef<BoardHandler>(null);
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [gameState, setGameState] = useState<GameState>(game_state.STALE);
	const handleReset = useCallback(() => {
		ref.current?.reset();
		dialogRef.current?.close();
	}, []);
	const handleShowModal = useCallback((state: GameState) => {
		setGameState(state);
		dialogRef.current?.showModal();
	}, []);

	return (
		<div className="">
			<div className="h-[70vh] aspect-square relative z-10">
				<Board.Provider
					variant={variant.CLASSIC}
					theme={chessComPresets.theme}
					onGameStateChange={handleShowModal}
				>
					<Board ref={ref}>
						<Board.PieceList />
						<Board.SelectList
							render={chessComPresets.renderSelect}
						/>
						<Board.SquareList />
						<Board.Coordinates />
						<Board.Control onApply={handleReset}>
							<BoardControl.VariantForm />
							<BoardControl.SeedForm />
						</Board.Control>
					</Board>
				</Board.Provider>
			</div>
			<BoardGameStateDialog
				ref={dialogRef}
				gameState={gameState}
				onReset={handleReset}
			/>
		</div>
	);
}
