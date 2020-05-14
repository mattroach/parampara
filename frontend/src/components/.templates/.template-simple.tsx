import React from 'react'
import { connect } from 'react-redux'

type State = {}

type Props = {} & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>

class MyComponent extends React.Component<Props, State> {
  state = {}

  render() {
    return <></>
  }
}

const mapDispatchToProps = {}

// @ts-ignore
function mapStateToProps(state: RootState) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
