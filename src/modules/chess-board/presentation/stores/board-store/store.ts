import { createStore } from "zustand";
import {
	game_state,
	turn_state,
	variant,
	type GameState,
	type Turn,
	type Variant,
} from "../../../domain/constants";
import type {
	PieceData,
	SquareSelectData,
} from "../../../domain/value_objects";
import type { BoardTheme } from "../../type";
import { defaultTheme } from "../../data";
import type { VariantOption } from "@/modules/chess-board/domain/type";
import { getGameService } from "@/modules/chess-board/domain/services/game-service";

interface State {
	theme: BoardTheme;
	seed: number;
	variant: Variant;
	data: PieceData[];
	turn: Turn;
	enPassantTarget: number | null;
	gameState: GameState;
	selectedPiece: PieceData | null;
	squareSelectData: SquareSelectData[];
	onGameStateChange?: (gameState: GameState) => void;
}

interface Action {
	reset: () => void;
	// selectPiece: (piece: PieceData) => void;
	// selectSquare: (position: number) => void;
	setSelectedPiece: (piece: PieceData | null) => void;
	setSelectSquares: (position: SquareSelectData[]) => void;
	setData: (data: PieceData[]) => void;
	setGameState: (gameState: GameState) => void;
	setEnPassantTarget: (position: number | null) => void;
	nextTurn: () => void;
	getSelectPieceState: () => {
		piece: PieceData | null;
		turn: Turn;
		data: PieceData[];
		variant: Variant;
		enPassantTarget: number | null;
	};
	getSelectSquareState: () => {
		data: PieceData[];
		variant: Variant;
		selectedPiece: PieceData | null;
		enPassantTarget: number | null;
	};
}

export interface CreateBoardStoreArgs extends VariantOption {
	data?: PieceData[];
	theme?: BoardTheme;
	onGameStateChange?: (gameState: GameState) => void;
}

export interface BoardState extends State, Action {}

export type Store = ReturnType<typeof createBoardStore>;

export const createBoardStore = (args: CreateBoardStoreArgs) => {
	const defaultState: State = {
		seed: 0,
		data: [],
		selectedPiece: null,
		squareSelectData: [],
		enPassantTarget: null,
		turn: turn_state.WHITE,
		variant: variant.CLASSIC,
		theme: args.theme || defaultTheme,
		gameState: game_state.ONGOING,
		onGameStateChange: args.onGameStateChange,
	};

	if (!Array.isArray(args.data)) {
		const service = getGameService(args.variant);
		defaultState.data = service.createDefaultPiecePositions(args.seed);
	}

	return createStore<BoardState>((set, get) => ({
		...defaultState,
		reset: () => {
			set(defaultState);
		},
		nextTurn: () => {
			set((state) => ({ turn: (state.turn + 1) % 2 }));
		},
		setData: (data) => set({ data }),
		setGameState: (gameState) => set({ gameState }),
		setEnPassantTarget: (position) => set({ enPassantTarget: position }),
		setSelectSquares: (position) => set({ squareSelectData: position }),
		setSelectedPiece: (piece) => set({ selectedPiece: piece }),
		getSelectPieceState: () => {
			const state = get();
			return {
				piece: state.selectedPiece,
				turn: state.turn,
				data: state.data,
				variant: state.variant,
				enPassantTarget: state.enPassantTarget,
			};
		},
		getSelectSquareState: () => {
			const state = get();
			return {
				data: state.data,
				variant: state.variant,
				selectedPiece: state.selectedPiece,
				enPassantTarget: state.enPassantTarget,
			};
		},
	}));
};
