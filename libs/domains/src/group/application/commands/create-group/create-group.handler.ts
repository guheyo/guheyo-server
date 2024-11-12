import { CommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { GroupEntity } from '@lib/domains/group/domain/group.entity';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CreateGroupCommand } from './create-group.command';
import { GroupSavePort } from '../../ports/out/group.save.port';
import { GroupResponse } from '../../dtos/group.response';

@CommandHandler(CreateGroupCommand)
export class CreateGroupHandler extends PrismaCommandHandler<CreateGroupCommand, GroupResponse> {
  constructor(@Inject('GroupSavePort') private savePort: GroupSavePort) {
    super(GroupResponse);
  }

  async execute(command: CreateGroupCommand): Promise<void> {
    const group = new GroupEntity(command);
    await this.savePort.create(group);
  }
}
