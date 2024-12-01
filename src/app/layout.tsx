"use client"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "../styles/global.scss"
import AppProvider from "../utilities/context/App"
import { ApolloProvider } from "@apollo/client"
import client from "@/utilities/Apollo"
import AuthLayout from "@/components/Auth"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ApolloProvider client={client}>
			<html lang="en">
				<body>
					<AppProvider>
						<AuthLayout>
							<>{children}</>
						</AuthLayout>
					</AppProvider>
				</body>
			</html>
		</ApolloProvider>
	)
}
