import Script from '@models/Script'
import adminService from '../adminService'
import { uuid } from '@shared'
import ScriptVersion from 'src/models/ScriptVersion'

export enum ScriptVersionCode {
  latest = 'latest',
  draft = 'draft'
}

export const getScriptWithVersion = async (
  scriptId: string,
  versionCode: ScriptVersionCode
) => {
  const script = await Script.query()
    .findById(scriptId)
    .withGraphFetched(`version(${versionCode})`)

  if (!script) return undefined

  if (!script.version) throw Error('Script is not published')

  // Temporary code to hydrate item IDs. These were not set in the early days, but are needed.
  // Should eventually remove
  script.version.items.forEach((item: any) => {
    if (!item.id) item.id = uuid()
  })

  return script
}

type BaseScript = {
  id: string
  title: string
  created: string
  allowAnon: boolean
  version: ScriptVersion
}

const getBaseProps = (script: Script): BaseScript => ({
  id: script.id,
  title: script.title,
  created: script.created,
  version: script.version!,
  allowAnon: script.allowAnon
})

type LatestScript = {
  hasWatermark: boolean
} & BaseScript

export const getLatestScript = async (scriptId: string): Promise<LatestScript> => {
  const script = await getScriptWithVersion(scriptId, ScriptVersionCode.latest)

  if (!script) {
    throw Error('Script not found')
  }

  const admin = await adminService.getById(script.adminId)
  const hasWatermark = admin.subscriptionTier !== 'pro2'
  return {
    ...getBaseProps(script),
    hasWatermark
  }
}

type DraftScript = {
  isPublished: boolean
  hasUnpublishedChanges: boolean

  metaImgUrl: string | null
  metaImgWidth: number | null
  metaImgHeight: number | null
  metaTitle: string | null
  metaDescription: string | null
} & BaseScript

export const getDraftScript = async (scriptId: string): Promise<DraftScript> => {
  const script = await getScriptWithVersion(scriptId, ScriptVersionCode.draft)

  if (!script) {
    throw Error('Script not found')
  }

  // TODO fix this typing..
  const countResult = (await script
    .$relatedQuery('version')
    .count()
    .as('count')) as any

  const isPublished = parseInt(countResult.count) > 1

  const {
    hasUnpublishedChanges,
    metaImgUrl,
    metaImgWidth,
    metaImgHeight,
    metaTitle,
    metaDescription
  } = script
  return {
    ...getBaseProps(script),
    hasUnpublishedChanges,
    isPublished,
    metaImgUrl,
    metaImgWidth,
    metaImgHeight,
    metaTitle,
    metaDescription
  }
}
