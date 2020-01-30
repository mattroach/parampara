import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

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
          <Route path="/s/:id">
            <ChatSessionRoute />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const ChatSessionRoute: React.FunctionComponent = () =>
  <ChatSessionPage scriptId={(useParams() as any).id} />