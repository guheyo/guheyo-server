import { ICommand } from '@nestjs/cqrs';

export class DeleteSocialAccountByProviderCommand implements ICommand {
  provider: string;

  socialId: string;

  constructor(provider: string, socialId: string) {
    this.provider = provider;
    this.socialId = socialId;
  }
}
