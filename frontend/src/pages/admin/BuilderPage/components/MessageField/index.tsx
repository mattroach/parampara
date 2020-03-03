import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-radius: 15px;
  background: rgb(239, 239, 239);
`

type Props = {}

const MessageField: React.FunctionComponent<Props> = ({ children }) => {
  // const statevar = useSelector((state: RootState) => state..)
  // const [show, setShow] = useState(false)
  // const dispatch = useDispatch()

  return <Wrapper>{children}</Wrapper>
}

export default MessageField
