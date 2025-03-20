import { ReportSummaryEntity } from '@lib/domains/report/domain/report-summary.entity';
import { Type } from 'class-transformer';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';

export class ReportedUserEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  username: string;

  name: string | null;

  avatarURL: string | null;

  bot: boolean;

  @Type(() => RoleEntity)
  roles: RoleEntity[];

  @Type(() => ReportSummaryEntity)
  receivedReports: ReportSummaryEntity[];

  constructor(partial: Partial<ReportedUserEntity>) {
    Object.assign(this, partial);
  }

  hasUncommentedReceivedReports() {
    return this.receivedReports.some((report) => report.isOpen());
  }
}
