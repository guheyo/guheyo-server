import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { DeleteMemberCommand } from './delete-member.command';
import { MemberLoadPort } from '../../ports/out/member.load.port';
import { MemberSavePort } from '../../ports/out/member.save.port';

@CommandHandler(DeleteMemberCommand)
export class DeleteMemberHandler implements ICommandHandler<DeleteMemberCommand> {
  constructor(
    @Inject('MemberLoadPort') private memberLoadPort: MemberLoadPort,
    @Inject('MemberSavePort') private memberSavePort: MemberSavePort,
  ) {}

  async execute(command: DeleteMemberCommand): Promise<void> {
    const member = await this.memberLoadPort.findById(command.id);
    if (!member) return;

    await this.memberSavePort.delete(member);
  }
}
