import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { DeleteMemberCommand } from './delete-member.command';

@CommandHandler(DeleteMemberCommand)
export class DeleteMemberHandler implements ICommandHandler<DeleteMemberCommand> {
  constructor(
    @Inject('MemberSavePort')
    private savePort: SavePort<MemberEntity>,
  ) {}

  async execute(command: DeleteMemberCommand): Promise<void> {
    const member = new MemberEntity(command);
    await this.savePort.delete(member);
  }
}
