import Loader from 'components/Loader'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadScriptResponses } from 'store/slices/scriptResults'
import { AppDispatch } from 'store/store'
import Actions from './Actions'
import EmptyState from './EmptyState'
import ResultsTable from './ResultsTable'
import transposeSessionResults from '../../../services/transposeSessionResults'

const Results: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()

  const scriptResults = useSelector(state => state.scriptResultsStore.data)

  const transposedResults = useMemo(
    () => (scriptResults ? transposeSessionResults(scriptResults) : undefined),
    [scriptResults]
  )

  useEffect(() => {
    dispatch(loadScriptResponses())
  }, [dispatch])

  if (!scriptResults) return <Loader />

  if (scriptResults.length === 0) return <EmptyState />

  return (
    <>
      <Actions />
      <ResultsTable data={transposedResults!} />
    </>
  )
}

export default Results
