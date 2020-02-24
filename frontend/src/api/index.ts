import axios from 'axios'

import { Script } from '../types/scriptTypes'
import { ScriptVersionType, Session, PartialScript } from './types'

const getScript = async (scriptId: string, version: ScriptVersionType): Promise<Script> => {
  const response = await axios.get(`/api/script/${scriptId}`, { params: { version } })

  return response.data
}

const getScriptResults = async (scriptId: string): Promise<Session[]> => {
  const response = await axios.get(`/api/script/${scriptId}/results`)

  return response.data
}

const updateScript = async (
  scriptId: string, script: PartialScript
): Promise<void> => {
  const response = await axios.put(`/api/script/${scriptId}`, script)

  return response.data
}

const publishScript = async (
  scriptId: string
): Promise<void> => {
  await axios.post(`/api/script/publish/${scriptId}`)
}

export default {
  getScriptResults,
  getScript,
  updateScript,
  publishScript
}