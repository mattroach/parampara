import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { cloneScript } from 'store/slices/scripts'
import { ListedScript } from 'types/scriptTypes'

type Props = {
  script: ListedScript
}

const CopyButton: React.FunctionComponent<Props> = ({ script }) => {
  const dispatch = useDispatch()
  const [copying, setCopying] = useState(false)

  const copyScript = () => {
    setCopying(true)
    dispatch(cloneScript(script.id)).then(() => setCopying(false))
  }
  return (
    <Dropdown.Item onClick={copyScript} disabled={copying}>
      Copy
    </Dropdown.Item>
  )
}

export default CopyButton
