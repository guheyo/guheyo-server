import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { CreateUserFromDiscordCommand } from './create-user-from-discord.command';
import { UserSavePort } from '../../ports/out/user.save.port';

@CommandHandler(CreateUserFromDiscordCommand)
export class CreateUserFromDiscordHandler implements ICommandHandler<CreateUserFromDiscordCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    @Inject('UserSavePort') private readonly userSavePort: UserSavePort,
  ) {}

  async execute(command: CreateUserFromDiscordCommand): Promise<void> {
    const newUser = this.publisher.mergeObjectContext(
      new UserEntity({
        id: command.id,
        username: command.username,
        avatarURL: command.avatarURL,
      }),
    );
    await this.userSavePort.create(newUser);
    newUser.createUserFromDiscord(
      [
        {
          guildId: command.guildId,
          roleIds: command.roleIds,
        },
      ],
      command.socialAccountId,
      command.provider,
      command.socialId,
    );
    newUser.commit();
  }
}