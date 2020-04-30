import React, { useEffect, useState } from 'react'
import { MESSAGE_BASE_DELAY } from 'store/slices/sessionProgress'

type Props = {
  delayMultiplier?: number
}
export const DelayContent: React.FunctionComponent<Props> = ({
  delayMultiplier = 1,
  children
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, MESSAGE_BASE_DELAY * delayMultiplier)
  }, [delayMultiplier])

  return show ? <>{children}</> : null
}

const withDelay = <P extends {}>(
  Component: React.ComponentType<P>,
  delayMultiplier?: number
) => (props: P) => (
  <DelayContent delayMultiplier={delayMultiplier}>
    <Component {...props} />
  </DelayContent>
)

export default withDelay
