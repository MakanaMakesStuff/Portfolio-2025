import style from "@/styles/components/Border.module.scss"

export default function Border({
	variant = "black",
}: {
	variant?: "black" | "white" | "purple"
}) {
	return (
		<div className={style.border} data-variant={variant}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
