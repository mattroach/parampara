import React from 'react'
import { useSelector } from 'react-redux'
import { getSubscription } from 'store/slices/admin'
import Insights from './Insights'
import UpgradeMessage from './UpgradeMessage'

const InsightsPage: React.FunctionComponent = () => {
  const subscription = useSelector(state => getSubscription(state.adminStore))

  if (subscription.canViewInsights()) {
    return <Insights />
  }

  return <UpgradeMessage />
}

export default InsightsPage
