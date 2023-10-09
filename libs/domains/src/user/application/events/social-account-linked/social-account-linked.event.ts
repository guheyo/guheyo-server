import { IEvent } from '@nestjs/cqrs';
import { SocialAccountLinkedArgs } from './social-account-linked.args';

export class SocialAccountLinkedEvent implements IEvent {
  socialAccountId: string;

  provider: string;

  socialId: string;

  userId: string;

  constructor(args: SocialAccountLinkedArgs) {
    this.socialAccountId = args.socialAccountId;
    this.provider = args.provider;
    this.socialId = args.socialId;
    this.userId = args.userId;
  }
}
