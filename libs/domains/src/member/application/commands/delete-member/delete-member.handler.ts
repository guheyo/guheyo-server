import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemberErrorMessage } from '@lib/domains/member/domain/member.error.message';
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
    if (!member) throw new NotFoundException(MemberErrorMessage.MEMBER_IS_NOT_FOUND);

    await this.memberSavePort.delete(member);
  }
}
