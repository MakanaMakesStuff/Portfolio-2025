import OnScroll from "@/components/OnScroll"
import style from "@/styles/pages/home.module.scss"
import client from "@/utilities/Apollo"
import { gql } from "@apollo/client"
import Spinner from "@/components/Spinner"
import Border from "@/components/Border"

export interface PageI {
	id: string
	content: string
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
						<div
							id="hero"
							className={style.content}
							dangerouslySetInnerHTML={{ __html: page?.content }}
						></div>
					</OnScroll>
				)}
				<Border variant="purple" />
			</main>

			{page?.children?.nodes?.map((item) => {
				return (
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
