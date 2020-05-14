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
  variant?: ButtonProps['variant']
}

const CreateScriptButton: React.FunctionComponent<Props> = ({ variant }) => {
  const [isConfiguring, setIsConfiguring] = useState(false)

  return (
    <>
      <StyledButton variant={variant} onClick={() => setIsConfiguring(true)}>
        <MaterialIcon icon="add" color="inherit" />
        New Parampara
      </StyledButton>

      <Configure isConfiguring={isConfiguring} onHide={() => setIsConfiguring(false)} />
    </>
  )
}

export default CreateScriptButton
