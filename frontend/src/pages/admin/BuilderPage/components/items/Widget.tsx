import MaterialIcon from 'material-icons-react'
import React from 'react'
import styled from 'styled-components'
import { BubbleBase, ActionBubble } from './styles'


const ItemWrap = styled.div`
  margin: 20px 0; 
  text-align: right;
`

const Bubble = styled(ActionBubble)`
  box-shadow: none;
  font-style: italic;
  i {
    vertical-align: middle;
    margin-right: 8px;
  }
`

type Props = {
  icon: string
  title: string
}

const Widget: React.FunctionComponent<Props> = ({ children, icon, title }) => {
  return (
    <ItemWrap>
      <BubbleBase>
        {children}
        <Bubble>
          <MaterialIcon icon={icon} size={20} color="#006bfa" />
          {title}
        </Bubble>
      </BubbleBase>
    </ItemWrap>
  )
}

export default Widget