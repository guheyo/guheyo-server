import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { CreateMemberCommand } from './create-member.command';

@CommandHandler(CreateMemberCommand)
export class CreateMemberHandler implements ICommandHandler<CreateMemberCommand> {
  constructor(
    @Inject('MemberSavePort')
    private savePort: SavePort<MemberEntity>,
  ) {}

  async execute(command: CreateMemberCommand): Promise<any> {
    const member = new MemberEntity(command);
    await this.savePort.create(member);
  }
}
