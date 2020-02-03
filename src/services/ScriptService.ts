import Script from 'src/models/Script'

class ScriptService {
  async getScripts(adminId: number) {
    return await Script.query()
      .where('adminId', adminId)
      .orderBy('created')
  }
}

export default new ScriptService()