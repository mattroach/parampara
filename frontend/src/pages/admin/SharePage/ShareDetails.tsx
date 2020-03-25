import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import CopyShareUrl from './CopyShareUrl'

const ShareDetails: React.FunctionComponent = () => {
  const hasUnpublishedChanges = useSelector(
    (state: RootState) => state.scriptStore.script!.hasUnpublishedChanges
  )

  return (
    <>
      <h4>Share your Parampara</h4>
      <p>
        Once you're done creating your Parampara, you can share it via the URL below.
        Don't forget to hit the "Publish" button after you make any changes!
      </p>
      {hasUnpublishedChanges && (
        <Alert variant="warning">You have unpublished changes to your Parampara.</Alert>
      )}
      <CopyShareUrl />
    </>
  )
}

export default ShareDetails
