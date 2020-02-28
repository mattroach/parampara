import Script from '../models/Script'
import ScriptVersion from '../models/ScriptVersion'

import { uuid } from '@shared'
import { raw } from 'objection'

export enum ScriptVersionCode {
  latest = 'latest',
  draft = 'draft'
}

type UpdateScriptBody = {
  title?: string
  reportingEmail?: string
  allowAnon?: boolean
  version?: { items: any }
}

class ScriptService {
  async publishScript(scriptId: string) {
    const draft = (
      await ScriptVersion.query()
        .modify('draft')
        .where({ scriptId })
    )[0]

    await ScriptVersion.query().insert({
      id: uuid(),
      scriptId,
      version: ScriptVersion.query()
        .select(raw('version + 1'))
        .where({ scriptId })
        .orderBy('version', 'desc')
        .limit(1),
      items: draft.items
    })

    await Script.query()
      .findById(scriptId)
      .patch({ hasUnpublishedChanges: false })
  }

  async updateScript(id: string, script: UpdateScriptBody) {
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
        hasUnpublishedChanges
      })
  }

  async deleteScript(scriptId: string) {
    return await Script.query().deleteById(scriptId)
  }

  async getScripts(adminId: string) {
    return await Script.query()
      .where('adminId', adminId)
      .orderBy('created', 'DESC')
  }

  async getScript(scriptId: string, versionCode: ScriptVersionCode) {
    const script = await Script.query()
      .findById(scriptId)
      .withGraphFetched(`version(${versionCode})`)

    if (!script.version) throw Error('Script is not published')

    return script
  }

  async createScript(adminId: string) {
    const script = await Script.query().insert({
      id: uuid(),
      adminId
    })

    await ScriptVersion.query().insert({
      id: uuid(),
      scriptId: script.id,
      version: ScriptVersion.DRAFT_VERSION
    })

    return script
  }
}

export default new ScriptService()
