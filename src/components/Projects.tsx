"use client"
import { useEffect, useState } from "react"
import style from "@/styles/components/Projects.module.scss"
import Image from "next/image"
import { PostI } from "@/app/page"
import Navigation from "@/components/Navigation"

export default function Projects({
	projects,
	delay = 10000,
}: {
	projects: PostI[]
	delay?: number
}) {
	let timer: any
	function Delay(callback: () => void, selected?: number) {
		if (timer) {
			clearInterval(timer)
		}

		if (selected) {
			setStep(selected)
		}

		timer = setInterval(() => callback(), delay)

		return {
			clearInterval: () => clearInterval(timer),
		}
	}

	const [step, setStep] = useState(0)

	useEffect(() => {
		if (projects.length <= 0) return

		const delay = Delay(() => {
			setStep((prev) => (prev < projects.length - 1 ? prev + 1 : 0))
		})

		return () => delay.clearInterval()
	}, [])

	return (
		<div className={`${style.slideshow} cap-width`}>
			<div
				className={style.info}
				dangerouslySetInnerHTML={{ __html: projects[step]?.content ?? "" }}
			></div>

			<div className={style.feed}>
				{projects.map((project, i) => {
					return (
						<div
							className={style.slide}
							key={i}
							data-selected={step == i}
							data-fadeout={i < step}
						>
							<Image
								src={project.featuredImage.node?.mediaItemUrl}
								width={800}
								height={300}
								alt="Slide image"
							/>
						</div>
					)
				})}
			</div>

			<Navigation
				className={style.navigation}
				count={projects.length}
				step={step}
				callback={(selected) => {
					if (timer) {
						clearInterval(timer)
					}
					setStep(selected)
				}}
			/>
		</div>
	)
}
