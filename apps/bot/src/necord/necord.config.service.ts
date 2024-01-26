import { Injectable } from '@nestjs/common';
import { NecordModuleOptions } from 'necord';
import { GatewayIntentBits } from 'discord.js';
import _ from 'lodash';
import { ConfigParser } from '../shared/parsers/config.parser';

@Injectable()
export class NecordConfigService {
  constructor(private readonly configParser: ConfigParser) {}

  createNecordOptions(): NecordModuleOptions {
    return {
      token: this.configParser.getDiscordBotToken(),
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
      ],
      development: _.uniq(this.configParser.getDiscordServerIds()),
    };
  }
}
