"use client"
import { ReactElement, useEffect, useLayoutEffect } from "react"
import animations from "@/styles/components/OnScroll.module.scss"

export interface OnScrollProps {
	className?: string | string[]
	id: string
	animation?:
		| "fadeIn"
		| "fadeInZoom"
		| "fadeInTop"
		| "fadeInBottom"
		| "fadeInLeft"
		| "fadeInRight"
	type?: "default" | "children" | "childrenSynced"
	persist?: boolean
	threshold?: number
	children: ReactElement
}
/**
 * Add a specified class when the component is scrolled into view
 * @param className this class will be added to the child or children of the child element when it is in view
 * @param id this is required in order to specify which dom element to apply the scroll animation to
 * @param animation this will override the className prop and utilize one of the premade animations when the element(s) are in view
 * @param type by default, the className or animation props will only be applied to our ReactElement. If we specify 'children' then it will apply to the children of the ReactElement and the animation will be delayed on each child(aka. 'one at a time'). If type is set to 'childrenSync' then the animation will trigger for each child immediately(aka. 'all at once').
 * @param persist Determines whether to retrigger animations everytime the user scrolls over an element or to only trigger an animation once(defaults to true).
 * @param threshold Determines the amount of the element that needs to show before it is considered "in view"
 * @param children This is just the ReactElement that we pass within the scrope of our OnScroll component
 * @example
 * // Note: the 'fadeIn' animation will be applied to the children of the section element because of our specified type.
 * <OnScroll animation="fadeIn" type="children">
 * 	<section>
 * 		<div>First Animation</div>
 * 		<div>Second Animation</div>
 * 	</section>
 * </OnScroll>
 */
export default function OnScroll({
	className,
	id,
	animation = "fadeIn",
	type = "default",
	persist = true,
	threshold = 0.2,
	children,
}: OnScrollProps) {
	const classes = Array.isArray(className) ? className?.join(" ") : className

	useLayoutEffect(() => {
		const el = document.querySelector(`#${id}`)

		el?.setAttribute("style", "opacity: 0;")

		if (el) {
			if (typeof IntersectionObserver !== "undefined") {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (type === "default") {
								if (entry.isIntersecting)
									entry.target.classList.add(
										animation ? animations[animation] : classes!
									)
								else {
									if (persist) return

									entry.target.classList.remove(
										animation ? animations[animation] : classes!
									)
								}
							} else if (type === "children") {
								const children = Array.from(el.children || [])

								if (children) {
									if (entry.isIntersecting)
										for (let i = 0; i < children.length; i++) {
											children[i]?.setAttribute(
												"style",
												`animation-delay: ${i * 100}ms`
											)
											children[i]?.classList.add(
												animation ? animations[animation] : classes!
											)
										}
									else {
										if (persist) return
										for (let i = 0; i < children.length; i++) {
											children[i]?.classList.remove(
												animation ? animations[animation] : classes!
											)
										}
									}
								}
							} else if (type === "childrenSynced") {
								const children = Array.from(el.children || [])

								if (children) {
									if (entry.isIntersecting)
										for (let i = 0; i < children.length; i++) {
											children[i]?.classList.add(
												animation ? animations[animation] : classes!
											)
										}
									else {
										if (persist) return
										for (let i = 0; i < children.length; i++) {
											children[i]?.classList.remove(
												animation ? animations[animation] : classes!
											)
										}
									}
								}
							}
						})
					},
					{ threshold }
				)

				observer.observe(el)
			} else {
				if (type === "default") {
					el.classList.add(animation ? animations[animation] : classes!)
				} else {
					const children = Array.from(el.children || [])

					if (children) {
						for (let i = 0; i < children.length; i++) {
							children[i]?.setAttribute(
								"style",
								`animation-delay: ${i * 100}ms`
							)
							children[i]?.classList.add(
								animation ? animations[animation] : classes!
							)
						}
					}
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <>{children}</>
}
