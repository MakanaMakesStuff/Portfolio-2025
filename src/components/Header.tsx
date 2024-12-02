"use client"
import { gql, useQuery } from "@apollo/client"
import Link from "next/link"
import style from "@/styles/components/Header.module.scss"

interface HeaderI {
	id: string
	idType?: "SLUG" | "DATABASE_ID" | "ID" | "LOCATION" | "NAME"
	first?: number
	className?: string
}

export interface MenuItem {
	id: string
	label: string
	cssClasses: string[]
	path: string
	target: string
}

export default function Header({
	id,
	idType = "SLUG",
	first = 100,
	className = "",
}: HeaderI) {
	const { data, loading } = useQuery(MenuItems, {
		variables: {
			id,
			idType,
			first,
		},
	})

	if (loading) return null

	const menuItems: MenuItem[] = data?.menu?.menuItems?.nodes ?? []

	return (
		<header className={`${style.mainMenu} cap-width ${className}`}>
			<p className={`${style.name} anonymous-pro`}>Makana O' Ke Akua Edwards</p>

			<div className={style.links}>
				{menuItems.map((item) => (
					<Link
						href={item.path}
						key={item.id}
						className={item.cssClasses?.join(" ")}
					>
						<span dangerouslySetInnerHTML={{ __html: item.label ?? "" }}></span>
					</Link>
				))}
			</div>
		</header>
	)
}

const MenuItems = gql`
	query MainMenu($id: ID!, $idType: MenuNodeIdTypeEnum, $first: Int) {
		menu(id: $id, idType: $idType) {
			menuItems(first: $first) {
				nodes {
					id
					label
					cssClasses
					path
					target
				}
			}
		}
	}
`
