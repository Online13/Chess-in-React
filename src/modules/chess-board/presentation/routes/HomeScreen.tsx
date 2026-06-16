import { ScrollArea } from "@base-ui/react";
import { useCallback, useRef, useState } from "react";
import {
	game_state,
	variant,
	type GameState,
	type Variant,
} from "../../domain/constants";
import type { BoardHandler, Presets } from "../type";
import { chessComPresets } from "../presets/chess-com-presets";
import { lichessPresets } from "../presets/lichess-presets";
import { Board } from "../components/Board";
import { BoardGameStateDialog } from "@/components/ResultDialog";

export function HomeScreen() {
	return (
		<div className="w-full h-full bg-[#252525] pb-60">
			<div className="w-full px-40 pt-34 pb-12">
				<h2 className="text-white scroll-m-20 pb-2 text-5xl font-semibold tracking-tight first:mt-0">
					React-chesskit
				</h2>
			</div>
			<ScrollArea.Root>
				<ScrollArea.Viewport className="w-full h-[68vh] pl-30">
					<div className="flex items-center flex-nowrap">
						<CustomBoard
							title="Chess.com board preset"
							game={variant.CLASSIC}
							preset={chessComPresets}
						/>
						<CustomBoard
							title="Lichess board preset"
							game={variant.CHESS960}
							preset={lichessPresets}
						/>
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					className="relative w-full flex rounded-sm bg-gray-200 opacity-0 transition-opacity pointer-events-none before:absolute before:content-[''] data-[orientation=vertical]:m-2 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-5 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:-translate-x-1/2 data-[orientation=horizontal]:m-2 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:before:h-5 data-[orientation=horizontal]:before:w-full data-[orientation=horizontal]:before:left-0 data-[orientation=horizontal]:before:right-0 data-[orientation=horizontal]:before:-bottom-2 data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0"
					orientation="horizontal"
				>
					<ScrollArea.Thumb className="w-full rounded-sm bg-gray-500" />
				</ScrollArea.Scrollbar>
				<ScrollArea.Corner />
			</ScrollArea.Root>
		</div>
	);
}

function CustomBoard({
	title,
	game,
	preset,
}: {
	title: string;
	game: Variant;
	preset: Presets;
}) {
	const ref = useRef<BoardHandler>(null);
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [gameState, setGameState] = useState<GameState>(game_state.STALE);
	const handleReset = useCallback(() => {
		ref.current?.reset();
		dialogRef.current?.close();
	}, []);

	return (
		<div className="w-[40vw] shrink-0 h-full flex flex-col gap-4 justify-center items-center relative">
			<div className="w-[80%]">
				<h3 className="scroll-m-20 text-white text-2xl font-semibold tracking-tight">
					{title}
				</h3>
			</div>
			<div className="w-[80%] aspect-square relative z-10">
				<Board.Provider
					theme={preset.theme}
					variant={game}
					onGameStateChange={(state) => {
						setGameState(state);
						dialogRef.current?.showModal();
					}}
				>
					<Board ref={ref}>
						<Board.PieceList />
						<Board.SelectList render={preset?.renderSelect} />
						<Board.SquareList />
						<Board.Coordinates />
						<Board.Control>
							<Board.Control.VariantForm />
							<Board.Control.SeedForm />
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
