import ScriptDirectoryPage from 'pages/admin/ScriptDirectoryPage'
import ChatPlayerPage from 'pages/ChatPlayerPage'
import SuperAdminRouter from '../superadmin/Router'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScriptAdminRouter from './ScriptAdminRouter'

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route
          path="/super-admin/:password"
          render={({ match }) => <SuperAdminRouter password={match.params.password} />}
        />

        <Route
          path="/u/:adminId"
          render={({ match }) => <ScriptDirectoryPage adminId={match.params.adminId} />}
        />

        <Route
          path="/builder/:adminId/:scriptId"
          render={({ match }) => (
            <ScriptAdminRouter
              basePath={match.path}
              adminId={match.params.adminId}
              scriptId={match.params.scriptId}
            />
          )}
        />

        <Route
          path="/s/:id"
          render={({ match }) => <ChatPlayerPage scriptId={match.params.id} />}
        />
      </Switch>
    </Router>
  )
}

const appPaths = {
  baseUrl: () => {
    const defaultPorts = { 'http:': 80, 'https:': 443 }
    const protocol = window.location.protocol as 'http:' | 'https:'
    const { hostname, port } = window.location

    return (
      protocol +
      '//' +
      hostname +
      (port && parseInt(port) !== defaultPorts[protocol] ? ':' + port : '')
    )
  },
  playScript: (scriptId: string) => `/s/${scriptId}`,
  scriptDirectory: (adminId: string) => `/u/${adminId}`
}

export { appPaths }
