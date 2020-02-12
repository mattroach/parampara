import Script from 'src/models/Script'
import ScriptVersion from 'src/models/ScriptVersion'

import { uuid } from '@shared'
import { raw } from 'objection'

export enum ScriptVersionCode {
  latest = 'latest', draft = 'draft'
}
class ScriptService {
  async publishScript(scriptId: string) {
    const draft = (await ScriptVersion.query()
      .modify('draft')
      .where('scriptId', scriptId))[0]

    await ScriptVersion.query().insert({
      id: uuid(),
      scriptId,
      version: ScriptVersion.query().select(raw('version + 1')).modify('latest'),
      reportingEmail: draft.reportingEmail,
      items: draft.items,
      allowAnon: draft.allowAnon,
    })
  }

  // Todo should take some sort of ScriptUpdate object which is limited in the fields it can have (e.g. no ID, etc)
  async updateScript(id: string, script: Script) {
    await Script.query()
      .findById(id)
      .patch(script)

    if (script.version) {
      await ScriptVersion.query()
        .where('scriptId', id)
        .modify('draft')
        .patch(script.version)
    }
  }

  async getScripts(adminId: string) {
    return await Script.query()
      .where('adminId', adminId)
      .orderBy('created')
  }

  async getScript(scriptId: string, versionCode: ScriptVersionCode) {
    const script = await Script.query()
      .findById(scriptId)
      .withGraphFetched(`version(${versionCode})`)

    if (!script.version)
      throw Error('Script is not published')

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