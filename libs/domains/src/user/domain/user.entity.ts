import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import _ from 'lodash';
import { UpdateUserProps } from './user.types';
import { SocialAccountLinkedEvent } from '../application/events/social-account-linked/social-account-linked.event';
import { UserUpdatedEvent } from '../application/events/user-updated/user-updated.event';
import { AvatarCreatedEvent } from '../application/events/avatar-created/avatar-created.event';

export class UserEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  username: string;

  name: string | null;

  phoneNumber: string | null;

  avatarURL: string | null;

  bot: boolean;

  socialAccounts: SocialAccountEntity[];

  members: MemberEntity[];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateUserProps) {
    Object.assign(this, _.pickBy(props, _.identity));
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
}
