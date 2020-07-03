import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const ResponseButton = styled(Button).attrs({ variant: 'link' })`
  border-radius: 15px;
  padding: 7px 15px;
  line-height: 1.3;

  border-color: #006bfa;
  margin: 4px 8px 4px 0;

  color: #006bfa !important;
  box-shadow: 0px 2px 6px #d9d9d9 !important;
  text-decoration: none !important;
`

export default ResponseButton
