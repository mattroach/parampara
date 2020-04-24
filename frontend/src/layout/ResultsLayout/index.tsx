import React, { useEffect } from 'react'
import SummaryStats from './SummaryStats'
import ResultsNav from './ResultsNav'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Loader from 'components/Loader'
import { checkPasswordRequirement } from 'store/slices/authentication'
import Authentication from './Authentication'

const ResultsLayout: React.FunctionComponent = ({ children }) => {
  const dispatch = useDispatch()

  const { passwordProtected, loginToken } = useSelector(
    (state: RootState) => state.authenticationStore
  )

  useEffect(() => {
    if (passwordProtected === undefined) {
      dispatch(checkPasswordRequirement())
    }
  }, [dispatch, passwordProtected])

  if (passwordProtected === undefined) {
    return <Loader />
  }

  if (passwordProtected && !loginToken) {
    return <Authentication />
  }

  return (
    <>
      <SummaryStats />
      <ResultsNav />
      {children}
    </>
  )
}

export default ResultsLayout
