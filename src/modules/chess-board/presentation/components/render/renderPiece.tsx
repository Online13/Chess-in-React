import { piece_color, piece_type } from "@/modules/chess-board/domain/constants";
import { Piece } from "../pieces";
import type { PieceData } from "@/modules/chess-board/domain/value_objects";

export function renderPiece({
	color,
	type,
}: Pick<PieceData, "color" | "type">) {
	const className = "w-full h-full";
	if (color === piece_color.BLACK) {
		switch (type) {
			case piece_type.PAWN:
				return (
					<Piece.BlackPawn className={className} title="Black pawn" />
				);
			case piece_type.ROOK:
				return (
					<Piece.BlackRook className={className} title="Black rook" />
				);
			case piece_type.KNIGHT:
				return (
					<Piece.BlackKnight
						className={className}
						title="Black knight"
					/>
				);
			case piece_type.BISHOP:
				return (
					<Piece.BlackBishop
						className={className}
						title="Black bishop"
					/>
				);
			case piece_type.QUEEN:
				return (
					<Piece.BlackQueen
						className={className}
						title="Black queen"
					/>
				);
			case piece_type.KING:
				return (
					<Piece.BlackKing className={className} title="Black king" />
				);
			default:
				throw new Error(`Unknown piece type: ${type}`);
		}
	}

	switch (type) {
		case piece_type.PAWN:
			return <Piece.WhitePawn className={className} title="White pawn" />;
		case piece_type.ROOK:
			return <Piece.WhiteRook className={className} title="White rook" />;
		case piece_type.KNIGHT:
			return (
				<Piece.WhiteKnight className={className} title="White knight" />
			);
		case piece_type.BISHOP:
			return (
				<Piece.WhiteBishop className={className} title="White bishop" />
			);
		case piece_type.QUEEN:
			return (
				<Piece.WhiteQueen className={className} title="White queen" />
			);
		case piece_type.KING:
			return <Piece.WhiteKing className={className} title="White king" />;
		default:
			throw new Error(`Unknown piece type: ${type}`);
	}
}
