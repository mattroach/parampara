import { Router } from 'express';
import UserRouter from './Users';
import ScriptRouter from './Scripts';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/script', ScriptRouter);


// Export the base-router
export default router;
