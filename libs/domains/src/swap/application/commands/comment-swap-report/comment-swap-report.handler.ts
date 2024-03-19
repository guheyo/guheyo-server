import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { SwapErrorMessage } from '@lib/domains/swap/domain/swap.error.message';
import { CommentSwapReportCommand } from './comment-swap-report.command';
import { SwapLoadPort } from '../../ports/out/swap.load.port';
import { SwapSavePort } from '../../ports/out/swap.save.port';

@CommandHandler(CommentSwapReportCommand)
export class CommentSwapReportHandler implements ICommandHandler<CommentSwapReportCommand> {
  constructor(
    @Inject('SwapLoadPort') private loadPort: SwapLoadPort,
    @Inject('SwapSavePort') private savePort: SwapSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CommentSwapReportCommand): Promise<void> {
    let swap = await this.loadPort.findById(command.input.swapId);
    if (!swap) throw new NotFoundException(SwapErrorMessage.SWAP_NOT_FOUND);

    swap = this.publisher.mergeObjectContext(swap);
    if (!swap.isAuthorized(command.input.authorId))
      throw new ForbiddenException(SwapErrorMessage.COMMENT_SWAP_REPORT_REQUEST_FROM_NON_BUYER);

    const report = swap.findReport({ reportId: command.input.reportId });
    if (!report) throw new NotFoundException(SwapErrorMessage.SWAP_REPORT_NOT_FOUND);

    swap.commentReport(command.input);
    swap.commit();
  }
}
