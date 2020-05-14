import React from 'react'
import MaterialIcon from 'material-icons-react'
import styled from 'styled-components'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { publishScript } from 'store/slices/script'

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
  const { hasUnpublishedChanges, isPublished } = useSelector(
    state => state.scriptStore.script!
  )

  return (
    <OverlayTrigger
      overlay={(props: any) => (
        <Tooltip {...props} show={props.show.toString()}>
          {isPublished
            ? hasUnpublishedChanges
              ? 'Publish changes'
              : 'Script is published, click share to send to your users'
            : 'Publish for sharing'}
        </Tooltip>
      )}
    >
      <ButtonWrap>
        <StyledButton
          variant="primary"
          onClick={publish}
          disabled={!hasUnpublishedChanges}
        >
          <MaterialIcon icon="publish" size={20} color="white" />
          {isPublished ? 'Update' : 'Create'}
        </StyledButton>
      </ButtonWrap>
    </OverlayTrigger>
  )
}

export default PublishButton
