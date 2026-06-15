
export function getPosition(position: number) {
	const x = position! % 8;
	const y = Math.floor(position! / 8);

	return { x, y };
};