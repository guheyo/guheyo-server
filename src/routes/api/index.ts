import { Router } from 'express';
import user from './users';
import socialAcounts from './social-accounts';
import guilds from './guilds';
import categories from './categories';
import posts from './posts';
import sessions from './sessions';
import health from './health';

const router = Router();
router.use('/users', user);
router.use('/socialAccounts', socialAcounts);
router.use('/guilds', guilds);
router.use('/categories', categories);
router.use('/posts', posts);
router.use('/sessions', sessions);
router.use('/health', health);

export default router;
