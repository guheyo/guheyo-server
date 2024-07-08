import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ThreadErrorMessage } from '@lib/domains/thread/domain/thread.error.message';
import { UpdateThreadCommand } from './update-thread.command';
import { ThreadLoadPort } from '../../ports/out/thread.load.port';
import { ThreadSavePort } from '../../ports/out/thread.save.port';

@CommandHandler(UpdateThreadCommand)
export class UpdateThreadHandler implements ICommandHandler<UpdateThreadCommand> {
  constructor(
    @Inject('ThreadLoadPort') private loadPort: ThreadLoadPort,
    @Inject('ThreadSavePort') private savePort: ThreadSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateThreadCommand): Promise<void> {
    let thread = await this.loadPort.findById(command.id);
    if (!thread) throw new NotFoundException(ThreadErrorMessage.THREAD_NOT_FOUND);
    if (!thread.isAuthorized(command.user.id))
      throw new ForbiddenException(ThreadErrorMessage.THREAD_CHANGES_FROM_UNAUTHORIZED_USER);

    thread = this.publisher.mergeObjectContext(thread);
    thread.update(command);
    await this.savePort.save(thread);
    thread.commit();
  }
}
