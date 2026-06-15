export type VariantOption = {
	variant: Variant;
	seed?: number;
};

export type Variant =
	| "classic"
	| "chess960"
	| "crazyhouse"
	| "bughouse"
	| "kingofthehill"
	| "threecheck"
	| "antichess";
