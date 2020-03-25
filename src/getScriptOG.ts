import scriptService from './services/ScriptService'

const getScriptOG = async (scriptId: string) => {
  const script = await scriptService.getScript(scriptId)

  const headers = {
    title: script.metaTitle || script.title,
    description: script.metaDescription,
    image: script.metaImgUrl
  }

  return Object.entries(headers)
    .filter(([key, value]) => value)
    .map(
      ([key, value]) =>
        `<meta property="og:${key}" content="${sanitizeAttribute(value as string)}" />`
    )
    .join()
}

const sanitizeAttribute = (att: string) => att.replace(/"/g, '&quot;')

export default getScriptOG
