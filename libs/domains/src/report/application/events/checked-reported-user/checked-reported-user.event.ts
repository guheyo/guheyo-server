import { IEvent } from '@nestjs/cqrs';

export class CheckedReportedUserEvent implements IEvent {
  userId: string;

  roleIds: string[];

  roleNames: string[];

  hasUncommentedReceivedReports: boolean;

  constructor({
    userId,
    roleIds,
    roleNames,
    hasUncommentedReceivedReports,
  }: {
    userId: string;
    roleIds: string[];
    roleNames: string[];
    hasUncommentedReceivedReports: boolean;
  }) {
    this.userId = userId;
    this.roleIds = roleIds;
    this.roleNames = roleNames;
    this.hasUncommentedReceivedReports = hasUncommentedReceivedReports;
  }
}
