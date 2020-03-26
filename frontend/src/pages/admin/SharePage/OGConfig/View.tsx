import AppButton from 'components/AppButton'
import React, { ChangeEvent } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

type Props = {
  submit: () => void
  imageUrl: string
  updateImageUrl: (val: string) => void
  defaultTitle: string
  title: string
  updateTitle: (val: string) => void
  description: string
  updateDescription: (val: string) => void
  unsavedChanges: boolean
  isSaving: boolean
  imgError?: boolean
}

const OGConfigView: React.FunctionComponent<Props> = ({
  submit,
  imageUrl,
  updateImageUrl,
  defaultTitle,
  title,
  updateTitle,
  description,
  updateDescription,
  unsavedChanges,
  isSaving,
  imgError
}) => {
  const updateImageUrl_ = (e: ChangeEvent<HTMLInputElement>) =>
    updateImageUrl(e.target.value)
  const updateTitle_ = (e: ChangeEvent<HTMLInputElement>) => updateTitle(e.target.value)
  const updateDescription_ = (e: ChangeEvent<HTMLInputElement>) =>
    updateDescription(e.target.value)

  const submit_ = (e: any) => {
    e.preventDefault()
    submit()
  }

  return (
    <>
      <h5>Social configuration</h5>
      <p>
        Configure the way your Parampara appears when shared on social apps like Facebook,
        LinkedIn, WhatsApp and SMS.
      </p>
      <Form onSubmit={submit_}>
        <Form.Group as={Row} controlId="metaImage">
          <Form.Label column sm={3}>
            Preview Image
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              placeholder="Image URL"
              value={imageUrl}
              onChange={updateImageUrl_}
              isInvalid={imgError}
            />
            <Form.Control.Feedback type="invalid">
              Could not load image
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Recommended dimensions are 1200 x 630 pixels. Minimum dimensions are 200 x
              200 pixels. Max size is 8MB.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="metaTitle">
          <Form.Label column sm={3}>
            Title
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              placeholder={defaultTitle}
              value={title}
              onChange={updateTitle_}
            />

            <Form.Text className="text-muted">
              If you want a custom title (different from the title of this Parampara) for
              sharing on social media, put it here.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="metaDescription">
          <Form.Label column sm={3}>
            Description
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              placeholder="Parampara - Interactive communication made simple."
              value={description}
              onChange={updateDescription_}
            />
            <Form.Text className="text-muted">
              This will appear below the title of your Parampara.
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 9, offset: 3 }}>
            <AppButton type="submit" disabled={!unsavedChanges} isLoading={isSaving}>
              {unsavedChanges ? 'Save' : 'Saved'}
            </AppButton>
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

export default OGConfigView
