import React from 'react'
import ScriptAdminLayout from '../../layout/script-admin-layout/ScriptAdminLayout'

type Props = {
  adminId: string
  scriptId: string
}

const BuilderPage: React.FunctionComponent<Props> = ({ adminId, scriptId }) => {
  return (
    <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
      test
    </ScriptAdminLayout>
  )
}

export default BuilderPage