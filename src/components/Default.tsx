"use client"
import Header from "@/components/Header"
import { Stack } from "@mui/material"
import { ReactNode } from "react"

export default function DefaultLayout({ children }: { children: ReactNode }) {
	return (
		<Stack
			className="bg-black"
			sx={{
				height: "100vh",
				overflowY: "auto",
			}}
		>
			<Header id="main-menu" />
			{children}
		</Stack>
	)
}
