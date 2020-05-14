import { ProgressItem, SessionProgress } from 'types/sessionProgress'
import { Script } from '../types/scriptTypes'
import axios from './axios'
import resultsApis from './resultsApis'
import { PartialScript, ScriptVersionType } from './types'
import { AdminDetails } from 'types/adminTypes'

const api = {
  ...resultsApis,
  async getAccountDetails(): Promise<AdminDetails> {
    const response = await axios.get('/api/admin/current')
    return response.data
  },
  async createAccount(email: string): Promise<string> {
    const response = await axios.post('/api/admin/', { email })
    return response.data.id
  },

  async createScript(data: { title: string }): Promise<string> {
    const response = await axios.post('/api/script', data)
    return response.data.id
  },

  async getScript(scriptId: string, version: ScriptVersionType): Promise<Script> {
    const suffix = version === ScriptVersionType.latest ? '/latest' : ''
    const response = await axios.get(`/api/script/${scriptId}${suffix}`)
    return response.data
  },

  async deleteScript(scriptId: string): Promise<void> {
    await axios.delete(`/api/script/${scriptId}`)
  },

  async deleteResponses(scriptId: string, sessionIds: string[]) {
    await axios.delete(`/api/script/${scriptId}/responses`, { data: { sessionIds } })
  },

  async updateScript(scriptId: string, script: PartialScript): Promise<void> {
    const response = await axios.put(`/api/script/${scriptId}`, script)
    return response.data
  },

  async publishScript(scriptId: string): Promise<void> {
    await axios.post(`/api/script/publish/${scriptId}`)
  },

  async getOrCreateSessionProgress(data: {
    scriptId: string
    email?: string
    referrerCode?: string
  }): Promise<SessionProgress> {
    return (await axios.post('/api/sessionProgress/', data)).data
  },

  async updateProgress(
    sessionProgressId: string,
    data: {
      currentItemId: number
      items: ProgressItem[]
      durationSec: number
    }
  ): Promise<void> {
    await axios.put(`/api/sessionProgress/${sessionProgressId}`, data)
  }
}

export default api
