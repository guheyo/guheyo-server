import { ICommand } from '@nestjs/cqrs';
import { SocialAccountUpdateInput } from './social-account.update.input';

export class SocialAccountUpdateCommand implements ICommand {
  id: string;

  userId: string;

  refreshToken?: string;

  accessToken?: string;

  expiresAt?: number;

  tokenType?: string;

  scope?: string;

  idToken?: string;

  sessionState?: string;

  constructor(input: SocialAccountUpdateInput) {
    this.id = input.id;
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
