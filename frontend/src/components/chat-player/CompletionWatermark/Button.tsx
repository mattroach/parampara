import React from 'react'
import styled from 'styled-components'
import ItemWrap from '../components/item-types/ItemWrap'
import ResponseButton from '../components/action-types/ChooseResponse/ResponseButton'

const Wrapper = styled(ItemWrap)`
  text-align: center;
`

type Props = {
  onClick: () => void
}

const Button: React.FunctionComponent<Props> = ({ onClick, children }) => (
  <Wrapper>
    <ResponseButton onClick={onClick}>{children}</ResponseButton>
  </Wrapper>
)

export default Button
