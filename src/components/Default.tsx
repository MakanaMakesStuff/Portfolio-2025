"use client"
import Header from "@/components/Header"
import { CustomThemeOptions } from "@/utilities/theme"
import { Stack } from "@mui/material"
import { ReactNode } from "react"

export default function DefaultLayout({ children }: { children: ReactNode }) {
	return (
		<Stack
			sx={(theme: CustomThemeOptions) => ({
				height: "100%",
				overflowY: "auto",
				background: theme.brand?.primaryGradient,
			})}
		>
			<Header id="main-menu" />
			{children}
		</Stack>
	)
}
