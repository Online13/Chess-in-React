export const piece_type = {
	PAWN: 0,
	ROOK: 1,
	KNIGHT: 2,
	BISHOP: 3,
	QUEEN: 4,
	KING: 5,
} as const;
export type PieceType = (typeof piece_type)[keyof typeof piece_type];
export const piece_color = {
	WHITE: 0,
	BLACK: 1,
} as const;

export type PieceColor = (typeof piece_color)[keyof typeof piece_color];

export const game_state = {
	WHITE_WIN: 0,
	BLACK_WIN: 1,
	STALE: 2,
	ONGOING: 3,
	CHECKMATE: 4,
	CHECK: 5,
} as const;
export type GameState = (typeof game_state)[keyof typeof game_state];

export const case_type = {
	PIECE: 0,
	SQUARE: 1,
	THREAT: 2,
} as const;
export type CaseType = (typeof case_type)[keyof typeof case_type];

export const turn_state = {
	WHITE: 0,
	BLACK: 1,
};
export type Turn = (typeof turn_state)[keyof typeof turn_state];

export const variant = {
	CLASSIC: 0,
	CHESS960: 1,
	CRAZYHOUSE: 2,
	BUGHOUSE: 3,
	KING_OF_THE_HILL: 4,
	THREE_CHECK: 5,
	ANTICHESS: 6,
} as const;

export const variant_name = {
	[variant.CLASSIC]: "Classic",
	[variant.CHESS960]: "Chess960",
	[variant.CRAZYHOUSE]: "Crazyhouse",
	[variant.BUGHOUSE]: "Bughouse",
	[variant.KING_OF_THE_HILL]: "King of the Hill",
	[variant.THREE_CHECK]: "Three Check",
	[variant.ANTICHESS]: "Antichess",
} as const;

export type Variant = (typeof variant)[keyof typeof variant];
