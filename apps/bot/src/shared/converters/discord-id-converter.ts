import { Injectable } from '@nestjs/common';
import { v5 as uuid5 } from 'uuid';
import { ConfigParser } from '../parsers/config.parser';

@Injectable()
export class DiscordIdConverter {
  constructor(private readonly configParser: ConfigParser) {}

  convertIdUsingDiscordNamespace(discordId: string) {
    return uuid5(discordId, this.configParser.getDiscordNamespace());
  }

  convertIdUsingGuildNamespace(discordId: string) {
    return uuid5(discordId, this.configParser.getGuildNamespace());
  }
}
