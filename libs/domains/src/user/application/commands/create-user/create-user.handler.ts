import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: SavePort<UserEntity>) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = new UserEntity(command);
    await this.userSavePort.create(user);
  }
}
