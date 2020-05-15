import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import MaterialIcon from 'material-icons-react'

const StyledToast = styled(Toast)`
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 1rem 1rem 0 0 !important;

  i {
    margin-right: 8px;
    color: var(--danger) !important;
  }
`

const AuthFailureMonitor: React.FunctionComponent = () => {
  // We will display different messaging depending on if auth fails on first
  // load vs. if it fails while using the app
  // This component is only mounted after the initial admin is loaded, however
  const wasAuthFailure = useSelector(state => state.adminStore.authFailure)

  if (!wasAuthFailure) return null

  return (
    <StyledToast>
      <Toast.Header closeButton={false}>
        <MaterialIcon icon="error" size={22} />
        <strong className="mr-auto">You have been logged out</strong>
      </Toast.Header>
      <Toast.Body>
        <p>Your login as timed out. Please log back in to keep using Parampara.</p>
        <a href="/login">Log back in</a>
      </Toast.Body>
    </StyledToast>
  )
}

export default AuthFailureMonitor
