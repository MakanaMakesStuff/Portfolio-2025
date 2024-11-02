import style from "@/styles/components/Spinner.module.scss"
import { CSSProperties } from "react"

export default function Spinner({
	className,
	width = 72,
}: {
	className?: string
	width?: number
}) {
	return (
		<div
			className={`${className} ${style.spinner}`}
			style={
				{
					"--spinner-width": width,
				} as CSSProperties
			}
		>
			<div></div>
			<div></div>
		</div>
	)
}
