import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveAndUpdatePartialScript } from 'store/slices/script'
import { AppDispatch } from 'store/store'
import { Script } from 'types/scriptTypes'
import View from './View'

const matchesStore = (formValue: string, storeValue: string | null) => {
  if (!storeValue) return !formValue
  return formValue === storeValue
}
const toStoreValue = (formValue: string): string | null => {
  if (!formValue) return null
  return formValue
}

const getImageDimensions = (url: string): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', function() {
      resolve({ width: this.naturalWidth, height: this.naturalHeight })
    })
    img.addEventListener('error', function() {
      reject('Could not load image')
    })
    img.src = url
  })

const OGConfig: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const defaultTitle = useSelector(state => state.scriptStore.script!.title)
  const { metaTitle, metaImgUrl, metaDescription } = useSelector(
    state => state.scriptStore.script!
  )

  const [imageUrl, setImageUrl] = useState(metaImgUrl || '')
  const [title, setTitle] = useState(metaTitle || '')
  const [description, setDescription] = useState(metaDescription || '')

  const unsavedChanges =
    !matchesStore(imageUrl, metaImgUrl) ||
    !matchesStore(title, metaTitle) ||
    !matchesStore(description, metaDescription)

  const [isSaving, setIsSaving] = useState(false)
  const [imgError, setImgError] = useState(false)

  const submit = async () => {
    setIsSaving(true)
    setImgError(false)

    let ogData: Partial<Script> = {}
    if (!matchesStore(imageUrl, metaImgUrl)) {
      if (imageUrl) {
        try {
          const { width, height } = await getImageDimensions(imageUrl)

          ogData = {
            metaImgUrl: imageUrl,
            metaImgWidth: width,
            metaImgHeight: height
          }
        } catch (e) {
          setImgError(true)
          setIsSaving(false)
        }
      } else {
        ogData = {
          metaImgUrl: null,
          metaImgWidth: null,
          metaImgHeight: null
        }
      }
    }

    await dispatch(
      saveAndUpdatePartialScript({
        ...ogData,
        metaTitle: toStoreValue(title),
        metaDescription: toStoreValue(description)
      })
    )
    setIsSaving(false)
  }

  return (
    <View
      submit={submit}
      imageUrl={imageUrl}
      updateImageUrl={setImageUrl}
      defaultTitle={defaultTitle}
      title={title}
      updateTitle={setTitle}
      description={description}
      updateDescription={setDescription}
      unsavedChanges={unsavedChanges}
      isSaving={isSaving}
      imgError={imgError}
    />
  )
}

export default OGConfig
