import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { UpdateMemberCommand } from './update-member.command';

@CommandHandler(UpdateMemberCommand)
export class UpdateMemberHandler implements ICommandHandler<UpdateMemberCommand> {
  constructor(
    @Inject('MemberSavePort')
    private savePort: SavePort<MemberEntity>,
  ) {}

  async execute(command: UpdateMemberCommand): Promise<void> {
    const member = new MemberEntity(command);
    await this.savePort.update(member);
  }
}
