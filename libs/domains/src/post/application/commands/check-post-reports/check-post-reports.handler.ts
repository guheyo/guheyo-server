import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { PostErrorMessage } from '@lib/domains/post/domain/post.error.message';
import { PostLoadPort } from '../../ports/out/post.load.port';
import { PostSavePort } from '../../ports/out/post.save.port';
import { CheckPostReportsCommand } from './check-post-reports.command';

@CommandHandler(CheckPostReportsCommand)
export class CheckPostReportsHandler implements ICommandHandler<CheckPostReportsCommand> {
  constructor(
    @Inject('PostLoadPort') private loadPort: PostLoadPort,
    @Inject('PostSavePort') private savePort: PostSavePort,
  ) {}

  async execute(event: CheckPostReportsCommand) {
    const post = await this.loadPort.findById(event.postId);
    if (!post) throw new NotFoundException(PostErrorMessage.POST_FROM_REPORTED_NOT_FOUND);

    post.checkReports(event.reportStatus);
    this.savePort.save(post);
  }
}
