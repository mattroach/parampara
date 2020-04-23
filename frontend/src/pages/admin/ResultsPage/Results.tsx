import { AxiosError } from 'axios'
import Loader from 'components/Loader'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { loadScriptResponses } from 'store/slices/scriptResults'
import { AppDispatch } from 'store/store'
import Actions from './Actions'
import AuthenticateResults from './AuthenticateResults'
import EmptyState from './EmptyState'
import ResultsTable from './ResultsTable'
import transposeResults from './transposeResults'

const Results: React.FunctionComponent = () => {
  const scriptResults = useSelector((state: RootState) => state.scriptResultsStore.data)

  const [needsAuth, setNeedsAuth] = useState(false)

  const dispatch: AppDispatch = useDispatch()

  const transposedResults = useMemo(
    () => (scriptResults ? transposeResults(scriptResults) : undefined),
    [scriptResults]
  )

  useEffect(() => {
    dispatch(loadScriptResponses()).catch((e: AxiosError) => {
      if (e.isAxiosError && e.response?.status === 401) setNeedsAuth(true)
    })
  }, [dispatch])

  if (!scriptResults) {
    if (needsAuth) return <AuthenticateResults />

    return <Loader />
  }

  if (scriptResults.length === 0) return <EmptyState />

  return (
    <>
      <Actions />
      <ResultsTable data={transposedResults!} />
    </>
  )
}

export default Results
