import axios from 'axios'

import { Script } from '../types/scriptTypes'
import { ScriptVersionType, Session, PartialScript } from './types'
import { ProgressItem, SessionProgress } from 'types/sessionProgress'

const createScript = async (
  adminId: string,
  data: { title: string }
): Promise<string> => {
  const response = await axios.post('/api/script', { ...data, adminId })
  return response.data.id
}

const getScript = async (
  scriptId: string,
  version: ScriptVersionType
): Promise<Script> => {
  const response = await axios.get(`/api/script/${scriptId}`, { params: { version } })

  return response.data
}

const deleteScript = async (scriptId: string): Promise<void> => {
  await axios.delete(`/api/script/${scriptId}`)
}

const getScriptResults = async (scriptId: string): Promise<Session[]> => {
  const response = await axios.get(`/api/script/${scriptId}/results`)

  return response.data
}

const updateScript = async (scriptId: string, script: PartialScript): Promise<void> => {
  const response = await axios.put(`/api/script/${scriptId}`, script)

  return response.data
}

const publishScript = async (scriptId: string): Promise<void> => {
  await axios.post(`/api/script/publish/${scriptId}`)
}

const getOrCreateSessionProgress = async (data: {
  scriptId: string
  email?: string
  referrerCode?: string
}): Promise<SessionProgress> => {
  return (await axios.post('/api/sessionProgress/', data)).data
}

const updateProgress = async (
  sessionProgressId: string,
  data: {
    currentItemId: number
    items: ProgressItem[]
    durationSec: number
  }
): Promise<void> => {
  await axios.put(`/api/sessionProgress/${sessionProgressId}`, data)
}

export default {
  createScript,
  getScriptResults,
  getScript,
  deleteScript,
  updateScript,
  publishScript,
  getOrCreateSessionProgress,
  updateProgress
}
