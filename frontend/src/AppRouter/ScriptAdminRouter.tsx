import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import BuilderPage from 'pages/admin/BuilderPage'
import InsightsPage from 'pages/admin/InsightsPage'
import ResultsPage from 'pages/admin/ResultsPage'
import SharePage from 'pages/admin/SharePage'
import React from 'react'
import { Route } from 'react-router-dom'
import ResultsLayout from 'layout/ResultsLayout'

type Props = {
  basePath: string
  scriptId: string
}

const ScriptAdminRouter = ({ basePath, scriptId }: Props) => (
  <ScriptAdminLayout scriptId={scriptId}>
    <Route exact path={`${basePath}`} component={BuilderPage} />
    <Route path={`${basePath}/share`} component={SharePage} />
    <Route
      path={`${basePath}/results`}
      render={({ match }) => <ResultsRouter basePath={match.path} />}
    />
  </ScriptAdminLayout>
)

const ResultsRouter = ({ basePath }: { basePath: string }) => (
  <ResultsLayout>
    <Route exact path={`${basePath}`} component={ResultsPage} />
    <Route path={`${basePath}/insights`} component={InsightsPage} />
  </ResultsLayout>
)

export default ScriptAdminRouter
