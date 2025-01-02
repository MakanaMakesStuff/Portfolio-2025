"use client"
import { gql, useQuery } from "@apollo/client"
import Link from "next/link"
import {
	Box,
	Button,
	ClickAwayListener,
	Menu,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Stack,
	StackProps,
	useMediaQuery,
} from "@mui/material"
import { CustomThemeOptions } from "@/utilities/theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faBurger, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"

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
	...props
}: HeaderI & StackProps) {
	const { data, loading } = useQuery(MenuItems, {
		variables: {
			id,
			idType,
			first,
		},
	})

	const [opened, setOpened] = useState(false)

	const mobile = useMediaQuery("(max-width: 800px)")

	if (loading) return null

	const menuItems: MenuItem[] = data?.menu?.menuItems?.nodes ?? []

	return (
		<Stack
			component="header"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			gap="1.5em"
			p="0.5em 1.5em"
			position={mobile ? "sticky" : "fixed"}
			width="100%"
			left={0}
			right={0}
			top={0}
			zIndex={1000000}
			{...props}
		>
			<p className="text-primary">Makana O' Ke Akua Edwards</p>

			{mobile ? (
				<DropdownMenu onOpenChange={setOpened}>
					<DropdownMenuTrigger>
						<FontAwesomeIcon
							icon={opened ? faXmark : faBars}
							className="text-primary"
						/>
					</DropdownMenuTrigger>

					<DropdownMenuPortal>
						<DropdownMenuContent className="flex flex-col gap-1 bg-primary py-1 px-3 rounded-sm text-white mr-4">
							{menuItems.map((item) => (
								<DropdownMenuItem key={item.id}>
									<Link href={item.path} className={item.cssClasses?.join(" ")}>
										<span
											dangerouslySetInnerHTML={{ __html: item.label ?? "" }}
										></span>
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenuPortal>
				</DropdownMenu>
			) : (
				<Paper
					sx={(theme: CustomThemeOptions) => ({
						backgroundColor: theme.brand?.primary,
						padding: "0.5em 1.5em",
					})}
				>
					<Stack
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
						gap="1.5em"
						color="white"
					>
						{menuItems.map((item) => (
							<Link
								href={item.path}
								key={item.id}
								className={item.cssClasses?.join(" ")}
							>
								<span
									dangerouslySetInnerHTML={{ __html: item.label ?? "" }}
								></span>
							</Link>
						))}
					</Stack>
				</Paper>
			)}
		</Stack>
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
