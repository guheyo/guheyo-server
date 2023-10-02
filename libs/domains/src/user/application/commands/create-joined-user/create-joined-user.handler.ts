import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject, ConflictException } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { v4 as uuid4 } from 'uuid';
import { CreateJoinedUserCommand } from './create-joined-user.command';
import { UserLoadPort } from '../../ports/out/user.load.port';
import { UserSavePort } from '../../ports/out/user.save.port';
import { UserService } from '../../services/user.service';

@CommandHandler(CreateJoinedUserCommand)
export class CreateJoinedUserHandler implements ICommandHandler<CreateJoinedUserCommand> {
  constructor(
    @Inject('UserLoadPort') private readonly userLoadPort: UserLoadPort,
    @Inject('UserSavePort') private readonly userSavePort: UserSavePort,
    private readonly userService: UserService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateJoinedUserCommand): Promise<void> {
    const user = await this.userLoadPort.findBySocialAccount(command.provider, command.socialId);
    if (user) throw new ConflictException(UserErrorMessage.USER_ALREADY_EXISTS);

    const userId = uuid4();
    const newUser = this.publisher.mergeObjectContext(
      new UserEntity({
        id: userId,
        username: command.username,
        avatarURL: command.avatarURL
          ? await this.userService.uploadAvatar(command.avatarURL, userId)
          : undefined,
      }),
    );
    await this.userSavePort.create(newUser);

    newUser.createdJoinedUser({
      userId: newUser.id,
      ..._.pick(
        command,
        'socialAccountId',
        'provider',
        'socialId',
        'guildId',
        'memberId',
        'roleIds',
      ),
    });
  }
}
