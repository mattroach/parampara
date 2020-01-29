import { Router } from 'express';
import ScriptRouter from './Scripts';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/script', ScriptRouter);


// Export the base-router
export default router;
