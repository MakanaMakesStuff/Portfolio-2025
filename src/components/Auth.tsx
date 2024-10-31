"use client"

import { ReactNode, useEffect } from "react"
import { useAppContext } from "../utilities/context/App"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { state, actions } = useAppContext()

  const router = useRouter()

  useEffect(() => {
    if (!state.viewer && !actions.loading) router.replace("/account/login")
  }, [state.viewer, actions.loading])

  return <>{children}</>
}
