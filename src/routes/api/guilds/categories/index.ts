import { Router } from 'express';
import { getCategories } from './categories.ctrl';

const router = Router({ mergeParams: true });
router.get('/', getCategories);

export default router;