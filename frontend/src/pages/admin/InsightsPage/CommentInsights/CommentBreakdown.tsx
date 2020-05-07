import { CommentInsight } from 'api/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'
import QuestionHeader from '../QuestionHeader'
import ExtraColPicker from './ExtraColPicker'

dayjs.extend(relativeTime)

type Props = CommentInsight

const CommentBreakdown: React.FunctionComponent<Props> = ({ question, data }) => {
  const [extraCol, setExtraCol] = useState<string | undefined>(undefined)

  return (
    <Wrapper>
      <QuestionHeader>{question}</QuestionHeader>
      <StyledTable striped>
        <thead>
          <tr>
            <th></th>
            <th>Comment</th>
            <th style={{ paddingTop: 4, paddingBottom: 4 }}>
              <ExtraColPicker data={data} value={extraCol} setValue={setExtraCol} />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <th>{dayjs().to(item.created)}</th>
              <td>{item.answer}</td>
              <td>{(extraCol && item.peers[extraCol]) || ''}</td>
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

  thead th:first-of-type {
    width: 10%;
  }

  thead th:last-of-type {
    width: 25%;
  }
`

export default CommentBreakdown
