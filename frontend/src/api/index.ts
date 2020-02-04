import axios from 'axios';

import { Script } from '../types/scriptTypes';

export const getScript = async (scriptId: string, version: 'latest' | 'draft'): Promise<Script> => {
  const response = await axios.get(`/api/script/${scriptId}`, { params: { version } })

  return response.data
}