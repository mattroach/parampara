import React from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

const ExportAction: React.FunctionComponent = () => {
  const scriptId = useSelector((state: RootState) => state.scriptStore.script!.id)
  const loginToken = useSelector(
    (state: RootState) => state.authenticationStore.loginToken
  )

  return (
    <Button
      variant="light"
      href={`/api/script/${scriptId}/responses/export?loginToken=${loginToken}`}
    >
      Export to CSV
    </Button>
  )
}

export default ExportAction
