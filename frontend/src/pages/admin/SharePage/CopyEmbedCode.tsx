import { appPaths } from 'AppRouter'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import CopyContentInput from './CopyContentInput'

const CopyEmbedCode: React.FunctionComponent = () => {
  const scriptId = useSelector((state: RootState) => state.scriptStore.script!.id)

  const url = appPaths.baseUrl() + appPaths.playScript(scriptId)

  const content = `<iframe src="${url}" title="Parampara" width="415" height="600"
 style="border: 1px solid #eee; box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.05); border-radius: 8px;"></iframe>`
  return <CopyContentInput content={content} variant="secondary" />
}

export default CopyEmbedCode
