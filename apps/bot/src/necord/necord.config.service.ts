import { Injectable } from '@nestjs/common';
import { NecordModuleOptions } from 'necord';
import { GatewayIntentBits } from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NecordConfigService {
  constructor(private readonly configService: ConfigService) {}

  createNecordOptions(): NecordModuleOptions {
    return {
      token: this.configService.get('discord.bot.token')!,
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
      ],
    };
  }
}
