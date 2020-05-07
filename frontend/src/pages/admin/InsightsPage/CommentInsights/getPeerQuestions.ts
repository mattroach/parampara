import { CommentInsightAnswer } from 'api/types'

const getPeerQuestions = (data: CommentInsightAnswer[]): string[] => {
  const questions = new Set<string>()

  data.forEach(item => {
    Object.keys(item.peers).forEach(i => questions.add(i))
  })

  return Array.from(questions.values())
}

export default getPeerQuestions
