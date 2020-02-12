import axios from 'axios'

import { Script } from '../types/scriptTypes'
import { DeepPartial } from '@reduxjs/toolkit'

export type PartialScript = DeepPartial<Script>

export enum ScriptVersionType {
  latest = 'latest', draft = 'draft'
}

const getScript = async (scriptId: string, version: ScriptVersionType): Promise<Script> => {
  const response = await axios.get(`/api/script/${scriptId}`, { params: { version } })

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

export default { getScript, updateScript, publishScript }