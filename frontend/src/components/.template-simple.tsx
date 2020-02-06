import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'

type State = {
}

type Props = {
} & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>

class MyComponent extends React.Component<Props, State> {
  state = {
  }

  render() {
    return (
      <></>
    )
  }
}

const mapDispatchToProps = {}

function mapStateToProps(state: RootState) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)