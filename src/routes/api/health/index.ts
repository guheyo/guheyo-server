import { Router } from 'express';
import { checkHealth } from './health.ctrl';

const router = Router();
router.get('/', checkHealth);

export default router;
