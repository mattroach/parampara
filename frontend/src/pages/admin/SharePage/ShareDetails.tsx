import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux'
import CopyShareUrl from './CopyShareUrl'

const ShareDetails: React.FunctionComponent = () => {
  const { hasUnpublishedChanges, isPublished } = useSelector(
    state => state.scriptStore.script!
  )

  return (
    <>
      <h4>Share your Parampara</h4>
      {isPublished ? (
        <p>
          You can share your Parampara via the URL below. Don't forget to hit the 'Update'
          button after making any changes to make them live!
        </p>
      ) : (
        <p>
          Once you're done creating your Parampara, you will be able to share it here.
          Click the 'Create' button on the top right!
        </p>
      )}
      {isPublished && hasUnpublishedChanges && (
        <Alert variant="warning">You have unpublished changes to your Parampara!</Alert>
      )}
      {isPublished ? (
        <CopyShareUrl />
      ) : (
        <Alert variant="danger">
          You must create your Parampara before you can share it.
        </Alert>
      )}
    </>
  )
}

export default ShareDetails
