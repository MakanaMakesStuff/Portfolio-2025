/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#9f73ce",
				secondary: "#282828",
				highlight: "white",
				"border-gray": "rgb(201, 201, 201)",
			},
			backgroundImage: {
				"primary-gradient": `radial-gradient(circle at center, rgb(30, 15, 32) 0%, #090909 60%)`,
				"primary-scrollbar-gradient": `radial-gradient(circle at center, #9f73ce89 0%, #00000000 100%)`,
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
}
