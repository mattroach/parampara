import React from 'react'
import styled from 'styled-components';
import { MessageItem } from '../../../../types/scriptTypes';

export const Wrapper = styled.div`
  margin: 10px 0;
`;

export const Bubble = styled.span`
  display: inline-block;
  background-color: #efefef;
  border-radius: 15px;
  padding: 7px 13px;
  max-width: 75%;
  line-height: 1.3;
`;

const BotMessage: React.FunctionComponent<{ item: MessageItem }> = ({ item }) => {
  return <Wrapper>
    <Bubble>{item.message}</Bubble>
  </Wrapper>
}

export default BotMessage;