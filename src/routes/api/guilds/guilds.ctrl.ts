import _ from 'lodash';
import { RequestHandler } from 'express';
import guildService from '../../../services/guildService';

export const getguilds: RequestHandler = async (req, res, next) => {
  try {
    const guilds = await guildService.getGuilds();
    return res.send(guilds);
  } catch(e) {
    return next(e);
  }
};