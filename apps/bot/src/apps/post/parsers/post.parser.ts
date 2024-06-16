import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { Injectable } from '@nestjs/common';
import { Message, ThreadChannel } from 'discord.js';

@Injectable()
export class PostParser extends GroupParser {
  parsePostIdsFromThreadChannels(threadChannels: ThreadChannel[]): string[] {
    return threadChannels.map((threadChannel) => this.parseIdFromChannel(threadChannel));
  }

  parsePostIdsFromMessages(messages: Message[]): string[] {
    return messages.map((message) => this.parsePostIdFromMessageId(message.id));
  }
}
