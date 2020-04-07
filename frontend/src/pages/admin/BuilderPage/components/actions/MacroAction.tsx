import MaterialIcon from 'material-icons-react'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { BubbleBase, ActionBubble } from '../items/styles'
import ContextMenu from '../ContextMenu'

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
  position: number
  menuItems: () => ReactNode
}

const MacroAction: React.FunctionComponent<Props> = ({
  children,
  icon,
  position,
  menuItems
}) => {
  return (
    <ItemWrap>
      <BubbleBase>
        <ContextMenu htmlId={`${position}-action`}>{menuItems()}</ContextMenu>
        <Bubble>
          <MaterialIcon icon={icon} size={20} color="#006bfa" />
          {children}
        </Bubble>
      </BubbleBase>
    </ItemWrap>
  )
}

export default MacroAction
