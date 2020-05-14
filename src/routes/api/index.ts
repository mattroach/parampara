import { Router } from 'express'
import AdminRouter from './Admin'
import ScriptRouter from './Script'
import ScriptResultsRouter from './ScriptResults'
import SessionProgressRouter from './SessionProgress'
import SuperAdminRouter from './SuperAdmin'
import { UNAUTHORIZED, OK } from 'http-status-codes'

// Init router and path
const router = Router()

// Authenticate
router.use(async (req, res, next) => {
  try {
    if (req.user) return next()

    res.status(UNAUTHORIZED).json('Not authenticated')
  } catch (err) {
    next(err)
  }
})

// Add sub-routes
router.use('/superadmin', SuperAdminRouter)

router.use('/admin', AdminRouter)
router.use('/script', ScriptRouter)
router.use('/script', ScriptResultsRouter)
router.use('/sessionProgress', SessionProgressRouter)

// Export the base-router
export default router
