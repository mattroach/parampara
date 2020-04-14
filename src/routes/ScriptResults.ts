import { Router } from 'express'
import { OK, UNAUTHORIZED } from 'http-status-codes'
import adminService from '../services/AdminService'
import scriptService from '../services/ScriptService'
import sessionResponseService from '../services/SessionResponseService'

const router = Router()

router.use('/:id', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const { password } = req.query
    const script = await scriptService.getScript(scriptId)

    if (!(await adminService.authenticatePassword(script.adminId, password)))
      return res.status(UNAUTHORIZED).json('Authentication required')

    next()
  } catch (err) {
    next(err)
  }
})

router.get('/:id/responses', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const results = await sessionResponseService.getSessionsWithResponses(scriptId)

    return res.status(OK).json(results)
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

export default router
