import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { CreateUserCommand } from '@lib/domains/user/application/commands/create-user/create-user.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindMyUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.query';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UserClient {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findUserBySocialAccount(
    provider: string,
    socialId: string,
  ): Promise<MyUserResponse | null> {
    return this.queryBus.execute(
      new FindMyUserBySocialAccountQuery({
        provider,
        socialId,
      }),
    );
  }

  async createUser(username: string, avatarURL?: string): Promise<string> {
    const id = uuid4();
    await this.commandBus.execute(
      new CreateUserCommand({
        id,
        username,
        avatarURL,
      }),
    );
    return id;
  }

  async linkSocialAccount(socialId: string, userId: string): Promise<string> {
    const id = uuid4();
    await this.commandBus.execute(
      new CreateSocialAccountCommand({
        id,
        provider: 'discord',
        socialId,
        userId,
      }),
    );
    return id;
  }
}
