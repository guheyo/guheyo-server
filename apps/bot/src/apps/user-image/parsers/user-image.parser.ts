import { Parser } from '@app/bot/shared/parsers/parser';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

@Injectable()
export class UserImageParser extends Parser {
  hasAttachments(message: Message) {
    return message.attachments.size > 0;
  }

  parseCreateUserImageInputFromUrl({
    id,
    type,
    name,
    url,
    contentType,
    userId,
  }: {
    id: string;
    type: string;
    name: string;
    url: string;
    contentType: string | undefined;
    userId: string;
  }): CreateUserImageInput {
    return {
      id,
      name,
      url,
      contentType,
      position: 0,
      type,
      refId: userId,
    };
  }

  parseUploadUserImageInputList(message: Message, type: string): CreateUserImageInput[] {
    if (!this.hasAttachments(message)) {
      return [];
    }
    let position = 0;
    const refId = this.parseIdFromMessageId(message.id);
    const createUserImageinputs: CreateUserImageInput[] = message.attachments.map((attachment) => {
      const input = {
        id: this.generateUUID(),
        name: attachment.name,
        url: attachment.url,
        contentType: attachment.contentType ?? undefined,
        description: attachment.description ?? undefined,
        size: attachment.size,
        height: attachment.height ?? undefined,
        width: attachment.width ?? undefined,
        position,
        type,
        refId,
      };
      position += 1;
      return input;
    });
    return createUserImageinputs;
  }
}
