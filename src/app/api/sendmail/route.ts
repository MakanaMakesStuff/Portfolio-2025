import nodemailer from "nodemailer"

export async function POST(req: Request) {
	const { subject, message } = await req.json()

	const email = process.env.EMAIL

	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: email,
				pass: process.env.EMAIL_PASSWORD,
			},
		})

		const mailOptions = {
			from: email,
			to: email,
			subject,
			text: message,
			html: `<p>${message}</p>`,
		}

		const info = await transporter.sendMail(mailOptions)
		console.log("Message sent:", info.messageId)

		return new Response(JSON.stringify({ status: "success", info }), {
			status: 200,
		})
	} catch (error) {
		console.error("Error sending email:", error)
		return new Response(JSON.stringify({ status: "error", error }), {
			status: 500,
		})
	}
}
