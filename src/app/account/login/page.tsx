"use client"

import { useAppContext } from "@/utilities/context/App"
import { ViewerFragment } from "@/utilities/fragments/viewer"
import { gql, useMutation } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function LoginPage() {
	const { actions } = useAppContext()
	const [login, { loading }] = useMutation(LoginMutation)

	const [displayStatus, setDisplayStatus] = useState<{
		status: number
		message: string
	}>()

	const router = useRouter()

	const params = useParams<{ redirect_uri: string }>()

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const variables: any = {}
		const formData = new FormData(e.currentTarget)

		for (const [key, value] of formData.entries()) {
			variables[key] = value
		}

		login({
			variables,
		}).then(({ data }) => {
			const { status, message, viewer } = data?.loginWithCookies ?? {}

			if (status == 200) {
				router.replace(params?.redirect_uri ?? "/")

				actions.updateDataCache({
					viewer,
				})
			}

			setDisplayStatus({
				status,
				message,
			})
		})
	}
	return (
		<div>
			<main>
				<form onSubmit={onSubmit}>
					<h2>Login Form</h2>

					{loading ? (
						<>...loading</>
					) : displayStatus ? (
						<>
							<h4
								dangerouslySetInnerHTML={{
									__html: displayStatus.message ?? "",
								}}
							></h4>

							<button type="button" onClick={() => setDisplayStatus(undefined)}>
								Retry
							</button>
						</>
					) : (
						<>
							<input type="text" name="username" />
							<input type="password" name="password" />

							<button type="submit">Log In</button>
							<a href="">forgot password</a>
						</>
					)}
				</form>
			</main>
		</div>
	)
}

const LoginMutation = gql`
	${ViewerFragment}
	mutation Login($username: String!, $password: String!) {
		loginWithCookies(input: { username: $username, password: $password }) {
			status
			message
			viewer {
				...ViewerFragment
			}
		}
	}
`
