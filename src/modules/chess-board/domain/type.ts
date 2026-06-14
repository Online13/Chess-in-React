export type VariantOption =
	| { variant: "classic" }
	| { variant: "chess960"; seed: number }
	| { variant: "crazyhouse" }
	| { variant: "bughouse" }
	| { variant: "kingofthehill" }
	| { variant: "threecheck" }
	| { variant: "antichess" };

export type Variant = VariantOption["variant"];
