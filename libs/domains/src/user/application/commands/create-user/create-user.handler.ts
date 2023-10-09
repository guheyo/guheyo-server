import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { CreateUserCommand } from './create-user.command';
import { UserSavePort } from '../../ports/out/user.save.port';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject('UserSavePort') private userSavePort: UserSavePort) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = new UserEntity(command);
    await this.userSavePort.create(user);
    user.create([]);
    user.commit();
  }
}
