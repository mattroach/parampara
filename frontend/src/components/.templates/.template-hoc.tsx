import React from 'react'
import ScriptAdminLayout from '../../layout/ScriptAdminLayout'

type Props = {
  adminId: string
  scriptId: string
}

const withScriptAdminLayout = <P extends Props>(Component: React.ComponentType<P>) => {
  const LayoutComp: React.FunctionComponent<Props> = props => {
    const { adminId, scriptId } = props
    return (
      <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
        <Component {...(props as P)} />
      </ScriptAdminLayout>
    )
  }
  return LayoutComp
}

export default withScriptAdminLayout
