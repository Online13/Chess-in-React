import { createContext, useContext, type PropsWithChildren } from "react";

export function createProvider<Store>() {
	const CustomContext = createContext<Store | null>(null);

	function Provider({
		state,
		children,
	}: PropsWithChildren<{ state: Store }>) {
		return (
			<CustomContext.Provider value={state}>
				{children}
			</CustomContext.Provider>
		);
	}

	function useStore() {
		const context = useContext(CustomContext);
		if (!context) {
			throw new Error("useStore must be used within a Provider");
		}
		return context;
	}

	return [Provider, useStore] as const;
}
