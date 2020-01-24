import React from 'react'
import styled from 'styled-components';

import { ChooseResponseItem } from '../../../../../types/scriptTypes';

import Button from 'react-bootstrap/Button'

export const Wrapper = styled.div`
  margin: 40px 0;
`;

export const ResponseButton = styled(Button)`
  border-radius: 15px;
  padding: 7px 15px;
  line-height: 1.3;
  
  border-color: #006bfa;
  color: #006bfa;
  box-shadow: 0px 2px 6px #d9d9d9;
  margin-right: 8px;

  :hover, :active, :visited {
    text-decoration: none;
    color: #006bfa;
  }
`;

const ChooseResponse: React.FunctionComponent<{ item: ChooseResponseItem }> = ({ item }) => {
  return <Wrapper>
    {item.responses.map((response) =>
      <ResponseButton variant="link">{response.message}</ResponseButton >
      //<Bubble>{response.message}</Bubble>
    )}
  </Wrapper>
}

export default ChooseResponse;