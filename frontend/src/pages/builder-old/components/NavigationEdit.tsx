import React, { RefObject } from 'react';

import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay';
import Form from 'react-bootstrap/Form';

type State = {
    draftValue: string;
};

type Props = {
    defaultValue: number;
    onEdit: (newVal: number) => void;
    container: RefObject<HTMLDivElement>;
    show: boolean;
};

class NavigationEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            draftValue: props.defaultValue + ''
        }
    };

    submitEdit = (event: any) => {
        event.preventDefault();

        this.props.onEdit(parseInt(this.state.draftValue));
    }

    editValue = (e: any) => {
        this.setState({ draftValue: e.target.value });
    };

    handleFocus = (event: any) => {
        event.target.select();
    };

    render() {
        const container = this.props.container.current || undefined;

        if (!this.props.show) return null;

        return (
            <Overlay
                show={this.props.show}
                target={container}
                placement="bottom"
                container={container}
            >
                <Popover id="popover-basic">
                    <Popover.Content>
                        <Form onSubmit={this.submitEdit}>
                            Navigate to ID
                            <Form.Control
                                className="Navigation-Input"
                                value={this.state.draftValue}
                                onChange={this.editValue}
                                onFocus={this.handleFocus}
                                autoFocus />
                        </Form>
                    </Popover.Content>
                </Popover>
            </Overlay>
        );
    }
}

export default NavigationEdit;