import RootContainer from 'layout/RootContainer'
import React from 'react'
import ResultsNav from './ResultsNav'
import SummaryStats from './SummaryStats'

const ResultsLayout: React.FunctionComponent = ({ children }) => (
  <>
    <RootContainer>
      <SummaryStats />
    </RootContainer>
    <ResultsNav />
    {children}
  </>
)

export default ResultsLayout
