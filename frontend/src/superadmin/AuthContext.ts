import React from 'react'

type ContextType = string
const AuthContext = React.createContext<ContextType | undefined>(undefined)

export default AuthContext
