"use client"
import AuthLayout from "../components/Auth"
import styles from "./page.module.css"
import { useAppContext } from "../utilities/context/App"

export default function Home() {
  const { actions } = useAppContext()

  return (
    <AuthLayout>
      <div className={styles.page}>
        <main className={styles.main}>
          <h2
            dangerouslySetInnerHTML={{
              __html: actions?.data?.generalSettings?.title ?? "",
            }}
          ></h2>
        </main>
      </div>
    </AuthLayout>
  )
}
