import { createProvider } from "@/lib/create-provider";
import type { DataStore, BoardTheme } from "./type";

export const [BoardProvider, useBoardData] = createProvider<DataStore>();
export const [BoardThemeProvider, useBoardTheme] = createProvider<BoardTheme>();
