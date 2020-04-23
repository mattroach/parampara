import React from 'react'
import SummaryStats from './SummaryStats'
import ResultsNav from './ResultsNav'

const ResultsLayout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <SummaryStats />
      <ResultsNav />
      {children}
    </>
  )
}

export default ResultsLayout
