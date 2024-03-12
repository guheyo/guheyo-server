import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface ReportSavePort extends SavePort<ReportEntity> {}
