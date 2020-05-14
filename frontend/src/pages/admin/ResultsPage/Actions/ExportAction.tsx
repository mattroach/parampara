import React from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'

const ExportAction: React.FunctionComponent = () => {
  const scriptId = useSelector(state => state.scriptStore.script!.id)

  return (
    <Button variant="light" href={`/api/script/${scriptId}/responses/export`}>
      Export to CSV
    </Button>
  )
}

export default ExportAction
