import OnScroll from "@/components/OnScroll"
import style from "@/styles/pages/home.module.scss"
import client from "@/utilities/Apollo"
import { gql } from "@apollo/client"
import Spinner from "@/components/Spinner"
import Border from "@/components/Border"
import Splash from "@/components/Splash"

export interface PageI {
	id: string
	content: string
	featuredImage: {
		node: {
			mediaItemUrl: string
		}
	}
	title: string
	children: {
		nodes: PageI[]
	}
}

export default async function Home() {
	const { data, loading } = await client.query({
		query: PageQuery,
		fetchPolicy: "network-only",
	})

	const page: PageI = data?.page

	return (
		<div className={style.page}>
			<main className={style.main}>
				{loading ? (
					<Spinner className={style.loader} />
				) : (
					<OnScroll animation="fadeInBottom" id="hero" threshold={0}>
						<div id="hero" className={style.content}>
							<div
								dangerouslySetInnerHTML={{ __html: page?.content }}
								className={style.text}
							/>
						</div>
					</OnScroll>
				)}
			</main>

			{page?.children?.nodes?.map((item, i) => {
				const splash = i % 2 == 0

				return splash ? (
					<Splash key={item.id}>
						<section
							className={style.light}
							dangerouslySetInnerHTML={{ __html: item.content }}
							key={item.id}
						/>
					</Splash>
				) : (
					<section
						className={style.light}
						dangerouslySetInnerHTML={{ __html: item.content }}
						key={item.id}
					/>
				)
			})}
		</div>
	)
}

const PageQuery = gql`
	query HomePage {
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
					}
				}
			}
		}
	}
`
