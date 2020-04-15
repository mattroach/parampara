import { AxiosError } from 'axios'
import Loader from 'components/Loader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { loadScriptResponses } from 'store/slices/scriptResults'
import { AppDispatch } from 'store/store'
import AuthenticateResults from './AuthenticateResults'
import EmptyState from './EmptyState'
import transposeResults from './transposeResults'
import ResultsTable from './ResultsTable'
import Actions from './Actions'

type Props = {
  scriptId: string
}

const Results: React.FunctionComponent<Props> = ({ scriptId }) => {
  const scriptResults = useSelector((state: RootState) => state.scriptResultsStore.data)

  const [needsAuth, setNeedsAuth] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(loadScriptResponses(scriptId)).catch((e: AxiosError) => {
      if (e.isAxiosError && e.response?.status === 401) setNeedsAuth(true)
    })
  }, [dispatch, scriptId])

  if (!scriptResults) {
    if (needsAuth) return <AuthenticateResults scriptId={scriptId} />

    return <Loader />
  }

  if (scriptResults.length === 0) return <EmptyState />

  const transposedResults = transposeResults(scriptResults)

  return (
    <>
      <Actions />
      <ResultsTable data={transposedResults} />
    </>
  )
}

export default Results
