import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import api from '../../api'
import AuthContext from 'superadmin/AuthContext'

type Props = {
  userId: string
  isPro: boolean
}

const ProToggle: React.FunctionComponent<Props> = ({ userId, isPro }) => {
  const password = useContext(AuthContext)

  const onChange = async () => {
    await api(password!).toggleSubscription(userId, !isPro)
    window.location.reload()
  }

  return (
    <Form.Check
      type="switch"
      id={`toggle-pro-${userId}`}
      label={isPro ? 'Pro' : 'Free'}
      checked={isPro}
      onChange={onChange}
    />
  )
}

export default ProToggle
