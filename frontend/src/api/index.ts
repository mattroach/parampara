import { ProgressItem, SessionProgress } from 'types/sessionProgress'
import { Script } from '../types/scriptTypes'
import authAxios from './authAxios'
import resultsApis from './resultsApis'
import { PartialScript, ScriptVersionType } from './types'
import { AdminDetails } from 'types/adminTypes'
import { setAppDispatch } from './authAxios'

const api = {
  setAppDispatch,
  ...resultsApis,
  async getAccountDetails(): Promise<AdminDetails> {
    const response = await authAxios.get('/api/admin/current')
    return response.data
  },
  async createAccount(email: string): Promise<string> {
    const response = await authAxios.post('/api/admin/', { email })
    return response.data.id
  },

  async createScript(data: { title: string }): Promise<string> {
    const response = await authAxios.post('/api/script', data)
    return response.data.id
  },

  async getScript(scriptId: string, version: ScriptVersionType): Promise<Script> {
    const suffix = version === ScriptVersionType.latest ? '/latest' : ''
    const response = await authAxios.get(`/api/script/${scriptId}${suffix}`)
    return response.data
  },

  async cloneScript(scriptId: string): Promise<Script> {
    const response = await authAxios.post(`/api/script/${scriptId}/clone`)
    return response.data
  },

  async deleteScript(scriptId: string): Promise<void> {
    await authAxios.delete(`/api/script/${scriptId}`)
  },

  async deleteResponses(scriptId: string, sessionIds: string[]) {
    await authAxios.delete(`/api/script/${scriptId}/responses`, { data: { sessionIds } })
  },

  async updateScript(scriptId: string, script: PartialScript): Promise<void> {
    const response = await authAxios.put(`/api/script/${scriptId}`, script)
    return response.data
  },

  async publishScript(scriptId: string): Promise<void> {
    await authAxios.post(`/api/script/${scriptId}/publish`)
  },

  async createSessionProgress(data: {
    scriptId: string
    email?: string
    referrerCode?: string
    currentItemId: number
    items: any[]
    durationSec: number
  }): Promise<SessionProgress> {
    return (await authAxios.post('/api/sessionProgress/', data)).data
  },

  async updateProgress(
    sessionProgressId: string,
    data: {
      currentItemId: number
      items: ProgressItem[]
      durationSec: number
    }
  ): Promise<void> {
    await authAxios.put(`/api/sessionProgress/${sessionProgressId}`, data)
  }
}

export default api
