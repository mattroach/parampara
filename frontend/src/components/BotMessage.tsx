import React from 'react';

import Form from 'react-bootstrap/Form';
import ChatContextMenu from './ChatContextMenu';


type State = {
    editMode: boolean;
    messageDraft: string;
    messageDraftHeight: number;
};

type Props = {
    message: string;
    submitEdit: (message: string) => void;
};

class BotMessage extends React.Component<Props, State> {
    bubbleRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            editMode: false,
            messageDraft: '',
            messageDraftHeight: 0
        }

        this.bubbleRef = React.createRef();
    };

    edit = () => {
        if (this.bubbleRef.current === null) {
            throw new Error("No div found with a height");
        }
        this.setState({
            editMode: true,
            messageDraft: this.props.message,
            messageDraftHeight: this.bubbleRef.current.clientHeight
        });
    }

    cancel = () => {
        this.setState({ editMode: false });
    }

    submitEdit = (event: any) => {
        event.preventDefault();
        this.props.submitEdit(this.state.messageDraft)
        this.setState({ editMode: false });
    };

    handleMessageChange = (event: any) => {
        this.setState({ messageDraft: event.target.value });
    };

    handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.submitEdit(event);
        }
    }

    render() {
        return (
            <div className="Chat-Container Bot">
                {this.state.editMode
                    ? <Form onSubmit={this.submitEdit} className="Inline">
                        <Form.Control
                            as="textarea"
                            className="Chat-Bubble-Input"
                            type="textarea"
                            value={this.state.messageDraft}
                            onChange={this.handleMessageChange}
                            onBlur={this.cancel}
                            onKeyPress={this.handleKeyPress}
                            rows={Math.round((this.state.messageDraftHeight - 14) / 22.0)}
                            autoFocus />
                    </Form>
                    : <div className="Chat-Bubble"
                        onClick={this.edit}
                        ref={this.bubbleRef}>
                        <ChatContextMenu onEdit={this.edit} container={this.bubbleRef} onEditNav={() => null} />
                        {this.props.message}
                    </div>
                }
            </div>
        );
    }
}

export default BotMessage;