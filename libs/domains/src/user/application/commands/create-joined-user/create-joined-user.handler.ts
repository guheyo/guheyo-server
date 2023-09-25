import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import _ from 'lodash';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { CreateJoinedUserCommand } from './create-joined-user.command';
import { UserLoadPort } from '../../ports/out/user.load.port';
import { UserSavePort } from '../../ports/out/user.save.port';

@CommandHandler(CreateJoinedUserCommand)
export class CreateJoinedUserHandler implements ICommandHandler<CreateJoinedUserCommand> {
  constructor(
    @Inject('UserLoadPort') private readonly userLoadPort: UserLoadPort,
    @Inject('UserSavePort') private readonly userSavePort: UserSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateJoinedUserCommand): Promise<void> {
    const user = await this.userLoadPort.findBySocialAccount(command.provider, command.socialId);
    if (user) throw new NotFoundException(UserErrorMessage.USER_IS_NOT_FOUND);

    const newUser = this.publisher.mergeObjectContext(
      new UserEntity({
        id: command.userId,
        username: command.username,
      }),
    );
    await this.userSavePort.create(newUser);

    newUser.createdJoinedUser(
      _.pick(
        command,
        'userId',
        'username',
        'avatarURL',
        'socialAccountId',
        'provider',
        'socialId',
        'guildId',
        'memberId',
        'roleIds',
      ),
    );
  }
}
