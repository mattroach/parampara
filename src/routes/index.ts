import { Router } from 'express';
import AdminRouter from './Admin';
import ScriptRouter from './Script';
import SessionProgressRouter from './SessionProgress';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/admin', AdminRouter);
router.use('/script', ScriptRouter);
router.use('/sessionProgress', SessionProgressRouter);


// Export the base-router
export default router;
