import Script from 'src/models/Script';
import ScriptVersion from 'src/models/ScriptVersion';

import { uuid } from '@shared';

export enum ScriptVersionCode {
  latest = 'latest', draft = 'draft'
}
class ScriptService {
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