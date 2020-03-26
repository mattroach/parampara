import scriptService from './services/ScriptService'

const getScriptOG = async (scriptId: string) => {
  const script = await scriptService.getScript(scriptId)

  const headers = {
    title: script.metaTitle || script.title,
    description: script.metaDescription,
    image: script.metaImgUrl,
    'image:width': script.metaImgWidth,
    'image:height': script.metaImgHeight,
    type: 'article'
  }

  if (!headers.image) {
    // Default values for the image
    headers.image =
      'https://parampara.s3-ap-southeast-2.amazonaws.com/parampara-og-white.png'
    headers['image:width'] = 1200
    headers['image:height'] = 630
  }

  return Object.entries(headers)
    .filter(([key, value]) => value)
    .map(
      ([key, value]) =>
        `<meta property="og:${key}" content="${sanitizeAttribute(value as string)}" />`
    )
    .join('')
}

const sanitizeAttribute = (att: string | number) => att.toString().replace(/"/g, '&quot;')

export default getScriptOG
