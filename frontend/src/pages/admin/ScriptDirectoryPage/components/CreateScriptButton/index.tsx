import MaterialIcon from 'material-icons-react'
import React, { useState } from 'react'
import Button, { ButtonProps } from 'react-bootstrap/Button'
import Configure from './Configure'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  i {
    vertical-align: top;
  }
`

type Props = {
  adminId: string
  variant?: ButtonProps['variant']
}

const CreateScriptButton: React.FunctionComponent<Props> = ({ adminId, variant }) => {
  const [isConfiguring, setIsConfiguring] = useState(false)

  return (
    <>
      <StyledButton variant={variant} onClick={() => setIsConfiguring(true)}>
        <MaterialIcon icon="add" color="inherit" />
        New Parampara
      </StyledButton>

      <Configure
        adminId={adminId}
        isConfiguring={isConfiguring}
        onHide={() => setIsConfiguring(false)}
      />
    </>
  )
}

export default CreateScriptButton
