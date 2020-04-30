import React from 'react'
import styled from 'styled-components'
import logoSrc from './parampara-logo.svg'
import Button from './Button'

const Logo = styled.img.attrs({ src: logoSrc, alt: 'Parampara' })`
  height: 0.6em;
  vertical-align: baseline;
  margin-left: 1px;
`

type Props = {
  onClick: () => void
}

const CreateParamparaButton: React.FunctionComponent<Props> = ({ onClick }) => (
  <Button onClick={onClick}>
    Create a <Logo />
  </Button>
)

export default CreateParamparaButton
