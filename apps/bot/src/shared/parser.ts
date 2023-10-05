import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { DiscordIdConverter } from './discord-id-converter';

@Injectable()
export abstract class Parser {
  @Inject()
  readonly discordIdConverter: DiscordIdConverter;

  generateUUID() {
    return uuid4();
  }
}
