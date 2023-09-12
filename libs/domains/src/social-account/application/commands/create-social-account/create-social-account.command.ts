import { ICommand } from '@nestjs/cqrs';
import { CreateSocialAccountInput } from './create-social-account.input';

export class CreateSocialAccountCommand implements ICommand {
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

  constructor(input: CreateSocialAccountInput) {
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
