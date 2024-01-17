import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { UserErrorMessage } from '@lib/domains/user/domain/user.error.message';
import { UpdateUserCommand } from './update-user.command';
import { UserLoadPort } from '../../ports/out/user.load.port';
import { UserSavePort } from '../../ports/out/user.save.port';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('UserLoadPort') private userLoadPort: UserLoadPort,
    @Inject('UserSavePort') private userSavePort: UserSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    let user = await this.userLoadPort.findById(command.id);
    if (!user) throw new NotFoundException(UserErrorMessage.USER_IS_NOT_FOUND);

    user = this.publisher.mergeObjectContext(user);
    user.update(_.pick(command, ['name', 'phoneNumber']));
    await this.userSavePort.save(user);
    user.commit();
  }
}
