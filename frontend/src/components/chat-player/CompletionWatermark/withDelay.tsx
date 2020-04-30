import React, { useEffect, useState } from 'react'
import { MESSAGE_BASE_DELAY } from 'store/slices/sessionProgress'

export const DelayContent: React.FunctionComponent = ({ children }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, MESSAGE_BASE_DELAY)
  }, [])

  return show ? <>{children}</> : null
}

const withDelay = <P extends {}>(Component: React.ComponentType<P>) => (props: P) => (
  <DelayContent>
    <Component {...props} />
  </DelayContent>
)

export default withDelay
