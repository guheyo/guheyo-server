import { Message } from 'discord.js';
import _ from 'lodash';

const validateAuthor = async (msg: Message, allowedRoles: string[]): Promise<boolean> => {
  if (msg.author.bot) throw new Error('Message from the bot')
  if (!msg.guild) throw new Error('Message from the outside the guild')

  const member = await msg.guild.members.fetch({ user: msg.author.id});
  if (!member) throw new Error('Member does not exist')
  const hasAllowedRole = member.roles.cache.some((role) => {
    return allowedRoles.includes(role.id);
  });
  if (!hasAllowedRole) throw new Error('No role allowed')
  return true;
};

const validateFormat = (msg: Message, type: string): RegExpExecArray => {
  let re:RegExp;
  switch (type) {
    case 'sell':
      re = /^wts[\r\n](.*)-[ \(\)a-zA-Z가-힣]*(\d+)([\s\S]*)/i
      break;
    case 'buy':
      re = /^wtb[\r\n](.*)-[ \(\)a-zA-Z가-힣]*(\d+)([\s\S]*)/i
      break;
    case 'trade':
      re = /^wtt[\r\n](.*)[\s\S]+wttf[\r\n](.*)([\s\S]*)/i
      break;
    default:
      throw new Error('No matching type');
  }
  const match = re!.exec(msg.content);
  if (!match) throw new Error(`Improper ${type} format`);
  return match;
};

const isBotOwner = (userId: string) => {
  return process.env.DISCORD_BOT_OWNER_ID === userId;
};

const isAllowedGuild = (guildId: string | undefined) => {
  return process.env.DISCORD_GUILD_ID === guildId;
};

export {
    validateAuthor,
    validateFormat,
    isBotOwner,
    isAllowedGuild
};