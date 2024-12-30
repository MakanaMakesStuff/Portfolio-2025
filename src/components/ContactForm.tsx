"use client"
import Spinner from "@/components/Spinner"
import { CustomThemeOptions } from "@/utilities/theme"
import { Box, StackProps, Stack } from "@mui/material"
import { FormEvent, useState } from "react"

export default function ContactForm({
	callback,
	...props
}: { callback?: () => void } & StackProps) {
	const [loading, setLoading] = useState(false)

	async function handleForm(e: FormEvent<HTMLFormElement>) {
		try {
			setLoading(true)

			e.preventDefault()

			const data: any = {}
			const formData = new FormData(e.currentTarget)
			for (const [key, value] of formData.entries()) {
				data[key] = value
			}

			await fetch("/api/sendmail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})

			if (callback) callback()
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Stack
			flexDirection="column"
			component="form"
			onSubmit={handleForm}
			sx={(theme: CustomThemeOptions) => ({
				backgroundColor: "white",
				borderRadius: "3px",
				padding: "1em",
				gap: "0.5em",
				width: "300px",
				maxWidth: "100%",
				color: theme.brand?.primary,

				textarea: {
					minHeight: "150px",
					resize: "none",
				},
				button: {
					backgroundColor: theme.brand?.primary,
					color: "white",
					border: "none",
					borderRadius: "3px",
					padding: "0.5em 1.5em",
					width: "max-content",
					alignSelf: "flex-end",
					cursor: "pointer",
					transition: "all 0.2s ease",
					"&:hover": {
						opacity: 0.9,
					},
					"&:active": {
						transform: "scale(0.9)",
						backgroundColor: "gray",
					},
				},
			})}
			{...props}
		>
			{loading ? (
				<Spinner />
			) : (
				<>
					<input type="text" name="subject" placeholder="Subject" required />

					<textarea
						name="message"
						placeholder="Please add your message here"
						minLength={20}
						required
					></textarea>

					<button>Send</button>
				</>
			)}
		</Stack>
	)
}
