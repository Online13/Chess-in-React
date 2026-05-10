import clsx from "clsx";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
	position: number;
	zIndex?: number;
	metadata?: { type: string };
}

export function SquareView({ position, zIndex, metadata, ...props }: Props) {
	const { x, y } = SquareView.getPosition(position);
	return (
		<div
			{...props}
			data-x={x}
			data-y={y}
			data-type={metadata?.type}
			style={{
				transform: `translate(${x * 100}%, ${y * 100}%)`,
				zIndex,
				...(props?.style || {}),
			}}
			className={clsx([
				"size-[12.5%]",
				"cursor-pointer",
				"absolute top-0 left-0 transition-transform duration-300",
				props.className,
			])}
		/>
	);
}

SquareView.getPosition = function (position: number) {
	const x = position! % 8;
	const y = Math.floor(position! / 8);

	return { x, y };
};
