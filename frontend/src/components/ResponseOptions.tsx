import React from 'react';

import Form from 'react-bootstrap/Form';
import ChatContextMenu from './ChatContextMenu';
import { Response } from '../types';

type State = {
    responseDraft: string;
};

type Props = {
    item: Response;
    appendResponseOption: (option: string) => void;
    editNav: (i: number) => (newVal: number) => void;
};

class ResponseOptions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            responseDraft: '',
        }
    };

    submitNewResponse = (event: any) => {
        event.preventDefault();

        this.props.appendResponseOption(this.state.responseDraft);

        this.setState({ responseDraft: '' });
    }

    handleResponseChange = (e: any) => {
        this.setState({ responseDraft: e.target.value });
    };

    render() {
        return (
            <div className="Chat-Container Human">
                <Form onSubmit={this.submitNewResponse} className="Add-Response Inline">
                    <Form.Control
                        className="Chat-Bubble-Input Chat-Bubble-Input-Human"
                        type="text"
                        placeholder="Add another option..."
                        value={this.state.responseDraft}
                        onChange={this.handleResponseChange}
                        autoFocus />
                </Form>

                <div className="Option">
                    {this.props.item.options.map((option, i) => {
                        const bubbleRef: React.RefObject<HTMLDivElement> = React.createRef();
                        return (
                            <div
                                className="Chat-Bubble"
                                key={i}
                                ref={bubbleRef}
                            >
                                <ChatContextMenu onEdit={() => null} container={bubbleRef} onEditNav={this.props.editNav(i)} navigation={option.navigation} />
                                {option.message}
                                {option.navigation
                                    ? <span className="Navigation">
                                        {option.navigation}
                                    </span>
                                    : null}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
export default ResponseOptions;