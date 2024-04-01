import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { ReportSummaryEntity } from '@lib/domains/report/domain/report-summary.entity';
import { ROOT_GROUP_SLUG } from '@lib/domains/group/domain/group.constants';
import { Type } from 'class-transformer';
import { REPORTED_USER_ROLE } from '@lib/domains/role/domain/role.constants';
import { NotFoundException } from '@nestjs/common';
import { ReportErrorMessage } from './report.error.message';
import { CheckedReportedUserEvent } from '../application/events/checked-reported-user/checked-reported-user.event';

export class ReportedUserEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  username: string;

  name: string | null;

  bot: boolean;

  @Type(() => MemberEntity)
  members: MemberEntity[];

  @Type(() => ReportSummaryEntity)
  receivedReports: ReportSummaryEntity[];

  constructor(partial: Partial<ReportedUserEntity>) {
    Object.assign(this, partial);
  }

  findRootGroupMember() {
    return this.members.find((member) => member.group.slug === ROOT_GROUP_SLUG);
  }

  hasUncommentedReceivedReports() {
    return this.receivedReports.some((report) => report.isOpen());
  }

  checkReceivedReports(): CheckedReportedUserEvent {
    const rootGroupMember = this.findRootGroupMember();
    if (!rootGroupMember)
      throw new NotFoundException(ReportErrorMessage.REPORTED_USER_ROOT_GROUP_MEMBER_NOT_FOUND);

    return {
      groupId: rootGroupMember.groupId,
      memberId: rootGroupMember.id,
      userId: this.id,
      roleIds: [],
      roleNames: [REPORTED_USER_ROLE],
      hasUncommentedReceivedReports: this.hasUncommentedReceivedReports(),
    };
  }
}
