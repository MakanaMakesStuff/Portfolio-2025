import { createTheme, ThemeOptions } from "@mui/material/styles"

export interface CustomThemeOptions extends ThemeOptions {
	brand?: {
		primary: string
		primaryGradient: string
		primaryGradientLight: string
		secondary: string
		highlight: string
		borderGray: string
		primaryScrollbarGradient: string
	}
}

const theme: CustomThemeOptions = {
	brand: {
		primary: "#9f73ce",
		primaryGradient:
			"radial-gradient(circle at center, rgb(30, 15, 32) 0%, #090909 60%)",
		primaryGradientLight:
			"radial-gradient(circle at center, rgb(130, 96, 135) 0%, rgb(255,255,2559) 100%)",
		secondary: "#282828",
		highlight: "white",
		borderGray: "#c9c9c9",
		primaryScrollbarGradient:
			"radial-gradient(circle at center, #9f73ce89 0%, #00000000 100%)",
	},
	typography: {
		h1: {
			fontSize: "2.5rem",
		},
	},
}

const getTheme = () => createTheme(theme, { responsiveFontSizes: true })

export default getTheme
