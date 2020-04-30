import React from 'react'
import styled from 'styled-components'
import ItemWrap from '../components/item-types/ItemWrap'

const Wrapper = styled(ItemWrap)`
  text-align: center;
  font-size: 0.8rem;
  color: var(--gray);
`
const Message: React.FunctionComponent = () => (
  <Wrapper>
    You have completed this{' '}
    <a href="http://getparampara.com/" target="_blank" rel="noopener noreferrer">
      Parampara
    </a>
    .<br />
    Now create your own! It's free and easy.
  </Wrapper>
)

export default Message
