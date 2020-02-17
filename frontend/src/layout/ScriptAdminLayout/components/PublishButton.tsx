import React from 'react'
import MaterialIcon from 'material-icons-react'
import styled from 'styled-components'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { publishScript } from 'store/slices/script'
import { RootState } from 'store/rootReducer'

const StyledButton = styled(Button)`
  margin-left: 10px;
  ${props => props.disabled && 'pointer-events: none;'}

  i {
    vertical-align: middle;
    margin-right: 4px;
  }
`

// Elements with the disabled attribute do not receive mouse events, therefore we must wrap in another component like this
const ButtonWrap = styled.span`
  display: inline-block;
`

const PublishButton: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const publish = () => dispatch(publishScript())
  const hasUnpublishedChanges = useSelector((state: RootState) => state.scriptStore.script!.hasUnpublishedChanges)

  return (
    <OverlayTrigger overlay={(props: any) =>
      <Tooltip {...props} show={props.show.toString()}>
        {hasUnpublishedChanges ? 'Publish your changes to the world' : 'Script is already published'}
      </Tooltip>
    }>
      <ButtonWrap>
        <StyledButton variant="primary" onClick={publish} disabled={!hasUnpublishedChanges}>
          <MaterialIcon icon="publish" size={20} color="white" />
          {hasUnpublishedChanges ? 'Publish' : 'Published'}
        </StyledButton>
      </ButtonWrap>
    </OverlayTrigger>
  )
}

export default PublishButton