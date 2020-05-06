import { InsightFilter } from 'types/insightTypes'
import axios from './axios'
import { QuestionInsight, ResponseStatistics, Session, CommentInsight } from './types'

const api = {
  async getScriptResponses(scriptId: string, loginToken?: string): Promise<Session[]> {
    const response = await axios.get(`/api/script/${scriptId}/responses`, {
      params: { loginToken }
    })
    return response.data
  },

  async getScriptCommentInsights(
    scriptId: string,
    loginToken?: string,
    filter?: InsightFilter<any>
  ): Promise<CommentInsight[]> {
    const response = await axios.get(`/api/script/${scriptId}/commentInsights`, {
      params: { filter, loginToken }
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

  async getScriptQuestionInsightUsers(
    scriptId: string,
    question: string,
    answer: string,
    loginToken?: string,
    filter?: InsightFilter<any>
  ): Promise<string[]> {
    const response = await axios.get(`/api/script/${scriptId}/questionInsights/users`, {
      params: { filter, question, answer, loginToken }
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
  }
}

export default api
