import { Router } from 'express';
import { getPost } from './posts.ctrl';

const router = Router();
router.use('/:id', getPost);

export default router;