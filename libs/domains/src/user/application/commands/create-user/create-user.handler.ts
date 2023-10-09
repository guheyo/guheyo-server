import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { CreateUserCommand } from './create-user.command';
import { UserSavePort } from '../../ports/out/user.save.port';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('UserSavePort') private userSavePort: UserSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = this.publisher.mergeObjectContext(new UserEntity(command));
    user.create([]);
    await this.userSavePort.create(user);
    user.commit();
  }
}
