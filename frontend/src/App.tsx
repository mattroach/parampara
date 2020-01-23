import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// This must be imported before other components which extend bootstrap styles.
import 'bootstrap/dist/css/bootstrap.css';

import BuilderPage from "./pages/builder/BuilderPage";
import ChatSessionPage from "./pages/chat-session/ChatSessionPage";


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/builder">
            <BuilderPage />
          </Route>
          <Route path="/">
            <ChatSessionPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}