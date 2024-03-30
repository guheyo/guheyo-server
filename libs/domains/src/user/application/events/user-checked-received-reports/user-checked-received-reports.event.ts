import { IEvent } from '@nestjs/cqrs';

export class UserCheckedReceivedReportsEvent implements IEvent {
  groupId: string;

  memberId: string;

  userId: string;

  roleIds: string[];

  roleNames: string[];

  hasUncommentedReceivedReports: boolean;

  constructor({
    groupId,
    memberId,
    userId,
    roleIds,
    roleNames,
    hasUncommentedReceivedReports,
  }: {
    groupId: string;
    memberId: string;
    userId: string;
    roleIds: string[];
    roleNames: string[];
    hasUncommentedReceivedReports: boolean;
  }) {
    this.groupId = groupId;
    this.memberId = memberId;
    this.userId = userId;
    this.roleIds = roleIds;
    this.roleNames = roleNames;
    this.hasUncommentedReceivedReports = hasUncommentedReceivedReports;
  }
}
