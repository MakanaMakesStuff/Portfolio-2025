"use client"
import Spinner from "@/components/Spinner"
import { Box, StackProps, Stack, Button, Input } from "@mui/material"
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
			className="bg-white"
			sx={{
				borderRadius: "3px",
				padding: "1em",
				gap: "0.5em",
				width: "300px",
				maxWidth: "100%",
				fontSize: "1em",
			}}
			{...props}
		>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Input
						className="bg-white shadow-lg py-1 px-2 rounded-sm"
						type="text"
						name="subject"
						placeholder="Subject"
						required
					/>

					<Box
						component="textarea"
						className="shadow-lg rounded-sm resize-y min-h-32"
						padding="0.5em !important"
						name="message"
						placeholder="Please add your message here"
						minLength={20}
						required
					></Box>

					<Button className="bg-primary text-white rounded-sm py-1 w-max self-end transition-all cursor-pointer hover:opacity-90 active:scale-90 active:bg-gray-400">
						Send
					</Button>
				</>
			)}
		</Stack>
	)
}
