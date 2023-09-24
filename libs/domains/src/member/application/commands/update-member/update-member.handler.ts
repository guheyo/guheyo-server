import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
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
    if (!member) return;

    await this.memberSavePort.save(member);
  }
}
