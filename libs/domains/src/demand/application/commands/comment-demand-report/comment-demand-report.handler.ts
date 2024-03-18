import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { DemandErrorMessage } from '@lib/domains/demand/domain/demand.error.message';
import { CommentDemandReportCommand } from './comment-demand-report.command';
import { DemandLoadPort } from '../../ports/out/demand.load.port';
import { DemandSavePort } from '../../ports/out/demand.save.port';

@CommandHandler(CommentDemandReportCommand)
export class CommentDemandReportHandler implements ICommandHandler<CommentDemandReportCommand> {
  constructor(
    @Inject('DemandLoadPort') private loadPort: DemandLoadPort,
    @Inject('DemandSavePort') private savePort: DemandSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CommentDemandReportCommand): Promise<void> {
    let demand = await this.loadPort.findById(command.input.demandId);
    if (!demand) throw new NotFoundException(DemandErrorMessage.DEMAND_NOT_FOUND);

    demand = this.publisher.mergeObjectContext(demand);
    if (!demand.isAuthorized(command.input.authorId))
      throw new ForbiddenException(DemandErrorMessage.COMMENT_DEMAND_REPORT_REQUEST_FROM_NON_BUYER);

    const report = demand.findReport({ reportId: command.input.reportId });
    if (!report) throw new NotFoundException(DemandErrorMessage.DEMAND_REPORT_NOT_FOUND);

    demand.commentReport(command.input);
    demand.commit();
  }
}
