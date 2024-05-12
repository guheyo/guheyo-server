import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { Injectable } from '@nestjs/common';
import { ThreadChannel } from 'discord.js';

@Injectable()
export class PostParser extends GroupParser {
  parsePostIds(threadChannels: ThreadChannel[]): string[] {
    return threadChannels.map((threadChannel) => this.parseIdFromChannel(threadChannel));
  }
}
