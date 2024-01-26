import { Injectable } from '@nestjs/common';
import { NecordModuleOptions } from 'necord';
import { GatewayIntentBits } from 'discord.js';
import _ from 'lodash';
import { DiscordConfigService } from '../shared/discord/discord.config.service';

@Injectable()
export class NecordConfigService {
  constructor(private readonly discordConfigService: DiscordConfigService) {}

  createNecordOptions(): NecordModuleOptions {
    return {
      token: this.discordConfigService.getDiscordBotToken(),
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
      ],
      development: _.uniq(this.discordConfigService.getDiscordServerIds()),
    };
  }
}
