import { ApolloError, gql, useQuery } from "@apollo/client"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react"

export const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as AppContextProps

export interface AppContextProps {
  state: AppState
  setState: Dispatch<SetStateAction<AppState>>
  actions: AppActions
}

export interface AppState {
  viewer: any
  isLoggedIn: boolean
}

export interface AppActions {
  data: any
  loading: boolean
  error: ApolloError
}

export interface GeneralSettingsI {
  title?: string
}

export default function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    viewer: any
    isLoggedIn: boolean
  }>({
    viewer: null,
    isLoggedIn: false,
  })

  const { data, loading, error } = useQuery(GetSettings)

  const actions = {
    data,
    loading,
    error,
  }

  return (
    <AppContext.Provider value={{ state, setState, actions }}>
      {children}
    </AppContext.Provider>
  )
}

const GetSettings = gql`
  query GetSettings {
    generalSettings {
      title
    }
  }
`
