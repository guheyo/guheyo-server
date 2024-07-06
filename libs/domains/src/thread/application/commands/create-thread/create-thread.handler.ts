import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { ThreadEntity } from '@lib/domains/thread/domain/thread.entity';
import { ThreadErrorMessage } from '@lib/domains/thread/domain/thread.error.message';
import { CreateThreadCommand } from './create-thread.command';
import { ThreadLoadPort } from '../../ports/out/thread.load.port';
import { ThreadSavePort } from '../../ports/out/thread.save.port';

@CommandHandler(CreateThreadCommand)
export class CreateThreadHandler implements ICommandHandler<CreateThreadCommand> {
  constructor(
    @Inject('ThreadLoadPort') private loadPort: ThreadLoadPort,
    @Inject('ThreadSavePort') private savePort: ThreadSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateThreadCommand): Promise<void> {
    await this.savePort.create(
      new ThreadEntity({
        ...command,
        post: new PostEntity({
          ...command.post,
          userId: command.user.id,
        }),
      }),
    );
    let thread = await this.loadPort.findById(command.id);
    if (!thread)
      throw new InternalServerErrorException(ThreadErrorMessage.THREAD_CREATION_FAILED);

    thread = this.publisher.mergeObjectContext(thread);
    thread.create(command.post.tagNames || []);
    thread.commit();
  }
}
