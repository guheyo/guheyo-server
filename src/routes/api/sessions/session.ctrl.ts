import { RequestHandler } from 'express';
import sessionService from '../../../services/session-service';

export const createSession: RequestHandler = async (req, res, next) => {
  try {
    const session = await sessionService.createSession(req.body);
    return res.send(session);
  } catch (e) {
    return next(e);
  }
};

export const getSessionAndUser: RequestHandler = async (req, res, next) => {
  const sessionToken = req.query.sessionToken as string;
  try {
    const sessionAndUser = await sessionService.getSessionAndUser(sessionToken);
    return res.send(sessionAndUser);
  } catch (e) {
    return next(e);
  }
};

export const updateSession: RequestHandler = async (req, res, next) => {
  try {
    const session = await sessionService.updateSession(req.body);
    return res.send(session);
  } catch (e) {
    return next(e);
  }
};
export const deleteSession: RequestHandler = async (req, res, next) => {
  const sessionToken = req.query.sessionToken as string;
  try {
    const session = await sessionService.deleteSession(sessionToken);
    return res.send(session);
  } catch (e) {
    return next(e);
  }
};
