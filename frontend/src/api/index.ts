import { ProgressItem, SessionProgress } from 'types/sessionProgress'
import { Script } from '../types/scriptTypes'
import axios from './axios'
import authenticated from './authenticated'
import { LoginResponse, PartialScript, ScriptVersionType } from './types'

const api = {
  ...authenticated,
  async login(adminId: string, password?: string): Promise<LoginResponse> {
    const response = await axios.post(`/api/admin/${adminId}/login`, { password })
    return response.data
  },

  async createScript(adminId: string, data: { title: string }): Promise<string> {
    const response = await axios.post('/api/script', { ...data, adminId })
    return response.data.id
  },

  async getScript(scriptId: string, version: ScriptVersionType): Promise<Script> {
    const response = await axios.get(`/api/script/${scriptId}`, { params: { version } })
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
