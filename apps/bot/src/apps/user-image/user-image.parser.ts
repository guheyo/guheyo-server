import { Parser } from '@app/bot/shared/parser';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { Injectable } from '@nestjs/common';

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
      tracked: false,
      userId,
    };
  }
}
