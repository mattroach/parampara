import React from 'react'
import styled from 'styled-components';
import { MessageItem } from '../../../../types/scriptTypes';
import ItemWrap from './ItemWrap';

const Bubble = styled.span`
  display: inline-block;
  background-color: #efefef;
  border-radius: 15px;
  padding: 7px 13px;
  line-height: 1.3;
`;

const BotMessage: React.FunctionComponent<{ item: MessageItem }> = ({ item }) => {
  return (
    <ItemWrap>
      <Bubble>{item.message}</Bubble>
    </ItemWrap>
  ) 
}

export default BotMessage;