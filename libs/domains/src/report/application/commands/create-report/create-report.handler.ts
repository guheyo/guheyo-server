import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { pick } from 'lodash';
import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { CreateReportCommand } from './create-report.command';
import { ReportSavePort } from '../../ports/out/report.save.port';

@CommandHandler(CreateReportCommand)
export class CreateReportHandler implements ICommandHandler<CreateReportCommand> {
  constructor(
    @Inject('ReportSavePort') private savePort: ReportSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateReportCommand): Promise<void> {
    const ref = {
      offerId: command.type === 'offer' ? command.refId : undefined,
      demandId: command.type === 'demand' ? command.refId : undefined,
      swapId: command.type === 'swap' ? command.refId : undefined,
    };
    const report = this.publisher.mergeObjectContext(
      new ReportEntity({
        ...pick(command, ['id', 'type', 'authorId', 'title', 'content']),
        ...ref,
      }),
    );
    report.create(command.refId);
    await this.savePort.create(report);
    report.commit();
  }
}
