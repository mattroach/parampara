import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom"

import BuilderPage from "./pages/builder/BuilderPage"
import ChatSessionPage from "./pages/chat-session/ChatSessionPage"
import AdminPage from "./pages/admin/AdminPage"


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/builder">
            <BuilderPage />
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