import React from 'react'
import MaterialIcon from 'material-icons-react'
import styled from 'styled-components'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'

const StyledButton = styled(Button)`
  i {
    vertical-align: middle;
    margin-right: 4px;
  }
`

type Props = {
}

const PreviewButton: React.FunctionComponent<Props> = ({ children }) => {

  return (
    <OverlayTrigger overlay={(props: any) => <Tooltip {...props} show={props.show.toString()}>Preview the current draft</Tooltip>}>
      <StyledButton variant="secondary"><MaterialIcon icon="remove_red_eye" size={20} color="white" />Preview</StyledButton>
    </OverlayTrigger>
  )
}

export default PreviewButton