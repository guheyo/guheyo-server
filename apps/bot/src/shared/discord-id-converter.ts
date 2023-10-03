import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v5 as uuid5 } from 'uuid';

@Injectable()
export class DiscordIdConverter {
  constructor(private readonly configService: ConfigService) {}

  convertIdUsingDiscordNamespace(discordId: string) {
    return uuid5(discordId, this.configService.get('namespace.discord')!);
  }

  convertIdUsingGuildNamespace(discordId: string) {
    return uuid5(discordId, this.configService.get('namespace.guild')!);
  }
}
