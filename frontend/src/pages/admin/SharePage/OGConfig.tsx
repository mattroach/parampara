import AppButton from 'components/AppButton'
import React, { ChangeEvent, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { saveAndUpdatePartialScript } from 'store/slices/script'
import { AppDispatch } from 'store/store'

const matchesStore = (formValue: string, storeValue: string | null) => {
  if (!storeValue) return !formValue
  return formValue === storeValue
}
const toStoreValue = (formValue: string): string | null => {
  if (!formValue) return null
  return formValue
}

const OGConfig: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const defaultTitle = useSelector((state: RootState) => state.scriptStore.script!.title)
  const { metaTitle, metaImgUrl, metaDescription } = useSelector(
    (state: RootState) => state.scriptStore.script!
  )

  const [imageUrl, setImageUrl] = useState(metaImgUrl || '')
  const [title, setTitle] = useState(metaTitle || '')
  const [description, setDescription] = useState(metaDescription || '')
  const updateImageUrl = (e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)
  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const updateDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value)

  const unsavedChanges =
    !matchesStore(imageUrl, metaImgUrl) ||
    !matchesStore(title, metaTitle) ||
    !matchesStore(description, metaDescription)

  const [isSaving, setIsSaving] = useState(false)

  const submit = (e: any) => {
    e.preventDefault()
    setIsSaving(true)
    dispatch(
      saveAndUpdatePartialScript({
        metaImgUrl: toStoreValue(imageUrl),
        metaTitle: toStoreValue(title),
        metaDescription: toStoreValue(description)
      })
    ).then(() => setIsSaving(false))
  }

  return (
    <>
      <h5>Social configuration</h5>
      <p>
        Configure the way your Parampara appears when shared on social apps like Facebook,
        LinkedIn, WhatsApp and SMS.
      </p>
      <Form onSubmit={submit}>
        <Form.Group as={Row} controlId="metaImage">
          <Form.Label column sm={3}>
            Meta Image
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              placeholder="Image URL..."
              value={imageUrl}
              onChange={updateImageUrl}
            />
            <Form.Text className="text-muted">
              This image will show up when the Parampara is shared on social media.
              Minimum dimensions are 600 x 315 pixels but must not exceed 8MB.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="metaTitle">
          <Form.Label column sm={3}>
            Meta Title
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              placeholder={defaultTitle}
              value={title}
              onChange={updateTitle}
            />

            <Form.Text className="text-muted">
              If you want a custom title (different from the title of this Parampara) for
              sharing on social media, put it here.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="metaDescription">
          <Form.Label column sm={3}>
            Meta Description
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              placeholder="Parampara - Interactive communication made simple."
              value={description}
              onChange={updateDescription}
            />
            <Form.Text className="text-muted">
              This will appear below the name of your Parampara.
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

export default OGConfig
