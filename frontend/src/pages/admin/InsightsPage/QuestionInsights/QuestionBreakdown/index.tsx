import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import colors from './colors'
import BreakdownTable from './BreakdownTable'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Visualization from './Visualization'
import QuestionHeader from '../../QuestionHeader'

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
    <Wrapper>
      <QuestionHeader>{question}</QuestionHeader>
      <Row>
        <Col>
          <BreakdownTable
            question={question}
            data={dataWithColors}
            focusIndex={focusIndex}
          />
        </Col>
        <Col sm="auto" className="align-self-center">
          <VizContainer>
            <Visualization data={dataWithColors} onHover={setFocusIndex} />
          </VizContainer>
        </Col>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 2em;
`

const VizContainer = styled.div`
  width: 175px;
`

export default QuestionBreakdown
