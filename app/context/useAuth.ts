import { createContext, useContext } from 'react'
import { AuthContextValue } from './AuthContextProvider'

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  if (AuthContext === null)
    throw Error("auth context can't be used outside of provider")

  return useContext(AuthContext) as AuthContextValue
}
