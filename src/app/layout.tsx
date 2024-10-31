"use client"
import localFont from "next/font/local"
import "./globals.css"
import AppProvider from "../utilities/context/App"
import { ApolloProvider } from "@apollo/client"
import client from "@/utilities/Apollo"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ApolloProvider>
  )
}
