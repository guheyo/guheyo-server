import _ from 'lodash';
import { RequestHandler } from 'express';
import userService from '../../../services/userService';

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.getUser(id);
    return res.send(user);
  } catch (e) {
    return next(e);
  }
}

export const getUserBySocailAccount: RequestHandler = async (req, res, next) => {
  type RequestBody = {
    provider: string,
    socialId: string
  };
  const { provider, socialId }= req.query as RequestBody;
  try {
    const user = await userService.getUserBySocailAccount(provider, socialId);
    return res.send(user);  
  } catch (e) {
    return next(e);
  }
}

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return res.send(user);
  } catch (e) {
    return next(e);
  }
}

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;  
  try {
    const user = await userService.updateUser(id, req.body);
    return res.send(user);
  } catch (e) {
    return next(e);
  }
  
}

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUser(id);
    return res.send();
  } catch (e) {
    return next(e);
  }
}