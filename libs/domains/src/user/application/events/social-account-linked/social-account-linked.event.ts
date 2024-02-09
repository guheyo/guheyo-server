import { IEvent } from '@nestjs/cqrs';
import { SocialAccountLinkedInput } from './social-account-linked.input';

export class SocialAccountLinkedEvent implements IEvent {
  socialAccountId: string;

  provider: string;

  socialId: string;

  userId: string;

  accessToken?: string;

  refreshToken?: string;

  constructor(input: SocialAccountLinkedInput) {
    this.socialAccountId = input.socialAccountId;
    this.provider = input.provider;
    this.socialId = input.socialId;
    this.userId = input.userId;
    this.accessToken = input.accessToken;
    this.refreshToken = input.accessToken;
  }
}
