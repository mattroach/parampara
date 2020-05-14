import { Router } from 'express'
import AuthenticateRouter from './authenticated'
import SessionProgressRouter from './SessionProgress'
import ScriptRouter from './Script'

// Init router and path
const router = Router()

router.use('/sessionProgress', SessionProgressRouter)
router.use('/script', ScriptRouter)

router.use(AuthenticateRouter)

// Export the base-router
export default router
