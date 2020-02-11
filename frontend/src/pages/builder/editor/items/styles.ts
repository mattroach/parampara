import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

export const BubbleBase = styled.div`
  display: inline-block;
  border-radius: 15px;
  padding: 7px 13px;
  line-height: 1.3;

  :hover .item-menu > button {
    display: inline;
  }
`

export const BotBubble = styled(BubbleBase)`
  max-width: 400px;
  background-color: #efefef;
  color: black;
`
export const ActionBubble = styled(BubbleBase)`
  border: 1px solid #006bfa;
  color: #006bfa;
  margin-left: 4px; 
  box-shadow: 0px 2px 6px #d9d9d9;

  padding: 5px 13px;
  line-height: 1.5;
`

export const BubbleFieldBase = styled(Form.Control)`
  border-radius: 15px;
  padding: 7px 13px;
  line-height: 1.3;
  transition: width 100ms;
  
  resize: none; 
  border: none;

  :focus {
    box-shadow: none;
    outline: none;
  }
`

export const EditField = styled(BubbleFieldBase)`
  width: 400px;
  background-color: #efefef;
  color: #333;
  display: block;

  :focus {
    color: #333;
    background-color: #efefef;
  }
`

export const ResponseAddField = styled(BubbleFieldBase)`
  background-color: #0076ff;
  color: white;
  display: inline-block;
  width: 170px;

  :focus {
    width: 240px;
    color: white;
    background-color: #0076ff;
  }

  ::placeholder {
    color: #fff;
    opacity: .6;
  }
`


export const NavId = styled.span`
  vertical-align: middle;
  display: inline-block;
  text-align: center;
  width: 22px;  
  background: #efefef;
  color: rgba(27,31,35,.7);
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
  font-size: 0.8em;
  line-height: 18px;
  border-radius: 100%;
  padding: 2px 0;
  margin-left: 8px;
`