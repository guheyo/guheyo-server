import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next,
) => {
  console.log(err);
  return res.status(500);
  // next(err);
  // TODO: Send error message to discord log channel
};
