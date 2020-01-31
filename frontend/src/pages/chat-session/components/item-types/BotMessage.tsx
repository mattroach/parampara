import React from 'react'
import styled from 'styled-components';
import ItemWrap from './ItemWrap';

const Bubble = styled.span`
  display: inline-block;
  background-color: #efefef;
  border-radius: 15px;
  padding: 7px 13px;
  line-height: 1.3;
`;

const BotMessage: React.FunctionComponent<{ message: string }> = ({ message }) => {
  return (
    <ItemWrap>
      <Bubble>{message}</Bubble>
    </ItemWrap>
  ) 
}

export default BotMessage;