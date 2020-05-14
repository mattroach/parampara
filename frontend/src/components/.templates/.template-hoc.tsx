import React from 'react'
import ScriptAdminLayout from '../../layout/ScriptAdminLayout'

type Props = {
  scriptId: string
}

const withScriptAdminLayout = <P extends Props>(Component: React.ComponentType<P>) => {
  const LayoutComp: React.FunctionComponent<Props> = props => {
    const { scriptId } = props
    return (
      <ScriptAdminLayout scriptId={scriptId}>
        <Component {...(props as P)} />
      </ScriptAdminLayout>
    )
  }
  return LayoutComp
}

export default withScriptAdminLayout
