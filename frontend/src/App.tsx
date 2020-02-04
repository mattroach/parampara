import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';

import AdminPage from './pages/admin/AdminPage';
import BuilderOldPage from './pages/builder-old/BuilderPage';
import BuilderPage from './pages/builder/BuilderPage';
import ChatSessionPage from './pages/chat-session/ChatSessionPage';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/builder/:adminId/:scriptId">
            <BuilderRoute />
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
  <ChatSessionPage scriptId={(useParams() as any).id} />

const AdminRoute: React.FunctionComponent = () =>
  <AdminPage adminId={(useParams() as any).id} />

const BuilderRoute: React.FunctionComponent = () => {
  const params = (useParams() as any)
  return <BuilderPage adminId={params.adminId} scriptId={params.scriptId} />
}