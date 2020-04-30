import React from 'react'
import SuperAdminPage from './pages/SuperAdminPage'
import AuthContext from './AuthContext'

type Props = {
  password: string
}

const SuperAdminRouter = ({ password }: Props) => (
  <AuthContext.Provider value={password}>
    <SuperAdminPage />
  </AuthContext.Provider>
)

export default SuperAdminRouter
