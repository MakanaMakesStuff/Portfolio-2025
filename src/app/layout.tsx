"use client"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "../styles/global.scss"
import AppProvider from "../utilities/context/App"
import { ApolloProvider } from "@apollo/client"
import client from "@/utilities/Apollo"
import DefaultLayout from "@/components/Default"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material"
import getTheme from "@/utilities/theme"
import Header from "@/components/Header"

const theme = getTheme()

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ThemeProvider theme={theme}>
				<ApolloProvider client={client}>
					<html lang="en">
						<body>
							<AppProvider>
								<DefaultLayout>{children}</DefaultLayout>
							</AppProvider>
						</body>
					</html>
				</ApolloProvider>
			</ThemeProvider>
		</AppRouterCacheProvider>
	)
}
