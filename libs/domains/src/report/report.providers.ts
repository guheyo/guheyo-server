import { ReportRepository } from './adapter/out/persistence/report.repository';
import { REPORT_COMMAND_PROVIDERS } from './application/commands/report.command.providers';
import { REPORT_QUERY_PROVIDERS } from './application/queries/report.query.providers';
import { ReportSagas } from './application/sagas/report.sagas';

export const REPORT_PROVIDERS = [
  {
    provide: 'ReportLoadPort',
    useClass: ReportRepository,
  },
  {
    provide: 'ReportSavePort',
    useClass: ReportRepository,
  },
  ...REPORT_QUERY_PROVIDERS,
  ...REPORT_COMMAND_PROVIDERS,
  ReportSagas,
];
