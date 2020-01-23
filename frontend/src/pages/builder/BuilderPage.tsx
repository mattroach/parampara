import React from 'react';
import './Builder.css';

import Form from 'react-bootstrap/Form';

import MaterialIcon from 'material-icons-react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import ResponseOptions from './components/ResponseOptions';
import BotMessage from './components/BotMessage';
import { Item, Option } from '../../types';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import MacroItem from './components/MacroItem';

type State = {
  items: Item[];
  messageDraft: string;
  responseDraft: string;
};

class BuilderPage extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      messageDraft: '',
      responseDraft: '',
      items: [
        {
          type: 'bot',
          message: 'Welcome to Parampara!'
        },
        {
          type: 'bot',
          message: 'Parampara is sort of like text messaging 🤳'
        },
        {
          type: 'bot',
          message: 'We\'ll send you messages and you can respond using the buttons as they appear 👇'
        },
        {
          type: 'human',
          options: [{ message: 'That\'s great', navigation: 6 }, { message: 'Like this one?' }]
        },
        {
          type: 'bot',
          message: 'Exactly like that one. Looks like you\'ve got the hang of this already.'
        },
        {
          type: 'bot',
          message: 'It is pretty great hey!'
        }
      ]
    };
  }

  submitNewBotMessage = (event: any) => {
    event.preventDefault();

    const newMessages = this.state.items.concat([{
      type: 'bot',
      message: this.state.messageDraft
    }]);

    this.setState({ messageDraft: '', items: newMessages });

  }

  handleMessageChange = (e: any) => {
    this.setState({ messageDraft: e.target.value });
  };

  submitNewResponse = (event: any) => {
    event.preventDefault();

    const newMessages = this.state.items.concat([{
      type: 'human',
      options: [{ message: this.state.responseDraft }]
    }]);

    this.setState({ responseDraft: '', items: newMessages });
  }

  submitMessageEdit = (i: number) => (message: string) => {
    if (this.state.items[i].type !== 'bot')
      throw new Error("Trying to update message on non-bot");

    this.setState({
      items: [
        ...this.state.items.slice(0, i),
        { type: 'bot', message },
        ...this.state.items.slice(i + 1),
      ]
    });

  }

  appendResponseOption(i: number): (optionMessage: string) => void {

    return (optionMessage) => {
      const item = this.state.items[i];

      if (item.type !== 'human')
        throw new Error("Trying to add a response option to a non-response.");

      const newOptions = [{ message: optionMessage }].concat(item.options);

      this.setState({
        items: [
          ...this.state.items.slice(0, i),
          { type: 'human', options: newOptions },
          ...this.state.items.slice(i + 1),
        ]
      });

    };
  }

  editOptionNav = (itemIndex: number) => (optionIndex: number) => (newVal: number) => {

    const { items } = this.state;
    const item = items[itemIndex];

    if (item.type !== 'human')
      throw new Error("Trying to add a response option to a non-response.");

    const newOptions: Option[] = [
      ...item.options.slice(0, optionIndex),
      { navigation: newVal, message: item.options[optionIndex].message },
      ...item.options.slice(optionIndex + 1),
    ]


    this.setState({
      items: [
        ...items.slice(0, itemIndex),
        { type: 'human', options: newOptions },
        ...items.slice(itemIndex + 1),
      ]
    });
  }

  handleResponseChange = (e: any) => {
    this.setState({ responseDraft: e.target.value });
  };

  showAddResponse() {
    return this.state.items[this.state.items.length - 1].type !== 'human';
  }

  getItem(item: Item, index: number) {
    if (item.type === 'bot')
      return <BotMessage
        message={item.message}
        submitEdit={this.submitMessageEdit(index)} />;

    if (item.type === 'human')
      return <ResponseOptions
        item={item}
        editNav={this.editOptionNav(index)}
        appendResponseOption={this.appendResponseOption(index)} />;

    if (item.type === 'macro')
      return <MacroItem
        item={item} />

    throw new Error('Unknown item type');

  }

  addMacro = (icon: string, title: string) => (event: any) => {
    event.preventDefault();

    const newItems = this.state.items.concat([{
      type: 'macro',
      icon, title
    }]);

    this.setState({ items: newItems });
  }

  render() {
    return (
      <div className="App">
        <div className="Chat-Box">
          <>
            {this.state.items.map((item, i) =>
              <div key={i} className="Row-Item">
                <span className={"Line-Number" + (item.type === 'bot' ? ' Bot' : '')}>{i + 1}</span>
                {this.getItem(item, i)}
              </div>
            )}
          </>

          <div className="Controls">
            
              <Form onSubmit={this.submitNewResponse} className="Add-Response New">
                <DropdownButton id="dropdown-basic-button" variant="link" className="Input-Action Macros" title={<MaterialIcon icon="add_circle" size={35} />}>
                  <Dropdown.Item href="#" onClick={this.addMacro('comment', 'Collect a comment')}>Collect a comment</Dropdown.Item>
                <Dropdown.Item href="#" onClick={this.addMacro('email', 'Email a document')}>Send a document</Dropdown.Item>
                <Dropdown.Item href="#" onClick={this.addMacro('star', 'Ask for a rating')}>Ask for a rating</Dropdown.Item>
              </DropdownButton>
              {this.showAddResponse() &&
                <Form.Control
                  className="Chat-Bubble-Input Chat-Bubble-Input-Human"
                  type="text"
                  placeholder="Add a response option..."
                  value={this.state.responseDraft}
                  onChange={this.handleResponseChange} />}
              </Form>

            <Form onSubmit={this.submitNewBotMessage}>
              <OverlayTrigger overlay={(props: any) => <Tooltip {...props}>Choose a gif</Tooltip>}>
                <Button variant="link" className="Input-Action"><MaterialIcon icon="gif" size={40} /></Button>
              </OverlayTrigger>
              <Form.Control
                className="Chat-Bubble-Input"
                type="text"
                placeholder="Add a message..."
                value={this.state.messageDraft}
                onChange={this.handleMessageChange}
                autoFocus />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default BuilderPage;
