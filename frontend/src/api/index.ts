import axios from 'axios'

import { Script } from '../types/scriptTypes'
import {
  ScriptVersionType,
  Session,
  PartialScript,
  QuestionInsight,
  ResponseStatistics,
  LoginResponse
} from './types'
import { ProgressItem, SessionProgress } from 'types/sessionProgress'
import { InsightFilter } from 'types/insightTypes'
import Qs from 'qs'

// So we have deep object param serializing
axios.interceptors.request.use(config => {
  config.paramsSerializer = params => Qs.stringify(params)
  return config
})

const api = {
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

  async getScriptResponses(scriptId: string, loginToken?: string): Promise<Session[]> {
    const response = await axios.get(`/api/script/${scriptId}/responses`, {
      params: { loginToken }
    })
    return response.data
  },

  async getScriptQuestionInsights(
    scriptId: string,
    loginToken?: string,
    filter?: InsightFilter<any>
  ): Promise<QuestionInsight[]> {
    const response = await axios.get(`/api/script/${scriptId}/questionInsights`, {
      params: { filter, loginToken }
    })
    return response.data
  },

  async getResponseStats(
    scriptId: string,
    loginToken?: string
  ): Promise<ResponseStatistics> {
    const response = await axios.get(`/api/script/${scriptId}/responseStats`, {
      params: { loginToken }
    })
    return response.data
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
