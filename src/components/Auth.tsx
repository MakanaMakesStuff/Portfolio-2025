"use client"
import { ReactNode, useEffect } from "react"
import { useAppContext } from "../utilities/context/App"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { actions } = useAppContext()

	const router = useRouter()

	useEffect(() => {
		if (
			!actions.data?.viewer &&
			actions.data?.generalSettings &&
			!actions.loading
		)
			router.replace("/account/login")
	}, [actions?.data?.viewer, actions.loading])

	return <>{children}</>
}
