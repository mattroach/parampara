import { Router } from 'express'
import { OK, UNAUTHORIZED } from 'http-status-codes'
import adminService from '../services/AdminService'
import scriptService from '../services/ScriptService'
import sessionResponseService from '../services/SessionResponseService'
import sessionProgressService from '../services/SessionProgressService'
import { Record, String, Array } from 'runtypes'
import { InsightFilter } from 'frontend/src/types/insightTypes'

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

// Combine the routers together
router.use(authenticatedRouter)

export default router
