import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { GroupErrorMessage } from '@lib/domains/group/domain/group.error.message';
import { DeleteGroupCommand } from './delete-group.command';
import { GroupLoadPort } from '../../ports/out/group.load.port';
import { GroupSavePort } from '../../ports/out/group.save.port';

@CommandHandler(DeleteGroupCommand)
export class DeleteGroupHandler implements ICommandHandler<DeleteGroupCommand> {
  constructor(
    @Inject('GroupLoadPort') private guildLoadPort: GroupLoadPort,
    @Inject('GroupSavePort') private guildSavePort: GroupSavePort,
  ) {}

  async execute(command: DeleteGroupCommand): Promise<void> {
    const group = await this.guildLoadPort.findById(command.id);
    if (!group) throw new NotFoundException(GroupErrorMessage.GROUP_IS_NOT_FOUND);

    await this.guildSavePort.delete(group);
  }
}
