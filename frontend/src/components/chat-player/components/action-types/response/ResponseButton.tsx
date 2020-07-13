import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const ResponseButton = styled(Button).attrs({ variant: 'link' })`
  border-radius: 15px;
  padding: 7px 15px;
  line-height: 1.3;

  border-color: #006bfa;
  margin: 4px 8px 4px 0;

  color: #006bfa !important;
  text-decoration: none !important;
  box-shadow: 0px 2px 6px #d9d9d9;

  transition: box-shadow 0.15s ease-in-out;
  :focus,
  :focus-within {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export default ResponseButton
