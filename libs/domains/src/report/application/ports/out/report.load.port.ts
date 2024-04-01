import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface ReportLoadPort extends LoadPort<ReportEntity> {
  findLastSubmittedReport(authorId: string): Promise<ReportEntity | null>;
}
