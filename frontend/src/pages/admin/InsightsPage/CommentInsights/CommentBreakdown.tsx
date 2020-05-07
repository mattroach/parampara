import dayjs from 'dayjs'
import React from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'
import QuestionHeader from '../QuestionHeader'

type Props = {
  question: string
  data: {
    answer: string
    created: string
  }[]
}

const CommentBreakdown: React.FunctionComponent<Props> = ({ question, data }) => {
  return (
    <Wrapper>
      <QuestionHeader>{question}</QuestionHeader>
      <StyledTable striped>
        <thead>
          <tr>
            <th></th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <th>{dayjs(item.created).format('DD MMM YYYY, h:mma')}</th>
              <td>{item.answer}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 2em 0 4em 0;
`

const StyledTable = styled(Table)`
  margin: 1em 0;
  font-size: 0.9rem;

  tbody th {
    white-space: nowrap;
  }
`

export default CommentBreakdown
