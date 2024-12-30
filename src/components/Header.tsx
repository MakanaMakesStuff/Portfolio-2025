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
			<Box
				component="p"
				sx={(theme: CustomThemeOptions) => ({
					color: theme.brand?.primary,
				})}
			>
				Makana O' Ke Akua Edwards
			</Box>

			{mobile ? (
				<Box>
					<Button
						sx={(theme: CustomThemeOptions) => ({
							color: theme.brand?.primary,
							minWidth: 0,
						})}
						onClick={() => setOpened((prev) => !prev)}
					>
						<FontAwesomeIcon icon={opened ? faXmark : faBars} />
					</Button>

					<Popper
						sx={{
							position: "absolute",
							top: 0,
							right: 0,
							margin: "3.5em 1.5em auto auto",
							width: "100%",
							maxWidth: "200px",
						}}
						open={opened}
						transition
					>
						<ClickAwayListener onClickAway={() => setOpened(false)}>
							<Paper
								sx={(theme: CustomThemeOptions) => ({
									backgroundColor: theme.brand?.primary,
									color: "white",
									padding: "1em",
								})}
							>
								<>
									{menuItems.map((item) => (
										<Link
											href={item.path}
											key={item.id}
											className={item.cssClasses?.join(" ")}
											style={{
												display: "block",
												width: "100%",
												padding: "0.5em",
											}}
										>
											<span
												dangerouslySetInnerHTML={{ __html: item.label ?? "" }}
											></span>
										</Link>
									))}
								</>
							</Paper>
						</ClickAwayListener>
					</Popper>
				</Box>
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
