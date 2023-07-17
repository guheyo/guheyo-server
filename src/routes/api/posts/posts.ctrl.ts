import { RequestHandler } from 'express';
import _ from 'lodash';
import postService from '../../../services/post-service';

export const getPost: RequestHandler = async (req, res, next) => {
  const id = _.get(req, 'params.id', '');
  try {
    const post = await postService.getPost(id);
    return res.send(post);
  } catch (e) {
    return next(e);
  }
};
