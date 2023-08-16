import { RequestHandler } from 'express';
import guildService from '../../../services/guild-service';

export const getguilds: RequestHandler = async (req, res, next) => {
  try {
    const guilds = await guildService.getGuilds();
    return res.send(guilds);
  } catch (e) {
    return next(e);
  }
};
