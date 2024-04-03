import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemberErrorMessage } from '@lib/domains/member/domain/member.error.message';
import { UpdateMemberCommand } from './update-member.command';
import { MemberSavePort } from '../../ports/out/member.save.port';
import { MemberLoadPort } from '../../ports/out/member.load.port';

@CommandHandler(UpdateMemberCommand)
export class UpdateMemberHandler implements ICommandHandler<UpdateMemberCommand> {
  constructor(
    @Inject('MemberSavePort') private memberSavePort: MemberSavePort,
    @Inject('MemberLoadPort') private memberLoadPort: MemberLoadPort,
  ) {}

  async execute(command: UpdateMemberCommand): Promise<void> {
    const member = await this.memberLoadPort.findById(command.id);
    if (!member) throw new NotFoundException(MemberErrorMessage.MEMBER_IS_NOT_FOUND);

    await this.memberSavePort.save(member);
  }
}
