import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { PostErrorMessage } from '@lib/domains/post/domain/post.error.message';
import { PostLoadPort } from '../../ports/out/post.load.port';
import { PostSavePort } from '../../ports/out/post.save.port';
import { ConnectTagsCommand } from './connect-tags.command';

@CommandHandler(ConnectTagsCommand)
export class ConnectTagsHandler implements ICommandHandler<ConnectTagsCommand> {
  constructor(
    @Inject('PostLoadPort') private loadPort: PostLoadPort,
    @Inject('PostSavePort') private savePort: PostSavePort,
  ) {}

  async execute(command: ConnectTagsCommand) {
    const post = await this.loadPort.findById(command.postId);
    if (!post) throw new NotFoundException(PostErrorMessage.POST_NOT_FOUND);

    await this.savePort.connectTags(command.postId, command.tagIds);
  }
}
