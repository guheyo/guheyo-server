import { Router } from 'express';
import { createSession, getSessionAndUser, updateSession, deleteSession } from './session.ctrl';

const router = Router({ mergeParams: true });
router.post('/', createSession);
router.get('/', getSessionAndUser);
router.patch('/', updateSession);
router.delete('/', deleteSession);

export default router;