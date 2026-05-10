import { getStatusMessage, type GameState } from "@/modules/chess-board";
import { useCallback } from "react";

export function BoardGameStateDialog({
	ref,
	gameState,
	onReset,
}: {
	onReset: () => void;
	gameState: GameState;
	ref: React.RefObject<HTMLDialogElement | null>;
}) {
	const handleClose = useCallback(() => {
		ref.current?.close();
	}, [ref]);

	return (
		<dialog
			ref={ref}
			onClose={handleClose}
			className="fixed inset-0 m-auto rounded-2xl p-0 shadow-2xl backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm overflow-hidden border-none"
		>
			<div className="flex flex-col min-w-[320px] max-w-sm">
				{/* Header avec couleur selon l'issue (optionnel) */}
				<div className="bg-indigo-600 p-4 text-white text-center">
					<h2 className="text-xl font-bold uppercase tracking-wider">
						Résultat
					</h2>
				</div>

				{/* Corps du message */}
				<div className="p-8 flex flex-col items-center gap-4 text-center">
					<p className="text-3xl font-extrabold text-gray-800">
						{getStatusMessage(gameState)}
					</p>
					<p className="text-gray-500 text-sm">
						La partie est terminée. Merci d'avoir joué !
					</p>

					{/* Bouton d'action principal */}
					<button
						onClick={onReset}
						className="mt-2 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-indigo-200"
					>
						Nouvelle Partie
					</button>
				</div>
			</div>
		</dialog>
	);
}
