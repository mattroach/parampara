import React from 'react'
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom'

import ScriptDirectoryPage from './pages/admin/ScriptDirectoryPage'
import BuilderOldPage from './pages/builder-old/BuilderPage'
import BuilderPage from './pages/admin/BuilderPage'
import ChatPlayerPage from 'pages/ChatPlayerPage'
import SharePage from 'pages/admin/SharePage'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/builder/:adminId/:scriptId/create">
            <BuilderRoute />
          </Route>
          <Route path="/builder/:adminId/:scriptId/share">
            <ShareRoute />
          </Route>
          <Route path="/builder-old">
            <BuilderOldPage />
          </Route>
          <Route path="/u/:id">
            <AdminRoute />
          </Route>
          <Route path="/s/:id">
            <ChatSessionRoute />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

const ChatSessionRoute: React.FunctionComponent = () =>
  <ChatPlayerPage scriptId={(useParams() as any).id} />

const AdminRoute: React.FunctionComponent = () =>
  <ScriptDirectoryPage adminId={(useParams() as any).id} />

const BuilderRoute: React.FunctionComponent = () => {
  const params = (useParams() as any)
  return <BuilderPage adminId={params.adminId} scriptId={params.scriptId} />
}

const ShareRoute: React.FunctionComponent = () => {
  const params = (useParams() as any)
  return <SharePage adminId={params.adminId} scriptId={params.scriptId} />
}