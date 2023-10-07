import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateMembersOfUserCommand } from './create-members-of-user.command';
import { MemberSavePort } from '../../ports/out/member.save.port';

@CommandHandler(CreateMembersOfUserCommand)
export class CreateMembersOfUserHandler implements ICommandHandler<CreateMembersOfUserCommand> {
  constructor(@Inject('MemberSavePort') private readonly memberSavePort: MemberSavePort) {}

  async execute(command: CreateMembersOfUserCommand): Promise<void> {
    await this.memberSavePort.createMembersOfUser(command.input);
  }
}
