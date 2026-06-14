import { createProvider } from "@/lib/create-provider";
import type { DataStore, BoardTheme } from "./type";
import { defaultTheme } from "./data";

export const [BoardProvider, useBoardData] = createProvider<DataStore>();
export const [BoardThemeProvider, useBoardTheme] =
	createProvider<BoardTheme>(defaultTheme);
