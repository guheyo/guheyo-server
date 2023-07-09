import { RequestHandler } from 'express';
import postService from '../../../../services/postService';
import _ from 'lodash';

export const listPosts: RequestHandler = async (req, res, next) => {
  const id = _.get(req, 'params.id', '');
  const type = req.query.type as string;
  const cursor = req.query.cursor as string;
  try {
    const posts = await postService.getRecentPosts({
      categoryId: id,
      type: type,
      cursor: cursor
    });
    return res.send(posts);
  } catch (e) {
    return next(e);
  }
};