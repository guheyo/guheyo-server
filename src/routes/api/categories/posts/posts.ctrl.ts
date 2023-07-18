import { RequestHandler } from 'express';
import _ from 'lodash';
import postService from '../../../../services/post-service';

export const listPosts: RequestHandler = async (req, res, next) => {
  const id = _.get(req, 'params.id', '');
  const type = req.query.type as string;
  const cursor = req.query.cursor as string;
  try {
    const posts = await postService.getRecentPosts({
      categoryId: id,
      type,
      cursor,
    });
    return res.send(posts);
  } catch (e) {
    return next(e);
  }
};
