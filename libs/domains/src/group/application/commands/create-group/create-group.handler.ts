import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { CreateGroupCommand } from './create-group.command';
import { GroupSavePort } from '../../ports/out/group.save.port';

@CommandHandler(CreateGroupCommand)
export class CreateGroupHandler implements ICommandHandler<CreateGroupCommand> {
  constructor(@Inject('GroupSavePort') private savePort: GroupSavePort) {}

  async execute(command: CreateGroupCommand): Promise<void> {
    const group = new GroupEntity(command);
    await this.savePort.create(group);
  }
}
