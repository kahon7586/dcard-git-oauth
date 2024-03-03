import { ReactNode, useEffect, useRef, useState } from 'react'
import { AuthContext } from './useAuth'

interface AuthContextProviderProps {
  children: ReactNode
}

export interface AuthContextValue {
  codeValue: string | null
  token: string | null
  setToken: React.Dispatch<React.SetStateAction<string | null>>
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [codeValue, setCodeValue] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const queryString = window.location.search
    const searchParams = new URLSearchParams(queryString)
    const newCodeValue = searchParams.get('code')
    console.log(newCodeValue)
    if (newCodeValue !== null) setCodeValue(newCodeValue)
  }, [])

  const contextValue: AuthContextValue = {
    codeValue: codeValue,
    token: token,
    setToken: setToken,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider
