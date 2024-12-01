export default function Navigation({
	className = "",
	count = 0,
	step = 0,
	callback,
}: {
	className?: string
	count: number
	step: number
	callback: (step: number) => void
}) {
	return (
		<div className={className}>
			{Array.from({ length: count }).map((item, i) => {
				return (
					<button
						key={i}
						onClick={() => callback(i)}
						data-selected={step == i}
					/>
				)
			})}
		</div>
	)
}
