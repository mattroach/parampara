import ScriptDirectoryPage from 'pages/admin/ScriptDirectoryPage'
import ChatPlayerPage from 'pages/ChatPlayerPage'
import SuperAdminPage from '../superadmin/pages/SuperAdminPage'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ScriptAdminRouter from './ScriptAdminRouter'
import RouteNotFoundPage from 'pages/RouteNotFoundPage'

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/super-admin/" component={SuperAdminPage} />

        <Redirect exact path="/" to="/account" />
        <Route path="/account" component={ScriptDirectoryPage} />

        <Route
          path="/script/:scriptId"
          render={({ match }) => (
            <ScriptAdminRouter basePath={match.path} scriptId={match.params.scriptId} />
          )}
        />

        <Route
          path="/s/:id"
          render={({ match }) => <ChatPlayerPage scriptId={match.params.id} />}
        />
        <Route component={RouteNotFoundPage} />
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
  scriptDirectory: () => `/account`
}

export { appPaths }
