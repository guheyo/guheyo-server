import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { Type } from 'class-transformer';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';
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

  about: string | null;

  phoneNumber: string | null;

  avatarURL: string | null;

  bot: boolean;

  socialAccounts: SocialAccountEntity[];

  @Type(() => RoleEntity)
  roles: RoleEntity[];

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
    url,
    contentType,
  }: {
    imageId: string;
    url: string;
    contentType?: string;
  }) {
    this.apply(
      new AvatarCreatedEvent({
        id: imageId,
        url,
        contentType,
        userId: this.id,
      }),
    );
  }
}
