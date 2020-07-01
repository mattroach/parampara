import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cloneScript } from 'store/slices/scripts'
import { ListedScript } from 'types/scriptTypes'
import AppDowndownItem from 'components/menu/AppDropdownItem'

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
    <AppDowndownItem onClick={copyScript} isLoading={copying} icon="file_copy">
      Copy
    </AppDowndownItem>
  )
}

export default CopyButton
