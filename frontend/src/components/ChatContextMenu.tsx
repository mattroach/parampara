import React, { RefObject } from 'react';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import NavigationEdit from './NavigationEdit';

type State = {
    editingNav: boolean;
};

type Props = {
    navigation?: number,
    onEdit: () => void;
    onEditNav: (newVal: number) => void;
    container: RefObject<HTMLDivElement>;
};

class ChatContextMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editingNav: false
        }
    };

    onEditNav = () => {
        this.setState({ editingNav: true });
    }

    saveNavChanges = (newVal: number) => {
        this.setState({ editingNav: false }); 
        this.props.onEditNav(newVal);
    }

    preventPropogation = (event: any) => {
        event.stopPropagation();
    }

    render() {
        return (
            <>
                <NavigationEdit
                    defaultValue={this.props.navigation || 0}
                    container={this.props.container}
                    show={this.state.editingNav}
                    onEdit={this.saveNavChanges} />
                <DropdownButton
                    id="dropdown-edit-item"
                    title=""
                    className="Context-Menu"
                    onClick={this.preventPropogation}
                >
                    <Dropdown.Item as="button">Delete</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.props.onEdit}>Edit message</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.onEditNav}>{this.props.navigation ? 'Edit' : 'Add'} navigation</Dropdown.Item>
                </DropdownButton>
            </>
        );
    }
}

export default ChatContextMenu;