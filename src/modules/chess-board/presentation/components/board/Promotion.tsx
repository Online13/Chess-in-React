import { useBoardStore } from "../../stores/board-store/hook";
import clsx from "clsx";
import { renderPiece } from "../render/renderPiece";
import { piece_type } from "@/modules/chess-board/domain/constants";
import { useSelectSquare } from "../../hooks/useSelectSquare";
import { useDisplayPosition } from "../../hooks/useDisplayPosition";

export function PromotionForm() {
	const selectSquare = useSelectSquare();
	const setPromotionPiece = useBoardStore((state) => state.setPromotionPiece);
	const getPieceById = useBoardStore((state) => state.getPieceById);
	const promotePawn = useBoardStore((state) => state.promotePawn);
	const promotionPiece = useBoardStore((state) => state.promotionPiece);
	const { x, y } = useDisplayPosition(promotionPiece?.position || 0);

	if (promotionPiece === null) {
		return null;
	}

	return (
		<div
			data-x={x}
			data-y={y}
			style={{
				zIndex: 100,
				transform:
					y > 3
						? `translate(${x * 100}%, 100%)`
						: `translate(${x * 100}%, 0%)`,
			}}
			className={clsx([
				"w-[12.5%] h-[50%] bg-white",
				"absolute top-0 left-0",
			])}
		>
			{[
				piece_type.QUEEN,
				piece_type.ROOK,
				piece_type.BISHOP,
				piece_type.KNIGHT,
			].map((type) => (
				<div
					key={type}
					onClick={() => {
						const result = selectSquare(promotionPiece.position);
						console.log(result);
						if (result.isFailure()) return;
						const piece = getPieceById(
							promotionPiece.id.toString(),
						);
						if (!piece) return;
						promotePawn(piece.position, type, piece.position);
						setPromotionPiece(null);
					}}
					className="w-full aspect-square p-2 cursor-pointer hover:bg-gray-100"
				>
					{renderPiece({ color: promotionPiece.color, type })}
				</div>
			))}
		</div>
	);
}
