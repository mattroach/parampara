import { Router } from 'express'
import AdminRouter from './Admin'
import ScriptRouter from './Script'
import ScriptResultsRouter from './ScriptResults'
import SessionProgressRouter from './SessionProgress'
import SuperAdminRouter from './SuperAdmin'

// Init router and path
const router = Router()

// Add sub-routes
router.use('/superadmin', SuperAdminRouter)

router.use('/admin', AdminRouter)
router.use('/script', ScriptRouter)
router.use('/script', ScriptResultsRouter)
router.use('/sessionProgress', SessionProgressRouter)

// Export the base-router
export default router
