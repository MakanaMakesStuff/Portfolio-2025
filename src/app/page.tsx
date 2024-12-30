import ContactForm from "@/components/ContactForm"
import Header from "@/components/Header"
import Intersect from "@/components/Intersect"
import client from "@/utilities/Apollo"
import getTheme, { CustomThemeOptions } from "@/utilities/theme"
import { gql } from "@apollo/client"
import { Box, Stack, Typography } from "@mui/material"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Portfolio 2025",
}
export interface PageI {
	id: string
	content: string
	featuredImage: {
		node: {
			mediaItemUrl: string
		}
	}
	title: string
	slug: string
	children: {
		nodes: PageI[]
	}
}

export interface PostI {
	id: string
	content: string
	title: string
	slug: string
	featuredImage: {
		node: {
			mediaItemUrl: string
		}
	}
}

export default async function Home() {
	const { data, loading } = await client.query({
		query: PageQuery,
		fetchPolicy: "network-only",
	})

	const page: PageI = data?.page

	const children: PageI[] = page?.children.nodes ?? []

	const myInfo = children.find((p) => p.slug == "info")

	const myWork = children.find((p) => p.slug == "work")

	return (
		<Stack
			gap="2em"
			sx={{
				padding: "1.5em",
				figure: {
					overflow: "hidden",
					borderRadius: "3px",
				},
			}}
		>
			<>
				<Stack
					justifyContent="flex-start"
					alignItems="center"
					sx={{
						minHeight: "100vh",
						width: "100%",
					}}
				>
					<Intersect
						sx={{
							maxWidth: "1100px",
							margin: "auto",
						}}
						threshold={0}
					>
						<Box
							sx={{
								overflow: "hidden",
								color: "white",
							}}
							dangerouslySetInnerHTML={{ __html: myInfo?.content ?? "" }}
							id={myInfo?.slug}
						></Box>
					</Intersect>
				</Stack>

				<Intersect
					sx={{
						maxWidth: "1100px",
						margin: "auto",
					}}
					threshold={0.1}
				>
					<Stack
						justifyContent="flex-start"
						alignItems="center"
						gap="3em"
						sx={{
							minHeight: "100vh",
							width: "100%",
							color: "white",
						}}
						dangerouslySetInnerHTML={{ __html: myWork?.content ?? "" }}
						id={myWork?.slug}
					></Stack>
				</Intersect>

				<Stack
					sx={{
						maxWidth: "1100px",
						margin: "auto",
						minHeight: "100vh",
						width: "100%",
					}}
				>
					<Intersect
						threshold={0.3}
						m="auto"
						sx={{
							h2: {
								color: "white",
								textAlign: "center",
							},
						}}
					>
						<h2>Get in Touch</h2>

						<ContactForm id="contact" />
					</Intersect>
				</Stack>
			</>
		</Stack>
	)
}

const PageQuery = gql`
	query HomePage {
		viewer {
			firstName
			lastName
			email
		}
		posts(where: { categoryName: "project" }) {
			nodes {
				id
				title
				content
				featuredImage {
					node {
						mediaItemUrl
					}
				}
			}
		}
		page(id: "home", idType: URI) {
			id
			title
			content
			children {
				nodes {
					... on Page {
						id
						title
						content
						slug
						featuredImage {
							node {
								mediaItemUrl
							}
						}
					}
				}
			}
		}
	}
`
