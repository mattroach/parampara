import ChatPlayer from 'components/chat-player/ChatPlayer'
import MaterialIcon from 'material-icons-react'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { clearProgress } from 'store/slices/sessionProgress'

const StyledButton = styled(Button)`
  i {
    vertical-align: middle;
    margin-right: 4px;
  }
`

const StyledModal = styled(Modal)`
  .modal-dialog {
    height: 85%;
    .modal-content {
      height: 100%;
    }
  }
`

const StyledHeader = styled(Modal.Header)`
  background: #007bff;
  border-bottom: 1px solid #007bff;
  color: #fff;
  padding: 0.7rem 1rem;
  padding-left: 20px; 

  .close {
    color: #fff;
    text-shadow: 0 1px 0 #000;
    opacity: .9;
  }
`

const StyledModalTitle = styled(Modal.Title)`
  font-size: 1.14em;
  text-align: center;
  width: 100%;
`

const StyledModalBody = styled(Modal.Body)`
  overflow: auto;
`

type Props = {
}

const PreviewButton: React.FunctionComponent<Props> = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const closePreview = () => setShow(false)
  const openPreview = () => {
    dispatch(clearProgress())
    setShow(true)
  }

  return (
    <>
      <OverlayTrigger overlay={(props: any) => <Tooltip {...props} show={props.show.toString()}>Preview the current draft</Tooltip>}>
        <StyledButton variant="secondary" onClick={openPreview}><MaterialIcon icon="remove_red_eye" size={20} color="white" />Preview</StyledButton>
      </OverlayTrigger>

      <StyledModal show={show} onHide={closePreview} backdropClassName="extraDark">
        <StyledHeader closeButton>
          <StyledModalTitle>This is a preview of your current draft</StyledModalTitle>
        </StyledHeader>
        <StyledModalBody>
          <ChatPlayer isPreviewMode={true} />
        </StyledModalBody>
      </StyledModal>
    </>
  )
}

export default PreviewButton