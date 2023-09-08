import { ICommand } from '@nestjs/cqrs';
import { SocialAccountCreateInput } from './social-account.create.input';

export class SocialAccountCreateCommand implements ICommand {
  id: string;

  provider: string;

  socialId: string;

  userId: string;

  refreshToken?: string;

  accessToken?: string;

  expiresAt?: number;

  tokenType?: string;

  scope?: string;

  idToken?: string;

  sessionState?: string;

  constructor(input: SocialAccountCreateInput) {
    this.id = input.id;
    this.provider = input.provider;
    this.socialId = input.socialId;
    this.userId = input.userId;
    this.refreshToken = input.refreshToken;
    this.accessToken = input.accessToken;
    this.expiresAt = input.expiresAt;
    this.tokenType = input.tokenType;
    this.scope = input.scope;
    this.idToken = input.idToken;
    this.sessionState = input.sessionState;
  }
}