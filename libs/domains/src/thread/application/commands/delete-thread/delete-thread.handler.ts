import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ThreadErrorMessage } from '@lib/domains/thread/domain/thread.error.message';
import { ThreadLoadPort } from '../../ports/out/thread.load.port';
import { ThreadSavePort } from '../../ports/out/thread.save.port';
import { DeleteThreadCommand } from './delete-thread.command';

@CommandHandler(DeleteThreadCommand)
export class DeleteThreadHandler implements ICommandHandler<DeleteThreadCommand> {
  constructor(
    @Inject('ThreadLoadPort') private loadPort: ThreadLoadPort,
    @Inject('ThreadSavePort') private savePort: ThreadSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteThreadCommand): Promise<void> {
    const thread = await this.loadPort.findById(command.id);
    if (!thread) throw new NotFoundException(ThreadErrorMessage.THREAD_NOT_FOUND);
    if (!thread.isAuthorized(command.user.id))
      throw new ForbiddenException(ThreadErrorMessage.THREAD_DELETE_COMMAND_FROM_UNAUTHORIZED_USER);
    await this.savePort.delete(thread);
  }
}
