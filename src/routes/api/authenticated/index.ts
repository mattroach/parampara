import { Router } from 'express'
import { UNAUTHORIZED } from 'http-status-codes'
import AdminRouter from './Admin'
import ScriptRouter from './Script'
import SuperAdminRouter from './SuperAdmin'

const router = Router()

// This route uses different authentication
router.use('/superadmin', SuperAdminRouter)

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
router.use('/admin', AdminRouter)
router.use('/script', ScriptRouter)

export default router
