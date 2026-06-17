import {
	game_state,
	getStatusMessage,
	type GameState,
} from "@/modules/chess-board";
import { Dialog } from "@base-ui/react";

export function BoardGameStateDialog({
	gameState,
	onOpenChange,
	onReset,
}: {
	onReset: () => void;
	gameState: GameState;
	onOpenChange: (value: boolean) => void;
}) {
	console.log("gameState", gameState);

	return (
		<Dialog.Root
			open={gameState !== game_state.ONGOING}
			onOpenChange={onOpenChange}
		>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 z-50 bg-black/30" />
				<Dialog.Popup className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<Dialog.Title className="text-base font-semibold text-gray-900">
							Résultat
						</Dialog.Title>
						<Dialog.Description className="text-sm text-gray-500">
							{getStatusMessage(gameState)}
						</Dialog.Description>
					</div>
					<div className="flex justify-end">
						<Dialog.Close
							onClick={onReset}
							className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-700 transition-colors"
						>
							Nouvelle Partie
						</Dialog.Close>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
