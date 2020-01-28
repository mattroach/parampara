import React from 'react'
import styled from 'styled-components';
import { ChooseResponseItemProgress } from '../../../../types/sessionProgress';

export const Wrapper = styled.div`
  margin: 20px 0;

  text-align: right;
`;

export const Bubble = styled.span`
  display: inline-block;
  border-radius: 15px;
  padding: 7px 13px;
  max-width: 75%;
  line-height: 1.3;

  background-color: #0076ff;
  color: white;
`;

const ChosenResponse: React.FunctionComponent<{ itemProgress: ChooseResponseItemProgress }> = ({ itemProgress }) => {
  const { message } = itemProgress.item.responses[itemProgress.progress.choice];

  return <Wrapper>
    <Bubble>{message}</Bubble>
  </Wrapper>
}

export default ChosenResponse;