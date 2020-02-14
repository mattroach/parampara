import React, { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { configureAllowAnon } from 'store/slices/script'

const RequireEmailForm: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const allowAnon = useSelector((state: RootState) => state.scriptStore.script!.allowAnon)
  const toggleAllowAnon = (event: ChangeEvent<HTMLInputElement>) => dispatch(configureAllowAnon(!event.target.checked))

  return (
    <>
      <h5>Require email</h5>
      <p>
        If you turn this on, users will be required to provide their email at the start of the Parampara.
        They will be able to resume unfinished Paramparas at a later time, and their emails will be reflected from your results dashboard.
        </p>
      <Form.Check
        type="switch"
        id="require-email"
        label="Require that users provide their email"
        checked={!allowAnon}
        onChange={toggleAllowAnon}
      />
    </>
  )
}

export default RequireEmailForm