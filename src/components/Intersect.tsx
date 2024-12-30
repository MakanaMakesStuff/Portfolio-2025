"use client"
import { Box, BoxProps, Grow } from "@mui/material"
import { useEffect, useRef, FC, ReactNode, useState } from "react"

const Intersect: FC<
	{
		persist?: boolean
		threshold?: number
		children: ReactNode | ReactNode[]
	} & BoxProps
> = ({ persist = false, threshold = 1, children, ...props }) => {
	const ref = useRef<HTMLDivElement>(null)

	const [visible, setVisible] = useState<boolean>()

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) =>
				setVisible((prev) =>
					persist ? prev || entry.isIntersecting : entry.isIntersecting
				),
			{ threshold }
		)

		if (ref.current) observer.observe(ref.current)

		return () => observer.disconnect()
	}, [threshold])

	return (
		<Box {...props} ref={ref}>
			<Grow in={visible}>
				<Box>{children}</Box>
			</Grow>
		</Box>
	)
}

export default Intersect
