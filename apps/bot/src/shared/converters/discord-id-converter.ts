import { Injectable } from '@nestjs/common';
import { v5 as uuid5 } from 'uuid';
import { DiscordConfigService } from '../discord/discord.config.service';

@Injectable()
export class DiscordIdConverter {
  constructor(private readonly discordConfigService: DiscordConfigService) {}

  convertIdUsingDiscordNamespace(discordId: string) {
    return uuid5(discordId, this.discordConfigService.getDiscordNamespace());
  }

  convertIdUsingGuildNamespace(discordId: string) {
    return uuid5(discordId, this.discordConfigService.getGuildNamespace());
  }
}
