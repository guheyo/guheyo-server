import { RequestHandler } from 'express';

export const checkHealth: RequestHandler = async (req, res, next) => {
  try {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
    };
    return res.status(200).send(data);
  } catch (e) {
    return next(e);
  }
};
