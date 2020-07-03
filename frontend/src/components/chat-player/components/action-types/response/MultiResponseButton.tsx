import React from 'react'

import styled, { css } from 'styled-components'
import ResponseButton from './ResponseButton'

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  vertical-align: top;
  margin: 4px 8px 0 0;
  cursor: pointer;
`

const StyledResponseButton = styled(ResponseButton)<{ selected: boolean }>`
  ${props =>
    props.selected &&
    css`
      color: #fff !important;
      background: #006bfa !important;
    `}
`

type Props = {
  selected: boolean
  onToggle: (selected: boolean) => void
}

const MultiResponseButton: React.FunctionComponent<Props> = ({
  children,
  selected,
  onToggle
}) => (
  <StyledResponseButton onClick={() => onToggle(!selected)} selected={selected}>
    <Checkbox checked={selected} onChange={() => undefined} />
    {children}
  </StyledResponseButton>
)

export default MultiResponseButton
