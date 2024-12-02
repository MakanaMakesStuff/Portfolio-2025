"use client"
import Spinner from "@/components/Spinner"
import { FormEvent, useState } from "react"

export default function ContactForm({
	className = "",
	callback,
}: {
	className?: string
	callback?: () => void
}) {
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

			const response = await fetch("/api/sendmail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleForm} className={className}>
			{loading ? (
				<Spinner />
			) : (
				<>
					<input
						className="anonymous-pro"
						type="text"
						name="subject"
						placeholder="Subject"
						required
					/>

					<textarea
						name="message"
						placeholder="Please add your message here"
						className="anonymous-pro"
						minLength={20}
						required
					></textarea>

					<button className="anonymous-pro">Send</button>
				</>
			)}
		</form>
	)
}
