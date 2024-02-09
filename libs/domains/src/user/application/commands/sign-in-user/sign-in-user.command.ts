import { ICommand } from '@nestjs/cqrs';
import { SignInUserInput } from './sing-in-user.input';

export class SignInUserCommand implements ICommand {
  id: string;

  username: string;

  name?: string;

  phoneNumber?: string;

  avatarURL?: string;

  provider: string;

  socialId: string;

  accessToken?: string;

  refreshToken?: string;

  constructor(input: SignInUserInput) {
    this.id = input.id;
    this.username = input.username;
    this.name = input.name;
    this.phoneNumber = input.phoneNumber;
    this.avatarURL = input.avatarURL;
    this.provider = input.provider;
    this.socialId = input.socialId;
    this.accessToken = input.accessToken;
    this.refreshToken = input.refreshToken;
  }
}
