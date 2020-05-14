import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScriptRefresh from 'services/ScriptRefresh'
import { scriptContentUpdated, startScriptRefresh } from 'store/slices/script'
import { AppDispatch } from 'store/store'
import { ScriptItem } from 'types/scriptTypes'

const ServerSync: React.FunctionComponent = () => {
  const isInitialMount = useRef(true)
  const scriptRefresher = useRef<ScriptRefresh<ScriptItem[]> | undefined>(undefined)
  const scriptItems = useSelector(state => state.scriptStore.script!.version.items)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return // don't update on initial mount
    }

    scriptRefresher.current!.scriptUpdated()
    dispatch(scriptContentUpdated())
  }, [scriptItems, dispatch])

  useEffect(() => {
    scriptRefresher.current = dispatch(startScriptRefresh())

    return () => scriptRefresher.current!.terminate()
  }, [dispatch])

  return null
}

export default ServerSync
