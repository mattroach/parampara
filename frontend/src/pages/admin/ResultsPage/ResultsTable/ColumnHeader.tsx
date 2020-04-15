import React from 'react'
import styled from 'styled-components'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const ColumnWrap = styled.div`
  max-height: 48px;
  overflow: hidden;
`

const ColumnHeader: React.FunctionComponent<{ content: string }> = ({ content }) => {
  return (
    <th>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id={`tooltip-${content}`}>{content}</Tooltip>}
      >
        <ColumnWrap>{content}</ColumnWrap>
      </OverlayTrigger>
    </th>
  )
}

export default ColumnHeader
