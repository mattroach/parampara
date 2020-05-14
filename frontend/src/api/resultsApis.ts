import { InsightFilter } from 'types/insightTypes'
import axios from './axios'
import { QuestionInsight, ResponseStatistics, Session, CommentInsight } from './types'

const api = {
  async getScriptResponses(scriptId: string): Promise<Session[]> {
    const response = await axios.get(`/api/script/${scriptId}/responses`)
    return response.data
  },

  async getScriptCommentInsights(
    scriptId: string,
    filter?: InsightFilter<any>
  ): Promise<CommentInsight[]> {
    const response = await axios.get(`/api/script/${scriptId}/commentInsights`)
    return response.data
  },

  async getScriptQuestionInsights(
    scriptId: string,
    filter?: InsightFilter<any>
  ): Promise<QuestionInsight[]> {
    const response = await axios.get(`/api/script/${scriptId}/questionInsights`, {
      params: { filter }
    })
    return response.data
  },

  async getScriptQuestionInsightUsers(
    scriptId: string,
    question: string,
    answer: string,
    filter?: InsightFilter<any>
  ): Promise<string[]> {
    const response = await axios.get(`/api/script/${scriptId}/questionInsights/users`, {
      params: { filter, question, answer }
    })
    return response.data
  },

  async getResponseStats(scriptId: string): Promise<ResponseStatistics> {
    const response = await axios.get(`/api/script/${scriptId}/responseStats`)
    return response.data
  }
}

export default api
