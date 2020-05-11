import React, { useContext, ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import api from '../../api'
import AuthContext from 'superadmin/AuthContext'
import { SubscriptionTier } from 'types/adminTypes'

type Props = {
  userId: string
  tier: SubscriptionTier
}

const SubscriptionTierSelect: React.FunctionComponent<Props> = ({ userId, tier }) => {
  const password = useContext(AuthContext)

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    await api(password!).toggleSubscription(userId, value)
    window.location.reload()
  }

  return (
    <Form.Control as="select" size="sm" value={tier} onChange={onChange}>
      {Object.entries(SubscriptionTier).map(([key, val]) => (
        <option value={val}>{key}</option>
      ))}
    </Form.Control>
  )
}

export default SubscriptionTierSelect
