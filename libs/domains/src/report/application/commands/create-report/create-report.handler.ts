import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { CreateReportCommand } from './create-report.command';
import { ReportSavePort } from '../../ports/out/report.save.port';

@CommandHandler(CreateReportCommand)
export class CreateReportHandler implements ICommandHandler<CreateReportCommand> {
  constructor(@Inject('ReportSavePort') private savePort: ReportSavePort) {}

  async execute(command: CreateReportCommand): Promise<void> {
    await this.savePort.create(new ReportEntity(command));
  }
}
