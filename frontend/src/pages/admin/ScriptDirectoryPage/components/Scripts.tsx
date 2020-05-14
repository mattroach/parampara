import React, { useEffect } from 'react'
import styled from 'styled-components'
import CreateScriptButton from './CreateScriptButton'
import ScriptsTable from './ScriptsTable'
import { useSelector, useDispatch } from 'react-redux'
import { loadScripts } from 'store/slices/scripts'
import Spinner from 'react-bootstrap/Spinner'
import { getSubscription } from 'store/slices/admin'

const AddNewButton = styled.div`
  text-align: right;
  margin: 10px 0;
`

const Scripts: React.FunctionComponent = () => {
  const scriptsLoaded = useSelector(state => !!state.scriptsStore.scripts)
  const hasScripts = useSelector(state => !!state.scriptsStore.scripts?.length)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadScripts())
  }, [dispatch])

  if (!scriptsLoaded) return <Spinner animation="border" />

  if (!hasScripts) return <EmptyState />

  return (
    <>
      <UpgradeNote />
      <AddNewButton>
        <CreateScriptButton variant="secondary" />
      </AddNewButton>
      <ScriptsTable />
    </>
  )
}

const EmptyStateWrapper = styled.div`
  color: #777;
`

const EmptyState = () => (
  <EmptyStateWrapper>
    <p>Welcome to your Parampara Creator!</p>
    <p>
      If you'd like us to walk you through how to write a Parampara, click{' '}
      <a
        href="https://www.youtube.com/embed/N0vpBvK6hm8"
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>{' '}
      for a quick video tutorial and a step by step guide. You can always come back to
      this later in the menu at the top right of this page.
    </p>
    <UpgradeNote />
    <CreateScriptButton />
  </EmptyStateWrapper>
)

const UpgradeNote = () => {
  const isFree = useSelector(state => getSubscription(state.adminStore)).isFree()

  if (isFree) return <UpgradeNoteFree />
  return <UpgradeNotePro />
}

const UpgradeNoteFree = () => (
  <p>
    Get even more out of your Parampara account. We can help with expert copywriting,
    advanced analytics and on-call support. Head to our{' '}
    <a
      href="https://getparampara.com/pricing.html?r=inapp"
      target="_blank"
      rel="noopener noreferrer"
    >
      pricing page
    </a>{' '}
    for details.
  </p>
)

const UpgradeNotePro = () => (
  <p>
    Get even more out of your Parampara Pro account. We can help with{' '}
    <a
      href="https://getparampara.com/pricing.html?r=inapp#addons"
      target="_blank"
      rel="noopener noreferrer"
    >
      expert copywriting
    </a>{' '}
    and are available for <a href="tel:+61400446410">on-call support</a> if you'd like to
    chat.  
  </p>
)

export default Scripts
