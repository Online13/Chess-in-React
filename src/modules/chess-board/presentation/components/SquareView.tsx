import clsx from "clsx";
import { memo, type ComponentProps } from "react";
import { getPosition } from "../../domain/services/position";

interface Props extends ComponentProps<"div"> {
	position: number;
	zIndex?: number;
	metadata?: { type: string };
}

export const SquareView = memo(function SquareViewBase({
	position,
	zIndex,
	metadata,
	...props
}: Props) {
	const { x, y } = getPosition(position);
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
});
