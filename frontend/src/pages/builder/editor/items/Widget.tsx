import MaterialIcon from 'material-icons-react'
import React from 'react'
import styled from 'styled-components'
import { ResponseBubble } from './styles'


const ItemWrap = styled.div`
  margin: 20px 0; 
  text-align: right;
`

const Bubble = styled(ResponseBubble)`
  box-shadow: none;
  font-style: italic;
  i {
    vertical-align: middle;
    margin-right: 8px;
  }
`

type State = {
}

type Props = {
  icon: string
  title: string
}

class Widget extends React.Component<Props, State> {

  render() {
    const { children } = this.props

    return (
      <ItemWrap>
        <Bubble>
          {children}
          <MaterialIcon icon={this.props.icon} size={20} color="#006bfa" />
          {this.props.title}
        </Bubble>
      </ItemWrap>
    )
  }
}

export default Widget