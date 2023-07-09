import { Router } from 'express';
import posts from './posts';

const router = Router();
router.use('/:id/posts', posts);

export default router;