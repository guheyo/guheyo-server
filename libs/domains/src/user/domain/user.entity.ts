import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { ReportSummaryEntity } from '@lib/domains/report/domain/report-summary.entity';
import { ROOT_GROUP_SLUG } from '@lib/domains/group/domain/group.constants';
import { REPORTED_USER_ROLE } from '@lib/domains/role/domain/role.constants';
import { Type } from 'class-transformer';
import { UpdateUserProps } from './user.types';
import { SocialAccountLinkedEvent } from '../application/events/social-account-linked/social-account-linked.event';
import { UserUpdatedEvent } from '../application/events/user-updated/user-updated.event';
import { AvatarCreatedEvent } from '../application/events/avatar-created/avatar-created.event';
import { UserCheckedReceivedReportsEvent } from '../application/events/user-checked-received-reports/user-checked-received-reports.event';

export class UserEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  username: string;

  name: string | null;

  about: string | null;

  phoneNumber: string | null;

  avatarURL: string | null;

  bot: boolean;

  socialAccounts: SocialAccountEntity[];

  members: MemberEntity[];

  @Type(() => ReportSummaryEntity)
  receivedReports: ReportSummaryEntity[];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateUserProps) {
    Object.assign(this, omitBy(props, isUndefined));
    this.apply(new UserUpdatedEvent(this.id));
  }

  linkSocialAccount({
    socialAccountId,
    provider,
    socialId,
    accessToken,
    refreshToken,
  }: {
    socialAccountId: string;
    provider: string;
    socialId: string;
    accessToken?: string;
    refreshToken?: string;
  }) {
    this.apply(
      new SocialAccountLinkedEvent({
        socialAccountId,
        provider,
        socialId,
        userId: this.id,
        accessToken,
        refreshToken,
      }),
    );
  }

  createAvatar({
    imageId,
    name,
    url,
    contentType,
    source,
  }: {
    imageId: string;
    name: string;
    url: string;
    contentType?: string;
    source: string;
  }) {
    this.apply(
      new AvatarCreatedEvent({
        id: imageId,
        name,
        url,
        contentType,
        userId: this.id,
        source,
      }),
    );
  }

  hasUncommentedReceivedReports() {
    return this.receivedReports.some((report) => report.isOpen());
  }

  findRootGroupMember() {
    return this.members.find((member) => member.group.slug === ROOT_GROUP_SLUG);
  }

  checkReceivedReports() {
    const rootGroupMember = this.findRootGroupMember();
    if (!rootGroupMember) return;

    this.apply(
      new UserCheckedReceivedReportsEvent({
        groupId: rootGroupMember.groupId,
        memberId: rootGroupMember.id,
        userId: this.id,
        roleIds: [],
        roleNames: [REPORTED_USER_ROLE],
        hasUncommentedReceivedReports: this.hasUncommentedReceivedReports(),
      }),
    );
  }
}
