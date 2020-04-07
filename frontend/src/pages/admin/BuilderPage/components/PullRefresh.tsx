import api from 'api'
import { ScriptVersionType } from 'api/types'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScriptRefresh from 'services/ScriptRefresh'
import { RootState } from 'store/rootReducer'
import { scriptContentUpdated } from 'store/slices/script'
import { ScriptItem } from 'types/scriptTypes'

const ServerSync: React.FunctionComponent = () => {
  const isInitialMount = useRef(true)
  const scriptRefresher = useRef<ScriptRefresh<ScriptItem[]> | undefined>(undefined)
  const scriptItems = useSelector(
    (state: RootState) => state.scriptStore.script!.version.items
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return // don't update on initial mount
    }

    scriptRefresher.current!.scriptUpdated()
    dispatch(scriptContentUpdated())
  }, [scriptItems, dispatch])

  const scriptId = useSelector((state: RootState) => state.scriptStore.script!.id)

  const hasUnpushedChanges = useSelector(
    (state: RootState) => state.scriptStore.hasUnpushedChanges
  )

  useEffect(() => {
    scriptRefresher.current = new ScriptRefresh(
      async () => (await api.getScript(scriptId, ScriptVersionType.draft)).version.items,
      () => !hasUnpushedChanges,
      d => console.log('commiting', d)
    )
    scriptRefresher.current.startRefresh()

    return () => scriptRefresher.current!.terminate()
  }, [scriptId])

  return null
}

export default ServerSync
