import _ from 'lodash';
import { RequestHandler } from 'express';
import guildService from '../../../../services/guildService';

export const getCategories: RequestHandler = async (req, res, next) => {
  const name = _.get(req, 'params.name', '');
  try {
    const categories = await guildService.getGuildCategories(name);
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
};