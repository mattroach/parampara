import React from 'react'
import FilterTypeInput from './FilterTypeInput'
import AnswerInput from './inputs/AnswerInput'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { InsightFilterKey, InsightFilterType } from 'types/insightTypes'
import ClearFilter, { ICON_WIDTH } from './ClearFilter'
import styled from 'styled-components'
import Sticky from 'components/Sticky'
import Navigation from './Navigation'
import RootContainer from 'layout/RootContainer'

const StyledSticky = styled(Sticky)`
  background: #fff;
  z-index: 999;
`

const Wrapper = styled.div<{ isSticky: boolean }>`
  padding: ${({ isSticky }) => (isSticky ? '20px' : '20px 0')};
  margin: ${({ isSticky }) => (isSticky ? '0 -20px' : '0')};
  background-color: ${({ isSticky }) => (isSticky ? '#f5f5f5' : 'auto')};
  transition: background-color 0.15s ease-in-out;
`

// The visibility of the clear button is conditional - need to set the width
// so the sizing does not change
const ClearCol = styled(Col)`
  box-sizing: content-box;
  width: ${ICON_WIDTH}px;
`

const KeyCol = styled(Col)`
  margin-left: 10px;
  margin-right: 5px;
`

const Filters: React.FunctionComponent = () => {
  const filterKey = useSelector(
    (state: RootState) => state.scriptInsightsStore.filter.key
  )

  return (
    <StyledSticky>
      {({ isSticky }) => (
        <Wrapper isSticky={isSticky}>
          <RootContainer>
            <Navigation />
            <h6>Filter</h6>
            <Form.Row>
              <Col>
                <FilterTypeInput />
              </Col>
              <KeyCol>{filterKey && <ValueInput filterKey={filterKey} />}</KeyCol>
              <ClearCol xs="auto">{filterKey && <ClearFilter />}</ClearCol>
            </Form.Row>
          </RootContainer>
        </Wrapper>
      )}
    </StyledSticky>
  )
}

const ValueInput = ({ filterKey }: { filterKey: InsightFilterKey<any> }) => {
  switch (filterKey.type) {
    case InsightFilterType.Question:
      return <AnswerInput filterKey={filterKey} />
    default:
      return null
  }
}

export default Filters
