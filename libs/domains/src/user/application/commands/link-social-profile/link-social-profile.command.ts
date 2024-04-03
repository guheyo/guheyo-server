import { ICommand } from '@nestjs/cqrs';
import { LinkSocialProfileInput } from './link-social-profile.input';

export class LinkSocialProfileCommand implements ICommand {
  provider: string;

  userId: string;

  username: string;

  avatarURL?: string;

  constructor({
    input,
    userId,
    username,
    avatarURL,
  }: {
    input: LinkSocialProfileInput;
    userId: string;
    username: string;
    avatarURL?: string;
  }) {
    this.provider = input.provider;
    this.userId = userId;
    this.username = username;
    this.avatarURL = avatarURL;
  }
}
