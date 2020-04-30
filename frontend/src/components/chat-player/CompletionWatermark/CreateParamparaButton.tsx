import React from 'react'
import styled from 'styled-components'
import ItemWrap from '../components/item-types/ItemWrap'
import ResponseButton from '../components/action-types/ChooseResponse/ResponseButton'
import logoSrc from './parampara-logo.svg'

const Wrapper = styled(ItemWrap)`
  text-align: center;
`

const Logo = styled.img.attrs({ src: logoSrc, alt: 'Parampara' })`
  height: 0.6em;
  vertical-align: baseline;
  margin-left: 1px;
`

type Props = {
  onClick: () => void
}

const CreateParamparaButton: React.FunctionComponent<Props> = ({ onClick }) => (
  <Wrapper>
    <ResponseButton onClick={onClick}>
      Create a <Logo />
    </ResponseButton>
  </Wrapper>
)

export default CreateParamparaButton
