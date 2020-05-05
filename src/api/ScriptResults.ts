import { Router } from 'express'
import { OK, UNAUTHORIZED } from 'http-status-codes'
import { Record, String, Unknown, Array } from 'runtypes'
import { InsightFilter } from '../../frontend/src/types/insightTypes'
import adminService from '../services/AdminService'
import scriptService from '../services/ScriptService'
import sessionProgressService from '../services/SessionProgressService'
import sessionResponseService from '../services/SessionResponseService'
import scriptExportService from '../services/ScriptExportService'

const authenticatedRouter = Router()
const router = Router()

authenticatedRouter.use('/:id', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const { loginToken } = req.query
    const script = await scriptService.getScript(scriptId)

    if (!(await adminService.authenticateToken(script.adminId, loginToken)))
      return res.status(UNAUTHORIZED).json('Authentication required')

    next()
  } catch (err) {
    next(err)
  }
})

authenticatedRouter.get('/:id/responses', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const results = await sessionResponseService.getSessionsWithResponses(scriptId)

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
})

authenticatedRouter.get('/:id/responses/export', async (req, res, next) => {
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

authenticatedRouter.get('/:id/responseStats', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const results = await sessionResponseService.getResponseStatistics(scriptId)

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
})

authenticatedRouter.get('/:id/questionInsights', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const filter = req.query.filter as InsightFilter | undefined

    const results = await sessionResponseService.getQuestionInsights(scriptId, filter)

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

authenticatedRouter.get('/:id/questionInsights/users', async (req, res, next) => {
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

// Combine the routers together
router.use(authenticatedRouter)

export default router
