import { uuid } from '@shared'
import { raw } from 'objection'
import Script from '../../models/Script'
import ScriptVersion from '../../models/ScriptVersion'
import emailService from '../EmailService'
import {
  getDraftScript,
  getLatestScript,
  getScriptWithVersion,
  ScriptVersionCode
} from './getScript'

type UpdateScriptBody = {
  title?: string
  reportingEmail?: string
  allowAnon?: boolean
  metaImgUrl?: string | null
  metaImgWidth?: number | null
  metaImgHeight?: number | null
  metaTitle?: string | null
  metaDescription?: string | null
  version?: { items: any }
}

const updateScript = async (id: string, script: UpdateScriptBody) => {
  const { version } = script
  let hasUnpublishedChanges

  if (version) {
    await ScriptVersion.query()
      .where('scriptId', id)
      .modify('draft')
      .patch({ items: version.items })

    hasUnpublishedChanges = true
  }

  await Script.query()
    .findById(id)
    .patch({
      title: script.title,
      reportingEmail: script.reportingEmail,
      allowAnon: script.allowAnon,
      metaDescription: script.metaDescription,
      metaImgUrl: script.metaImgUrl,
      metaImgWidth: script.metaImgWidth,
      metaImgHeight: script.metaImgHeight,
      metaTitle: script.metaTitle,
      hasUnpublishedChanges
    })
}

export default {
  updateScript,
  getDraftScript,
  getLatestScript,
  async publishScript(scriptId: string) {
    const draft = await ScriptVersion.query()
      .modify('draft')
      .where({ scriptId })
      .first()

    const newVersion = await ScriptVersion.query().insertAndFetch({
      id: uuid(),
      scriptId,
      version: ScriptVersion.query()
        .select(raw('version + 1'))
        .where({ scriptId })
        .orderBy('version', 'DESC')
        .limit(1),
      items: draft.items
    })

    const script = await Script.query()
      .patchAndFetchById(scriptId, {
        hasUnpublishedChanges: false
      })
      .withGraphFetched('admin')

    if (newVersion.version === 1) {
      //If this is the first publish
      emailService.scriptPublished(script.admin!, script)
    }
  },

  deleteScript(scriptId: string) {
    return Script.query().deleteById(scriptId)
  },

  getScripts(adminId: string) {
    return Script.query()
      .where('adminId', adminId)
      .orderBy('created', 'DESC')
  },

  async checkOwnership(id: string, adminId: string) {
    const countResult = (await Script.query()
      .findById(id)
      .where('adminId', adminId)
      .count()
      .as('count')) as any
    return parseInt(countResult.count) === 1
  },

  getScript(scriptId: string) {
    return Script.query().findById(scriptId)
  },

  async createScript(
    adminId: string,
    scriptAttributes: { title: string; version?: { items?: any } }
  ) {
    const script = await Script.query().insert({
      id: uuid(),
      adminId,
      title: scriptAttributes.title
    })

    await ScriptVersion.query().insert({
      id: uuid(),
      scriptId: script.id,
      version: ScriptVersion.DRAFT_VERSION,
      items: scriptAttributes.version?.items || undefined
    })

    return script
  },

  // Superadmin only
  async cloneScript(scriptId: string, destinationAdminId: string, newTitle?: string) {
    const script = await getScriptWithVersion(scriptId, ScriptVersionCode.draft)

    if (!script) throw Error('Script not found')

    const title = newTitle || script.title
    this.createScript(destinationAdminId, {
      title,
      version: { items: script.version!.items }
    })
  }
}
