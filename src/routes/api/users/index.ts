import { Router } from 'express';
import { getUser, getUserBySocailAccount, createUser, updateUser, deleteUser } from './user.ctrl';

const router = Router({ mergeParams: true });
router.get('/:id', getUser);
router.get('/', getUserBySocailAccount);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;