import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

const Portal: React.FunctionComponent = ({ children }) => {
  const portalElement = useRef<HTMLDivElement>()

  if (!portalElement.current) {
    portalElement.current = document.createElement('div')
  }

  useEffect(() => {
    const portalEl = portalElement.current!
    document.body.appendChild(portalEl)
    portalElement.current = portalEl
    return () => {
      document.body.removeChild(portalEl)
    }
  }, [])

  return ReactDOM.createPortal(children, portalElement.current!)
}

export default Portal
