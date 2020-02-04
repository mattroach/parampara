import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import styled from 'styled-components'


const Wrapper = styled.div`
  text-align: center;
  padding: 10px 0;
`

type State = {

}

export default class Loader extends React.Component<{}, State> {

  componentDidMount() {
    //TODO should wait 100ms before showing the spinner to prevent flickering
  }

  render() {
    return (
      <Wrapper><Spinner animation="border" /></Wrapper>
    )
  }
}
