"use client"
import { ReactNode } from "react"
import style from "@/styles/components/Scroller.module.scss"

export default function Scroller({
	children,
	className = "",
	threshold = [0.15, 0.85],
}: {
	children: ReactNode
	className?: string
	threshold?: number[]
}) {
	return <div className={`${className} ${style.scroller}`}>{children}</div>
}
