import React from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'
import UsersLink from './UsersLink'

const StyledTable = styled(Table)`
  margin: 1em 0;
  border-bottom: 1px solid #dee2e6;
  font-size: 0.9rem;
  td {
    padding: 0.5em 0 0.5em 1em;
  }
  td:last-of-type {
    padding-right: 1em;
    width: 20%;
  }
`

const StatTd = styled.td`
  text-align: right;
  white-space: nowrap;
`

const Tr = styled.tr<{ isFocused: boolean }>`
  background: ${props => (props.isFocused ? '#FFFFD6' : 'inherit')};
`

const ColorBlockTd = styled.td`
  width: 50px;
  box-sizing: content-box;
`

const ColorBlock = styled.div`
  background: ${props => props.color};
  height: 17px;
  width: 50px;
`

type Props = {
  question: string
  data: {
    answer: string
    numUsers: number
    color: string
  }[]
  focusIndex: number | undefined
}

const BreakdownTable: React.FunctionComponent<Props> = ({
  question,
  data,
  focusIndex
}) => {
  const totalUsers = data.reduce((a, c) => c.numUsers + a, 0)

  const tableData = data.map(item => {
    return {
      percent: Math.round((100 * item.numUsers) / totalUsers),
      ...item
    }
  })

  return (
    <StyledTable>
      <tbody>
        {tableData.map((d, i) => (
          <Tr key={d.answer} isFocused={focusIndex === i}>
            <ColorBlockTd>
              <ColorBlock color={d.color} />
            </ColorBlockTd>
            <td>{d.answer}</td>
            <StatTd>{d.percent}%</StatTd>
            <StatTd>
              <UsersLink number={d.numUsers} question={question} answer={d.answer} />
            </StatTd>
          </Tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default BreakdownTable
