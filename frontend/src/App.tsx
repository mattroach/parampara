import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ScriptDirectoryPage from './pages/admin/ScriptDirectoryPage'
import BuilderPage from './pages/admin/BuilderPage'
import ChatPlayerPage from 'pages/ChatPlayerPage'
import SharePage from 'pages/admin/SharePage'
import ResultsPage from 'pages/admin/ResultsPage'
import SuperAdminPage from 'pages/SuperAdminPage'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/super-admin/:password"
          render={({ match }) =>
            <SuperAdminPage password={match.params.password} />} />

        <Route path="/u/:adminId"
          render={({ match }) =>
            <ScriptDirectoryPage adminId={match.params.adminId} />} />

        <Route path="/builder/:adminId/:scriptId/create"
          render={({ match }) =>
            <BuilderPage adminId={match.params.adminId} scriptId={match.params.scriptId} />} />

        <Route path="/builder/:adminId/:scriptId/share"
          render={({ match }) =>
            <SharePage adminId={match.params.adminId} scriptId={match.params.scriptId} />} />

        <Route path="/builder/:adminId/:scriptId/results"
          render={({ match }) =>
            <ResultsPage adminId={match.params.adminId} scriptId={match.params.scriptId} />} />

        <Route path="/s/:id"
          render={({ match }) =>
            <ChatPlayerPage scriptId={match.params.id} />} />
      </Switch>
    </Router>
  )
}

const appPaths = {
  baseUrl: () => {
    const defaultPorts = { "http:": 80, "https:": 443 }
    const protocol = window.location.protocol as 'http:' | 'https:'
    const { hostname, port } = window.location

    return protocol + "//" + hostname
      + ((port && parseInt(port) !== defaultPorts[protocol]) ? (":" + port) : "")
  },
  playScript: (scriptId: string) => `/s/${scriptId}`,
  scriptDirectory: (adminId: string) => `/u/${adminId}`
}

export { appPaths }