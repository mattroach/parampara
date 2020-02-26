import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { scriptContentUpdated } from 'store/slices/script'

const ServerSync: React.FunctionComponent = () => {
  const isInitialMount = useRef(true)
  const scriptItems = useSelector((state: RootState) => state.scriptStore.script!.version.items)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return // don't update on initial mount
    }

    dispatch(scriptContentUpdated())
  }, [scriptItems, dispatch])

  return null
}

export default ServerSync