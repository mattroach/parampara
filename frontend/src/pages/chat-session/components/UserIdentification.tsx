import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import BotMessage from './item-types/BotMessage';
import TextInput from './item-types/TextInput';
import HumanBubble from './item-types/HumanBubble';
import { loadProgress } from '../../../store/slices/sessionProgress';

type State = {
  askEmail: boolean;
  email?: string;
};

type Props = {
  loadProgress: typeof loadProgress
} & ReturnType<typeof mapStateToProps>;

class UserIdentification extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      askEmail: false
    }
  }

  componentDidMount() {
    if (!this.props.allowAnon) {
      setTimeout(() => {
        this.setState({ askEmail: true })
      }, 2000)
    }
  }

  onSubmit = (email: string) => {
    this.setState({ email, askEmail: false })
    
    this.props.loadProgress(this.props.scriptId, email)
  }

  render() {
    const { allowAnon } = this.props;
    if (allowAnon)
      return null;
    
    const {email} = this.state

    return (
      <>
        <BotMessage message="What's your email address?" />
        {this.state.askEmail && <TextInput placeholder="Type email" onSubmit={this.onSubmit} />}
        {email && <HumanBubble message={email} />}
      </>
    )
  }
}

function mapStateToProps(state: RootState) {
  const { script } = state.scriptStore;

  if (!script)
    throw new Error('Script should be loaded');
  

  return { allowAnon: script.allowAnon, scriptId: script.scriptId }
}

// @ts-ignore
export default connect(mapStateToProps, {loadProgress})(UserIdentification)