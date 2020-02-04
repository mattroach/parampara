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
    //TODO should wait 100ms before showing the spinner to prevent flickering
  }

  render() {
    return (
      <Wrapper><Spinner animation="border" /></Wrapper>
    )
  }
}
