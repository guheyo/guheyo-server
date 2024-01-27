import { Parser } from '@app/bot/shared/parsers/parser';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Attachment, Message } from 'discord.js';
import { UserImageErrorMessage } from './user-image.error.message';

@Injectable()
export class UserImageParser extends Parser {
  hasAttachments(message: Message) {
    return message.attachments.size > 0;
  }

  parseCreateUserImageFromAvatar({
    id,
    name,
    url,
    contentType,
    userId,
  }: {
    id: string;
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
      type: 'user-avatar',
      refId: userId,
      userId,
      source: 'discord',
    };
  }

  parseCreateUserImageInputFromAttachment({
    id,
    attachment,
    url,
    position,
    type,
    refId,
    userId,
  }: {
    id: string;
    attachment: Attachment;
    url: string;
    position: number;
    type: string;
    refId: string;
    userId: string;
  }): CreateUserImageInput {
    return {
      id,
      name: attachment.name,
      url,
      contentType: attachment.contentType || undefined,
      description: attachment.description || undefined,
      height: attachment.height || undefined,
      width: attachment.width || undefined,
      position,
      type,
      refId,
      userId,
      source: 'discord',
    };
  }

  parseUploadUserImageInputList(
    userId: string,
    message: Message,
    type: string,
  ): CreateUserImageInput[] {
    if (!this.hasAttachments(message)) {
      if (type === 'demand') return [];
      throw new RpcException(UserImageErrorMessage.NOT_FOUND_ATTACHMENTS);
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
