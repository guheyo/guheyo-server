import { RequestHandler } from 'express';
import socialAccountService from '../../../services/social-account-service';

export const linkAccount: RequestHandler = async (req, res, next) => {
  try {
    const account = await socialAccountService.linkAccount(req.body);
    return res.send(account);
  } catch (e) {
    return next(e);
  }
};

export const unlinkAccount: RequestHandler = async (req, res, next) => {
  type RequestBody = {
    provider: string;
    socialId: string;
  };
  const { provider, socialId } = req.query as RequestBody;
  try {
    const account = await socialAccountService.unlinkAccount(
      provider,
      socialId,
    );
    return res.send(account);
  } catch (e) {
    return next(e);
  }
};
