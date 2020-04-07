import MaterialIcon from 'material-icons-react'
import React from 'react'
import styled from 'styled-components'
import { BubbleBase, ActionBubble } from '../items/styles'

const ItemWrap = styled.div`
  margin: 10px 0 40px;
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
  menu: () => void
}

const MacroAction: React.FunctionComponent<Props> = ({ children, icon, menu }) => {
  return (
    <ItemWrap>
      <BubbleBase>
        {menu()}
        <Bubble>
          <MaterialIcon icon={icon} size={20} color="#006bfa" />
          {children}
        </Bubble>
      </BubbleBase>
    </ItemWrap>
  )
}

export default MacroAction
