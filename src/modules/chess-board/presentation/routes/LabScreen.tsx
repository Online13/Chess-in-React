import { useCallback, useRef, useState } from "react";
import {
	game_state,
	// piece_color,
	// piece_type,
	// position,
	variant,
	type GameState,
} from "../../domain/constants";
import { Board } from "../components/Board";
import { BoardGameStateDialog } from "@/components/ResultDialog";
import { chessComPresets } from "../presets/chess-com-presets";
import type { BoardHandler } from "../type";
// import type { PieceData } from "../../domain/value_objects";

export function LabScreen() {
	return (
		<div className="w-full h-full bg-[#252525] flex justify-center items-center">
			<CustomBoard />
		</div>
	);
}

const BoardControl = Board.Control;

// const data: PieceData[] = [
// 	{ type: piece_type.PAWN, position: position.F2, color: piece_color.BLACK },
// 	{ type: piece_type.KING, position: position.D8, color: piece_color.BLACK },
// 	// White pieces (bottom of board)
// 	{ type: piece_type.PAWN, position: position.G7, color: piece_color.WHITE },
// 	{ type: piece_type.KING, position: position.D1, color: piece_color.WHITE },
// ].map((piece, id) => ({
// 	...piece,
// 	id,
// }));

function CustomBoard() {
	const ref = useRef<BoardHandler>(null);
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [gameState, setGameState] = useState<GameState>(game_state.STALE);
	const handleReset = useCallback(() => {
		ref.current?.reset();
		dialogRef.current?.close();
	}, []);
	const handleGameStateChange = useCallback((state: GameState) => {
		setGameState(state);
		dialogRef.current?.showModal();
	}, []);

	return (
		<div className="">
			<div className="h-[70vh] aspect-square relative z-10">
				<Board.Provider
					// data={data}
					flipped
					variant={variant.CLASSIC}
					theme={chessComPresets.theme}
					onGameStateChange={handleGameStateChange}
				>
					<Board ref={ref}>
						<Board.PromotionForm />
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
