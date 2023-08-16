import { Router } from 'express';
import { listPosts } from './posts.ctrl';

const router = Router({ mergeParams: true });
router.get('/', listPosts);

export default router;
