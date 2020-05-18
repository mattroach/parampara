import { appPaths } from 'AppRouter'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import CopyContentInput from './CopyContentInput'

const CopyShareUrl: React.FunctionComponent = () => {
  const scriptId = useSelector((state: RootState) => state.scriptStore.script!.id)

  const url = appPaths.baseUrl() + appPaths.playScript(scriptId)

  return <CopyContentInput content={url} />
}

export default CopyShareUrl
