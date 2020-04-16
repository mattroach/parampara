import React, { useState, useMemo } from 'react'
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
    <Row>
      <Col>
        <h6>{question}</h6>
        <BreakdownTable data={dataWithColors} focusIndex={focusIndex} />
      </Col>
      <Col xs="4">
        <Visualization data={dataWithColors} onHover={setFocusIndex} />
      </Col>
    </Row>
  )
}

export default QuestionBreakdown
