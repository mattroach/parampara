import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const ResponseButton = styled(Button).attrs({ variant: 'link' })`
  border-radius: 15px;
  padding: 7px 15px;
  line-height: 1.3;

  border-color: #006bfa;
  color: #006bfa;
  box-shadow: 0px 2px 6px #d9d9d9;
  margin: 4px 8px 4px 0;

  :hover,
  :active,
  :visited {
    text-decoration: none;
    color: #006bfa;
  }
`

export default ResponseButton
