import axios from 'axios';

import { Script } from '../types/scriptTypes';

export enum ScriptVersionType {
  latest = 'latest', draft = 'draft'
}

export const getScript = async (scriptId: string, version: ScriptVersionType): Promise<Script> => {
  const response = await axios.get(`/api/script/${scriptId}`, { params: { version } })

  return response.data
}

export const updateScript = async (scriptId: string, script: Script): Promise<void> => {
  const response = await axios.put(`/api/script/${scriptId}`, script)

  return response.data
}