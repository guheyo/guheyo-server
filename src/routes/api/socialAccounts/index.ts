import { Router } from 'express';
import { linkAccount, unlinkAccount } from './socialAccounts.ctrl';

const router = Router({ mergeParams: true });
router.post('/', linkAccount);
router.delete('/', unlinkAccount);

export default router;