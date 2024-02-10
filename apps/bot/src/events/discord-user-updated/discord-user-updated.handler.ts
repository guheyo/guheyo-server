import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@Injectable()
export class DiscordUserUpdatedHandler {
  private readonly logger = new Logger(DiscordUserUpdatedHandler.name);

  constructor(private readonly userClient: UserClient) {}

  @On('userUpdate')
  public async onUpdateUser(@Context() [oldUser, newUser]: ContextOf<'userUpdate'>) {
    if (!this.userClient.isUpdatedAvatar(oldUser, newUser)) return;

    const user = await this.userClient.fetchSimpleUser('discord', newUser);
    await this.userClient.updateUserAvatar(user.id, newUser);
    this.logger.log(`${newUser.username}<@${user.id}> avatar updated`);
  }
}
