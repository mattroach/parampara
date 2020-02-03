import React from 'react'

import styled from 'styled-components'

import Spinner from 'react-bootstrap/Spinner'


const Wrapper = styled.div`
  text-align: center;
`

type State = {

}

export default class Loader extends React.Component<{}, State> {

  componentDidMount() {
    //should wait 100ms before showing the spinner
  }

  render() {
    return (
      <Wrapper><Spinner animation="border" /></Wrapper>
    )
  }
}
