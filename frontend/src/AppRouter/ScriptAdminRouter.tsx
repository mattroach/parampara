import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import BuilderPage from 'pages/admin/BuilderPage'
import InsightsPage from 'pages/admin/InsightsPage'
import ResultsPage from 'pages/admin/ResultsPage'
import SharePage from 'pages/admin/SharePage'
import React from 'react'
import { Route } from 'react-router-dom'
import ResultsLayout from 'layout/ResultsLayout'

type Props = {
  path: string
  adminId: string
  scriptId: string
}

const ScriptAdminRouter = ({ path, adminId, scriptId }: Props) => (
  <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
    <Route path={`${path}/create`} component={BuilderPage} />
    <Route path={`${path}/share`} component={SharePage} />
    <Route
      path={`${path}/results`}
      render={({ match }) => <ResultsRouter path={match.path} />}
    />
  </ScriptAdminLayout>
)

const ResultsRouter = ({ path }: { path: string }) => (
  <ResultsLayout>
    <Route exact path={`${path}`} component={ResultsPage} />
    <Route path={`${path}/insights`} component={InsightsPage} />
  </ResultsLayout>
)

export default ScriptAdminRouter
