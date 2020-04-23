import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import BuilderPage from 'pages/admin/BuilderPage'
import InsightsPage from 'pages/admin/InsightsPage'
import ResultsPage from 'pages/admin/ResultsPage'
import SharePage from 'pages/admin/SharePage'
import React from 'react'
import { Route } from 'react-router-dom'

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
      render={({ match }) => <ResultsPage scriptId={match.params.scriptId} />}
    />
    <Route path={`${path}/insights`} component={InsightsPage} />
  </ScriptAdminLayout>
)

export default ScriptAdminRouter
