import { Router } from 'express';
import ScriptRouter from './Scripts';
import SessionProgressRouter from './SessionProgress';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/script', ScriptRouter);
router.use('/sessionProgress', SessionProgressRouter);


// Export the base-router
export default router;
