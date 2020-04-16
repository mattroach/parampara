import React from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'

type Props = {
  data: {
    answer: string
    numUsers: number
    color: string
  }[]
  focusIndex: number | undefined
}

const BreakdownTable: React.FunctionComponent<Props> = ({ data, focusIndex }) => {
  const totalUsers = data.reduce((a, c) => c.numUsers + a, 0)

  const tableData = data.map(item => {
    return {
      percent: Math.round((100 * item.numUsers) / totalUsers),
      ...item
    }
  })

  return (
    <Table>
      <tbody>
        {tableData.map((d, i) => (
          <Tr key={d.answer} isFocused={focusIndex === i}>
            <ColorBlockTd>
              <ColorBlock color={d.color} />
            </ColorBlockTd>
            <td>{d.answer}</td>
            <StatTd>{d.percent}%</StatTd>
            <StatTd>
              {d.numUsers} user{d.numUsers > 1 ? 's' : ''}
            </StatTd>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}

const StatTd = styled.td`
  text-align: right;
`

const Tr = styled.tr<{ isFocused: boolean }>`
  background: ${props => (props.isFocused ? '#FFFFD6' : 'inherit')};
`

const ColorBlockTd = styled.td`
  width: 70px;
  box-sizing: content-box;
`

const ColorBlock = styled.div`
  background: ${props => props.color};
  height: 1.5em;
  width: 70px;
  margin-top: 0px;
`

export default BreakdownTable
