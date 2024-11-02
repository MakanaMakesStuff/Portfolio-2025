import client from "@/utilities/Apollo"
import { ViewerFragment } from "@/utilities/fragments/viewer"
import { ApolloError, gql, useQuery } from "@apollo/client"
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
} from "react"

export const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as AppContextProps

export interface AppContextProps {
	state: AppSettings
	setState: Dispatch<SetStateAction<AppSettings>>
	actions: AppActions
}

export interface Viewer {
	id: string
}

export interface GeneralSettingsI {
	title?: string
}

export interface AppSettings {
	viewer?: Viewer
	generalSettings?: GeneralSettingsI
}

export interface AppActions {
	data: AppSettings
	loading: boolean
	error: ApolloError
	updateDataCache(updated: AppSettings): void
}

export default function AppProvider({ children }: { children: ReactNode }) {
	const { data, loading, error } = useQuery(GetSettings)

	function updateDataCache(updated: AppSettings) {
		client.cache.modify({
			fields: {
				viewer(existing = {}) {
					return updated.viewer ?? existing
				},
				generalSettings(existing = {}) {
					return updated.generalSettings ?? existing
				},
			},
		})
	}

	const actions = {
		data,
		loading,
		error,
		updateDataCache,
	}

	return (
		<AppContext.Provider value={{ actions }}>{children}</AppContext.Provider>
	)
}

const GetSettings = gql`
	${ViewerFragment}
	query GetSettings {
		viewer {
			...ViewerFragment
		}
		generalSettings {
			title
		}
	}
`
