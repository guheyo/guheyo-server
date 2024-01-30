import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject, NotFoundException } from '@nestjs/common';
import { GroupErrorMessage } from '@lib/domains/group/domain/group.error.message';
import { UpdateGroupCommand } from './update-group.command';
import { GroupLoadPort } from '../../ports/out/group.load.port';
import { GroupSavePort } from '../../ports/out/group.save.port';

@CommandHandler(UpdateGroupCommand)
export class UpdateGroupHandler implements ICommandHandler<UpdateGroupCommand> {
  constructor(
    @Inject('GroupSavePort') private guildSavePort: GroupSavePort,
    @Inject('GroupLoadPort') private guildLoadPort: GroupLoadPort,
  ) {}

  async execute(command: UpdateGroupCommand): Promise<void> {
    const group = await this.guildLoadPort.findById(command.id);
    if (!group) throw new NotFoundException(GroupErrorMessage.GROUP_IS_NOT_FOUND);

    group.update(command);
    await this.guildSavePort.save(group);
  }
}
