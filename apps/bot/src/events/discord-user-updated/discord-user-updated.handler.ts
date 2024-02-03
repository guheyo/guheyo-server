import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Context, ContextOf, On } from 'necord';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@UseGuards(GroupGuard)
@Injectable()
export class DiscordUserUpdatedHandler {
  private readonly logger = new Logger(DiscordUserUpdatedHandler.name);

  constructor(private readonly userClient: UserClient) {}

  @On('userUpdate')
  public async onUpdateUser(@Context() [oldUser, newUser]: ContextOf<'userUpdate'>) {
    await this.userClient.fetchSimpleUser('discord', newUser);

    if (!this.userClient.isUpdatedAvatar(oldUser, newUser)) return;
    const avatarURL = this.userClient.getAvatarURL(newUser);
    await this.userClient.updateUserAvatar(newUser.id, avatarURL);
    this.logger.log(`${newUser.username}<@${newUser.id}> avatar updated`);
  }
}
