import { Router } from 'express';
import categories from './categories';
import { getguilds } from './guilds.ctrl';

const router = Router();

router.use('/:name/categories', categories);
router.use('/', getguilds);

export default router;
