import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ScriptDirectoryPage from './pages/admin/ScriptDirectoryPage'
import BuilderPage from './pages/admin/BuilderPage'
import ChatPlayerPage from 'pages/ChatPlayerPage'
import SharePage from 'pages/admin/SharePage'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/u/:adminId"
            render={({ match }) =>
              <ScriptDirectoryPage adminId={match.params.adminId} />} />

          <Route path="/builder/:adminId/:scriptId/create"
            render={({ match }) =>
              <BuilderPage adminId={match.params.adminId} scriptId={match.params.scriptId} />} />

          <Route path="/builder/:adminId/:scriptId/share"
            render={({ match }) =>
              <SharePage adminId={match.params.adminId} scriptId={match.params.scriptId} />} />

          <Route path="/s/:id"
            render={({ match }) =>
              <ChatPlayerPage scriptId={match.params.id} />} />
        </Switch>
      </div>
    </Router>
  )
}

const appPaths = {
  baseUrl: () => 'http://localhost:3000',
  playScript: (scriptId: string) => `/s/${scriptId}`,
  scriptDirectory: (adminId: string) => `/u/${adminId}`
}

export { appPaths }