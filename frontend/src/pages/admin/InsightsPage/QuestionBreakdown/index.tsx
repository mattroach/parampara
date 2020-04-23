import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import colors from './colors'
import BreakdownTable from './BreakdownTable'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Visualization from './Visualization'

type Props = {
  question: string
  data: {
    answer: string
    numUsers: number
  }[]
}

const QuestionBreakdown: React.FunctionComponent<Props> = ({ question, data }) => {
  // This is to prevent dataWithColors from changing on every render and thus causing children to rerender
  const dataWithColors = useMemo(
    () =>
      data.map((item, i) => ({
        color: colors[i % colors.length],
        ...item
      })),
    [data]
  )

  const [focusIndex, setFocusIndex] = useState<number | undefined>(undefined)

  return (
    <StyledRow>
      <Col>
        <QuestionHeader>{question}</QuestionHeader>
        <BreakdownTable data={dataWithColors} focusIndex={focusIndex} />
      </Col>
      <Col xs="4">
        <VizContainer>
          <Visualization data={dataWithColors} onHover={setFocusIndex} />
        </VizContainer>
      </Col>
    </StyledRow>
  )
}

const StyledRow = styled(Row)`
  margin-top: 2em;
`

const QuestionHeader = styled.h6`
  margin: 0 0 1em 0;
  color: #6c757d;
  font-weight: 600;
`

const VizContainer = styled.div`
  max-width: 175px;
  margin: 0 auto;
`

export default QuestionBreakdown
