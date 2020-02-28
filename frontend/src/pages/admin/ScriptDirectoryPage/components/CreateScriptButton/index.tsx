import React, { useState } from 'react'
import Configure from './Configure'
import Button from 'react-bootstrap/Button'

type Props = {
  adminId: string
}

const CreateScriptButton: React.FunctionComponent<Props> = ({ adminId }) => {
  const [isConfiguring, setIsConfiguring] = useState(false)

  return (
    <>
      <Button variant="secondary" onClick={() => setIsConfiguring(true)}>
        Create a new Parampara
      </Button>

      <Configure
        adminId={adminId}
        isConfiguring={isConfiguring}
        onHide={() => setIsConfiguring(false)}
      />
    </>
  )
}

export default CreateScriptButton
