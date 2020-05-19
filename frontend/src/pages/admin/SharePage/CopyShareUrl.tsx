import { appPaths } from 'AppRouter'
import React from 'react'
import { useSelector } from 'react-redux'
import CopyContentInput from './CopyContentInput'

const CopyShareUrl: React.FunctionComponent = () => {
  const scriptId = useSelector(state => state.scriptStore.script!.id)

  const url = appPaths.baseUrl() + appPaths.playScript(scriptId)

  return <CopyContentInput content={url} />
}

export default CopyShareUrl
