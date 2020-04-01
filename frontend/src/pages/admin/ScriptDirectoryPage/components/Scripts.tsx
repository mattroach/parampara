import React, { useEffect } from 'react'
import styled from 'styled-components'
import CreateScriptButton from './CreateScriptButton'
import ScriptsTable from './ScriptsTable'
import { RootState } from 'store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { loadScripts } from 'store/slices/scripts'
import Spinner from 'react-bootstrap/Spinner'

const AddNewButton = styled.div`
  text-align: right;
  margin: 10px 0;
`

const EmptyState = styled.div`
  color: #777;
`

type Props = {
  adminId: string
}

const Scripts: React.FunctionComponent<Props> = ({ adminId }) => {
  const scriptsLoaded = useSelector((state: RootState) => !!state.scriptsStore.scripts)
  const hasScripts = useSelector(
    (state: RootState) => !!state.scriptsStore.scripts?.length
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadScripts(adminId))
  }, [dispatch, adminId])

  if (!scriptsLoaded) return <Spinner animation="border" />

  if (hasScripts) {
    return (
      <>
        <AddNewButton>
          <CreateScriptButton adminId={adminId} variant="secondary" />
        </AddNewButton>
        <ScriptsTable adminId={adminId} />
      </>
    )
  } else {
    return (
      <EmptyState>
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
        <p>
          Get even more out of your Parampara account. We can help with expert
          copywriting, advanced analytics and on-call support. Head to our{' '}
          <a
            href="https://getparampara.com/pricing.html?r=inapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            pricing page
          </a>{' '}
          for details.
        </p>
        <CreateScriptButton adminId={adminId} />
      </EmptyState>
    )
  }
}

export default Scripts
