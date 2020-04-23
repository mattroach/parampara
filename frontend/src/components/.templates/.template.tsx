import React from 'react';
import { connect } from 'react-redux';

type State = {

}

type OwnProps = {
  test: string
}

type DispatchProps = typeof mapDispatchToProps
type Props = OwnProps & DispatchProps


class BotControls extends React.Component<Props, State> {
  state = {
  }


  render() {
    return (
      <></>
    )
  }
}
//https://spin.atomicobject.com/2017/04/20/typesafe-container-components/
//https://stackoverflow.com/questions/54155886/how-to-properly-type-a-redux-connect-call

const mapDispatchToProps = {}

export default connect<{}, DispatchProps, OwnProps>
  (null, mapDispatchToProps)(BotControls)