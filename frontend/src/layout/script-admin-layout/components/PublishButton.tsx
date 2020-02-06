import React from 'react'
import MaterialIcon from 'material-icons-react'
import styled from 'styled-components'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'

const StyledButton = styled(Button)`
  margin-left: 10px;
  i {
    vertical-align: middle;
    margin-right: 4px;
  }
`
type Props = {
}

const PublishButton: React.FunctionComponent<Props> = ({ children }) => {

  return (
    <OverlayTrigger overlay={(props: any) => <Tooltip {...props} show={props.show.toString()}>Publish your changes to the world</Tooltip>}>
      <StyledButton variant="primary"><MaterialIcon icon="publish" size={20} color="white" />Publish</StyledButton>
    </OverlayTrigger>
  )
}

export default PublishButton