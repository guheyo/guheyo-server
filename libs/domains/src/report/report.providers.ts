import { ReportRepository } from './adapter/out/persistence/report.repository';
import { REPORT_COMMAND_PROVIDERS } from './application/commands/report.command.providers';

export const REPORT_PROVIDERS = [
  {
    provide: 'ReportLoadPort',
    useClass: ReportRepository,
  },
  {
    provide: 'ReportSavePort',
    useClass: ReportRepository,
  },
  ...REPORT_COMMAND_PROVIDERS,
];
