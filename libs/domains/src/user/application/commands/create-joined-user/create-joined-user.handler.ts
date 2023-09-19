import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import _ from 'lodash';
import { CreateJoinedUserCommand } from './create-joined-user.command';
import { UserLoadPort } from '../../ports/out/user.load.port';

@CommandHandler(CreateJoinedUserCommand)
export class CreateJoinedUserHandler implements ICommandHandler<CreateJoinedUserCommand> {
  constructor(
    @Inject('UserSavePort') private readonly userSavePort: SavePort<UserEntity>,
    @Inject('UserLoadPort') private readonly userLoadPort: UserLoadPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateJoinedUserCommand): Promise<void> {
    const user = await this.userLoadPort.findUserBySocialAccount(
      command.provider,
      command.socialId,
    );

    if (user) return;

    const newUser = new UserEntity({
      id: command.userId,
      username: command.username,
    });

    await this.userSavePort.create(newUser);
  }
}
