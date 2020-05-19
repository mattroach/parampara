import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux'
import CopyShareUrl from './CopyShareUrl'
import CopyEmbedCode from './CopyEmbedCode'

const ShareDetails: React.FunctionComponent = () => {
  const { hasUnpublishedChanges, isPublished } = useSelector(
    state => state.scriptStore.script!
  )

  return (
    <>
      <h4>Share your Parampara</h4>
      {isPublished ? (
        <p>You can share your Parampara via the URL below.</p>
      ) : (
        <p>
          Once you're done creating your Parampara, you will be able to share it here.
          Click the 'Create' button on the top right!
        </p>
      )}
      {isPublished && hasUnpublishedChanges && (
        <Alert variant="warning">
          You have unpublished changes! Click "Update" on the top right to make them live.
        </Alert>
      )}
      {isPublished ? (
        <>
          <CopyShareUrl />
          <h5 style={{ marginTop: 24 }}>Embed in a web page</h5>
          <p>Use this html code to embed your Parampara directly into a web page.</p>
          <CopyEmbedCode />
        </>
      ) : (
        <Alert variant="danger">
          You must create your Parampara before you can share it.
        </Alert>
      )}
    </>
  )
}

export default ShareDetails
