import React from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

const ExportAction: React.FunctionComponent = () => {
  const scriptId = useSelector((state: RootState) => state.scriptStore.script!.id)

  return (
    <Button variant="light" href={`http://localhost:3001/api/script/${scriptId}/export`}>
      Export to CSV
    </Button>
  )
}

export default ExportAction
