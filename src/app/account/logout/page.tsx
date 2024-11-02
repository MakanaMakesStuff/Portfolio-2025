"use client"

import { gql, useMutation, useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Logout() {
	const [logout, { loading, error }] = useMutation(LogoutMutation)

	const router = useRouter()

	const params = useParams<{ redirect_uri: string }>()

	useEffect(() => {
		if (loading || error) return

		logout().then(({ data }) => {
			if (data?.logout?.status == 200) {
				router.replace("/account/login")
			} else {
				router.replace(params?.redirect_uri ?? "/")
			}
		})
	}, [])
}

const LogoutMutation = gql`
	mutation Logout {
		logout(input: {}) {
			status
			message
		}
	}
`
