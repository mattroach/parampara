import React from 'react';

import MaterialIcon from 'material-icons-react';

import { Macro } from '../types';

type State = {
};

type Props = {
  item: Macro;
};

class MacroItem extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {

    }
  };
  render() {
    return (
      <div className="Chat-Container Macro">
        <div className="Bubble">
          <MaterialIcon icon={this.props.item.icon} size={25} />
          {this.props.item.title}
        </div>
      </div>
    );
  }
}

export default MacroItem;