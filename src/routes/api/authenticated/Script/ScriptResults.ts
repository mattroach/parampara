import { Router } from 'express'
import { OK } from 'http-status-codes'
import { Array, Record, String, Unknown } from 'runtypes'
import { InsightFilter } from '../../../../../frontend/src/types/insightTypes'
import scriptExportService from '../../../../services/ScriptExportService'
import sessionProgressService from '../../../../services/SessionProgressService'
import sessionResponseService from '../../../../services/SessionResponseService'

const router = Router()

router.get('/:id/responses', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const results = await sessionResponseService.getSessionsWithResponses(scriptId)

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/responses/export', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const filename = await scriptExportService.getFilename(scriptId)
    res.attachment(`${filename}.csv`)

    await scriptExportService.asCSV(scriptId, res)
  } catch (err) {
    next(err)
  }
})

const DeleteSessionsBody = Record({
  sessionIds: Array(String)
})
// Not on authenticatedRouter as knowing the session IDs is secure enough
router.delete('/:id/responses', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const { sessionIds } = DeleteSessionsBody.check(req.body)

    await sessionProgressService.deleteSessions(scriptId, sessionIds)

    return res.status(OK).json('deleted')
  } catch (err) {
    next(err)
  }
})

router.get('/:id/responseStats', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const results = await sessionResponseService.getResponseStatistics(scriptId)

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/questionInsights', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const filter = req.query.filter as InsightFilter | undefined

    const results = await sessionResponseService.getQuestionInsights(scriptId, filter)

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/commentInsights', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const filter = req.query.filter as InsightFilter | undefined

    const results = await sessionResponseService.getCommentInsights(scriptId, filter)

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
})

const InsightUsersQuery = Record({
  filter: Unknown,
  question: String,
  answer: String
})

router.get('/:id/questionInsights/users', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const { filter, question, answer } = InsightUsersQuery.check(req.query)

    const results = await sessionResponseService.getQuestionInsightUsers(
      scriptId,
      question,
      answer,
      filter as InsightFilter | undefined
    )

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
})

export default router
