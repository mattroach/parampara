import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

export const BubbleBase = styled.div`
  display: inline-block;
  border-radius: 15px;

  :hover .item-menu > button {
    opacity: 1;
  }
  
  transition: box-shadow 0.15s ease-in-out;
  :focus-within {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); 
  }
`

export const ActionBubble = styled.div`
  border-radius: 15px;
  border: 1px solid #006bfa;
  color: #006bfa;

  padding: 5px 13px;
  line-height: 1.5;
`
export const NestedBubbleFieldBase = styled(Form.Control)`
  padding: 0;
  line-height: 1.3;
  transition: width 100ms;
  background: transparent;
  
  resize: none; 
  border: none;

  :focus {
    box-shadow: none;
    outline: none;
  }
`

export const BubbleFieldBase = styled(NestedBubbleFieldBase)`
  border-radius: 15px;
  padding: 7px 13px;
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
  border: 1px solid #0076ff;
  color: #0076ff;
  display: inline-block;
  width: 170px;

  :focus {
    border: 1px solid #0076ff;
    width: 240px;
  }

  ::placeholder {
    color: #0076ff;
    opacity: .6;
  }
`


export const NavId = styled.span`
  vertical-align: middle;
  display: inline-block;
  text-align: center;
  width: 22px;  
  background: rgba(0, 0, 0, .08);
  color: rgba(27,31,35,.7);
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
  font-size: 0.8em;
  line-height: 18px;
  border-radius: 100%;
  padding: 2px 0;
`