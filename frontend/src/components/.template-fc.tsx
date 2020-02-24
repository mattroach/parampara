import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
`

type Props = {
}

const MyComp: React.FunctionComponent<Props> = ({ children }) => {
  // const statevar = useSelector((state: RootState) => state..)
  // const [show, setShow] = useState(false)
  // const dispatch = useDispatch()

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default MyComp