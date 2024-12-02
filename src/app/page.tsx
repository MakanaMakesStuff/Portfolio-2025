import ContactForm from "@/components/ContactForm"
import Header from "@/components/Header"
import OnScroll from "@/components/OnScroll"
import Projects from "@/components/Projects"
import Scroller from "@/components/Scroller"
import style from "@/styles/pages/home.module.scss"
import client from "@/utilities/Apollo"
import { gql } from "@apollo/client"
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

	const contact = children.find((p) => p.slug == "contact")

	const projects: PostI[] = data?.posts?.nodes ?? []

	return (
		<Scroller className={style.page}>
			<>
				<Header id="main-menu" className={style.header} />

				<OnScroll id={myInfo?.slug!} animation="fadeIn" persist={false}>
					<section className={`${style.myInfo} cap-width`} id={myInfo?.slug}>
						<h1
							dangerouslySetInnerHTML={{ __html: myInfo?.title ?? "" }}
							className={style.title}
						></h1>

						<div
							dangerouslySetInnerHTML={{ __html: myInfo?.content ?? "" }}
							className={style.content}
						></div>
					</section>
				</OnScroll>

				<OnScroll id={myWork?.slug!} animation="fadeIn" persist={false}>
					<section className={style.myWork} id={myWork?.slug}>
						<div className={style.info}>
							<h1
								dangerouslySetInnerHTML={{ __html: myWork?.title ?? "" }}
								className={style.title}
							></h1>

							<span
								dangerouslySetInnerHTML={{ __html: myWork?.content ?? "" }}
							></span>
						</div>

						<Projects projects={projects} />
					</section>
				</OnScroll>

				<OnScroll id={contact?.slug!} animation="fadeIn" persist={false}>
					<section className={style.contact} id={contact?.slug}>
						<div className={style.info}>
							<h1
								dangerouslySetInnerHTML={{ __html: contact?.title ?? "" }}
								className={style.title}
							></h1>

							<span
								dangerouslySetInnerHTML={{ __html: contact?.content ?? "" }}
							></span>
						</div>

						<ContactForm className={style.form} />
					</section>
				</OnScroll>
			</>
		</Scroller>
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
