import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { Message, PartialMessage } from 'discord.js';
import { DiscordIdConverter } from '@app/bot/shared/converters/discord-id-converter';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { RpcException } from '@nestjs/microservices';
import { ParserErrorMessage } from './parser.error.message';
import { ConfigParser } from './config.parser';

@Injectable()
export abstract class Parser extends ConfigParser {
  @Inject()
  readonly discordIdConverter: DiscordIdConverter;

  generateUUID() {
    return uuid4();
  }

  isValidFormat(match: RegExpExecArray | null) {
    return !!match;
  }

  hasAttachments(message: Message) {
    return message.attachments.size > 0;
  }

  parseIdFromMessage(message: Message | PartialMessage) {
    return this.discordIdConverter.convertIdUsingDiscordNamespace(message.id);
  }

  parseGuildIdFromMessage(message: Message) {
    const server = this.findDiscordServerByMessage(message);
    return this.discordIdConverter.convertIdUsingDiscordNamespace(server?.name || '');
  }

  parseGuildIdFromServerId(serverId: string) {
    const server = this.findDiscordServerByServerId(serverId);
    return this.discordIdConverter.convertIdUsingDiscordNamespace(server?.name || '');
  }

  parseUploadUserImageInputList(
    userId: string,
    message: Message,
    type: string,
  ): CreateUserImageInput[] {
    if (!this.hasAttachments(message)) {
      if (type === 'demand') return [];
      throw new RpcException(ParserErrorMessage.NOT_FOUND_ATTACHMENTS);
    }
    let position = 0;
    const refId = this.parseIdFromMessage(message);
    const createUserImageinputs: CreateUserImageInput[] = message.attachments.map((attachment) => {
      const input = {
        id: this.generateUUID(),
        name: attachment.name,
        url: attachment.url,
        contentType: attachment.contentType ?? undefined,
        description: attachment.description ?? undefined,
        height: attachment.height ?? undefined,
        width: attachment.width ?? undefined,
        position,
        type,
        refId,
        userId,
        source: 'discord',
      };
      position += 1;
      return input;
    });
    return createUserImageinputs;
  }
}