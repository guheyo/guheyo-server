import { Parser } from '@app/bot/shared/parsers/parser';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { Injectable } from '@nestjs/common';
import { Attachment } from 'discord.js';

@Injectable()
export class UserImageParser extends Parser {
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
    };
  }
}
