import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  container?: React.RefObject<HTMLDivElement>
}

const Portal: React.FunctionComponent<Props> = ({ container, children }) => {
  const portalElement = useRef<HTMLDivElement>()

  if (!portalElement.current) {
    portalElement.current = document.createElement('div')
  }

  useEffect(() => {
    const cont = container ? container.current! : document.body

    const portalEl = portalElement.current!
    cont.appendChild(portalEl)
    portalElement.current = portalEl
    return () => {
      cont.removeChild(portalEl)
    }
  }, [container])

  return ReactDOM.createPortal(children, portalElement.current!)
}

export default Portal
